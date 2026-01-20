const OBSWebSocket = require('obs-websocket-js').default;

module.exports = (nodecg) => {
    const config = nodecg.bundleConfig;

    const scenesConfig = config.obs?.scenes;

    if (!scenesConfig || typeof scenesConfig !== 'object') {
        nodecg.log.error('Invalid scenes config');
        return;
    }


    const scenesRep = nodecg.Replicant('scenes', {
        defaultValue: {}
    });


    scenesRep.value = scenesConfig;

    const obs = new OBSWebSocket();

    async function connectOBS() {
        try {
            await obs.connect('ws://localhost:4455', '');
            nodecg.log.info('Connected to OBS');
        } catch (err) {
            nodecg.log.error('OBS connection failed:', err);
        }
    }

    async function changeScene(name) {
        try {
            await obs.call('SetCurrentProgramScene', { sceneName: name });
        } catch (err) {
            obs.log.warn(`Cannot change OBS scene [${name}]: ${err}`);
            throw err;
        }
    }

    nodecg.listenFor('SwitchRunner', async (data) => {
        const { previousRunner, currentRunner, sceneName } = data;

        nodecg.log.info(
            `SwitchRunner: ${previousRunner} → ${currentRunner} (${sceneName})`
        );

        changeScene(sceneName)

        // Mute previous runner
        if (previousRunner) {

            await obs.call('SetInputMute', {
                inputName: `${previousRunner} - Twitch`,
                inputMuted: true
            });
        }

        // Unmute current runner
        await obs.call('SetInputMute', {
            inputName: `${currentRunner} - Twitch`,
            inputMuted: false
        });
    });




    connectOBS();
};
