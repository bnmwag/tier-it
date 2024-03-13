<script>
  import '../app.pcss';

  import { Nav } from '$lib/components';
</script>

<Nav />

<main class="container min-h-screen pt-24">
  <slot />
</main>
