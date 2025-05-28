const obstacles = parseObstacles();
const shootDistancer = 0; // Modifies shooting distances

// Game State
const gameState = {
    currentPlayer: 'player', // 'player' or 'ai'
    currentPhase: 'movement', // 'movement', 'magic', 'shooting', 'combat'
    selectedUnit: null,
    turnNumber: 1,
    activeUnits: [], // Units that haven't acted this phase
    units: [], // All units on the board
    board: [], // 2D array representing the board
    highlightedTiles: [],
    spells: [],
    weapons: [],
    unitTypes: [],
    obstacles: []
};

// Initialize the game
function initGame() {
    // Set up the game board
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.setProperty('--cols', CONFIG.boardWidth);
    gameBoard.style.setProperty('--rows', CONFIG.boardHeight);
    
    // Create tiles
    gameState.board = Array(CONFIG.boardHeight).fill().map(() => Array(CONFIG.boardWidth).fill(null));
    
    for (let y = 0; y < CONFIG.boardHeight; y++) {
        for (let x = 0; x < CONFIG.boardWidth; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.x = x;
            tile.dataset.y = y;
            // Check if this tile is an obstacle
            if (obstacles.some(obs => obs.x === x && obs.y === y)) {
                tile.classList.add('obstacle-tile');
            }
            tile.addEventListener('click', () => handleTileClick(x, y));
            gameBoard.appendChild(tile);
        }
    }
    
    loadGameData();
    
    // Set up initial units (example placement)
    setupInitialUnits();
    
    // Initialize UI
    updateUI();
    
    // Set up event listeners
    document.getElementById('end-phase-btn').addEventListener('click', endPhase);
    document.getElementById('end-turn-btn').addEventListener('click', endTurn);
}

// Load game data (units, weapons, spells)
function loadGameData() {

    gameState.unitTypes = parseCSV(unitTypesCSV);
    gameState.weapons = parseCSV(weaponTypesCSV);
    gameState.obstacles = obstacles;
    
    gameState.spells = [
        {
            name: "Bestial Curse",
            affects: 2, // enemy units
            distance: 5,
            neededRoll: 6,
            effect: "allies targeting this enemy in melee gain +1 to hit"
        },
        {
            name: "Bestial Heal",
            affects: 1, // ally units
            distance: 7,
            neededRoll: 5,
            effect: "ally unit healed D3"
        },
        {
            name: "Bestial Ambush",
            affects: 3, // empty squares
            distance: 9,
            neededRoll: 5,
            effect: "escape through the shadows"
        }
    ];
}

// Set up initial units on the board
function setupInitialUnits() {
    // Example units - in a real game, you'd have a proper setup
    const unitsData = document.getElementById("units_csv").innerText
    .split("\n")
    .map(line => line.split(",").map(value => isNaN(value) ? value : parseInt(value))); // Convert numbers

    const playerUnits = [];
    const aiUnits = [];

    unitsData.forEach(([unitTypeIndex, x, y, owner, sizeOverride]) => {
        const unit = createUnit(unitTypeIndex, x, y, owner === 0 ? "player" : "ai", sizeOverride); // No quotes issue now
        if (owner === 0) {
            playerUnits.push(unit);
        } else {
            aiUnits.push(unit);
        }
    });

    gameState.units = [...playerUnits, ...aiUnits];
    gameState.activeUnits = [...gameState.units];

    // Update board with unit positions
    updateBoard();
}

// Create a unit of the given type at the specified position
function createUnit(unitTypeIndex, x, y, owner, sizeOverride = null) {
    const unitType = gameState.unitTypes[unitTypeIndex];
    const size = sizeOverride ? sizeOverride : unitType.size;
    return {
        ...unitType,
        x,
        y,
        owner,
        currentHp: unitType.hp * (unitType.isSingle ? 1 : size),
        currentModels: unitType.isSingle ? 1 : size,
        size: unitType.isSingle ? 1 : size,
        hasMoved: false,
        hasCast: false,
        hasShot: false,
        hasFought: false,
        id: Math.random().toString(36).substr(2, 9),
        modifiers: {
            hit: { self: 0, against: 0 },
            wound: { self: 0, against: 0 },
            penetration: { self: 0, against: 0 },
            damage: { self: 0, against: 0 },
            attacks: { self: 0, against: 0 },
            save: 0,
            movement: 0
        }
    };
}

// Update the board state with current unit positions
function updateBoard() {
    // Clear the board
    for (let y = 0; y < CONFIG.boardHeight; y++) {
        for (let x = 0; x < CONFIG.boardWidth; x++) {
            gameState.board[y][x] = null;
        }
    }
    
    // Place units on the board
    gameState.units.forEach(unit => {
        gameState.board[unit.y][unit.x] = unit;
    });
    
    // Update the visual representation
    renderBoard();
}

