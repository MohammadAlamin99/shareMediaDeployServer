const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    let token = req.headers['token'];
    jwt.verify(token, "bcd123",function(err, decoded){
        if(err){
            return res.status(201).json({status:"unathurized"})
        }
        else{
            let email=decoded['data'];
            let id=decoded['id'];
            req.headers.email=email;
            req.headers.id=id;
            next();
        }
    })
}