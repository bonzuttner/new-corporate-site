export interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  category: string;
  url?: string;
}