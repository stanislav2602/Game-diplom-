/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
/**
 * Класс, представляющий персонажей команды
 */
export default class Team {
  #characters = new Set();

  constructor(characters = []) {
    characters.forEach((char) => this.#characters.add(char));
  }

  get characters() {
    return Array.from(this.#characters);
  }

  addCharacter(character) {
    this.#characters.add(character);
  }

  removeCharacter(character) {
    this.#characters.delete(character);
  }

  has(character) {
    return this.#characters.has(character);
  }

  levelUp() {
    this.#characters.forEach((character) => {
      character.levelUp();
    });
  }

  isEmpty() {
    return this.#characters.size === 0;
  }
}