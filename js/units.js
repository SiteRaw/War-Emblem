const beastUnits = `
Bestial Warlord,hmarshal.png,true,1,170,6,6,4,,,[Bestial Blades],[Bestial Aura]
Bestial Raiders,hranger.png,false,10,9,6,1,6,,[Bestial Bow],[Bestial Knives],[Bestial Archers]
Bestial Warriors,htrooper.png,false,10,10,6,1,5,,,[Bestial Swords],[Bestial Strike]
Bestial Elites,hmauler.png,false,5,22,6,2,4,,,[Bestial Halberd],[Bestial Elites]
Bestial Marauders,hhalberd.png,false,10,9,6,1,5,,,[Bestial Spears],[Spear Wall]
Centaurs,hlancer.png,false,5,34,10,2,5,,[Centaur Axe],[Centaur Spear],[Centaur Ward]
Centaur Lord,hcavalier.png,true,1,70,10,4,5,,,[Centaur Greataxe],[Centaur Heal]
Minotaurs,wardenforcer.png,false,3,55,6,4,5,,,[Bestial Axes],
Minotaur Lord,wardenlord.png,true,1,170,6,8,5,,,[Bestial Greataxe],[Bestial Counter]
Dragon Lord,dragonwar.png,true,1,220,8,10,4,,[Dragon Bolt],[Dragon Greataxe],[Centaur Heal]
Dragon Beasts,dragoninf.png,false,3,67,8,5,4,,,[Dragon Axes],[Spear Wall]
Bestial Chariot,hdragoon.png,true,1,110,10,7,4,,,[Bestial Lances],
Bestial Vanquishers,hlongbow.png,false,10,8,8,1,6,,[Bestial Shortbow],[Bestial Knives],
Bestial Lieutenant,hgeneral.png,true,1,170,6,6,5,,[Bestial Crossbow],[Bestial Glaive],[Bestial Mark]
`;

const spectralUnits = `
Spectral Dark Lord,wrspecter.png,true,1,190,8,7,4,,,[Spectral Greatblade],[Spectral Aura]
Spectral Executioner,wraith.png,true,1,170,8,5,4,,,[Spectral Axe],[Spectral Aura;Executioner Mark]
Spectral Overseer,wraith.png,true,1,120,8,5,4,,,[Overseer Blade],[Spectral Aura;Centaur Heal;Overseer Mark]
Spectral Guardian,wraith.png,true,1,150,8,5,4,,,[Spectral Lantern],[Spectral Aura;Lantern Mark]
Spectral Wraith,wraith.png,true,1,130,8,5,4,,,[Spectral Greatscythe],[Spectral Aura;Blood Mark]
Spectral Bloodmonarch,wrspecter.png,true,1,310,8,7,4,,[Spectral Curse],[Spectral Glaive],[Spectral Aura;Executioner Mark]
Spectral Revenants,wrghost.png,false,10,18,8,1,4,,,[Spectral Blades],[Spectral Aura]
Spectral Reavers,wrshadow.png,false,10,15,8,1,4,,,[Spectral Scythe],[Spectral Aura]
Spectral Haunters,wrshadow.png,false,4,30,8,2,4,,,[Spectral Daggers],[Spectral Aura]
Spectral Spirits,wrshadow.png,false,4,20,8,1,4,,,[Spectral Lance],[Spectral Aura]
Spectral Crossbow,wrghost.png,false,5,20,8,1,4,,[Spectral Bolt],[Spectral Knives],[Spectral Aura]
Spectral Sinisters,wrghost.png,false,2,50,8,3,4,,[Spectral Torments],[Spectral Flails],[Spectral Aura;Overseer Mark]
`;

const undeadUnits = `
Skeletal Lord,skancient.png,true,1,100,6,5,5,,,[Skeletal Blade],[Overseer Mark]
Wight Lord,skknight.png,true,1,100,4,5,3,,,[Tomb Blade],
Vampire Lord,sklich.png,true,1,140,6,5,3,,,[Vampire Blade],
Zombies,zombie.png,false,20,7,4,1,6,,,[Zombie Claws],[Centaur Heal]
Skeletons,skeleton.png,false,10,10,4,1,5,,,[Skeletal Swords],[Centaur Heal]
Skeletal Elites,skwarrior.png,false,10,16,4,1,4,,,[Skeletal Greatsword],
Skeletal Guards,skdraug.png,false,3,67,5,4,3,,,[Skeletal Halberds],
Skeletal Wereblades,skblade.png,false,3,40,12,4,5,,,[Werewolf Claws],
Skeletal Knights,skrider.png,false,5,46,12,3,3,,,[Skeletal Lance],
Undead Skullbows,skbanebow.png,false,3,50,12,4,5,,[Skeletal Greatbows],[Skeletal Knives],
Skeletal Dragon,skdragon.png,true,1,240,12,14,5,,[Skeletal Breath],[Skeletal Maw],
Lich Lord,sklich.png,true,1,880,10,18,3,,[Lich Gaze],[Dual Lichswords],[Centaur Heal]
`;

