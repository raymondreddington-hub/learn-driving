const mongoose = require('mongoose')
const Account = mongoose.model('Accounts') 
const Feedback = mongoose.model('Feedback') 

const bcrypt = require('bcryptjs')

module.exports = app =>{
    app.post('/account', async(req, res) => {
        const { names, email, password } = req.body;

        console.log(req.body)

        var userAccount = await Account.findOne({ email: email})

        if(!userAccount){

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            console.log('unavailable')
            var newAccount = new Account({
                names: names,
                email: email,
                password: hashedPassword,
                date: Date.now()
            })

            await newAccount.save()

            res.status(420).send('account created')
            console.log(newAccount, 'has been saved')
        } else {
            res.status(410).send('email exists')
            console.log('email exists now')
        }
    })

    app.post('/login', async(req, res) => {
        const { email, password } = await req.body;

        console.log(req.body)
        var userAccount = await Account.findOne({ email: email})

        if(userAccount){
            const validPass = await bcrypt.compare(password, userAccount.password)
            if (validPass){
                console.log('validPass')
                userAccount.date = Date.now()
                res.status(420).send()
            } else {
                res.status(415).send()
            }
            
        } else {
            console.log('invalid')
            res.status(410).send()
        }
    })

    app.post('/checkEmail', async(req, res) => {
        const { email } = req.body;

        console.log(req.body)

        var userAccount = await Account.findOne({ email: email})

        if(userAccount){
            console.log('worked')
            res.status(420).send()
            
        } else {
            res.send('not worked')
            res.status(410).send()

        }
    })

    app.post('/changePass', async(req, res) => {
        const { email, password } = req.body;

        console.log(req.body)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const updatedPass = await Account.updateOne({ email: email},{ $set :{ password: hashedPassword}})
        if(updatedPass){
            res.status(420).send()
        } else {
            res.status(410).send()
        }
        
    })

    app.post('/feedback', async(req, res) => {
        const { follow, email, message, rating } = req.body;
        console.log(req.body)

        var moreFeedback = new Feedback({
            email: email,
            rating: rating,
            message: message,
            follow: follow,
            date: Date.now()
        })

        await moreFeedback.save()

        res.status(420).send()
        console.log(moreFeedback)
        
    })
}


