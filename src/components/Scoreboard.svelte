<script>
	import { gameSettings, gameState } from '../stores';

	let bestOfMatches = '';
	let blueTeamLogo = '';
	let blueTeamName = '';
	let blueTeamScore = 0;
	let blueTeamWins = 0;
	let orangeTeamLogo = '';
	let orangeTeamName = '';
	let orangeTeamScore = 0;
	let orangeTeamWins = 0;
	let gameTime = '0:00';
	let title = '';

	$: {
		bestOfMatches = $gameSettings.bestOfMatches;
		blueTeamLogo = $gameSettings.blueTeamLogo;
		blueTeamName = $gameState.game.teams[0].name;
		blueTeamScore = $gameState.game.teams[0].score;
		blueTeamWins = $gameSettings.blueTeamWins;
		orangeTeamLogo = $gameSettings.orangeTeamLogo;
		orangeTeamName = $gameState.game.teams[1].name;
		orangeTeamScore = $gameState.game.teams[1].score;
		orangeTeamWins = $gameSettings.orangeTeamWins;
		gameTime = getGameTime($gameState.game.time);
		title = $gameSettings.title;
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
		background-color: white;
		border: 1px solid black;
    border-radius: 0 0 4px 7px;
		display: flex;
		flex-direction: column;
	}

	.top-row {
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


	.game-time {
		align-items: center;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
	}

	.logo {
		height: 60px;
		width: 60px;
	}

	.score {
		font-size: 32px;
	}

	.team-name {
		margin: 0 16px;
	}

	.time {
		font-size: 24px;
	}

	.bottom-row {
		display: flex;
		justify-content: space-between;
	}
</style>

<section class="scoreboard">
	<div class="top-row">
		<div class="blue-team">
			<img class="logo" src={`logos/${blueTeamLogo}.png`} alt="">
			<div class="team-name">{blueTeamName}</div>
			<div class="score">{blueTeamScore}</div>
		</div>

		<div class="game-time">
			<p>{title}</p>
			<p class="time">{gameTime}</p>
			<p class="info">Bo{bestOfMatches}</p>
		</div>

		<div class="orange-team">
			<div class="score">{orangeTeamScore}</div>
			<div class="team-name">{orangeTeamName}</div>
			<img class="logo" src={`logos/${orangeTeamLogo}.png`} alt="">
		</div>
	</div>
	<div class="bottom-row">
		{#if blueTeamWins}
		<p>Wins: {blueTeamWins}</p>
		{/if}

		{#if orangeTeamWins}
		<p>Wins: {orangeTeamWins}</p>
		{/if}
	</div>
</section>
