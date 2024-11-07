import jwt from 'jsonwebtoken';

const middleware = async (req, res, next) => {
    
        const header = req.headers["authorization"]

        jwt.verify(header, "Aditya", (err, user) => {
            if(err){
                return res.status(400).json({
                    message: "Invalid token",
                    success: false
                })
            }
            req.user = user
            next()
        })
    
    
}

export default middleware