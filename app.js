// Function to fetch and display players
async function searchPlayers() {
    const game = document.getElementById('gameInput').value;
    const location = document.getElementById('locInput').value;
    const grid = document.getElementById('playerGrid');

    grid.innerHTML = '<p class="text-center col-span-full">Loading players...</p>';

    try {
        const response = await fetch(`/api/search?game=${game}&location=${location}`);
        const players = await response.json();

        grid.innerHTML = ''; // Clear loading text

        if (players.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500">No partners found in this area. Try another search!</p>';
            return;
        }

        players.forEach(player => {
            grid.innerHTML += `
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${player.name}</h3>
                            <span class="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                                ${player.skill}
                            </span>
                        </div>
                        <div class="bg-orange-100 text-orange-600 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-2"><strong>Game:</strong> ${player.game}</p>
                    <p class="text-gray-600 mb-2"><strong>📍 Location:</strong> ${player.location}</p>
                    <p class="text-gray-600 mb-6"><strong>🕒 Availability:</strong> ${player.availability}</p>
                    <button onclick="sendInvite('${player.name}')" class="w-full bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-black transition">
                        Send Play Request
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching players:", error);
    }
}

function sendInvite(name) {
    alert(`Invite sent to ${name}! Check your dashboard for their response.`);
}

// Load all players on startup
window.onload = searchPlayers;