// Render the board visually
function renderBoard() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        // Clear any existing unit display
        const existingUnit = tile.querySelector('.unit');
        if (existingUnit) {
            tile.removeChild(existingUnit);
        }
        
        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        const unit = gameState.board[y][x];
        
        if (unit) {
            const unitElement = document.createElement('div');
            unitElement.className = 'unit';
            unitElement.className = `unit ${unit.owner === 'player' ? 'player' : 'enemy'} ${unit.activated ? 'activated' : ''}`;
            unitElement.style.backgroundImage = `url(units/${unit.img})`;
            unitElement.dataset.unitId = unit.id;
            
            // For multi-model units, show a count
            if (!unit.isSingle) {
                const countElement = document.createElement('div');
                countElement.className = 'unit-count';
                countElement.textContent = unit.currentModels;
                unitElement.appendChild(countElement);
            }

            const healthBar = document.createElement('div');
            healthBar.className = 'unit-health-bar';
            const healthFill = document.createElement('div');
            healthFill.className = 'unit-health-fill';
            const maxHp = unit.hp * (unit.isSingle ? 1 : unit.size);
            healthFill.style.width = `${(unit.currentHp / maxHp) * 100}%`;
            healthBar.appendChild(healthFill);
            unitElement.appendChild(healthBar);
            
            // Add tooltip event listeners
            unitElement.addEventListener('mouseenter', (e) => showTooltip(e, unit));
            unitElement.addEventListener('mouseleave', hideTooltip);
            
            tile.appendChild(unitElement);
        }
    });
}

// Handle tile clicks
function handleTileClick(x, y) {
    const unit = gameState.board[y][x];
    const { selectedUnit } = gameState;

    // Check if we're clicking the currently selected unit (deselection case)
    if (selectedUnit && selectedUnit.x === x && selectedUnit.y === y) {
        gameState.selectedUnit = null;
        clearHighlights();
        updateUI();
        return;
    }

    // If clicking another friendly unit, switch selection
    if (unit && unit.owner === gameState.currentPlayer) {
        if(selectedUnit && gameState.currentPhase === 'magic') {
            tryCastSpell(selectedUnit, x, y);
            return;
        }
        selectUnit(unit);
        return;
    }

    if(!unit && selectedUnit && gameState.currentPhase === 'magic') {
        tryCastSpell(selectedUnit, x, y);
        return;
    }

    // Handle action phases (movement, magic, shooting, combat)
    if (selectedUnit) {
        switch (gameState.currentPhase) {
            case 'movement':
                tryMoveUnit(selectedUnit, x, y);
                break;
            case 'magic':
                tryCastSpell(selectedUnit, x, y);
                break;
            case 'shooting':
                tryShoot(selectedUnit, x, y);
                break;
            case 'combat':
                tryMeleeAttack(selectedUnit, x, y);
                break;
            default:
                // If not in any action phase and click is invalid, deselect
                gameState.selectedUnit = null;
                clearHighlights();
                updateUI();
        }
        return;
    }

    // If no unit was clicked and we have no selection, do nothing
    if (!unit) {
        gameState.selectedUnit = null;
        clearHighlights();
        updateUI();
    }
}

function startNewPhase() {
    gameState.activeUnits = gameState.units
        .filter(unit => unit.owner === gameState.currentPlayer)
        .map(unit => {
            // Check if unit can act in this phase
            const canAct = canUnitActInPhase(unit, gameState.currentPhase);
            
            // For shooting phase, additionally check distance
            if (gameState.currentPhase === 'shooting') {
                unit.activated = !(canAct && hasEnemiesInRange(unit));
            } else {
                unit.activated = !canAct;
            }

            // For combat phase, additionally check adjacency
            if (gameState.currentPhase === 'combat') {
                unit.activated = !(canAct && hasAdjacentEnemies(unit));
            } else {
                unit.activated = !canAct;
            }
            
            return unit;
        });

    // If all units are already activated, proceed to next phase
    if (gameState.activeUnits.every(unit => unit.activated)) {
        endPhase();
    }

    gameState.selectedUnit = null;
    clearHighlights();
    
    updateBoard();
    updateUI();
}

function canAnyUnitCombat() {
    return gameState.units.some(unit => 
        unit.owner === gameState.currentPlayer && 
        unit.meleeWeapons.length > 0 &&
        hasAdjacentEnemies(unit)
    );
}

function hasAdjacentEnemies(unit) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 4-directional adjacency
    return directions.some(([dx, dy]) => {
        const nx = unit.x + dx;
        const ny = unit.y + dy;
        if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight) {
            const target = gameState.board[ny][nx];
            return target && target.owner !== unit.owner;
        }
        return false;
    });
}

function canAnyUnitShoot() {
    return gameState.units.some(unit => 
        unit.owner === gameState.currentPlayer && 
        unit.shootingWeapons.length > 0 &&
        hasEnemiesInRange(unit)
    );
}

