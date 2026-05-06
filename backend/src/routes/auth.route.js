import expresss from 'express'
import { login, register } from '../controllers/auth.controllers.js'
const route = expresss.Router()
route.post('/register',register)
route.post('/login',login)

export default route