const ogreUnits = `
Ogre Warlord,ogre2.png,true,1,160,6,8,4,,[Ogre Crossbow],[Ogre Glaive],
Ogre Defiler,ogre2.png,true,1,140,8,6,5,,,[Ogre Greatblade],[Centaur Heal]
Ogre Warriors,ogre1.png,false,6,40,6,4,5,,,[Ogre Swords],
Ogre Elites,ogre.png,false,4,60,6,4,5,,,[Ogre Blade],
Ogre Raiders,ogre1.png,false,4,38,6,4,5,,[Ogre Cannons],[Ogre Clubs],
Ogre Wildriders,beastrider.png,false,2,90,9,6,4,,[Ogre Javelin],[Ogre Lance],[Bestial Elites]
Ogre Cannon,orcbarge.png,true,1,200,9,9,4,,[Cannon Blast],[Cannon Charge],
Ogre Catapult,orcbarge.png,true,1,160,9,9,4,,[Catapult Blast],[Cannon Charge],[Catapult Mark]
`;

const daemonUnits = `
Daemon Warlord,orcwarlord.png,true,1,130,5,6,3,,,[Daemon Axe],[Blood Mark]
Daemon Summoner,orcleader.png,true,1,120,5,5,5,,,[Daemon Dagger],[Bestial Aura]
Daemon Torturer,orcruler.png,true,1,100,5,5,4,,,[Daemon Whip],
Daemon Devourer,orccross.png,true,1,130,8,8,5,,[Daemon Flames],[Daemon Maw],[Centaur Heal]
Daemon Fleshruler,orcruler.png,true,1,130,8,8,5,,,[Daemon Skewer],
Daemon Reapers,orcwarrior.png,false,5,46,5,3,4,,,[Daemon Zweihander],
Daemon Wraiths,orcgrunt.png,false,5,26,5,3,5,,,[Daemon Flails],[Bestial Counter;Blood Mark]
Daemon Warrior,orcimpaler.png,false,10,22,5,2,3,,,[Daemon Swords],[Bestial Counter]
Daemon Marauders,orcrouser.png,false,10,10,5,1,6,,,[Daemon Blades],
Daemon Fiends,orcwarrior.png,false,10,20,5,2,5,,,[Daemon Claws],[Centaur Heal]
Daemon Titan,firedragon.png,true,1,470,8,16,4,,[Daemon Evil],[Daemon Atrocity],[Bestial Counter]
`;

const gnollUnits = `
Gnoll Warlord,beastlord.png,true,1,180,6,6,4,,[Gnoll Hook],[Gnoll Warblade],[Lantern Mark]
Gnoll Overseer,beastwarlord.png,true,1,80,6,5,4,,,[Gnoll Greatblade],[Bestial Strike]
Gnoll Shadowlord,beastarcherlord.png,true,1,120,7,5,5,,[Gnoll Crossbow],[Gnoll Ghostglaive],[Spear Wall]
Gnoll Raiders,beastraider.png,false,20,8,6,1,5,,,[Gnoll Club],[Centaur Heal]
Gnoll Elites,beastaxe.png,false,10,12,6,1,4,,,[Gnoll Spear],
Gnoll Shadows,beastarcher.png,false,10,13,7,5,5,,[Gnoll Ghostbow],[Gnoll Ghostblades],[Bestial Elites]
Gnoll Mutilators,beastking.png,false,5,20,5,2,3,,,[Gnoll Waraxes],
Gnoll Darkspawn,beastelite.png,false,5,56,5,3,3,,,[Gnoll Scythes],
Gnoll Cannon,beastrider.png,false,3,57,6,3,6,,[Gnoll Cannon],[Gnoll Club],
Gnoll Catapult,beastriderlord.png,true,1,120,4,8,4,,[Gnoll Catapult],[Gnoll Club],[Catapult Mark]
Gnoll Monstrosity,ghoul.png,true,1,130,9,7,4,,[Gnoll Javelin],[Gnoll Halberd],
Gnoll Fellbeast,ghoul1.png,true,1,220,8,14,5,,[Gnoll Fellgaze],[Gnoll Fellteeth],[Gnoll Heal]
Gnoll Abomination,ghoul2.png,true,1,260,6,12,4,,[Gnoll Horror],[Gnoll Corpseeater],[Gnoll Heal;Necromancer Mark]
`;

