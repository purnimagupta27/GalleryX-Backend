import jwt from 'jsonwebtoken'

const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'})
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

export{
    generateToken, 
    verifyToken
}