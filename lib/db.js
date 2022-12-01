// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const  sqlite3  = require('sqlite3')
const { open }  = require('sqlite')


export const selectAll = async () => {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const result = await db.get('SELECT * FROM SessionTbl')
  return result
}

export const insertSession = async (id, state) => {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const statement = await db.prepare('INSERT INTO SessionTbl (session_key , session_state) VALUES (?, ?)');
  const result = await statement.run(id,state);
  return result
}

export const getSessionById = async (id) => {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const session = await db.get('select session_state from SessionTbl where session_key = ?', [id]);
  return session
}

export const updateSessionById = async (id, state) => {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  console.log(`trying to update ${state} where id == ${id}`)
  // const statement = await db.prepare('UPDATE SessionTbl SET session_state= ? WHERE session_key = ?');
  // const result = await db.run("UPDATE SessionTbl SET session_state = ? WHERE session_key = ?", [ id, state]);
  const result = await db.run("UPDATE SessionTbl SET session_state = $name WHERE session_key = $id", {
    $id: id,
    $name: state
});
  // const result = await statement.run(id,state);
  return result
}

export const deleteSessionById = async(id) => {
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const statement = await db.prepare('DELETE FROM SessionTbl WHERE session_key = ?')
  const result = await statement.run(id)
  return result
}

export const insertUserDetails =  async (info) => {
  console.log(`in the db file:::::`)
  console.log(info)
  const {state, firstName,dateOfBirth, emailAddress, phoneNumber, cooperateTitle, domicile, privilegedSigner} = info
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const statement = await db.prepare('INSERT INTO UserTbl(session_key, firstName, dateOfBirth, emailAddress, domicile, privilegedSigner) values (?, ?, ?, ?, ?, ?)');
  const result = await statement.run(state, firstName, dateOfBirth, emailAddress, domicile,  privilegedSigner);
  return result

}

export const getUserDetails =  async (state) => {
  console.log(`getting user details for the state === ${state}`)
  if(state === undefined) {
      return "waiting for presentation key to come"
  }
  const db = await open({"filename": "./mydb.sqlite", driver: sqlite3.cached.Database})
  const session = await db.get('select * from UserTbl where session_key = ?', [state]);
  console.log(`${JSON.stringify(session, null, 2)}`)
  return session
}
