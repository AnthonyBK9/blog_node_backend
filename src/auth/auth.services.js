const jwt = require('jsonwebtoken')
const  { loginUser, userConfirm }  = require('./auth.controller')
const { jwtSecret } = require('../config')
const { userConfirmValidate, getUserByEmail } = require('../users/users.controllers')


const login = (req, res) => {
    const { email, password } = req.body
    const  isVerified  = getUserByEmail(email)
                            .then(response => {
                                return response
                            })
                            .catch(err => {
                                return err
                            })
    // const isVerified = false
    console.log(isVerified + 'Info sd')
    if (!isVerified) return res.status(400).json({ msg: 'Usuario no confirmado'})
    if (!email || !password) return res.status(400).json({msg: 'Missing Data'})  
    loginUser(email, password, isVerified )
        .then(response => {
            if (response) {
                const token = jwt.sign({ //? Generamos el token con la siguiente información id, email y role
                    id: response.id,
                    email: response.email,
                    role: response.role
                }, jwtSecret, {  expiresIn: '7d', })
                res.status(200).json({msg: 'Correct Credentilas', token})
            }else {
                res.status(401).json({msg: 'Invalid Credentials'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const confirm = (req, res) => {
    const token  = req.params.token
    userConfirm(token)
        .then(response => {
           if (response) {
            res.status(200).json({msg: 'Cuenta confirmada correctamente'})
            userConfirmValidate(token)
           } else {
            console.log(response)
            res.status(400).json({msg: 'Invalid Token'})
           }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}



module.exports = {
    login,
    confirm
} 