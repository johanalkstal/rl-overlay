<script>
	export let players = {};
	export let teamId = 0;

	let team = [];

	$: {
		team = Object.keys(players)
			.filter(playerFilter)
			.map(getPlayer);
	}

	function getPlayer(playerId) {
		return players[playerId];
	}

	function playerFilter(playerId) {
		return players[playerId].team === teamId;
	}

</script>

<style>
	.team-card {
		background-color: white;
		border: 1px solid black;
		border-radius: 4px;
		height: 100px;
		width: 300px;
	}
</style>

{#if team.length}
<section class="team-card">
	<ul>
		{#each team as player}
		<li>{player.name}</li>
		{/each}
	</ul>
</section>
{/if}
