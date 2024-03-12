<script lang="ts">
	import { writable } from 'svelte/store';

	const rerender = writable(0);

	const causeRerender = () => rerender.set($rerender + 1);

	const handleKeydown = (event: KeyboardEvent) => {
		const { key } = event;

		const isNumber = !isNaN(Number(key));
		const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
		const isEnter = key === 'Enter';

		if (!isNumber && !isArrow && !isEnter) return console.log('Invalid key');
		if (!currentItem) return console.log('No current item');

		if (isNumber) {
			const keyAsNumber = Number(key);

			if (keyAsNumber >= 1 && keyAsNumber <= 9 && keyAsNumber <= tiers.length) {
				if (tiers.some((tier) => tier.items.some((i) => i.name === currentItem.name))) {
					tiers.forEach((tier) => {
						tier.items = tier.items.filter((i) => i.name !== currentItem.name);
					});
				}

				tiers[keyAsNumber - 1].items.push(currentItem);
				unassignedItems.shift();

				causeRerender();
			}
		}

		if (isArrow) {
			if (key === 'ArrowUp' || key === 'ArrowDown') {
				const currentIndex = tiers.findIndex((tier) =>
					tier.items.some((i) => i.name === currentItem.name)
				);
				const nextIndex = currentIndex + (key === 'ArrowUp' ? -1 : 1);
				const nextTier = tiers[nextIndex];

				if (nextTier) {
					tiers[currentIndex].items = tiers[currentIndex].items.filter(
						(i) => i.name !== currentItem.name
					);
					nextTier.items.push(currentItem);
				}
			}

			if (key === 'ArrowLeft' || key === 'ArrowRight') {
				const currentIndex = tiers.findIndex((tier) =>
					tier.items.some((i) => i.name === currentItem.name)
				);
				const currentTier = tiers[currentIndex];
				const currentIndexInTier = currentTier.items.findIndex((i) => i.name === currentItem.name);
				const nextIndexInTier = currentIndexInTier + (key === 'ArrowLeft' ? -1 : 1);
				const nextItem = currentTier.items[nextIndexInTier];

				if (nextItem) {
					currentTier.items[currentIndexInTier] = nextItem;
					currentTier.items[nextIndexInTier] = currentItem;
				}
			}

			causeRerender();
		}

		if (isEnter) {
			if (unassignedItems.length) {
				unassignedItems = unassignedItems.filter((i) => i.name !== currentItem.name);
				currentItem = unassignedItems[0];

				if (currentItem) {
					tiers[0].items.push(currentItem);

					causeRerender();
				}
			}
		}
	};

	let unassignedItems = [{ name: '1' }, { name: '2' }, { name: '3' }];

	$: currentItem = unassignedItems[0];

	let tiers = [
		{ name: 'S', color: '#e11d48', items: [unassignedItems[0]] },
		{ name: 'A', color: '#FFBF7F', items: [] },
		{ name: 'B', color: '#FFDF7F', items: [] }
	];
</script>

<svelte:window on:keydown={handleKeydown} />

<main class="h-screen flex items-center justify-center flex-col gap-y-12">
	{#if currentItem}
		<div class="grid place-items-center pointer-events-none">
			<div class="h-[125px] aspect-square bg-neutral-700 grid place-items-center">
				<h2>{currentItem.name}</h2>
			</div>
		</div>
	{/if}
	<div class="max-w-lg w-full">
		{#each tiers as tier, index}
			<div class="h-[50px] flex">
				<div
					class="grid place-items-center aspect-square h-full"
					style="background-color: {tier.color};"
				>
					<h2>{tier.name}</h2>
				</div>
				{#key $rerender}
					<ul class="flex-1 h-full bg-neutral-800 flex divide-x-[1px] divide-neutral-600">
						{#each tier.items as item}
							<li
								class:bg-neutral-400={currentItem && item.name === currentItem.name}
								class="h-full aspect-square grid place-items-center"
							>
								{item.name}
							</li>
						{/each}
					</ul>
				{/key}
			</div>
			{#if index < tiers.length - 1}
				<div class="h-[1px] bg-neutral-600"></div>
			{/if}
		{/each}
	</div>
</main>
