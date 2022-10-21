const db = require('../../data/db-config');


const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = async id => {
  // DO YOUR MAGIC
  const fetchedAccounts = await db('accounts').where( 'id', id)
  return fetchedAccounts[0]
}

const create = async account => {
  // DO YOUR MAGIC
 const ids = await db('accounts').insert(account)
 const createdAccounts = await db('accounts').where('id', ids[0])
 return createdAccounts[0]
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  const updatedAccounts = await db('accounts').where( 'id', id)
  return updatedAccounts[0]
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deletedAccount = await db('accounts').where('id', id)
  await db('accounts').where('id', id).delete()
  return deletedAccount[0]
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
