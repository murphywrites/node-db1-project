const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll().then(accounts => {
    res.status(200).json(accounts)
  }).catch(err => {
    next(err)
  })
  
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params
  Accounts.getById(id).then(account => {
    res.status(200).json(account)
  }).catch(err => {
    next(err)
  })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const { validatedAccount } = req
  console.log("router val",validatedAccount)
  Accounts.create(validatedAccount).then(newAccount => {
    console.log(newAccount)
    res.status(201).json(newAccount)
  }).catch(err => {
    next(err);
  })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.validatedAccount).then(account => {
    res.status(200).json(account)
  }).catch(err => {
    next(err)
  })
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id).then(deletedAccount => {
    res.status(200).json(deletedAccount)
  })
})


module.exports = router;
