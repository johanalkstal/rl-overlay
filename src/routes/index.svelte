<script>
	import { onDestroy } from 'svelte';
	import { gameState } from '../stores'

</script>

<h2>Overlay</h2>

<code>{JSON.stringify($gameState)}</code>
