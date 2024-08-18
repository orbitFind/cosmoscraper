import { chromium } from "playwright";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import ScrapeData from "../models/ScrapeData.js";

let model = null;

async function loadModel() {
  if (!model) {
    model = await use.load();
  }
  return model;
}

async function analyzeText(texts) {
  const model = await loadModel();
  const embeddings = await model.embed(texts);
  return embeddings.array();
}

const categories = {
  Technology: "Technology related content",
  Education: "Educational content",
  Health: "Health-related content",
  Business: "Business and finance-related content",
  Entertainment: "Entertainment-related content",
  Sports: "Sports-related content",
  Politics: "Political content",
  Science: "Science-related content",
  Food: "Food and recipe-related content",
  Travel: "Travel-related content",
  Fashion: "Fashion and lifestyle-related content",
  Music: "Music-related content",
  Art: "Art and design-related content",
};

async function categorizeText(textEmbeddings) {
  const categoryDescriptions = Object.values(categories);
  const categoryEmbeddings = await analyzeText(categoryDescriptions);

  const categoryScores = {};
  for (const [index, category] of Object.keys(categories).entries()) {
    const categoryEmbedding = categoryEmbeddings[index];
    const similarity = textEmbeddings.map((textEmbedding) => {
      const textTensor = tf.tensor(textEmbedding).toFloat();
      const categoryTensor = tf.tensor(categoryEmbedding).toFloat();
      return tf.metrics.cosineProximity(textTensor, categoryTensor).arraySync();
    });
    categoryScores[category] = Math.max(...similarity);
  }

  return Object.keys(categoryScores).reduce((a, b) =>
    categoryScores[a] > categoryScores[b] ? a : b
  );
}

export async function scrape(req, res) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const { url } = req.body;
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const title = (await page.title()) || "No title found";
    const description = await page
      .$eval('meta[name="description"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "No description found");

    const ogTitle = await page
      .$eval('meta[property="og:title"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");
    const ogDescription = await page
      .$eval('meta[property="og:description"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");
    const ogImage = await page
      .$eval('meta[property="og:image"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");
    const ogUrl = await page
      .$eval('meta[property="og:url"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");

    const twitterTitle = await page
      .$eval('meta[name="twitter:title"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");
    const twitterDescription = await page
      .$eval('meta[name="twitter:description"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");
    const twitterImage = await page
      .$eval('meta[name="twitter:image"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "");

    const textToAnalyze = [
      title,
      description,
      ogTitle,
      ogDescription,
      twitterTitle,
      twitterDescription,
    ];

    const embeddings = await analyzeText(textToAnalyze);
    const textEmbeddings = embeddings;

    const category = await categorizeText(textEmbeddings);

    const links = await page.$$eval("a", (anchors) =>
      anchors.map((a) => ({ text: a.textContent.trim(), href: a.href }))
    );
    const uniqueLinks = Array.from(new Set(links.map((link) => link.href))).map(
      (href) => links.find((link) => link.href === href)
    );

    const keywords = await page
      .$eval('meta[name="keywords"]', (element) =>
        element.getAttribute("content")?.split(",")
      )
      .catch(() => "No keywords found");

    const image = await page
      .$eval('meta[property="og:image"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => "No image found");

    const returnData = {
      url,
      title,
      description,
      links: uniqueLinks,
      keywords,
      image,
      category,
      titleEmbedding: embeddings[0],
      descriptionEmbedding: embeddings[1],
      textEmbeddings: embeddings.slice(2),
    };

    await ScrapeData.findOneAndUpdate({ url: returnData.url }, returnData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(returnData);
  } catch (error) {
    if (error.message.includes("net::ERR_NAME_NOT_RESOLVED")) {
      return res.status(404).json({ error: `DNS lookup failed for ${url}` });
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await browser.close();
  }
}
