# Prerequisites

- [Node](https://nodejs.org) installed

- The [Bakkesmod SOS Plugin](https://gitlab.com/bakkesplugins/sos/sos-plugin/-/releases) added to Bakkesmod.

## Setting up the SOS plugin

You install the plugin by downloading the latest release and extracting the ZIP file into your Bakkesmod plugins folder.
The folder is located at `C:\Program Files (x86)\Steam\steamapps\common\rocketleague\Binaries\Win64\bakkesmod\plugins` unless you installed Steam on another drive.

Then you need to add an environment variable pointing to the `bakkesmodsdk` folder. You do this by
- opening your Start menu and typing "environment variables", you should get a suggestion to edit your systems environment variables. Click it.
- Click the environment variables button
- Click the New button
- Write `BAKKESMODSDK` as the variable name
- Write the path to the SDK folder, `C:\Program Files (x86)\Steam\steamapps\common\rocketleague\Binaries\Win64\bakkesmod\bakkesmodsdk` or the path to your installation location
- Save the new environment variable

Next you'll need to copy the `sos.set` file from the [SOS Plugin](https://gitlab.com/bakkesplugins/sos/sos-plugin) repository and put it in the `C:\Program Files (x86)\Steam\steamapps\common\rocketleague\Binaries\Win64\bakkesmod\plugins\settings` folder.

Now the plugin should be installed and ready to go. If you start Rocket League with Bakkesmod, you should see it among the active plugins.

# Running the overlay

Download this application (if you are not familiar with Git then choose to download as ZIP and extract it) to a convenient folder.

Then open your terminal and go to that folder.

Run the command `npm install` to install all the application dependencies.

Once that is done you start the application by running the `npm start` command.

Open your web browser and visit `localhost:3000` to see the overlay.

*Remember that you need to have Rocket League running and a game started.*

`localhost:3000` is also where you point your OBS software to in order to display the overlay on your stream.

# For developers

### [Read about Sapper](https://sapper.svelte.dev/)

### [Read about Svelte](https://svelte.dev/)

## Explanation of Rocket League events

`channel:event`

	game:match_created			A match has been created but not started.
	game:initialized			The match is about to begin.
	game:pre_countdown_begin	The kickoff countdown is about to begin.
	game:post_countdown_begin	The kickoff countdown has begun.
	game:statfeed_event			Statfeed data is sent.
	game:goal_scored			A goal has been scored.
	game:replay_start			A replay is starting.
	game:replay_will_end		A replay is about to end.
	game:replay_end				A replay has ended.
	game:match_ended			The match has ended.
	game:podium_start			The winners are displayed.

[Check the Bakkesmod SOS plugin README for an explanation of the data sent](https://gitlab.com/bakkesplugins/sos/sos-plugin/-/tree/master#websocket-server)
