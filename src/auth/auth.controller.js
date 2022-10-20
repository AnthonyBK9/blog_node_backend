
const { getUserByEmail, resetPassword, getUserByToken } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')
const { hashPassword } = require('../utils/crypto');
const Users = require('../models/users.models')

//* Email y Password del usuario

//? Email es único en la base de datos
const loginUser = async (email, password, isVerified ) => {
    //* Este controllador tiene 2 posibles respuestas  1.- Las credenciales son válidad y retornamos el usuario  2.- las credenciales con invalidad y retornamos false
    try {
        if (!isVerified) return false //? Valida que el usuario esté confirmado, para iniciar sesión
        const user = await getUserByEmail(email)
        //? user.password contiene la contraseña encriptada de mi base de datos
        const verifiedPassword = comparePassword(password, user.password)
        if (verifiedPassword) {
            return user
        }
         return false
    } catch (error) {
        return error
    }
}

const userConfirm = async (token) => {
    try {
        const userConfirm = await getUserByToken(token)
        return userConfirm

    } catch (error) {
        return error
    }
}

const passwordRecovery = async (email) => {
    try {
        const emailConfirm = await getUserByEmail(email)
        await resetPassword(email)
        return emailConfirm
    } catch (error) {
        return error
    }
}

const newPassword = async (token,password) => {
    const data = {
        token: '', 
        password: hashPassword(password)
    }
    const result = await Users.update(data, {
        where: {
            token
        }
    })
    return result;
}

module.exports = {
    loginUser,
    userConfirm,
    passwordRecovery,
    newPassword
}

