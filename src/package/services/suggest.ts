const fs = window.require("fs")

class InterpreterClass {
  len: any
  all_words: string[]
  map: {}

  constructor(len?) {
    this.len = len || 1
  }

  read(filePaths) {
    this.all_words = this.readFilesIntoWordArray(filePaths)
    this.map = this.buildMap(this.all_words, this.len)
  }

  create_sentence(start_phrase, sentence_length = 10, depth = this.len) {
    try {
      let sentence = ""
      for (let word_count = 0; word_count < sentence_length; word_count++) {
        let next_word = this.choose_word_weighted(this.map[start_phrase])
        sentence = sentence + next_word + " "
        let tokenized_phrase = start_phrase.split(" ")
        start_phrase = ""
        for (let i = 1; i < depth; i++) {
          start_phrase = start_phrase + tokenized_phrase[i] + " "
        }
        start_phrase = start_phrase + next_word
      }
      return sentence
    } catch (err) {
      return ""
    }
  }

  suggest(start_phrase) {
    try {
      let word_list = this.map[start_phrase.toLowerCase()]
      let suggested_word = this.choose_word_weighted(word_list)
      return suggested_word.toLowerCase()
    } catch (err) {
      return ""
    }
  }

  choose_word_weighted(word_list) {
    // Get a array of all the words in the word list object,
    // so we can run through each and get their weights
    var keys = Object.keys(word_list)

    // Get the sum of all the weights
    let sum_of_weights = 0
    keys.forEach((key) => {
      sum_of_weights += word_list[key]
    })

    // Math.random() returns a number from 0 to 1,
    // so we scale it up the sum of the weights
    let random = Math.random() * sum_of_weights

    // Go through every word,  and subtract its weight from
    // our random number. When we reach 0 or below,
    // that is the word we choose
    let curr_word = ""
    keys.every((word) => {
      curr_word = word
      random -= word_list[word]
      return random > 0
    })

    return curr_word
  }

  readFilesIntoWordArray(filenames) {
    let data = ""
    filenames.forEach((file) => {
      data = data + " " + fs.readFileSync(file, "utf8")
    })

    // remove special chars
    const regex = /[!"#”“$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g

    // Put spaces around each special character / punctuation,
    // so that when we split on spaces, they come out as their own tokens,
    // disconected from surrounding words
    const replacements = [",", ".", ":", "!", "?", '"', "“", "”", ";", "(", ")", "-", "_"]
    replacements.forEach((value) => {
      data = data.replace(RegExp("\\" + value, "g"), " " + value + " ")
    })

    data = data.replace(regex, " ").toLowerCase()

    // Split on spaces to get each word by itself, indexed.
    var word_array = data.split(" ")

    // remove all pure whitespace entries
    word_array = word_array.filter((word) => word.trim().length != 0)
    return word_array
  }

  buildMap(tokens, depth) {
    let map = {}

    // for each entry in the tokens
    for (let index = 0; index < tokens.length - depth; index++) {
      //create a phrase from the current token and the next depth-1 number of tokens
      let phrase = ""
      for (let depthIndex = 0; depthIndex < depth; depthIndex++) {
        const curr_word = tokens[depthIndex + index]
        phrase = phrase + " " + curr_word
      }
      // Get rid of any extra space we added in when constructing the phrase from tokens
      phrase = phrase.trimStart()

      //if the phrase doesn't already exist in the map
      //    add the phrase to the map, and add a blank
      if (!map[phrase]) {
        map[phrase] = {}
      }

      // Gets the next word after the phrase
      let next_word = tokens[index + depth]

      // See if the next word exists in the phrase word list
      // If it doesn't already exist in the possible next word list, add it in, and set weight to 1
      // if it does exist, just increment the weight
      let next_word_list = map[phrase]
      if (!next_word_list[next_word]) {
        next_word_list[next_word] = 1
      } else {
        next_word_list[next_word]++
      }
    }

    return map
  }
}
export const Interpreter = new InterpreterClass()
