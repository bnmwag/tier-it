export type Item = { name: string };

export type Tier = { name: string; color: string; items: Item[] };

export type Author = {
  name: string;
};

export type List = {
  id: string;
  title: string;
  author: Author;
  tiers: Tier[];
  items: Item[];
  createdAt: string;
};
