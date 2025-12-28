'use strict';

$(() => {
	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			let customData = runData.customData;

			// Reset all comms data.
			$('.comms-name').add('.comms-pronouns').text('');

			// Update comms names and pronouns.
			Object.entries(customData).map(([key, val] = entry) => {
				// The key here maps to the HTML element ID.
				fadeText('#' + key, val, true);
			});
		}
	}
});