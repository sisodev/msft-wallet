const  sqlite3  = require('sqlite3')
const {open }  = require('sqlite')

async function setup() {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  await db.migrate({force: 'last'})
}

setup()