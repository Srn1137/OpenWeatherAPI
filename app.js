const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiID= "478c8839c5ef35383ea115ca25101766"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiID+"";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData= JSON.parse(data);
      console.log(weatherData);
      const desc=weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      res.write("<p>The Temperature in "+query +" is "+temp+"<p>");
      res.write("<h3>And It seems like "+desc+".</h3>");
      res.send();
});
});
})
app.listen(3000,function(){
  console.log("Server is Running on 3000");
})
