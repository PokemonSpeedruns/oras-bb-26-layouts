const scenesRep = nodecg.Replicant('scenes');

let currentRunner = null;

const container = document.getElementById('runnerButtons');

function createButton(key, sceneName) {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.classList.add('runner-btn');

    btn.onclick = () => {
        if (key === currentRunner) return;

        const previousRunner = currentRunner;
        currentRunner = key;

        updateUI();

        nodecg.sendMessage('SwitchRunner', {
            previousRunner,
            currentRunner,
            sceneName
        });
    };

    return btn;
}

function updateUI() {
    document.querySelectorAll('.runner-btn').forEach(btn => {
        btn.classList.toggle(
            'active',
            btn.textContent === currentRunner
        );
    });
}

scenesRep.on('change', (scenes) => {
    container.innerHTML = '';

    Object.entries(scenes).forEach(([key, value]) => {
        container.appendChild(
            createButton(key, value)
        );
    });
});
