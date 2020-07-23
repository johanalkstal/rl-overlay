<script>
	import { gameSettings, gameState } from '../stores';

	let blueTeamScore = 0;
	let orangeTeamScore = 0;
	let gameTime = '0:00';

	$: {
		blueTeamScore = $gameState.game.teams[0].score;
		orangeTeamScore = $gameState.game.teams[1].score;
		gameTime = getGameTime($gameState.game.time);
	}

	function getGameTime(time) {
		if (!time) {
			return '0:00';
		}

		const minutes = Math.floor(time / 60);
		const seconds = Math.ceil(time - minutes * 60);

		return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
	}
</script>

<style>
	.scoreboard {
		border: 1px solid black;
    border-radius: 0 0 4px 7px;
		display: flex;
	}

	.blue-team,
	.orange-team {
		align-items: center;
		display: flex;
		flex: 2;
		height: 60px;
    justify-content: space-between;
	}

	.score {
		font-size: 32px;
	}

	.team-name {
		margin: 0 16px;
	}

	.time {
		align-items: center;
		display: flex;
		flex: 1;
		font-size: 24px;
		justify-content: center;
	}
</style>

<section class="scoreboard">
	<div class="blue-team">
		<div class="team-name">{$gameSettings.blueTeamName}</div>
		<div class="score">{blueTeamScore}</div>
	</div>

	<div class="time">
		{gameTime}
	</div>

	<div class="orange-team">
		<div class="score">{orangeTeamScore}</div>
		<div class="team-name">{$gameSettings.orangeTeamName}</div>
	</div>
</section>
