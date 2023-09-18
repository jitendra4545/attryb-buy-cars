

const express = require(`express`)
const { UserModel } = require("../model/UserModel")
const jwt = require('jsonwebtoken')

const UserRouter = express.Router()




UserRouter.post("/signup", async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        if (data.name == "" || data.email == "" || data.password == "") {
            res.send("Please Fill all the mandatory field")
        } else {
            let newData = new UserModel(data)
            await newData.save()
            res.send({ "msg": "User Register Successfully" })
        }

    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Try After SomeTime", "err": err.message })
    }
})



UserRouter.post("/login", async (req, res) => {
    const data = req.body
    console.log(data)
    try {

        if (data.email == "" || data.password == "") {
            res.send("Please Fill all the mandatory field")
        } else {
            let Success = await UserModel.findOne({ email: data.email, password: data.password })
            console.log(Success)
            if (Success) {
                let token = jwt.sign({ UserId: Success._id }, 'jitendra');
                res.send({ "msg": "User Successfully Login", "token": token })

            } else {
                res.send({ "msg": "User Not Found ! please Register First" })
            }
        }

    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Try After SomeTime", "err": err.message })
    }
})




module.exports = {
    UserRouter
}
