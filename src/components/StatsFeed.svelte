<script>
	import { onDestroy } from 'svelte';
	import { gameState, statsFeed } from '../stores'

	let CLEAR_FEED_INTERVAL = 3000;
	let feed = [];
	let lastMessage;

	const interval = setInterval(() => {
		const [oldMessage, ...rest] = feed;
		feed = rest;
	}, CLEAR_FEED_INTERVAL);

	$: {
		if (!isSameEvent()) {
			feed = [...feed, $statsFeed];
			lastMessage = $statsFeed;
		}

		if ($gameState.game.hasWinner) {
			feed = [];
		}
	}

	onDestroy(() => {
		clearInterval(interval);
	})

	function isSameEvent() {
		if (!lastMessage) {
			return false;
		}

		return lastMessage.mainTarget === $statsFeed.mainTarget &&
		lastMessage.secondaryTarget === $statsFeed.secondaryTarget &&
		lastMessage.type === $statsFeed.type;
	}

</script>

<style>
	.stats-feed {
		background-color: white;
		border: 1px solid black;
		border-radius: 4px;
		width: 100px;
	}
</style>

{#if feed.length}
<section class="stats-feed">
	{#each feed as message}
	{message.mainTarget} { message.secondaryTarget} { message.type}
	{/each}
</section>
{/if}
