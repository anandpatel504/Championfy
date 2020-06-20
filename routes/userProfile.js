module.exports = (app, axios, CircularJSON, verifyToken, jwt, knexconnection) => {
    app.get("/profile/:username", (req, res) => {
        const username = req.params.username;
        axios.get("https://api.github.com/users/" + username)
        .then((data) => {
            const maindata = CircularJSON.stringify(data.data);
            const parsedata = JSON.parse(maindata);
            console.log(parsedata)
            res.send(parsedata);
        }).catch((err) => {
            console.log(err);
        })
    })
}