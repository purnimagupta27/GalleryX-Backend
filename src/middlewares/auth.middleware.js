import ApiError from "../utils/api-error.js"
import { verifyToken } from "../utils/token.js"

const authenticate = (req, res, next) => {
    const token = req.cookies.auth_token
    if(!token){
        throw ApiError.unauthorized("Access denied. No token provided")
    }
    try{
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    }
    catch(error){
        throw ApiError.unauthorized("Invalid or expired token")
    }
}



export {
    authenticate
}