import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import PositionedCharacter from './PositionedCharacter';
import Team from './Team';

export default class GameState {
  constructor() {
    this.level = 1;
    this.positions = [];
    this.playerTeam = null;
    this.computerTeam = null;
    this.currentTurn = 'player';
    this.selectedCell = null;
    this.theme = 'prairie';
  }

  static from(object) {
    if (!object) return new GameState();

    const state = new GameState();
    state.level = object.level ?? 1;
    state.theme = object.theme ?? 'prairie';
    state.currentTurn = object.currentTurn ?? 'player';
    state.selectedCell = null;

    const characterMap = {
      swordsman: Swordsman,
      bowman: Bowman,
      magician: Magician,
      daemon: Daemon,
      undead: Undead,
      vampire: Vampire,
    };

    let playerCharacters = [];
    if (object.playerTeam && object.playerTeam.characters) {
      playerCharacters = object.playerTeam.characters.map((charData) => {
        const CharacterClass = characterMap[charData.type];
        const character = new CharacterClass(charData.level ?? 1);
        character.attack = charData.attack ?? 0;
        character.defence = charData.defence ?? 0;
        character.health = charData.health ?? 50;
        return character;
      });
    }
    state.playerTeam = new Team(playerCharacters);

    let computerCharacters = [];
    if (object.computerTeam && object.computerTeam.characters) {
      computerCharacters = object.computerTeam.characters.map((charData) => {
        const CharacterClass = characterMap[charData.type];
        const character = new CharacterClass(charData.level ?? 1);
        character.attack = charData.attack ?? 0;
        character.defence = charData.defence ?? 0;
        character.health = charData.health ?? 50;
        return character;
      });
    }
    state.computerTeam = new Team(computerCharacters);

    state.positions = [];
    if (object.positions && Array.isArray(object.positions)) {
      for (const posData of object.positions) {
        if (posData && posData.character) {
          let foundCharacter = null;

          foundCharacter = state.playerTeam.characters.find(
            (c) => c.type === posData.character.type &&
                   c.level === posData.character.level &&
                   c.health === posData.character.health
          );

          if (!foundCharacter) {
            foundCharacter = state.computerTeam.characters.find(
              (c) => c.type === posData.character.type &&
                     c.level === posData.character.level &&
                     c.health === posData.character.health
            );
          }
          
          if (foundCharacter) {
            state.positions.push(new PositionedCharacter(foundCharacter, posData.position ?? 0));
          }
        }
      }
    }

    return state;
  }
}