
const hourlyData = Array.from({length: 24}, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00–${String((i + 1) % 24).padStart(2, '0')}:00`,
    volume: Math.floor(Math.random() * 70) + 30,
    volatility: Math.floor(Math.random() * 70) + 30,
    category: ["Bitcoin", "Ethereum", "DeFi", "Memecoin", "AI", "Stablecoins"][i % 6]
}));

const heatmap = document.getElementById('heatmap');
const lastUpdated = document.getElementById('last-updated');

const now = new Date();
lastUpdated.innerHTML = `Last Updated: ${now.getUTCFullYear()}-${String(now.getUTCMonth()+1).padStart(2,'0')}-${String(now.getUTCDate()).padStart(2,'0')} ${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')} UTC`;

const currentHour = now.getUTCHours();

hourlyData.forEach((data, idx) => {
    const row = document.createElement('div');
    row.className = 'heatmap-row';
    row.id = `hour-${idx}`;

    const distance = Math.abs(idx - currentHour);
    if (distance === 0) {
        row.classList.add('current-hour');
    } else if (distance > 2) {
        row.classList.add('blur');
    }

    const bgColor = `rgba(0, 128, 255, ${data.volume / 100})`;
    row.style.backgroundColor = bgColor;

    row.innerHTML = `
        <div><strong>${data.hour}</strong></div>
        <div class="tooltip-floating">
            📈 Vol: ${data.volume} | 🔥 Volat: ${data.volatility}<br>
            🪙 ${data.category}
        </div>
    `;

    heatmap.appendChild(row);
});

// Auto-scroll to the current hour
setTimeout(() => {
    const target = document.getElementById(`hour-${currentHour}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}, 500);
