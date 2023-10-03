module.exports = (req, res, next) => {
    const key = req.query.key;
    const secret = process.env.SECRET;

    if(key === secret){
        next();
    }else{
        res.sendStatus(401);
    }
}


