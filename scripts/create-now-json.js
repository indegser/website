const fs = require('fs')

console.log('>>> Creating now.json with github env variables.')
const { NOW_NAME, FIREBASE_API_KEY } = process.env
const json = JSON.parse(fs.readFileSync('now.json', 'utf-8'))
json.name = NOW_NAME

const newJson = {
  ...json,
  name: NOW_NAME,
  build: {
    env: {
      FIREBASE_API_KEY,
      NOW_NAME,
    },
  },
}

fs.writeFileSync('now.json', JSON.stringify(newJson), 'utf-8')

console.log('>>> Finish updating now.json with env variables.')
