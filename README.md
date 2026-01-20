# oras-bb-26-layouts

oras-bb-26-layouts is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

# Requirements

- [NodeCG](http://github.com/nodecg/nodecg) (`v20`)
- [nodecg-speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol) (`2.5.3`)

You can find the needed speedcontrol config [here](config/nodecg-speedcontrol.json). Just copy that to `<path-to-nodecg-folder>/cfg`.

Don't forget to place both bundles (`oras-bb-26-layouts` and `nodecg-speedcontrol`) in the `bundles` folder of your NodeCG installation.

## Alternative Method - New NodeCG Installation

This bundle has the `nodecg` dependency following the new NodeCG installation guide, meaning you can run this bundle without an external NodeCG bundle.

Make sure to have this NodeCG bundle as the root. Create the `cfg` and `bundles` folders at the root. Add [nodecg-speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol) to the bundles folder.

Make sure to install all the dependencies with `npm i`.

To run use:
```
npx nodecg start
```

# Config Setup

Create a file named `oras-bb-26-layouts.json`. The file name has to match the bundles name.

The structure is as follows:
```
	"obs": {
		"enabled": true,
		"url": "ws://localhost:[YOUR_PORT]",
        "password": "YOUR_PASSWORD" //relevant if authentication is toggled on on OBS Websocket settings
		"scenes": {
			"SCENE_TITLE": "SCENE_NAME",
            ...
		},
        "inputs": [
            {
                "name": "[RUNNER_NAME] - Twitch",
                "kind": "browser_source",
                "settings": {
                  "reroute_audio": true
                }
              },
        ]
    }
```

Add all scenes you want to control through the NodeCG dashboard in "scenes". The name scene_title is the text that will show up on the dashboard and the scene_name must match exactly the name of the OBS Scene (it's case-sensitive!). 

The inputs correspond to the OBS sources. Add all the needed audio sources correspondant to the main feeds. 

In the dashboard panel, there is a button for each runner. Once pressed, the scene is switched to the one with that runner in focus. The way the code works is that it will use the SCENE_TITLE value as a reference when calling OBS to mute/unmute a certain audio source, so make sure that SCENE_TITLE matches RUNNER_NAME, otherwise OBS will say that that input doesn't exist.

Example: 
```
Incorrect:
    ...
    "scenes": {
			"eddaket's scene": "eddaket +8",
            ...
		},
        "inputs": [
            {
                "name": "eddaket - Twitch",
                "kind": "browser_source",
                "settings": {
                  "reroute_audio": true
                }
              },
        ]

```

When clicking on the button, OBS will try to unmute the Audio source ```eddaket's scene - Twitch```.

Correct:
```
    ...
    "scenes": {
			"eddaket": "eddaket +8",
            ...
		},
        "inputs": [
            {
                "name": "eddaket - Twitch",
                "kind": "browser_source",
                "settings": {
                  "reroute_audio": true
                }
              },
        ]
```

You can get around this restrictions by concatenating strings directly to the SCENE_TITLE or mapping the SCENE_TITLES to other values.

# Run

From your NodeCG folder, run:

`node index.js`
