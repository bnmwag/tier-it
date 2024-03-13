<script lang="ts">
  import type { Item, List } from '$lib/types';

  import { currentItem, tiers } from '$lib/stores/tier';

  import { Tag } from '$lib/components';
  import { TileList } from '$lib/components/tier';

  export let initialData: List;

  let unassignedItems = initialData?.items;

  currentItem.set(unassignedItems?.[0]);
  tiers.set(initialData?.tiers.map((tier) => ({ ...tier, items: [] })));

  const handleKeydown = (event: KeyboardEvent) => {
    const isArrowX = ['ArrowLeft', 'ArrowRight'].includes(event.key);
    const isArrowY = ['ArrowUp', 'ArrowDown'].includes(event.key);
    const isEnter = event.key === 'Enter';

    if (!$currentItem) return;
    if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;

    event.preventDefault();

    if (isArrowY) {
      if (!$tiers || !$tiers?.length) return;
      if (typeof $currentItem === 'undefined' || !$currentItem) return;

      const indexOfCurrentTier = $tiers.findIndex((tier) => tier?.items.includes($currentItem as Item));

      if (indexOfCurrentTier === -1) {
        $tiers = [{ ...$tiers[0], items: [...$tiers[0].items, $currentItem] }, ...$tiers.slice(1)];
      } else {
        const isUp = event.key === 'ArrowUp';
        const nextTier = $tiers[indexOfCurrentTier + (isUp ? -1 : 1)];
        if (nextTier) {
          $tiers[indexOfCurrentTier].items = $tiers[indexOfCurrentTier].items.filter((item) => item !== $currentItem);
          nextTier.items.push($currentItem);
        } else {
          const nextIndex = isUp ? $tiers.length - 1 : 0;
          $tiers[indexOfCurrentTier].items = $tiers[indexOfCurrentTier].items.filter((item) => item !== $currentItem);
          $tiers[nextIndex].items.push($currentItem);
        }
      }
    }

    if (isArrowX) {
      if (!$tiers || !$tiers?.length) return;
      if (typeof $currentItem === 'undefined' || !$currentItem) return;

      const currentIndex = $tiers?.findIndex((tier) => tier.items.some((i) => i.name === $currentItem?.name));
      const currentTier = $tiers?.[currentIndex];
      const currentIndexInTier = currentTier?.items.findIndex((i) => i.name === $currentItem?.name);
      const nextIndexInTier = (currentIndexInTier || 0) + (event.key === 'ArrowLeft' ? -1 : 1);
      const nextItem = currentTier?.items[nextIndexInTier];

      if (nextItem) {
        $tiers[currentIndex].items[currentIndexInTier] = nextItem;
        $tiers[currentIndex].items[nextIndexInTier] = $currentItem;
      }
    }

    if (isEnter) {
      if (!unassignedItems?.length) return;
      if (!$tiers || !$tiers?.length) return;

      const isUnassigned = $tiers.every((tier) => !tier.items.includes($currentItem as Item));
      if (isUnassigned) return;

      unassignedItems = unassignedItems.filter((item) => item !== $currentItem);
      $currentItem = unassignedItems[0];
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="grid w-full max-w-7xl grid-cols-2 gap-x-12">
  <div class="w-full max-w-lg">
    {#if $tiers}
      {#each $tiers as tier}
        <div class="space-y-2 border-l px-4 py-2" style="border-color: {tier.color};">
          <div class="flex items-center gap-x-2">
            <div class="size-2 rounded-full" style="background-color: {tier.color};" />
            <h2>{tier.name}</h2>
          </div>
          <TileList items={tier.items} />
        </div>
      {/each}
    {/if}
  </div>
  <div class="flex flex-col items-start justify-between">
    {#if $currentItem}
      <div class="space-y-4">
        <Tag>current item</Tag>
        <h2 class="text-2xl">{$currentItem.name}</h2>
      </div>
    {:else}
      <p class="text-gray-400">You finished the list</p>
    {/if}
    {#if unassignedItems && unassignedItems.length > 1}
      <TileList items={unassignedItems.slice(1, unassignedItems.length)} />
    {:else}
      <p class="text-gray-400">No more items to assign</p>
    {/if}
  </div>
</div>
