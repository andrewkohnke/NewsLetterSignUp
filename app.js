

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
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

    const url = "https://us10.api.mailchimp.com/3.0/lists/1bdfdb6f64";

    const options = {
      method: "POST",
      headers: {
        "Authorization": "andrew1:69785880842225848df7583d4d92db7f-us10";
    },

  };

    request(options, function(error, response, body) {
      if (error){
        res.sendFile("There was an error with signing up, Please try again!");
      } else {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
          } else {
            res.sendFile(__dirname + "/failure.html");
          }
        }
      });


    });


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000!");
});


//API KEY
// 69785880842225848df7583d4d92db7f-us10

//LIST ID
// 1bdfdb6f64
