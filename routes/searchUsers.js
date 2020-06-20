module.exports = (app, axios, CircularJSON, verifyToken) => {
    app.get("/searchUsers/:username", (req, res) => {
        const username = req.params.username;
        axios.get("https://api.github.com/users?name" + username)
        .then((data) => {
            const maindata = CircularJSON.stringify(data.data);
            const parsedata = JSON.parse(maindata);
            // res.send(parsedata);
            const mapdata = parsedata.map(user => {
                return user;
            })
            const topTen = mapdata.slice(0, 10);
            // console.log(topTen.length);
            res.send(topTen);
        }).catch((err) => {
            console.log(err);
        })
    })
}