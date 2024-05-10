export function AuthMiddleware(req, res, next) {
    if(!req.headers.authorization){
        res.status(401).send('forbidden');
    }else{
        const token = req.headers.authorization.split(' ')(1);
        const decryptedToken = Decrypt
    }
}