const aelfUnits = `
Aelf Lord,elvlord.png,true,1,110,6,5,5,,[Aelf Swarm],[Aelf Scythe],[Bestial Strike]
Fae Archers,elvmarksman.png,false,5,24,12,2,5,,[Fae Bow],[Fae Talons],
Aelf Lancers,elvoutrider.png,false,3,70,12,5,4,,,[Aelf Lance],[Centaur Heal]
Aelf Archers,elvarcher.png,false,10,13,7,1,5,,[Aelf Bow],[Aelf Knives],
Aelf Wardens,elvchampion.png,false,10,15,6,1,4,,,[Aelf Blades],[Spear Wall]
Great Ent,treelord.png,true,1,330,5,14,3,,[Ent Blast],[Ent Sword],[Blood Mark]
Ent Marksman,tree.png,false,3,67,5,5,4,,[Ent Greatbow],[Ent Claws],
Aelf Prince,elvhero.png,true,1,680,14,16,3,,[Aelf Thorns],[Aelf Glaive],[Gnoll Heal;Centaur Heal;Bestial Strike]
`;

const orcUnits = `
Orc Warlord,orcruler.png,true,1,190,4,8,3,,,[Orc Meatcleaver],[Blood Mark]
Orc Punisher,orcwarlord.png,true,1,80,5,5,6,,,[Orc Manslicer],[Lantern Mark]
Orc Raiders,orcrouser.png,false,10,18,4,2,3,,,[Orc Meatblades],
Orc Slicers,orcgrunt.png,false,5,40,4,3,3,,,[Orc Meathooks],
Orc Rippers,orcleader.png,false,3,40,4,3,5,,,[Orc Meatpikes],
Orc Cleavers,orcwarrior.png,false,3,34,4,3,5,,,[Orc Meatchains],
Orc Wildriders,wolfpillager.png,false,5,30,10,3,5,,,[Orc Meatlance],
Monster Warlord,hulk.png,true,1,580,10,18,4,,,[Monster Warblade],
`;

const banditUnits = `
Bandit Leader,banditlord.png,true,1,100,5,6,3,,,[Bandit Deathblade],[Lantern Mark]
Bandit Lieutenant,banditlord.png,true,1,80,5,5,5,,,[Bandit Greatblade],[Blood Mark]
Bandit Raiders,bandit.png,false,10,8,5,1,5,,,[Bandit Blades],
Bandit Outlaws,banditoutlaw.png,false,5,26,6,2,4,,,[Bandit Waraxes],
Bandit Elites,banditelite.png,false,3,40,6,3,5,,,[Bandit Greataxes],
`;

const drownedUnits = `
Drowned Lord,whoplitelord.png,true,1,140,4,7,3,,,[Drowned Hammer],[Bestial Strike]
Drowned Knights,whoplite.png,false,5,38,4,3,2,,,[Drowned Swords],
Drowned Paladins,whoplitespear.png,false,2,110,8,8,4,,,[Drowned Lance],
Drowned Horror,water.png,true,1,510,6,24,4,,[Drowned Gaze],[Drowned Tentacle],
`;

const wyvernUnits = `
Gargoyle Warlord,grlord.png,true,1,200,12,10,5,,,[Gargoyle Talons],[Centaur Heal;Blood Mark]
Gargoyle Raiders,grburner.png,false,5,38,12,4,5,,,[Gargoyle Halberds],
Sky Vanguards,gryphonlord.png,false,5,28,12,3,5,,,[Sky Claws],
Sky Reapers,gryphon.png,false,5,18,12,2,5,,,[Sky Sickles],
Dragon Cultists,grharrier.png,false,10,10,6,1,6,,,[Cultist Blades],
Air Elementals,wrspirit.png,false,3,50,5,3,3,,,[Elemental Pierce],
Elder Dragonlord,firedragon.png,true,1,420,12,16,4,,,[Elder Maw],[Necromancer Mark]
`;