function hasEnemiesInRange(unit) {
    // Get all weapons with their max ranges
    const weaponsWithRanges = unit.shootingWeapons.map(weaponName => 
        gameState.weapons.find(w => w.name === weaponName)
    ).filter(Boolean); // filter out undefined if weapon not found
    
    // If no valid weapons, return false
    if (weaponsWithRanges.length === 0) return false;
    
    // Find the maximum range among all weapons
    const maxRange = Math.max(...weaponsWithRanges.map(w => w.distance));
    
    // Check all tiles within max range
    for (let dy = -maxRange; dy <= maxRange; dy++) {
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            // Skip if same tile or out of bounds
            if (dx === 0 && dy === 0) continue;
            
            const nx = unit.x + dx;
            const ny = unit.y + dy;
            
            if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight) {
                const target = gameState.board[ny][nx];
                if (target && target.owner !== unit.owner) {
                    // Calculate actual distance (using Manhattan or Euclidean)
                    const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                    // const distance = Math.sqrt(dx*dx + dy*dy); // Euclidean distance
                    
                    // Check if any weapon can reach this distance
                    if (weaponsWithRanges.some(w => w.distance >= distance + shootDistancer)) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

function canUnitActInPhase(unit, phase) {
    switch (phase) {
        case 'movement': 
            return unit.movement > 0; // Can move if has movement points
        case 'magic': 
            return unit.knownSpells.length > 0 && !unit.hasCast;
        case 'shooting': 
            return unit.shootingWeapons.length > 0 && !unit.hasShot && hasEnemiesInRange(unit);
        case 'combat': 
            return unit.meleeWeapons.length > 0 && !unit.hasFought && hasAdjacentEnemies(unit);
        default: 
            return false;
    }
}

// Select a unit
function selectUnit(unit) {
    gameState.selectedUnit = unit;
    clearHighlights();
    
    // Highlight movement range if in movement phase
    if (gameState.currentPhase === 'movement' && !unit.hasMoved) {
        highlightMovementRange(unit);
    }
    
    // Highlight magic range if in magic phase
    if (gameState.currentPhase === 'magic' && !unit.hasCast && unit.knownSpells.length > 0) {
        highlightMagicRange(unit);
    }
    
    // Highlight shooting range if in shooting phase
    if (gameState.currentPhase === 'shooting' && !unit.hasShot && unit.shootingWeapons.length > 0) {
        highlightShootingRange(unit);
    }
    
    // Highlight melee range if in combat phase
    if (gameState.currentPhase === 'combat' && !unit.hasFought && unit.meleeWeapons.length > 0) {
        highlightMeleeRange(unit);
    }
    
    updateUI();
}

function isObstacle(x, y) {
    return gameState.obstacles.some(obs => obs.x === x && obs.y === y);
}

// Highlight tiles within movement range
function highlightMovementRange(unit) {
    let { x, y, movement } = unit;
    movement = Math.round(movement / 2);
    
    for (let dy = -movement; dy <= movement; dy++) {
        for (let dx = -movement; dx <= movement; dx++) {
            const distance = Math.abs(dx) + Math.abs(dy);
            if (distance > movement) continue;
            
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight && !isObstacle(nx, ny)) {
                highlightTile(nx, ny, 'move');
            }
        }
    }
}

// Highlight tiles within magic range
function highlightMagicRange(unit) {
    const { x, y } = unit;
    const spell = gameState.spells.find(s => s.name === unit.knownSpells[0]);
    if (!spell) return;
    
    const range = spell.distance;
    
    for (let dy = -range; dy <= range; dy++) {
        for (let dx = -range; dx <= range; dx++) {
            // Calculate Euclidean distance (rounded down)
            const distance = Math.abs(dx) + Math.abs(dy);
            if (distance > range) continue;
            
            const nx = x + dx;
            const ny = y + dy;
            
            // Check if tile is within bounds
            if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight) {
                const targetUnit = gameState.board[ny][nx];

                let reverse = 0;
                if (spell.affects === 3) { reverse = 1; }
                
                // Check if target is valid based on spell affects
                if ((spell.affects === 0 && nx === x && ny === y) || // Self
                    (spell.affects === 1 && targetUnit && targetUnit.owner === unit.owner) || // Friendly
                    (spell.affects === 2 && targetUnit && targetUnit.owner !== unit.owner)) { // Enemy
                    highlightTile(nx, ny, reverse ? 'range' : 'magic');
                }
                else { highlightTile(nx, ny, reverse ? 'magic' : 'range'); }
            }
        }
    }
}

function highlightShootingRange(unit) {
    const { x, y } = unit;
    const weapon = gameState.weapons.find(w => w.name === unit.shootingWeapons[0]);
    if (!weapon) return;
    
    const range = weapon.distance - shootDistancer;
    
    // Highlight all tiles within range
    for (let dy = -range; dy <= range; dy++) {
        for (let dx = -range; dx <= range; dx++) {
            const distance = Math.abs(dx) + Math.abs(dy);
            if (distance > range) continue;
            
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight) {
                // Highlight all tiles in range, but use different color for actual targets
                const targetUnit = gameState.board[ny][nx];
                const highlightType = targetUnit && targetUnit.owner !== unit.owner ? 'attack' : 'range';
                highlightTile(nx, ny, highlightType);
            }
        }
    }
}

