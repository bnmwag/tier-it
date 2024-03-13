<script lang="ts">
	import type { Item } from '$lib/types';
	import { Tile } from '$lib/components/tier';

	export let items: Item[];
</script>

<ul class="flex w-full flex-wrap gap-1 rounded-md bg-neutral-900 p-1">
	{#if items.length === 0}
		<li class="h-12"></li>
	{:else}
		{#each items as item}
			<Tile>{item.name}</Tile>
		{/each}
	{/if}
</ul>
