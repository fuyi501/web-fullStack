
const fs = require('fs')
const path = require('path')

const readDir = (entry) => {
  const dirInfo = fs.readdirSync(entry)
  dirInfo.forEach(item => {
    const location = path.join(entry, item)
    const info = fs.statSync(location)
    if(info.isDirectory()){
      console.log(`dir: ${location}`)
      readDir(location)
    }else{
      console.log(`file: ${location}`)
    }
  });
  console.log(entry)
}

readDir(__dirname)