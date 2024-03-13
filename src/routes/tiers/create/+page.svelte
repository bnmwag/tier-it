<script lang="ts">
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { Header } from '$lib/components';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { error } from '@sveltejs/kit';
  import Button from '$lib/components/ui/button/button.svelte';

  export let data;

  const form = superForm(data.form, {
    dataType: 'json'
  });
  const { form: formData, enhance, errors } = form;

  const add = (key: 'items' | 'tiers') => {
    formData.update((form) => {
      const obj = key === 'items' ? { name: '' } : { name: '', color: '#000000' };
      form[key].push(obj as any);
      return form;
    });
  };
</script>

<Header>
  <h1 class="text-center text-5xl font-bold">Create a Tier List</h1>
</Header>

<SuperDebug data={$formData} />

<form method="POST" use:enhance class="space-y-8">
  <Form.Field {form} name="title">
    <Form.Control let:attrs>
      <Form.Label>Title</Form.Label>
      <Input {...attrs} bind:value={$formData.title} />
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Button variant="outline" on:click={() => add('tiers')} type="button">+ add tier</Button>
      {#if $errors.tiers?._errors}
        <div class="text-sm font-medium text-destructive">{$errors.tiers._errors}</div>
      {/if}
    </div>
    <div class="grid grid-cols-3 gap-2">
      {#if $formData.tiers.length === 0}
        <div class="rounded-md bg-muted px-8 py-4 text-muted-foreground">add your first tier</div>
      {/if}
      {#each $formData.tiers as _, i}
        <div class="flex rounded-md border px-4 py-2">
          <Form.Field {form} name={`tiers[${i}].name`}>
            <Form.Control let:attrs>
              <Input {...attrs} bind:value={$formData.tiers[i].name} />
            </Form.Control>
            <Form.Description />
            {#if $errors?.tiers?.[i].name}
              <div class="text-sm font-medium text-destructive">{$errors.tiers[i].name}</div>
            {/if}
          </Form.Field>
          <Form.Field {form} name={`tiers[${i}].color`} class="size-10">
            <Form.Control let:attrs>
              <Input {...attrs} bind:value={$formData.tiers[i].color} type="color" class="size-full" />
            </Form.Control>
            <Form.Description />
            {#if $errors?.tiers?.[i].color}
              <div class="text-sm font-medium text-destructive">{$errors.tiers[i].color}</div>
            {/if}
          </Form.Field>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Button variant="outline" on:click={() => add('items')} type="button">+ add item</Button>
      {#if $errors.items?._errors}
        <div class="text-sm font-medium text-destructive">{$errors.items._errors}</div>
      {/if}
    </div>
    <div class="grid grid-cols-3 gap-2">
      {#if $formData.items.length === 0}
        <div class="rounded-md bg-muted px-8 py-4 text-muted-foreground">add your first item</div>
      {/if}
      {#each $formData.items as _, i}
        <Form.Field {form} name={`items[${i}].name`} class="rounded-md border px-4 py-2">
          <Form.Control let:attrs>
            <Form.Label>Name of Item</Form.Label>
            <Input {...attrs} bind:value={$formData.items[i].name} />
          </Form.Control>
          <Form.Description />
          {#if $errors?.items?.[i].name}
            <div class="text-sm font-medium text-destructive">{$errors.items[i].name}</div>
          {/if}
        </Form.Field>
      {/each}
    </div>
  </div>
  <Button type="submit">Submit</Button>
</form>
