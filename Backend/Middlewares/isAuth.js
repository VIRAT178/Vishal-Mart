import jwt from 'jsonwebtoken'
const isAuth = async (req,res,next) => {
    try {
        const {token} = req.cookies
        if (!token) {
            return res.status(400).json({message:"User does not have valid token"})
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"User does not have verified token"})
        }
        req.userId = verifyToken.userId
        next() 
    } catch (error) {
        console.log("Verification error");
        return res.status(500).json({message:"Can't verifed token", error})
    }
}
export default isAuth;