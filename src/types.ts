export interface Image {
  src: string;
}

export interface Job {
  id: number;
  company: string;
  logo: Image;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}
