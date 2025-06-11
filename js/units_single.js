const urukUnits = `
Uruk Warlord,orcwarlord.png,1,90,6,5,5,5,6,3,3,5,3,1,1,,[Blades],,,
Uruk Mauhur,orcruler.png,1,60,8,5,5,5,5,3,2,4,2,1,1,,[Blades],,,
Uruk Captain,orcleader.png,1,65,6,5,4,5,7,2,2,4,2,1,1,,[Blades],[Shield],,
Uruk Scout,orcgrunt.png,0,10,8,4,4,4,5,1,1,3,0,0,0,,[Blades],[Shield],,
Uruk Raider,skbanebow.png,0,10,8,4,4,4,4,1,1,3,0,0,0,[Uruk Bow],[Blades],,,
Uruk Warrior,orcwarrior.png,0,10,6,4,4,4,6,1,1,3,0,0,0,,[Blades],[Shield],,
Uruk Pike,skdraug.png,0,10,6,4,4,4,5,1,1,3,0,0,0,,[Pike],,,
Uruk Crossbow,orccross.png,0,11,6,4,4,4,5,1,1,3,0,0,0,[Uruk Crossbow],[Blades],,,
Uruk Berserker,skknight.png,0,15,6,4,4,4,5,2,1,7,0,0,0,,[Two-Handed],,,[Invincible;Arrowbane]
Uruk Monstrosity,hulk.png,1,110,6,7,3,7,8,3,3,4,0,0,0,[Trollchain],[Blades],[Shield],,[Fear]
Uruk Ballista,orcbarge.png,1,65,6,4,4,4,5,1,3,4,1,1,1,[Ballista],[Blades],,,
`;

const orcUnits = `
Orc Warlord,ogre1.png,1,135,6,5,3,4,7,3,3,5,3,3,2,,[Blades],[Shield],,
Goblin King,ogre2.png,1,70,5,4,3,4,6,2,2,4,3,2,2,,[Blades],,,
Orc Warrior,orcimpaler.png,0,6,6,3,3,3,5,1,1,2,0,0,0,,[Blades],[Shield],,
Orc Archer,orcarcher.png,0,6,6,3,3,3,4,1,1,2,0,0,0,[Orc Bow],[Blades],,,
Orc Piercer,orcrouser.png,0,6,6,3,3,3,4,1,1,2,0,0,0,,[Spear],,,
Orc Smasher,ogre.png,0,6,6,3,3,3,4,1,1,2,0,0,0,,[Two-Handed],,,
Goblin Warrior,orcimpaler.png,0,5,5,1,3,3,5,1,1,2,0,0,0,,[Blades],[Shield],,
Goblin Spearhead,orcrouser.png,0,5,5,1,3,3,4,1,1,2,0,0,0,,[Spear],,,
Bandit Chief,banditelite.png,1,55,6,4,4,5,5,2,2,4,2,2,1,,[Two-Handed],,,
Bandit Grunt,bandit.png,0,5,6,3,4,3,4,1,1,3,0,0,0,,[Blades],,,
Bandit Wild,banditlord.png,0,6,6,3,4,3,4,1,1,3,0,0,0,,[Two-Handed],,,
Easterling Warrior,htrooper.png,0,8,6,3,4,3,6,1,1,3,0,0,0,,[Blades],[Shield],,
Troll,ghoul2.png,1,80,6,6,3,6,6,3,3,3,0,0,0,[Trollchain],[Blades],,,[Fear]
`;

