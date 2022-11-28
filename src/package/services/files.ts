const fs = window.require("fs")

function parse(str){
  return str.toLowerCase().replace("/^\s*[\r\n]/gm", "").split("\n")
}

export function Files(path) {
  const exist = fs.existsSync(path)
  return {
    read: () => (exist ? parse(fs.readFileSync(path, "utf8")) : null),
    write: (data) => fs.writeFileSync(path, data),
  }
}
