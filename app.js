const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const {
    json
} = require("body-parser");

const app = express();

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/sign-up.html")
})

app.post("/", function (req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data)


    var options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/f331ae9e20",
        method: "POST",
        headers: {
            "Authorization": "flutter 1c26a0f69b11da00178784d8388ce3cb-us10"
        },
        body: jsonData
    }

    console.log(firstName, lastName, email);

    request(options, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            res.sendFile(__dirname + `/failure.html`)
        } else if(response.statusCode === 200) {
            res.sendFile(__dirname + `/success.html`)
        }
    })
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function () {
    console.log(`Server started on port 3000...`)
})


