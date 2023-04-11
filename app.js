const express = require("express");
const https = require("https");
const { stringify } = require("querystring");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");    
})

app.post("/",function (req,res) {
    const query=req.body.cityName;
    const apiKey="7b11287f55e264917b94a5c45847a26d";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDiscription = weatherData.weather[0].description;
            console.log(weatherDiscription);

            const icon= weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The weather currently is "+weatherDiscription+".</p>");
            res.write("<h1>The temperature in "+ query+" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
            // const object={
            //     name:"Deepank",
            //     Age:24
            // }
            // console.log(object);
            // console.log(JSON.stringify(object));
        });
    });
    // console.log(req.body.cityName);
    // console.log("Post Request Received.");    
})


app.listen(3000, function () {
    console.log("Server started on port 3000.");
})