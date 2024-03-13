<script lang="ts">
  import { List, ListHeader } from '$lib/components/tier';

  export let data;

  const { tierList } = data;
</script>

{#if !tierList}
  <p>failed loading tier list</p>
{:else}
  <ListHeader data={tierList} />
  <List initialData={tierList} />
{/if}
