// const http = require('http');
// const fs = require('fs');
// const requests = require('requests');

// const homeFile = fs.readFileSync("home.html", "utf-8");

// const replaceVal = (tempVal, orgVal) => {
//     let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
//     temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
//     temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
//     temperature = temperature.replace("{%location%}", orgVal.name);
//     temperature = temperature.replace("{%country%}", orgVal.sys.country);

//     return temperature;
// };

// const server = http.createServer((req, res) => {
//     if (req.url == "/") {
//         requests(
//             'https://api.openweathermap.org/data/2.5/weather?q=Ghaziabad&appid=ad6f55288bdf40f28758ae22a4a071b0',
//         )
//         .on('data', (chunk) => {
//             const dataString = chunk.toString(); // Convert chunk to string
//             const objData = JSON.parse(dataString);
//             const arrData = [objData];

//             const realTimeData = arrData
//                 .map((val) => replaceVal(homeFile, val))
//                 .join("");

//             res.write(realTimeData); // Send the modified data to the client
//         })
//         .on('end',  (err) => {
//             if (err) return console.log('connection closed due to errors', err);

//             res.end(); // Complete the response
//         });
//     }
// });

// server.listen(8000, "127.0.0.1");
const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

    return temperature;
};

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
            'https://api.openweathermap.org/data/2.5/weather?q=Ghaziabad&appid=ad6f55288bdf40f28758ae22a4a071b0',
        )
        .on('data', (chunk) => {
            const dataString = chunk.toString();
            try {
                const objData = JSON.parse(dataString);
                const arrData = [objData];

                const realTimeData = arrData
                    .map((val) => replaceVal(homeFile, val))
                    .join("");

                // console.log("Modified Data:", realTimeData); // Log modified data

                res.write(realTimeData); // Send the modified data to the client
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
// Send the modified data to the client
            
        })
        .on('end',  (err) => {
            if (err) return console.log('connection closed due to errors', err);

            res.end(); // Complete the response
        });
    }
});

server.listen(8000, "127.0.0.1");

