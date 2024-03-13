<script>
  import { Header } from '$lib/components';
</script>

<Header>
  <h1 class="text-center text-5xl font-bold">Find a Tier List</h1>
</Header>
<div class="grid grid-cols-4 gap-4">
  {#each Array.from({ length: 12 }) as _, i}
    <div class="aspect-square bg-neutral-800"></div>
  {/each}
</div>
