<script>
	import { gameState } from '../stores';

	export let teamId = 0;

	let team = [];

	$: {
		team = Object.keys($gameState.players)
			.filter(playerFilter)
			.map(getPlayer);
	}

	function getPlayer(playerId) {
		return $gameState.players[playerId];
	}

	function playerFilter(playerId) {
		return $gameState.players[playerId].team === teamId;
	}

</script>

<style>
	.team-card {
		border: 1px solid black;
		border-radius: 4px;
		height: 100px;
		width: 300px;
	}
</style>

<section class="team-card">
	<ul>
		{#each team as player}
		<li>{player.name}</li>
		{/each}
	</ul>
</section>
