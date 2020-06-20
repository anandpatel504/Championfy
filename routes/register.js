module.exports = (app, knexconnection, ) => {
    app.post("/register", (req, res) =>{
        if (req.body.name === "" || req.body.email === "" || req.body.mobile === "" || req.body.password === ""){
            console.log({"suggetion": "please fill all contents!"});
            res.send({"suggetion": "please fill all contents!"})
        }else{
            knexconnection
            .select('*').from('users')
            .where({"name": req.body.name, "email": req.body.email, "mobile": req.body.mobile, "password": req.body.password})
            .then((data) =>{
                console.log(data);
                if (data.length<1){
                    knexconnection('users').insert(req.body)
                    .then((result) =>{
                        knexconnection
                        .select('*').from('users')
                        .where('email', req.body.email)
                        .then((data) =>{
                            console.log({"signup successfully...": data})
                            res.send({"signup successfully...": data});
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    console.log({"exist": "this user alredy exists.."});
                    res.send({"exist": "this user alredy exists.."})
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}