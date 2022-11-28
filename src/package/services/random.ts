import { Interpreter } from "./suggest"

const randoms = [
  () => Math.floor(Math.random() * 369) > 111,
  () => Math.floor(Math.random() * 111 * 1),
]

const suggester = [
  (word: string) => Interpreter.suggest(word).trim().split("\n").join(" "),
  (word: string) => Interpreter.create_sentence(word, randoms[0]() ? 1 : 2).trim().split("\n").join(" "),
]

export class RandomService {

  private static getLine(lines: any[]) {
    const line = Math.floor(Math.random() * lines.length)
    return lines[line]
  }

  private static joinWord(word: string) {
    return word.trim() !== "" ? ", " + word : ""
  }

  private static suggest(lines: string[]) {
    const a = this.getLine(lines)
    const s = suggester[randoms[0]() ? 0 : 1](a).split(" ").join(", ")
    return a + this.joinWord(s)
  }

  static getRandom(lines: string[]) {
    const single = randoms[1]() < randoms[1]()
    if (single) return this.getLine(lines)
    return this.suggest(lines)
  }
}
