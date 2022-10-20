const jwt = require('jsonwebtoken')
const  { loginUser, userConfirm, passwordRecovery, newPassword }  = require('./auth.controller')
const { jwtSecret } = require('../config')
const { userConfirmValidate, getUserByEmail, getUserByToken } = require('../users/users.controllers')


const login = (req, res) => {
    const { email, password } = req.body
    getUserByEmail(email)
        .then( (data) => {
            const isVerified = data.dataValues.isVerified 
            //? Verifica si el usuario esta confirmado

            if (!isVerified) return res.status(400).json({ msg: 'Usuario no confirmado'})
            //? Confirma que se envía los campos correspondientes email y password

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
        })
        .catch(err => {
            return err
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

const passwordRecoveryUser = (req, res) => {
    const email = req.body.email
    if (!email) return res.status(400).json({msg: 'Missing Data'})
    passwordRecovery(email)
        .then( response => {
            if (response) {
                res.status(200).json({msg: 'Hemos enviado un email con las instrucciones'})
            } else {
                res.status(400).json({msg: 'Correo  no valido'})
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const newPasswordUser = (req, res) => {
    const password = req.body.password
    const token = req.params.token
    if (!token) return res.status(400).json({msg: ' Missing Data'})
        getUserByToken(token)
            .then(response => {
                if (response) {
                    if(!password) return res.status(400).json({msg: 'Missing Data'})
                        newPassword(token,password)
                            .then(response => {
                                res.status(200).json({msg: 'Password reestablecido correctamente'})
                            })
                            .catch(err => {
                                res.status(400).json({msg: err.message})
                            })
                } else {
                    res.status(400).json({msg: 'Token no valido'})
                }
            })
            .catch(err => {
                res.status(400).json({msg: err.message, error: 'Se produjo un error'})
            })
    
}


module.exports = {
    login,
    confirm,
    passwordRecoveryUser,
    newPasswordUser
} 
