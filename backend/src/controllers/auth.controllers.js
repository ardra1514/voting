import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "all fieds required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password should be atleast 6 charector" })

        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "email not valid" })

        }
        const isexist = await User.findOne({ email })
        if (isexist) {
            return res.status(400).json({ message: "user already exist" })

        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })
        await newUser.save()
        return res.status(200).json({
            message: "success", user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })


    } catch (error) {
        return res.status(400).json({ message: "internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "all fieds required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })


        return res.status(200).json({
            message: "success", user: {
                _id: user._id,
                email: user.email
            }, token
        })
    } catch (error) {
        return res.status(400).json({ message: "internal server error" })

    }
}