const casterUnits = `
Bestial Defiler,hnecromancer.png,true,1,140,6,5,5,[Bestial Curse],,[Bestial Staff],
Bestial Shaman,hnecromancer.png,true,1,140,6,5,5,[Bestial Heal],,[Bestial Staff],
Bestial Ambushers,htrooper.png,false,10,15,6,1,5,[Bestial Ambush],,[Bestial Swords],[Bestial Strike]
Spectral Ambushers,wraith.png,false,2,85,12,3,4,[Bestial Ambush],,[Spectral Glaives],[Spectral Aura]
Tree Ambushers,tree.png,false,5,22,6,2,5,[Bestial Ambush],,[Tree Glaives],
`;

const otherUnits = `
Gorgon Defiler,troll1.png,true,1,220,8,15,5,,,[Gorgon Blades],[Centaur Heal]
Gorgon Hurler,troll2.png,true,1,190,8,15,5,,[Hurler Stone],[Hurler Horns],[Centaur Heal]
Cerberus,nwarrior.png,true,1,190,10,12,4,,[Cerberus Gaze],[Cerberus Claws],[Necromancer Mark]
Chimaera,ngladiator.png,true,1,200,10,12,5,,[Chimaera Gaze],[Chimaera Claws],
Cyclopes,nmyrm.png,true,1,150,12,8,5,,[Cyclopes Gaze],[Cyclopes Claws],
Dwarf Lord,dwarf.png,true,1,90,5,5,5,,,[Dwarf Hammer],
Valaraukar,wyvernlord.png,true,1,450,5,18,4,,[Balrog Flail],[Balrog Sword],[Gnoll Heal;Centaur Heal;Balrog Mark]
Witchking,wrspirit.png,true,1,990,10,30,3,,[Dark Sorcery],[Morgul Blade],[Centaur Heal;Bestial Counter]
`;

const unitTypesCSV = `
name,img,isSingle,size,cost,movement,hp,save,knownSpells,shootingWeapons,meleeWeapons,unitEffects
${beastUnits.trim()}
${undeadUnits.trim()}
${ogreUnits.trim()}
${spectralUnits.trim()}
${daemonUnits.trim()}
${gnollUnits.trim()}
${aelfUnits.trim()}
${orcUnits.trim()}
${wyvernUnits.trim()}
${drownedUnits.trim()}
${banditUnits.trim()}
${otherUnits.trim()}
${casterUnits.trim()}
`;

