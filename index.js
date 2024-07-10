const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    var k=req.body
    var cityName=k.cityName;
    console.log(cityName)
    if(cityName=="")
    {
       
        console.log(cities)
      let  rand=Math.floor(Math.random() * cities.length)
        cityName=cities[rand]
    }
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=2413aa948b867245ef6ba6759974ea96&q=" + cityName + "&units=metric";
    https.get(url, function (response) {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const result = `
                <h1>${cityName}</h1>
                <p>The Temperature in ${cityName}: ${temp}°C</p>
                <p>${desc}</p>
                <img src="${iconUrl}" alt="Weather Icon">
            `;
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Weather App</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <div class="container">
                        <h1>Weather App</h1>
                        <form action="/" method="post">
                            <label for="cityName">Enter City Name:</label>
                            <input type="text" id="cityName" name="cityName" placeholder="City Name">
                            <button type="submit">Get Weather</button>
                        </form>
                        <div id="weatherResult">
                            ${result}
                        </div>
                    </div>
                </body>
                </html>
            `);
        });
    });
});

app.listen(3000, () => {
    console.log("running on port 3000");
});


const cities = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Anguilla',
    'Antigua and Barbuda',
    'Argentina',
    'Aruba',
    'Austria',
    'Barbados',
    'Belgium',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Bulgaria',
    'Canada',
    'Colombia',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Federated States of Micronesia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Guyana',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Kenya',
    'Kuwait',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malta',
    'Marshall Islands',
    'Mexico',
    'Moldova',
    'Mongolia',
    'Montenegro',
    'Myanmar',
    'Netherlands',
    'New Zealand',
    'North Macedonia',
    'Norway',
    'Oman',
    'Palau',
    'Papua New Guinea',
    'Paraguay',
    'Philippines',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'Senegal',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'South Africa',
    'Spain',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Tanzania',
    'Thailand',
    'Tonga',
    'Trinidad and Tobago',
    'United Kingdom of Great Britain and Northern Ireland',
    'United States',
    'Vanuatu',
    'Zimbabwe'
  ];