const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public")); //for using all the static files present in the public folder.

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://$us9.api.mailchimp.com/3.0/lists/5e6c5dcd1c";

    const options = {
        method: "POST",
        auth: "anant1:244f62a5694f46f0d347f695c4c2d616-us9"
    }

    const rr = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    rr.write(jsonData);
    rr.end();

    //console.log(firstName, lastName, email);

});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});


//api key - 244f62a5694f46f0d347f695c4c2d616-us9
//list id - 5e6c5dcd1c