import DecryptToken from "../auth/encriptartoken.js"

export default function authorization(req, res, next) {
    if(!req.headers.authorization){
        res.status(401).send('forbidden');
    }else{
        const token = req.headers.authorization.split(' ')(1);
        const decryptedToken = Decrypt
        req.user=payload;
    }
    next();
}