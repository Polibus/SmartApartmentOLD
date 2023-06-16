const UserModel = require('../../db/models/userModel')
const jwt = require('jsonwebtoken')
class UsersActions {

    async registerUser(req, res) {
        const email = req.body.email
        const password = req.body.password
        const isAdmin = true
        const isActive = false
        try {
            const newUser = new UserModel({ email, password, isAdmin, isActive });
            await newUser.save();
            res.status(201).json(newUser)
        } catch (err) {
            return res.status(422).json("Duplicate email")
        }
    }

    async loginUser(req, res) {
        const user = await UserModel.findOne({
            email: req.body.email,
            password: req.body.password,

        })
        if (user) {
            const active = Boolean(user.isActive)
            const admin = Boolean(user.isAdmin)
            if (active) {
                const payload = {
                    email: user.email,
                    isAdmin: admin,
                    isActive: active,
                    user: true
                }
                const token = jwt.sign(
                    payload, 'secret123', { expiresIn: '60m' })
                return res.status(200).json(token)
            } else {
                return res.status(401).json({ user: true })
            }
        } else {
            return res.status(401).json({ user: false })
        }
    }
}

module.exports = new UsersActions();