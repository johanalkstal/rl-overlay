<script>
	import { gameState } from '../stores';
	import PlayerCard from '../components/PlayerCard.svelte';
	import Scoreboard from '../components/Scoreboard.svelte';
	import StatsFeed from '../components/StatsFeed.svelte';
	import TeamCard from '../components/TeamCard.svelte';

	let BLUE_TEAM_ID = 0;
	let ORANGE_TEAM_ID = 1;

	let isReplay = false;
	let players = undefined;
	let showBluePlayerCard = false;
	let showOrangePlayerCard = false;
	let showOverlay = false;
	let showTeamCards = false;
	let targetPlayer = undefined;

	$: {
		const hasTarget = $gameState.game.hasTarget;
		isReplay = !$gameState.game.hasWinner && $gameState.game.isReplay;
		players = $gameState.players;
		targetPlayer = players[$gameState.game.target];

		showBluePlayerCard = !isReplay && hasTarget && targetPlayer.team === BLUE_TEAM_ID;
		showOrangePlayerCard = !isReplay && hasTarget && targetPlayer.team === ORANGE_TEAM_ID;
		showOverlay = $gameState.hasGame;
		showTeamCards = !isReplay;
	}

</script>

<style>
	.blue-team-player {
		bottom: 32px;
		left: 32px;
		position: absolute;
	}

	.blue-team {
		left: 32px;
		position: absolute;
		top: 96px;
	}

	.orange-team {
		position: absolute;
		right: 32px;
		top: 96px;
	}

	.orange-team-player {
		bottom: 32px;
		position: absolute;
		right: 32px;
	}

	.replay {
		left: 32px;
		position: absolute;
		top: 32px;
	}

	.scoreboard {
		margin: 0 auto;
    width: 50%;
	}

	.stats-feed {
		position: absolute;
		right: 32px;
		top: 16px;
	}
</style>

{#if showOverlay}

	{#if isReplay}
		<h2 class="replay">REPLAY</h2>
	{/if}

	<div class="scoreboard">
		<Scoreboard/>
	</div>

	{#if !isReplay}
	<div class="stats-feed">
		<StatsFeed/>
	</div>
	{/if}


	{#if showTeamCards}
		<div class="blue-team">
			<TeamCard players={players} teamId={BLUE_TEAM_ID}/>
		</div>

		<div class="orange-team">
			<TeamCard players={players} teamId={ORANGE_TEAM_ID}/>
		</div>
	{/if}

	{#if showBluePlayerCard}
		<div class="blue-team-player">
			<PlayerCard player={targetPlayer} teamId={BLUE_TEAM_ID}/>
		</div>
	{/if}

	{#if showOrangePlayerCard}
		<div class="orange-team-player">
			<PlayerCard player={targetPlayer} teamId={ORANGE_TEAM_ID}/>
		</div>
	{/if}

{/if}
