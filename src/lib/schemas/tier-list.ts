import { z } from 'zod';

const itemSchema = z.object({
  name: z.string().min(1)
});

const tierSchema = z.object({
  name: z.string().min(1),
  color: z.string()
  // items: z.array(itemSchema).default([])
});

export const createTierListSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  tiers: z.array(tierSchema).min(1, { message: 'You must have at least one tier in the list' }).default([]),
  items: z.array(itemSchema).min(1, { message: 'You must have at least one item in the list' }).default([])
});
