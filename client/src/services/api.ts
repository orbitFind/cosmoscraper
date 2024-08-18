import axios, { isAxiosError } from "axios";

const apiUrl = "https://cosmoscraper.onrender.com";

interface ScrapeData {
  url: string;
}

export const scrape = async ({ url }: ScrapeData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/scrape`,
      { url },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.status;
    }
    return error;
  }
};
