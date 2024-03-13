import { writable } from 'svelte/store';
import type { Item, Tier } from '$lib/types.js';

export const currentItem = writable<Item | undefined>(undefined);
export const tiers = writable<Tier[] | undefined>([]);
