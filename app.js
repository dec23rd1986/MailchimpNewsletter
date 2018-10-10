const express = require('express');
const app = express();
const bodyParser = require("body-parser");

//middleware
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connecting cloud i9 host
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Server Has Started!");
});

//route
app.post('/', function(req, res) {
    addEmailToMailchimp(req.body.email);
    res.end('SUCCESS!');
});

function addEmailToMailchimp(email) {
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://us19.api.mailchimp.com/3.0/lists/d8d56a073a/members',
        headers: {
            'postman-token': '7be1f4da-ea36-c3f1-2721-62b132928dea',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: 'Basic YW55c3RyaW5nOmU3YTgxMzg5ZGQ2YzFhMWVmNzIyNDIyNWRlNTczOWI4LXVzMTk='
        },
        body: { email_address: email, status: 'subscribed' },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}