const API_URL = "/api";

async function loadData() {
    try {
        const response = await fetch(`${API_URL}/info`);
        const data = await response.json();

        document.getElementById('judul-katalog').innerText = data.judul_katalog;
        document.getElementById('nama-owner').innerText = data.pemilik;
        document.getElementById('nim-owner').innerText = data.nim;

        const listContainer = document.getElementById('game-list');
        listContainer.innerHTML = '';

        data.items.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `<strong>${game}</strong>`;
            listContainer.appendChild(card);
        });
    } catch (err) {
        console.error("Gagal ambil data:", err);
    }
}

async function addGame() {
    const input = document.getElementById('game-input');
    const gameName = input.value;

    if (!gameName) return;

    try {
        const res = await fetch(`${API_URL}/add-item`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: gameName })
        });

        if (res.ok) {
            input.value = '';
            loadData();
        }
    } catch (err) {
        alert("Gagal menambah game");
    }
}

window.onload = loadData;

// Update manual jam 8 pagi