const weaponTypesCSV = `
name,distance,attacks,toHit,toWound,penetration,damage,weaponEffects
Bestial Blades,1,5,3,3,1,2,[critical;penetration_single]
Bestial Knives,1,2,5,5,0,1,[critical]
Bestial Bow,9,2,4,5,0,1,[]
Bestial Swords,1,2,4,3,0,1,[critical]
Bestial Greataxe,1,6,4,2,1,3,[]
Bestial Axes,1,5,4,2,1,2,[charge]
Bestial Halberd,1,3,4,3,1,1,[critical;defiler]
Bestial Spears,1,2,4,5,0,1,[critical;defender]
Bestial Lances,1,7,4,3,1,1,[critical;titanic]
Bestial Shortbow,6,2,4,4,0,1,[]
Bestial Crossbow,9,3,4,3,2,1,[]
Bestial Glaive,1,3,3,3,1,2,[]
Centaur Spear,1,4,4,3,1,1,[centaur_charge;penetration_infantry]
Centaur Greataxe,1,5,4,2,0,2,[centaur_charge]
Centaur Axe,4,1,4,3,1,1,[d3_damage]
Bestial Staff,1,3,4,3,0,1,[d3_damage]
Dragon Bolt,6,7,4,3,1,1,[critical;2d6_attacks]
Dragon Greataxe,1,6,3,2,1,3,[impale]
Dragon Axes,1,5,4,2,1,2,[impale;defender]
Spectral Blades,1,2,3,3,1,1,[lethal;charge]
Spectral Scythe,1,2,4,3,1,1,[lethal;reaver;penetration_infantry]
Spectral Axe,1,5,3,3,2,2,[lethal;penetration_single]
Overseer Blade,1,5,4,3,1,2,[lethal]
Spectral Lantern,1,3,4,3,1,2,[lethal]
Spectral Greatblade,1,5,3,3,2,3,[lethal]
Spectral Knives,1,2,4,4,0,1,[lethal]
Spectral Bolt,8,2,4,3,1,1,[lethal]
Spectral Daggers,1,2,4,3,2,1,[lethal;d3_damage]
Spectral Greatscythe,1,6,4,3,1,2,[lethal]
Spectral Torments,6,2,4,3,2,1,[]
Spectral Flails,1,2,4,3,2,1,[lethal]
Spectral Curse,6,1,2,2,3,1,[lethal;d6_damage]
Spectral Glaive,1,6,4,3,1,1,[lethal;d3_damage]
Spectral Lance,1,2,4,3,1,1,[lethal;centaur_charge]
Spectral Glaives,1,5,4,3,1,2,[lethal]
Zombie Claws,1,1,5,4,0,1,[]
Skeletal Swords,1,2,4,4,0,1,[]
Skeletal Greatsword,1,2,3,3,1,1,[impale]
Skeletal Halberds,1,3,3,3,1,2,[critical]
Skeletal Blade,1,4,4,3,0,1,[d3_damage]
Werewolf Claws,1,3,4,3,1,2,[critical]
Tomb Blade,1,5,4,3,1,2,[impale]
Vampire Blade,1,5,3,3,1,2,[critical;penetration_single]
Skeletal Lance,1,3,3,3,1,1,[centaur_charge;penetration_infantry]
Skeletal Greatbows,5,4,4,3,2,1,[]
Skeletal Knives,1,4,4,3,1,1,[]
Skeletal Breath,5,1,4,2,2,1,[d6_damage]
Skeletal Maw,1,7,4,2,2,1,[d6_damage]
Lich Gaze,8,1,5,5,4,1,[enemy_attacks]
Dual Lichswords,1,8,3,3,2,1,[d6_damage]
Ogre Blade,1,3,4,2,2,3,[]
Ogre Swords,1,4,4,2,1,2,[]
Ogre Greatblade,1,7,4,2,1,1,[2d6_attacks]
Ogre Cannons,7,6,5,5,1,1,[2d6_attacks]
Ogre Clubs,1,2,4,2,0,2,[]
Ogre Crossbow,5,2,4,3,1,1,[d3_damage]
Ogre Glaive,1,4,4,2,2,3,[impale;penetration_single]
Ogre Javelin,5,1,4,3,1,1,[d3_damage]
Ogre Lance,1,7,4,2,1,2,[penetration_charge]
Bandit Deathblade,1,5,3,3,1,2,[impale]
Bandit Greatblade,1,5,4,3,1,2,[impale]
Bandit Blades,1,2,4,3,0,1,[penetration_infantry]
Bandit Waraxes,1,4,3,4,1,1,[]
Bandit Greataxes,1,4,4,3,1,2,[]
Gargoyle Talons,1,7,3,3,2,2,[]
Gargoyle Halberds,1,5,3,4,1,1,[centaur_charge;penetration_charge]
Sky Claws,1,5,3,4,0,1,[penetration_infantry]
Sky Sickles,1,2,3,4,1,1,[lethal]
Cultist Blades,1,2,3,4,1,1,[charge]
Elemental Pierce,1,3,3,3,1,2,[]
Elder Maw,1,10,2,3,2,2,[]
Monster Warblade,1,13,3,2,2,1,[critical;d3_damage]
Gorgon Blades,1,8,4,2,1,1,[d6_damage]
Hurler Stone,8,1,4,2,2,4,[d3_damage]
Hurler Horns,1,6,4,2,1,2,[penetration_single]
Drowned Swords,1,4,3,3,1,1,[]
Drowned Hammer,1,4,3,3,1,3,[defender]
Drowned Lance,1,6,3,3,1,1,[centaur_charge;penetration_infantry]
Drowned Gaze,6,1,5,5,4,1,[enemy_attacks]
Drowned Tentacle,1,15,3,2,2,1,[d3_damage]
Cerberus Gaze,4,3,4,2,1,1,[d3_damage]
Cerberus Claws,1,6,4,2,1,2,[]
Chimaera Gaze,6,6,2,4,0,1,[]
Chimaera Claws,1,12,4,2,1,1,[critical;d3_damage]
Cyclopes Gaze,6,1,6,6,0,1,[impale;enemy_attacks]
Cyclopes Claws,1,5,4,2,1,2,[]
Aelf Swarm,6,6,4,4,1,1,[lethal]
Aelf Scythe,1,3,3,4,1,1,[d3_damage]
Aelf Lance,1,6,3,4,1,1,[centaur_charge]
Aelf Blades,1,2,3,4,0,1,[impale;defender]
Fae Bow,8,2,3,3,1,1,[critical]
Fae Talons,1,1,3,4,0,1,[]
Tree Glaives,1,2,3,4,1,1,[]
Aelf Bow,6,2,3,4,1,1,[lethal]
Aelf Knives,1,1,3,4,0,1,[]
Ent Blast,6,5,4,4,1,2,[]
Ent Sword,1,5,3,2,2,5,[penetration_single]
Ent Greatbow,9,2,3,3,1,2,[penetration_single]
Ent Claws,1,3,3,3,0,1,[]
Aelf Thorns,6,1,2,3,2,4,[titanic]
Aelf Glaive,1,6,3,2,2,4,[impale]
Cannon Blast,6,8,4,3,1,2,[]
Cannon Charge,1,4,4,2,1,1,[d3_damage]
Catapult Blast,12,10,4,4,0,1,[3d6_attacks;lethal;penetration_infantry]
Gnoll Club,1,2,4,5,0,1,[lethal]
Gnoll Spear,1,3,3,4,1,1,[defender]
Gnoll Cannon,7,10,4,4,1,1,[3d6_attacks]
Gnoll Catapult,12,2,3,2,1,1,[d6_damage;penetration_infantry]
Gnoll Greatblade,1,6,3,4,1,2,[critical]
Gnoll Javelin,5,7,5,3,1,1,[2d6_attacks;lethal]
Gnoll Halberd,1,10,3,4,1,1,[d3_damage]
Gnoll Waraxes,1,2,3,3,1,1,[lethal;charge]
Gnoll Scythes,1,3,3,3,1,2,[impale;charge]
Gnoll Crossbow,5,5,3,4,0,1,[lethal;d3_damage]
Gnoll Ghostglaive,1,3,3,3,1,1,[impale;d3_damage;penetration_single]
Gnoll Ghostbow,5,2,4,4,0,1,[lethal]
Gnoll Ghostblades,1,2,4,5,0,1,[impale]
Gnoll Hook,5,2,3,3,2,1,[lethal;d3_damage]
Gnoll Warblade,1,5,3,3,2,2,[impale]
Gnoll Fellgaze,4,1,3,5,4,1,[enemy_attacks]
Gnoll Fellteeth,1,13,4,2,2,2,[penetration_infantry]
Gnoll Horror,7,7,4,2,1,1,[lethal;penetration_infantry]
Gnoll Corpseeater,1,6,4,2,2,3,[impale]
Daemon Claws,1,2,3,3,1,1,[impale]
Daemon Dagger,1,1,3,3,2,1,[d6_damage]
Daemon Zweihander,1,4,4,3,1,2,[impale]
Daemon Skewer,1,8,4,2,0,2,[critical]
Daemon Flails,1,4,4,3,1,1,[critical]
Daemon Swords,1,3,4,3,1,1,[]
Daemon Blades,1,2,4,3,0,1,[penetration_charge]
Daemon Whip,1,4,3,4,1,2,[]
Daemon Axe,1,4,3,3,1,2,[]
Daemon Flames,3,3,3,4,0,1,[]
Daemon Maw,1,5,4,2,1,2,[]
Daemon Evil,4,3,3,2,4,1,[damage_attacks]
Daemon Atrocity,1,4,3,2,2,8,[impale;defender]
Dwarf Hammer,1,5,4,3,1,2,[impale]
Balrog Flail,6,1,2,3,2,1,[impale;d6_damage]
Balrog Sword,1,7,3,3,1,1,[impale;2d6_attacks]
Dark Sorcery,9,3,4,2,3,1,[d6_damage]
Morgul Blade,1,17,3,3,2,3,[titanic]
Orc Meathooks,1,3,4,3,1,2,[penetration_infantry]
Orc Meatpikes,1,3,4,2,1,2,[penetration_single;penetration_charge]
Orc Meatblades,1,2,4,3,1,1,[defender]
Orc Meatchains,1,6,4,3,1,1,[penetration_infantry;penetration_charge]
Orc Meatcleaver,1,8,4,2,1,2,[]
Orc Manslicer,1,4,4,4,1,1,[impale;d3_damage]
Orc Meatlance,1,6,4,3,0,1,[centaur_charge]
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
