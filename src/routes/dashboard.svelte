<script>
	import { gameSettings } from '../stores'

	let logos = [];

	$: logos = $gameSettings.logos;

	function onChange(event) {
		const input = event.target;
		gameSettings.update((settings) => {
			return {
				...settings,
				[input.id]: input.value
			};
		});
	}
</script>

<style>
	header {
		background: linear-gradient(180deg, #00a1ff, #3838f9);
		color: white;
		margin-bottom: 2rem;
		padding: 1rem 2rem;
	}

	label,
	input {
		display: block;
	}

	input,
	select {
		margin-bottom: 2rem;
	}

	main {
		padding: 0 2rem;
	}
</style>

<header>
	<h1>RL Overlay</h1>
</header>

<main>

	<label for="title">Scoreboard Title</label>
	<input id="title" type="text" value={$gameSettings.title} on:blur={onChange}>

	<label for="blueTeamLogo">Blue Team Logo</label>
	<select id="blueTeamLogo" value={$gameSettings.blueTeamLogo} on:blur={onChange}>
		{#each logos as logo}
			<option selected={$gameSettings.blueTeamLogo === logo} value={logo}>{logo}</option>
		{/each}
		</select>

	<label for="orangeTeamLogo">Orange Team Logo</label>
	<select id="orangeTeamLogo" value={$gameSettings.orangeTeamLogo} on:blur={onChange}>
		{#each logos as logo}
			<option selected={$gameSettings.orangeTeamLogo === logo} value={logo}>{logo}</option>
		{/each}
		</select>

	<label for="bestOfMatches">Best of</label>
	<input id="bestOfMatches" type="number" value={$gameSettings.bestOfMatches} on:blur={onChange}>

	<label for="blueTeamWins">Blue Team Wins</label>
	<input id="blueTeamWins" type="number" value={$gameSettings.blueTeamWins} on:blur={onChange}>

	<label for="orangeTeamWins">Orange Team Wins</label>
	<input id="orangeTeamWins" type="number" value={$gameSettings.orangeTeamWins} on:blur={onChange}>

</main>
