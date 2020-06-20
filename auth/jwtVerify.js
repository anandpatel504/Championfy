var jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = (req,res,next) => {
    var token = req.query.token || req.body.token || req.headers.cookie;
    if(token !== undefined){
        if(token.startsWith('key=')){
            token = token.slice(4, token.length)
            jwt.verify(token, process.env.SECRET_KEY, (err, decode) =>{
            
                if(!err){      
                    req.email = decode.email;
                    next();
                }
                else{
                    res.json(
                        {
                            "error": {
                              "status": 401,
                              "code": "AUT_02",
                              "message": "Access Unauthorized",
                              "field": "NoAuth"
                            }
                          }
                    )
                }
            })
        }
    }else{
        res.json(
            {
                "error": {
                  "status": 401,
                  "code": "AUT_02",
                  "message": "Access Unauthorized",
                  "field": "NoAuth"
                }
              }
        )
    }

}