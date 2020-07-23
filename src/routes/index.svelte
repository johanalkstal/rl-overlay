<script>
	import { gameState } from '../stores';
	import PlayerCard from '../components/PlayerCard.svelte';
	import Scoreboard from '../components/Scoreboard.svelte';
	import StatsFeed from '../components/StatsFeed.svelte';
	import TeamCard from '../components/TeamCard.svelte';
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

{#if !$gameState.game.hasWinner && $gameState.game.isReplay}
<h2 class="replay">REPLAY</h2>
{/if}

<div class="scoreboard">
	<Scoreboard/>
</div>

<div class="stats-feed">
	<StatsFeed/>
</div>

<div class="blue-team">
	<TeamCard teamId={0}/>
</div>

<div class="blue-team-player">
	<PlayerCard teamId={0}/>
</div>

<div class="orange-team">
	<TeamCard teamId={1}/>
</div>

<div class="orange-team-player">
	<PlayerCard teamId={1}/>
</div>

