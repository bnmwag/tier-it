import { getTierListById } from '$lib/db/queries/tier-list.js';

export const load = async ({ params }) => {
  const { tierListId } = params;

  const tierList = await getTierListById(tierListId);

  return { tierList };
};
