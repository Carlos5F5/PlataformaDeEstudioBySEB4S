// src/types/slideBar.ts
export interface SlideItem {
  id: number;
  title: string;
  description: string;
  image: string;
  url?: string;
  type: 'announcement' | 'resource' | 'tool' | 'tip';
}

export interface SlideBarProps {
  items?: SlideItem[];
}