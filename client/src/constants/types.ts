interface LinkData {
  text: string;
  href: string;
}

export interface ScrapeData {
  url: string;
  title: string;
  description: string;
  links: LinkData[];
  keywords: string[] | string;
  image: string;
  date: Date;
  category?: string;
}
