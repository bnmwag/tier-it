<script lang="ts">
  import type { List } from '$lib/types';

  export let data: List;
</script>

<div class="space-y-4 py-20">
  <div class="flex items-center gap-x-4">
    <div class="size-10 overflow-hidden rounded-full bg-neutral-700"></div>
    <p>{data.author.name}</p>
  </div>
  <h1 class="text-5xl font-bold">
    {data.title}
  </h1>
</div>