// Highlight tiles within melee range
function highlightMeleeRange(unit) {
    const { x, y } = unit;
    
    // Check adjacent tiles (4-directional movement)
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    directions.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        
        // Check if tile is within bounds and has an enemy unit
        if (nx >= 0 && nx < CONFIG.boardWidth && ny >= 0 && ny < CONFIG.boardHeight) {
            const targetUnit = gameState.board[ny][nx];
            if (targetUnit && targetUnit.owner !== unit.owner) {
                highlightTile(nx, ny, 'attack');
            }
            else {
                highlightTile(nx, ny, 'range');
            }
        }
    });
}

// Highlight a tile with the given type (move, attack, magic)
function highlightTile(x, y, type) {
    const tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
    if (tile) {
        // Remove any existing highlights of this type
        tile.classList.remove(`highlight-${type}`);
        
        // Add new highlight with custom property
        tile.classList.add(`highlight-${type}`);
        gameState.highlightedTiles.push({ x, y, type });
    }
}

// Clear all highlighted tiles
function clearHighlights() {
    gameState.highlightedTiles.forEach(({ x, y, type }) => {
        const tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
        if (tile) {
            tile.classList.remove(`highlight-${type}`);
        }
    });
    gameState.highlightedTiles = [];
}

function addModifier(unit, stat, type, value) {
    if (stat === 'movement' || stat === 'save') {
        unit.modifiers[stat] += value;
    } else {
        unit.modifiers[stat][type] += value;
    }
}

// Reset all modifiers at turn end
function resetModifiers(unit) {
    unit.modifiers = {
        hit: { self: 0, against: 0 },
        wound: { self: 0, against: 0 },
        damage: { self: 0, against: 0 },
        penetration: { self: 0, against: 0 },
        attacks: { self: 0, against: 0 },
        save: 0,
        movement: 0
    };
}

// Try to move the selected unit to (x, y)
function tryMoveUnit(unit, x, y) {
    // Check if the target tile is highlighted for movement
    const isHighlighted = gameState.highlightedTiles.some(
        tile => tile.x === x && tile.y === y && tile.type === 'move'
    );
    
    if (!isHighlighted) return;
    
    // Check if the tile is unoccupied or occupied by the unit itself
    if (gameState.board[y][x] && gameState.board[y][x] !== unit) return;
    
    // Move the unit
    gameState.board[unit.y][unit.x] = null;
    unit.x = x;
    unit.y = y;
    gameState.board[y][x] = unit;
    
    // Mark unit as moved for this phase
    unit.hasMoved = true;
    
    // Update the board and UI
    clearHighlights();
    gameState.selectedUnit = null;
    unit.activated = true;
    updateBoard();
    updateUI();
    checkPhaseCompletion();
}
function teleportUnit(unit, x, y) {
    // Check if the target tile is highlighted for movement
    const isHighlighted = gameState.highlightedTiles.some(
        tile => tile.x === x && tile.y === y
    ); // && tile.type === 'move'
    
    if (!isHighlighted) return;
    
    // Check if the tile is unoccupied or occupied by the unit itself
    if (gameState.board[y][x] && gameState.board[y][x] !== unit) return;
    
    // Move the unit
    gameState.board[unit.y][unit.x] = null;
    unit.x = x;
    unit.y = y;
    gameState.board[y][x] = unit;
}

// Try to cast a spell with the selected unit at (x, y)
function tryCastSpell(unit, x, y) {
    // Check if the target tile is highlighted for magic
    const isHighlighted = gameState.highlightedTiles.some(
        tile => tile.x === x && tile.y === y && tile.type === 'magic'
    );
    
    if (!isHighlighted) return;
    
    const spell = gameState.spells.find(s => s.name === unit.knownSpells[0]);
    if (!spell) return;
    
    // Roll 2D6 for spell casting
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const total = roll1 + roll2;
    
    const success = total >= spell.neededRoll;
    
    // Display dice results
    const diceResults = document.getElementById('dice-results');
    diceResults.innerHTML = `<p>Casting ${spell.name}: Rolled ${roll1} + ${roll2} = ${total} (needed ${spell.neededRoll}) - ${success ? 'Success!' : 'Failed!'}</p>`;
    
    // Apply spell effect
    const targetUnit = gameState.board[y][x];
    if (targetUnit && success) {
        if(spell.name.includes("Bestial Curse"))
            addModifier(targetUnit, 'hit', 'against', 1);
        if(spell.name.includes("Bestial Heal"))
            healUnit(targetUnit, Math.floor(Math.random() * 3) + 1);
    } else if (success) {
        if(spell.name.includes("Bestial Ambush")) {
            teleportUnit(unit, x, y);
        }
    }
        
    // Mark unit as cast for this phase
    unit.hasCast = true;
    unit.activated = true;
        
    // Update UI
    clearHighlights();
    gameState.selectedUnit = null;
    
    checkPhaseCompletion();
}

