const yup = require('yup')
const Accounts = require('./accounts-model')

const accountSchema = yup.object().shape({
  name: yup.string().typeError("name must be a string").required('name and budget are required').trim().min(3, "name of account must be between 3 and 100").max(100, "name of account must be between 3 and 100"),
  budget: yup.number().typeError("budget of account must be a number").required("name and budget are required").min(0, "budget of account is too large or too small").max(1000000,"budget of account is too large or too small")
})

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  console.log("l13,mw",req.body)
  accountSchema.validate(req.body, { stripUnknown: true}).then(validated => {
    console.log("val",validated)
    req.validatedAccount = validated

    next()
}).catch(err => {
  console.log(err.message)
  next({ status: 400, message: err.message})
})
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll().then(accounts => {
   var taken = false
    accounts.forEach(account => {
      if(account.name == req.body.name.trim()) {
        res.status(400).json({message: "that name is taken"})
        taken = true
      }
    })
    !taken ? next() : ""
  }).catch(err => {
      next(err)
    })
  
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
Accounts.getById(req.params.id).then(account => {
  account ? next() : res.status(404).json({message: "account not found"})
}).catch(err => {
  next(err)
})
}
