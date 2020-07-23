# Prerequisites

- [Node](https://nodejs.org) installed

- The [Bakkesmod SOS Plugin](https://gitlab.com/bakkesplugins/sos/sos-plugin/-/releases) added to Bakkesmod.

You install the plugin by downloading the latest release and extracting the ZIP file into your Bakkesmod plugins folder.
The folder is located at `C:\Program Files (x86)\Steam\steamapps\common\rocketleague\Binaries\Win64\bakkesmod\plugins`

Then you need to follow the instructions located at
- https://gitlab.com/bakkesplugins/sos/sos-plugin#bakkesmod-sdk-setup
- https://gitlab.com/bakkesplugins/sos/sos-plugin#bakkesmod-settings-file

# Running the overlay

Download this application (if you are not familiar with Git then choose to download as ZIP and extract it) to a convenient folder.

Then open your terminal and go to that folder.

Run the command `npm install` to install all the application dependencies.

Once that is done you start the application by running the `npm start` command.

Open your web browser and visit `localhost:3000` to see the overlay.

*Remember that you need to have Rocket League running and a game started.*

`localhost:3000` is also where you point your OBS software to in order to display the overlay on your stream.