// Try to shoot with the selected unit at (x, y)
function tryShoot(unit, x, y) {
    // Check if the target tile is highlighted for attack
    const isHighlighted = gameState.highlightedTiles.some(
        tile => tile.x === x && tile.y === y && tile.type === 'attack'
    );
    
    if (!isHighlighted) return;
    
    const targetUnit = gameState.board[y][x];
    if (!targetUnit || targetUnit.owner === unit.owner) return;
    
    const weapon = gameState.weapons.find(w => w.name === unit.shootingWeapons[0]);
    if (!weapon) return;
    
    // Resolve shooting attack
    resolveAttack(unit, targetUnit, weapon);
    
    // Mark unit as shot for this phase
    unit.hasShot = true;
    unit.activated = true;
    
    // Update UI
    clearHighlights();
    gameState.selectedUnit = null;
    checkPhaseCompletion();
}

// Try to perform a melee attack with the selected unit at (x, y)
function tryMeleeAttack(unit, x, y) {
    // Check if the target tile is highlighted for attack
    const isHighlighted = gameState.highlightedTiles.some(
        tile => tile.x === x && tile.y === y && tile.type === 'attack'
    );
    
    if (!isHighlighted) return;
    
    const targetUnit = gameState.board[y][x];
    if (!targetUnit || targetUnit.owner === unit.owner) return;
    
    const weapon = gameState.weapons.find(w => w.name === unit.meleeWeapons[0]);
    if (!weapon) return;
    
    // Resolve melee attack
    resolveAttack(unit, targetUnit, weapon);
    
    // If target is still alive, it gets to strike back
    if (targetUnit.currentHp > 0 && !targetUnit.hasFoughtBack) {
        const targetWeapon = gameState.weapons.find(w => w.name === targetUnit.meleeWeapons[0]);
        if (targetWeapon) {
            resolveAttack(targetUnit, unit, targetWeapon, true);
            targetUnit.hasFoughtBack = true;
        }
    }
    
    // Mark unit as fought for this phase
    unit.hasFought = true;
    unit.activated = true;
    
    // Update UI
    clearHighlights();
    gameState.selectedUnit = null;
    checkPhaseCompletion();
}

function healUnit(unit, heal) {
    unit.currentHp += heal;
    if(unit.currentHp > unit.size * unit.hp) {
        unit.currentHp = unit.size * unit.hp;
    }
    if (!unit.isSingle) {
        unit.currentModels = Math.ceil(unit.currentHp / unit.hp);
    }
}
function teleportUnit(unit, x, y) {
    unit.x = x;
    unit.y = y;
}

