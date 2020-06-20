module.exports = (app, jwt, knexconnection, SECRET_KEY) =>{
    app.post("/login", (req, res) =>{
        if (req.body.email === "" || req.body.password === ""){
            console.log({"suggetion": "email and password both are require!"})
        }else{
            knexconnection
            .select('*').from('users')
            .where('email', req.body.email)
            .then((data) =>{
                console.log(data);
                if (data.length>0){
                    if (data[0].password === req.body.password){
                        const token = jwt.sign({"id": data[0].id, "name": data[0].name, "email": data[0].email, "password": data[0].password }, SECRET_KEY);
                        // console.log({"Login Success": token});
                        res.cookie("key", token);
                        console.log({"Login success!": data, token});
                        res.send({"Login success!": data});
                    }else{
                        res.send({
                            "Error": "Password is invalid"
                        })
                    }
                }else{
                    res.send({
                        "Error": "This user doesn't exists! please Signup....."
                    })
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}