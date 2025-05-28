let CONFIG = {
    boardWidth: 15,
    boardHeight: 15,
    tileSize: 64
};

// Parse unit types
const lines = unitTypesCSV.trim().split('\n');
const headers = lines[0].split(',');
const unitTypes = [];

for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const unit = {};
    for (let j = 0; j < headers.length; j++) {
        unit[headers[j]] = values[j];
    }
    unitTypes.push(unit);
}

// Game state
let selectedUnitIndex = 0;
let selectedTeam = 0;
const placedUnits = {}; // Key: "x,y", Value: {unitIndex, team}
let placedObstacles = {}; // New storage for obstacles

// DOM elements
const mapContainer = document.getElementById('mapContainer');
const mapImage = document.getElementById('mapImage');
const gridOverlay = document.getElementById('gridOverlay');
const unitList = document.getElementById('unitList');
const teamRadios = document.querySelectorAll('input[name="team"]');
const output = document.getElementById('output');
const obstacles = document.getElementById('obstacles');
const unitValues = document.getElementById('unitValues');

// Initialize the unit list
function initUnitList() {
    unitTypes.forEach((unit, index) => {
        const div = document.createElement('div');
        div.className = 'unit-item';
        div.textContent = `${index}. ${unit.name}`;
        div.dataset.index = index;

        div.addEventListener('click', () => {
            document.querySelectorAll('.unit-item').forEach(item => {
                item.classList.remove('selected');
            });
            div.classList.add('selected');
            unitValues.textContent = `${unit.name} (${unit.hp} HP * ${unit.size}) (${unit.save}+) (${unit.cost * unit.size})`;
            selectedUnitIndex = index;
        });

        if (index === 0) {
            div.classList.add('selected');
        }

        unitList.appendChild(div);
    });
}

// Initialize team selection
function initTeamSelection() {
    teamRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedTeam = parseInt(radio.value);
        });
    });
}

// Create the grid overlay
function createGrid() {
    gridOverlay.innerHTML = '';
    gridOverlay.style.width = `${CONFIG.boardWidth * CONFIG.tileSize}px`;
    gridOverlay.style.height = `${CONFIG.boardHeight * CONFIG.tileSize}px`;

    for (let y = 0; y < CONFIG.boardHeight; y++) {
        for (let x = 0; x < CONFIG.boardWidth; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.left = `${x * CONFIG.tileSize}px`;
            tile.style.top = `${y * CONFIG.tileSize}px`;
            tile.dataset.x = x;
            tile.dataset.y = y;

            tile.addEventListener('click', () => {
                handleTileClick(x, y);
            });

            gridOverlay.appendChild(tile);
        }
    }
}

// Handle tile clicks
function handleTileClick(x, y) {
    const key = `${x},${y}`;
    const isObstacleMode = selectedTeam === 2;

    if (placedObstacles[key]) {
        delete placedObstacles[key];
    } else if (placedUnits[key]) {
        delete placedUnits[key];
    } else {
        if (isObstacleMode) {
            placedObstacles[key] = {
                x,
                y
            };
        } else {
            placedUnits[key] = {
                unitIndex: selectedUnitIndex,
                team: selectedTeam
            };
        }
    }

    updateTileAppearance();
    updateOutput();
}

// Update tile appearance based on placed units
function updateTileAppearance() {
    // Clear all tile classes first
    document.querySelectorAll('.tile').forEach(tile => {
        tile.className = 'tile';
    });

    // Remove all markers (units and obstacles)
    document.querySelectorAll('.unit-marker, .obstacle-marker').forEach(marker => {
        marker.remove();
    });

    // Apply classes and markers for placed units (existing logic)
    for (const [key, unit] of Object.entries(placedUnits)) {
        const [x, y] = key.split(',').map(Number);
        const tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);

        if (tile) {
            tile.classList.add(unit.team === 0 ? 'player-unit' : 'ai-unit');

            const marker = document.createElement('div');
            marker.className = 'unit-marker';
            marker.style.left = `${x * CONFIG.tileSize + 22}px`;
            marker.style.top = `${y * CONFIG.tileSize + 22}px`;
            marker.textContent = unit.unitIndex;
            marker.style.color = unit.team === 0 ? 'blue' : 'red';
            gridOverlay.appendChild(marker);
        }
    }

    // Add obstacle markers (new logic)
    for (const [key, obstacle] of Object.entries(placedObstacles)) {
        const [x, y] = key.split(',').map(Number);
        const tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);

        if (tile) {
            tile.classList.add('obstacle-tile');

            const marker = document.createElement('div');
            marker.className = 'obstacle-marker';
            marker.style.left = `${x * CONFIG.tileSize + 22}px`;
            marker.style.top = `${y * CONFIG.tileSize + 22}px`;
            marker.textContent = 'X'; // Or any symbol you prefer
            marker.style.color = 'green';
            gridOverlay.appendChild(marker);
        }
    }
    // Update point counters
    updatePointCounters();
}