// Resolve an attack between two units
function resolveAttack(attacker, defender, weapon, isCounterAttack = false) {
    // Calculate number of attacks
    let numAttacks = attacker.currentModels * weapon.attacks;
    
    // Apply weapon effects
    let toHitModifier = attacker.modifiers.hit.self + defender.modifiers.hit.against;
    let toWoundModifier = attacker.modifiers.wound.self + defender.modifiers.wound.against;
    let penetrationModifier = attacker.modifiers.penetration.self + defender.modifiers.penetration.against;
    let damageModifier = attacker.modifiers.damage.self + defender.modifiers.damage.against;
    let attackModifier = attacker.modifiers.attacks.self + defender.modifiers.attacks.against;
    let saveModifier = defender.modifiers.save;

    if (defender.unitEffects.includes("Centaur Ward") && isCounterAttack) {
        saveModifier += 2;
    }
    if (defender.unitEffects.includes("Spear Wall") && !isCounterAttack && weapon.distance === 1) {
        saveModifier += 2;
    }

    if (weapon.weaponEffects.includes("penetration_single") && defender.isSingle) {
        penetrationModifier += 1;
    }
    if (weapon.weaponEffects.includes("penetration_infantry") && !defender.isSingle) {
        penetrationModifier += 1;
    }
    if (weapon.weaponEffects.includes("penetration_charge") && !isCounterAttack) {
        penetrationModifier += 1;
    }
    if (weapon.weaponEffects.includes("defiler") && defender.hasFoughtBack) {
        attackModifier += 1;
    }
    if (weapon.weaponEffects.includes("d3_damage")) {
        damageModifier += Math.floor(Math.random() * 3);
    }
    if (weapon.weaponEffects.includes("d6_damage")) {
        damageModifier += Math.floor(Math.random() * 6);
    }
    if (weapon.weaponEffects.includes("charge") && !isCounterAttack) {
        attackModifier += 1;
    }
    if (weapon.weaponEffects.includes("centaur_charge") && !isCounterAttack) {
        damageModifier += 1;
    }
    if (weapon.weaponEffects.includes("defender") && isCounterAttack) {
        penetrationModifier += 1;
    }
    if (weapon.weaponEffects.includes("2d6_attacks")) {
        numAttacks = attacker.currentModels * (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2);
    }
    if (weapon.weaponEffects.includes("3d6_attacks")) {
        numAttacks = attacker.currentModels * (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3);
    }
    if (weapon.weaponEffects.includes("enemy_attacks")) {
        numAttacks = defender.currentModels;
    }
    if (weapon.weaponEffects.includes("damage_attacks")) {
        numAttacks = Math.max(numAttacks, (attacker.currentModels * attacker.hp - attacker.currentHp));
    }
    
    if (defender.unitEffects.includes("Spectral Aura")) {
        penetrationModifier = -1 * weapon.penetration;
    }
    if (defender.unitEffects.includes("Bestial Elites") && weapon.distance > 1) {
        toWoundModifier -= 1;
    }
    
    // Roll to hit
    let hits = 0;
    let diceResults = [];
    // Roll to wound
    let wounds = 0;
    let woundResults = [];
    // Roll saves
    let failedSaves = 0;
    let saveResults = [];
    let counter = 0;

    const hitNeeded = Math.max(2, weapon.toHit - toHitModifier);
    const woundNeeded = Math.max(2, weapon.toWound - toWoundModifier);

    numAttacks += attackModifier * attacker.currentModels;
    if(numAttacks < attacker.currentModels)
        numAttacks = attacker.currentModels; // minimum 1 attack
    
    for (let i = 0; i < numAttacks; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResults.push(roll);
        
        if (roll >= hitNeeded) {
            hits++;
            // Critical hit - extra hit on 6
            if (weapon.weaponEffects.includes("critical") && roll === 6) {
                hits++;
            }
            // Lethal hit - autowound on 6
            if (weapon.weaponEffects.includes("lethal") && roll === 6) {
                hits--;
                wounds++;
            }
            // Impaling hit - autowound on 6, no saves
            if (weapon.weaponEffects.includes("impale") && roll === 6) {
                hits--;
                failedSaves++;
            }
            // Reaver hit - extra wound on 5 against infantry
            if (weapon.weaponEffects.includes("reaver") && defender.currentModels > 4 && roll === 5) {
                hits--;
                wounds++;
            }

            // Counter-attack on 1, no saves
            if (defender.unitEffects.includes("Bestial Counter") && roll === 1 && weapon.distance === 1) {
                counter++;
            }
        }
    }
    
    for (let i = 0; i < hits; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        woundResults.push(roll);
        
        if (roll >= woundNeeded) {
            wounds++;
            // Titanic strike - extra wound on 6
            if (weapon.weaponEffects.includes("titanic") && roll === 6) {
                wounds++;
            }
        }
    }
    
    const effectivePenetration = weapon.penetration + penetrationModifier;
    const saveNeeded = Math.max(2, defender.save - saveModifier + effectivePenetration); // Save can't be less than 2
    
    for (let i = 0; i < wounds; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        saveResults.push(roll);
        
        if (roll < saveNeeded) {
            failedSaves++;
        }
    }
    
    // Apply damage
    const totalDamage = failedSaves * Math.max(1, weapon.damage + damageModifier);
    defender.currentHp -= totalDamage;
    
    // Update model count for multi-model units
    if (!defender.isSingle) {
        let newModels = Math.ceil(defender.currentHp / defender.hp);
        defender.currentModels = newModels;
    }
    
    // Check if defender is dead
    if (defender.currentHp <= 0) {
        removeUnit(defender);
    }

    if (counter > 0) { // counter-attack
        attacker.currentHp -= counter; // counter-attacks

        if (!attacker.isSingle) {
            newModels = Math.ceil(attacker.currentHp / attacker.hp);
            attacker.currentModels = newModels;
        }

        if (attacker.currentHp <= 0) {
            removeUnit(attacker);
        }
    }
    
    // Display attack results
    const diceResultsElement = document.getElementById('dice-results');
    const attackType = isCounterAttack ? "Counter Attack" : "Attack";
    if(!isCounterAttack) {diceResultsElement.innerHTML = '';}
    diceResultsElement.innerHTML += `
        <p>${attackType}: <span class="text-${attacker.owner}">${attacker.name}</span> vs <span class="text-${defender.owner}">${defender.name}</span> with ${weapon.name} (${diceResults.length})</p>
        <p>To Hit: ${diceResults.join(', ')} (needed ${hitNeeded}) - ${hits} hits</p>
        <p>To Wound: ${woundResults.join(', ')} (needed ${woundNeeded}) - ${wounds} wounds</p>
        <p>Saves: ${saveResults.join(', ')} (needed ${saveNeeded}) - ${failedSaves} failed</p>
        <p>Damage dealt: ${totalDamage}</p>
        ${defender.currentHp <= 0 ? `<p>${defender.name} has been defeated!</p>` : ''}
    `;
    
    // Apply any unit effects
    applyUnitEffects(attacker, defender, weapon);
}

function checkPhaseCompletion() {
    updateUI(); updateBoard();
    const allActivated = gameState.activeUnits.every(unit => 
        unit.activated || !canUnitActInPhase(unit, gameState.currentPhase)
        || unit.owner !== gameState.currentPlayer
    );
    
    if (allActivated) {
        endPhase();
    }
}

