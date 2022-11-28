const fs = window.require("fs")

const check = /^\s*[\r\n]/gm

function parse(str){
  return str.toLowerCase().replace(check, "").split("\n")
}

export function Files(path) {
  const exist = fs.existsSync(path)
  return {
    read: () => (exist ? parse(fs.readFileSync(path, "utf8")) : null),
    write: (data) => fs.writeFileSync(path, data),
  }
}
