export type Language = 'en' | 'cn';

export interface TimelineEvent {
  year: string;
  title_en: string;
  title_cn: string;
  description_en: string;
  description_cn: string;
}

export interface Acronym {
  abbr: string;
  full: string;
  meaning_en: string;
  meaning_cn: string;
}

export interface Concept {
  id: string;
  title_en: string;
  title_cn: string;
  description_en: string;
  description_cn: string;
  type: 'neural-net' | 'gradient' | 'diffusion' | 'attention' | 'generic'; 
}

export interface ContentData {
  timeline: TimelineEvent[];
  acronyms: Acronym[];
  concepts: Concept[];
}