// Apply unit effects after an attack
function applyUnitEffects(attacker, defender, weapon) {
    // Check for Bestial Aura
    if (attacker.unitEffects.includes("Bestial Aura") && weapon.distance === 1) {
        addModifier(defender, 'hit', 'against', 1);
        addModifier(defender, 'wound', 'against', 1);
    }
    if (attacker.unitEffects.includes("Centaur Heal") && weapon.distance === 1) {
        healUnit(attacker, Math.floor(Math.random() * 3) + 1);
    }
    if (attacker.unitEffects.includes("Gnoll Heal") && weapon.distance === 1) {
        healUnit(attacker, Math.floor(Math.random() * 6) + 1);
    }
    
    if (attacker.unitEffects.includes("Bestial Archers") && weapon.distance > 1) {
        addModifier(defender, 'hit', 'self', -1);
    }
    if (attacker.unitEffects.includes("Bestial Mark") && weapon.distance > 1) {
        addModifier(defender, 'hit', 'against', 1);
    }
    if (attacker.unitEffects.includes("Bestial Strike") && weapon.distance === 1) {
        addModifier(defender, 'penetration', 'against', 1);
    }
    if (attacker.unitEffects.includes("Overseer Mark") && weapon.distance === 1) {
        addModifier(defender, 'hit', 'against', 1);
    }
    if (attacker.unitEffects.includes("Necromancer Mark") && weapon.distance === 1) {
        addModifier(defender, 'hit', 'self', -1);
    }
    if (attacker.unitEffects.includes("Executioner Mark") && weapon.distance === 1) {
        addModifier(defender, 'attacks', 'self', -1);
    }
    if (attacker.unitEffects.includes("Blood Mark") && weapon.distance === 1) {
        addModifier(defender, 'attacks', 'against', 1);
    }
    if (attacker.unitEffects.includes("Catapult Mark") && weapon.distance > 1) {
        addModifier(defender, 'hit', 'self', -1);
    }
    if (attacker.unitEffects.includes("Lantern Mark") && weapon.distance === 1) {
        addModifier(defender, 'wound', 'against', 1);
    }
    if (attacker.unitEffects.includes("Balrog Mark")) {
        addModifier(defender, 'penetration', 'self', -1);
    }

}

// Remove a unit from the game
function removeUnit(unit) {
    gameState.units = gameState.units.filter(u => u.id !== unit.id);
    gameState.activeUnits = gameState.activeUnits.filter(u => u.id !== unit.id);
    gameState.board[unit.y][unit.x] = null;
}

function endPhase() {
    switch (gameState.currentPhase) {
        case 'movement':
            gameState.currentPhase = 'magic';
            break;
        case 'magic':
            gameState.currentPhase = 'shooting';
            // Check if any units can engage in shooting before proceeding
            if (!canAnyUnitShoot()) {
                endPhase();
            }
            break;
        case 'shooting':
            // Check if any units can engage in combat before proceeding
            if (canAnyUnitCombat()) {
                gameState.currentPhase = 'combat';
            } else {
                // Skip combat phase if no possible engagements
                endTurn();
                return;
            }
            break;
        case 'combat':
            endTurn();
            return;
    }

    // Initialize the new phase with smart activation
    startNewPhase();
}


// End the current player's turn
function endTurn() {
    // Switch player
    gameState.currentPlayer = gameState.currentPlayer === 'player' ? 'ai' : 'player';
    gameState.currentPhase = 'movement';
    
    // Reset all unit actions for the new turn
    gameState.units.forEach(unit => {
        unit.hasMoved = false;
        unit.hasCast = false;
        unit.hasShot = false;
        unit.hasFought = false;
        unit.hasFoughtBack = false;
        unit.activated = false;
        resetModifiers(unit);
    });
    
    // Set active units for the current player
    gameState.activeUnits = gameState.units.filter(unit => unit.owner === gameState.currentPlayer);
    
    // Clear selection and highlights
    gameState.selectedUnit = null;
    clearHighlights();

    if (gameState.currentPlayer === 'player') {
        gameState.turnNumber++;
    }
    
    updateUI(); updateBoard();
    
    // If it's the AI's turn, start AI behavior
    if (gameState.currentPlayer === 'ai') {
        startAITurn();
    }
}

// Start the AI's turn
function startAITurn() {

    //endTurn();
    /*gameState.units.forEach(unit => {
        unit.owner = (unit.owner === "player") ? "ai" : "player";
    });*/
    startNewPhase();

}