const rohUnits = `
Rohirr Lord,elvoutrider.png,1,100,10,5,4,4,7,3,2,5,3,3,1,[Javelin],[Blades],[Shield],,[Rohan_Charge]
Rohirr Rider,elvscout.png,0,14,10,3,4,3,5,1,1,3,0,0,0,,[Blades],[Shield],,[Rohan_Charge]
Rohirr Warrior,hjavelin.png,0,9,6,3,4,3,5,1,1,3,0,0,0,[Javelin],[Spear],[Shield],,[Rohan_Charge]
Rohirr Archer,elvmarksman.png,0,7,6,3,4,3,4,1,1,3,0,0,0,[Bow],[Blades],,,[Rohan_Charge]
Rohirr Royal Guard,hpaladin.png,0,17,10,4,4,3,6,1,1,3,0,0,0,[Javelin],[Spear],[Shield],,[Rohan_Charge]
Rohirr Scout,hbowman.png,0,8,6,4,5,3,4,1,1,3,0,0,0,[Bow],[Blades],,,[Rohan_Charge]
Rohirr Hama,elvlord.png,1,60,6,4,4,4,7,2,2,4,3,1,1,,[Blades],[Shield],,[Rohan_Charge]
Minas Lord,hroyal.png,1,70,6,5,4,4,7,2,2,5,2,1,1,,[Blades],[Shield],,
Minas Warrior,hsword.png,0,8,6,3,4,3,6,1,1,3,0,0,0,,[Blades],[Shield],,
Minas Archer,hlongbow.png,0,8,6,3,4,3,5,1,1,3,0,0,0,[Bow],[Blades],,,
Minas Guard,hhalberd.png,0,11,6,4,4,3,7,1,1,3,0,0,0,,[Spear],[Shield],,
Tree Lord,treelord.png,1,190,6,8,4,8,8,3,3,7,3,6,3,[Stone Hurler],[Blades],,,[Fear]
Tree Warrior,tree.png,1,120,6,7,4,8,8,3,3,6,0,0,0,[Stone Hurler],[Blades],,,[Fear]
`;

const heroUnits = `
Frido Baggons,hfencer.png,1,80,4,3,5,3,6,1,2,6,2,3,3,[Stone Throw],[Blades],,,[Magic_Resist]
Samsagace,hjavelin.png,1,40,4,3,5,2,3,1,2,6,2,2,2,[Stone Throw],[Blades],,,[Magic_Resist]
Arogorn,elvchampion.png,1,210,6,6,5,4,6,3,3,6,3,3,3,[Bow],[Blades],,,[Legendary_Power;Legendary_Sword]
Borimor,hmarshal.png,1,100,6,6,4,4,6,3,3,6,3,1,0,,[Blades],[Shield],,[Horn]
Legalas,elvarcher.png,1,100,6,6,6,4,5,2,2,6,3,2,3,[Elven Bow],[Blades],,,[Sharpshooter]
Gilmi,dwarf.png,1,100,5,6,4,4,8,2,2,6,3,2,2,[Throwing Axes],[Two-Handed],,,[Sharpshooter]
Gondolf,hnecromancer.png,1,170,6,5,4,5,5,2,3,7,3,6,7,,[Blades],,,[Legendary_Will;Ring_Master]
Faromir,hgeneral.png,1,95,6,5,5,4,7,2,2,6,3,3,2,[Bow],[Blades],[Shield],,[Horn]
Olrond,elvhero.png,1,180,6,5,5,4,6,3,3,7,4,3,4,[Bow],[Two-Handed],,,[Fear]
Eomer,elvoutrider.png,1,120,10,5,4,4,7,3,3,5,3,3,3,[Javelin],[Blades],,,[Rohan_Charge]
`;

const unitTypesCSV = `
name,img,isSingle,cost,movement,skill,shooting,strength,defense,attacks,hp,morale,power,will,destiny,shootingWeapons,meleeWeapons,equipment,knownSpells,unitEffects
${urukUnits.trim()}
${orcUnits.trim()}
${rohUnits.trim()}
${heroUnits.trim()}
`;

const weaponTypesCSV = `
name,distance,damage,move
Uruk Crossbow,24,4,2
Uruk Bow,18,3,1
Elven Bow,24,3,1
Bow,24,2,1
Javelin,8,3,0
Stone Throw,8,1,0
Throwing Axes,6,3,0
Trollchain,12,8,1
Ballista,48,9,2
Stone Hurler,18,10,1
`;

function parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, index) => {
            let value = values[index].trim();

            // Convert bracketed values into arrays
            if (value.startsWith("[") && value.endsWith("]")) {
                value = value.slice(1, -1).split(";").map(v => v.trim());
            } else if (value === "") {
                value = []; // Convert empty fields into empty arrays
            } else if (!isNaN(value)) {
                value = Number(value); // Convert numeric values
            } else if (value.toLowerCase() === "true") {
                value = true; // Convert "true" to boolean
            } else if (value.toLowerCase() === "false") {
                value = false; // Convert "false" to boolean
            }

            obj[header] = value;
            return obj;
        }, {});
    });
}

function parseObstacles() {
    const csvText = document.getElementById("obst_csv").innerText.trim();
    return csvText.split(" ").map(pair => {
        const [x, y] = pair.split(",").map(Number);
        return { x, y };
    });
}