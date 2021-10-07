const mongoose = require('mongoose')
const Account = mongoose.model('Accounts') 

module.exports = app =>{
    app.get('/account', async(req, res) => {
        const { names, email, password } = req.query;
        if(names == null || password == null){
            res.send('invalid credentials')
        }

        var userAccount = await Account.findOne({ email: email})

        if(!userAccount){
            console.log('unavailable')
            var newAccount = new Account({
                names: names,
                email: email,
                password: password,
                date: Date.now()
            })

            await newAccount.save()

            res.send(newAccount, 'has been saved')
        } else {
            res.send('email exists')
        }
    })
}