// Update the UI based on current game state
function updateUI() {
    // Update current phase display
    document.getElementById('current-phase').textContent = `Current Phase: ${capitalizeFirstLetter(gameState.currentPhase)}`;
    document.getElementById('current-turn').textContent = `Current Turn: ${gameState.turnNumber}`;

    // Update unit info if a unit is selected
    const unitInfo = document.getElementById('unit-info');
    if (gameState.selectedUnit) {
        const unit = gameState.selectedUnit;
        unitInfo.innerHTML = `
            <h3>${unit.name}</h3>
            <p>Owner: ${capitalizeFirstLetter(unit.owner)}</p>
            <p>Position: (${unit.x}, ${unit.y})</p>
            <p>Movement: ${Math.round(unit.movement/2)}</p>
            <p>HP: ${unit.currentHp}/${unit.hp * (unit.isSingle ? 1 : unit.size)}</p>
            <p>Models: ${unit.currentModels}/${unit.isSingle ? 1 : unit.size}</p>
            <p>Save: ${unit.save}+</p>
            ${unit.knownSpells.length > 0 ? `<p>Spells: ${unit.knownSpells.join(', ')}</p>` : ''}
            ${unit.shootingWeapons.length > 0 ? `<p>Ranged Weapons: ${unit.shootingWeapons.join(', ')}</p>` : ''}
            ${unit.meleeWeapons.length > 0 ? `<p>Melee Weapons: ${unit.meleeWeapons.join(', ')}</p>` : ''}
            ${unit.unitEffects.length > 0 ? `<p>Effects: ${unit.unitEffects.join(', ')}</p>` : ''}
        `;
    } else {
        unitInfo.innerHTML = `<h3>Unit Info</h3><p>Select a unit to view details</p>`;
    }

    let player_points = 0;
    let ai_points = 0;

    gameState.units.forEach(unit => {
        if (unit.owner === "player") {
            player_points += unit.cost * unit.currentModels;
        } else if (unit.owner === "ai") {
            ai_points += unit.cost * unit.currentModels;
        }
    });

    document.getElementById('player_points').innerHTML = player_points;
    document.getElementById('ai_points').innerHTML = ai_points;
    
    // Update end phase button state
    /* const endPhaseBtn = document.getElementById('end-phase-btn');
    endPhaseBtn.disabled = gameState.currentPlayer === 'ai';
    
    const endTurnBtn = document.getElementById('end-turn-btn');
    endTurnBtn.disabled = gameState.currentPlayer === 'ai'; */
}

function showTooltip(event, unit) {
    document.querySelectorAll(".player").forEach(el => el.classList.add("highlight-player"));
    document.querySelectorAll(".enemy").forEach(el => el.classList.add("highlight-enemy"));
    const tooltip = document.getElementById('tooltip');
    const weapon = unit.meleeWeapons.length > 0 ? 
        gameState.weapons.find(w => w.name === unit.meleeWeapons[0]) : null;
    const rangedWeapon = unit.shootingWeapons.length > 0 ? 
        gameState.weapons.find(w => w.name === unit.shootingWeapons[0]) : null;
    const spell = unit.knownSpells.length > 0 ? 
        gameState.spells.find(s => s.name === unit.knownSpells[0]) : null;
    
    let html = `<strong>${unit.name}</strong><br>`;
    html += `HP: ${unit.currentHp}/${unit.hp * (unit.isSingle ? 1 : unit.size)}<br>`;
    html += `Models: ${unit.currentModels}/${unit.isSingle ? 1 : unit.size}<br>`;
    html += `Move: ${Math.round(unit.movement/2)}<br>`;
    html += `Save: ${unit.save}+<br>`;

    if (weapon) {
        html += `<br><strong>Melee:</strong> ${weapon.name}<br>`;
        html += `Attacks: ${weapon.attacks * unit.currentModels}<br>`;
        html += `To Hit: ${weapon.toHit}+<br>`;
        html += `To Wound: ${weapon.toWound}+<br>`;
        html += `Effects: ${weapon.weaponEffects.join(", ")}<br>`;
        html += `Damage: ${weapon.damage}`;
        html += weapon.penetration > 0 ? ` (${weapon.penetration} AP)<br>` : '<br>';
    }
    
    if (rangedWeapon) {
        html += `<br><strong>Ranged:</strong> ${rangedWeapon.name}<br>`;
        html += `Range: ${rangedWeapon.distance - shootDistancer}<br>`;
        html += `Attacks: ${rangedWeapon.attacks * unit.currentModels}<br>`;
        html += `Hit/Wound: ${rangedWeapon.toHit}+ ${rangedWeapon.toWound}+<br>`;
        //html += `To Wound: ${rangedWeapon.toWound}+<br>`;
        html += `Effects: ${rangedWeapon.weaponEffects.join(", ")}<br>`;
        html += `Damage: ${rangedWeapon.damage}`;
        html += rangedWeapon.penetration > 0 ? ` (${rangedWeapon.penetration} AP)<br>` : '<br>';
    }
    
    if (spell) {
        html += `<br><strong>Spell:</strong> ${spell.name}<br>`;
        html += `Range: ${spell.distance}<br>`;
        html += `Roll Needed: ${spell.neededRoll}+<br>`;
        html += `Effect: ${spell.effect}<br>`;
    }
    html += unit.unitEffects.length > 0 ? `<br><strong>Effects:</strong> ${unit.unitEffects.join(', ')}<br>` : '';
    
    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX}px`;
    tooltip.style.top = `${event.pageY+200}px`;
}

function hideTooltip() {
    document.querySelectorAll(".player").forEach(el => el.classList.remove("highlight-player"));
    document.querySelectorAll(".enemy").forEach(el => el.classList.remove("highlight-enemy"));
    document.getElementById('tooltip').style.display = 'none';
}

// Update tooltip position on mouse move
document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.left = `${e.pageX+20}px`;
        tooltip.style.top = `${e.pageY+100}px`;
    }
});

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the game when the page loads
window.onload = initGame;