// Update the output textarea
function updateOutput() {
    // Update units output (existing format)
    const unitLines = [];
    for (const [key, unit] of Object.entries(placedUnits)) {
        const [x, y] = key.split(',');
        unitLines.push(`${unit.unitIndex}, ${x}, ${y}, ${unit.team}`);
    }
    output.value = unitLines.join('\n');

    // Update obstacles output (new format: "x1,y1 x2,y2 ...")
    const obstacleLines = [];
    for (const [key] of Object.entries(placedObstacles)) {
        obstacleLines.push(key);
    }
    obstacles.value = obstacleLines.join(' ');
}

// Calculate the cost of a unit
function calculateUnitCost(unitIndex) {
    const unit = unitTypes[unitIndex];
    const size = parseInt(unit.size) || 1;
    const cost = parseInt(unit.cost) || 0;
    return size * cost;
}

// Update the point counters
function updatePointCounters() {
    let playerPoints = 0;
    let aiPoints = 0;

    for (const unit of Object.values(placedUnits)) {
        const points = calculateUnitCost(unit.unitIndex);
        if (unit.team === 0) {
            playerPoints += points;
        } else {
            aiPoints += points;
        }
    }

    document.getElementById('playerPoints').textContent = playerPoints;
    document.getElementById('aiPoints').textContent = aiPoints;
}

// Show unit info box
function showUnitInfo(unitIndex, x, y) {
    const infoBox = document.getElementById('infoBox');
    const unit = unitTypes[unitIndex];

    infoBox.innerHTML = `
                <strong>${unit.name}</strong><br>
                Unit #${unitIndex}<br>
                Cost: ${unit.cost}<br>
                Size: ${unit.size}
            `;

    infoBox.style.display = 'block';
    infoBox.style.left = `${x + 10}px`;
    infoBox.style.top = `${y + 10}px`;
}

// Hide unit info box
function hideUnitInfo() {
    document.getElementById('infoBox').style.display = 'none';
}

function loadButton() {
    // Process units
    let unitLines = document.getElementById("output").value.trim();
    if (unitLines !== "") {
        unitLines = unitLines.split("\n");
        unitLines.forEach(line => {
            const [unitIndex, x, y, team] = line.split(",").map(Number);
            placedUnits[`${x},${y}`] = {
                unitIndex,
                team
            };
        });
    }

    // Process obstacles
    const obstacleInput = document.getElementById("obstacles").value.trim();
    if (obstacleInput !== "") {
        placedObstacles = {};
        const obstacleCoordinates = obstacleInput.split(" ");
        obstacleCoordinates.forEach(coord => {
            const [x, y] = coord.split(",").map(Number);
            placedObstacles[`${x},${y}`] = true; // Marking position as occupied by an obstacle
        });
    }

    updateTileAppearance();
    updateOutput();
}

// Initialize the application
function init() {
    const params = new URLSearchParams(window.location.search);
    const mapParam = params.get('map');

    if (mapParam) {
        mapImage.src = `maps/map${mapParam}.png`;
    }
    // Wait for the image to load
    mapImage.onload = function() {
        CONFIG.boardWidth = Math.floor(mapImage.naturalWidth / CONFIG.tileSize);
        CONFIG.boardHeight = Math.floor(mapImage.naturalHeight / CONFIG.tileSize);

        mapContainer.style.width = `${CONFIG.boardWidth * CONFIG.tileSize}px`;
        mapContainer.style.height = `${CONFIG.boardHeight * CONFIG.tileSize}px`;
        createGrid();
    }; //createGrid();

    initUnitList();
    initTeamSelection();
}
