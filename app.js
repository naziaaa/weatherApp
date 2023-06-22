const ex = require("express");
const https = require("https");
const bodyParser=require("body-parser")

const app = ex();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html")

});

app.post("/",function(req,res){

    const city=req.body.city;
    const apiKey="f08cfaabc9d10bb393fa775aa1c56260";
    const scale="metric"
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+scale+"";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temper = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      //console.log(temper)
      const icon = weatherData.weather[0].icon;
      const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>Current Weather is " + des + "<p>");
      res.write(
        "<h1>The temperature of "+ city+" is " + temper + " degree celcius</h1>"
      );
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });

})

app.listen("3000", function () {
  console.log("Server is running");
});
