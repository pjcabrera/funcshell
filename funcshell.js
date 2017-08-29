var fs = require("fs-extra");

class FuncShell {

  // returns a string with the absolute path of the current directory
  currentDirectory() {
    return process.cwd();
  }

  // outputs value to the console
  print(value = '') {
    return console.log(value);
  }

  // outputs to the console the contents of the file at filePath
  // filePath can be either absolute or relative
  printFile(filePath) {
    return fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      this.print(data.toString());
    });
  }

  // returns a Promise with the result of reading the file at filePath
  // filePath can be either absolute or relative
  readFile(filePath) {
    return fs.readFile(filePath);
  }

  // returns a Promise with the result of writing to the file at filePath
  // filePath can be either absolute or relative
  writeFile(filePath, data) {
    return fs.writeFile(filePath, data)
  }

  async byteCount(filePath) {
    return await fs.stat(filePath).then(data => {
      return data['size']
    })
  }

  async characterCount(filePath) {
    return await this.readFile(filePath).then(data => {
      return data.toString().split('').length
    })
  }

  async wordCount(filePath) {
    return await this.readFile(filePath).then(data => {
      return data.toString().split(/\s/).length
    })
  }

  async lineCount(filePath) {
    return await this.readFile(filePath).then(data => {
      return data.toString().split(/[\r\n]/).length
    })
  }
}

module.exports = new FuncShell();
