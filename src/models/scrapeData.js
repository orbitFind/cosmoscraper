import mongoose from "mongoose";

const scrapeDataSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: String,
  description: String,
  links: [{ text: String, href: String }],
  keywords: [String],
  image: String,
  date: { type: Date, default: Date.now },
  category: String,
  titleEmbedding: [Number],
  descriptionEmbedding: [Number],
  textEmbeddings: [[Number]],
});

export default mongoose.model("ScrapeData", scrapeDataSchema);
