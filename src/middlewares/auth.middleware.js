import ApiError from "../utils/api-error.js"
import { verifyToken } from "../utils/token.js"

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ApiError.badRequest("Please provide a token first")
    }

    const token = authHeader.split(" ")[1]
    try {
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