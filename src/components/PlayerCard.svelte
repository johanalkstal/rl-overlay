<script>
	export let teamId = 0;
	export let player;
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

<section class="player-card">
	<ul>
		<li>{player.name}</li>
		<li>Score {player.score}</li>
		<li>Goals {player.goals}</li>
		<li>Assists {player.assists}</li>
		<li>Shots {player.shots}</li>
		<li>Saves {player.saves}</li>
		<li>Speed {player.speed}</li>
		<li>Boost {player.boost}</li>
	</ul>
</section>
