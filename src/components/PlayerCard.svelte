<script>
	import { gameState } from '../stores'

	export let teamId = 0;

	let target = null;
	let showCard = false;

	$: {
		showCard = !$gameState.game.isReplay && $gameState.game.hasTarget && $gameState.players[$gameState.game.target].team === teamId;
		target = showCard ? $gameState.players[$gameState.game.target] : null;
	}
</script>

<style>
	.player-card {
		background-color: white;
		border: 1px solid black;
		border-radius: 4px;
		height: 300px;
		width: 300px;
	}
</style>

{#if showCard}
<section class="player-card">
	<ul>
		<li>{target.name}</li>
		<li>Score {target.score}</li>
		<li>Goals {target.goals}</li>
		<li>Assists {target.assists}</li>
		<li>Shots {target.shots}</li>
		<li>Saves {target.saves}</li>
		<li>Speed {target.speed}</li>
		<li>Boost {target.boost}</li>
	</ul>
</section>
{/if}
