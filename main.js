var axios = require('axios').default;
var cors = require('cors');

const config = {
    headers: {
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US",
        Accept: "*/*",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
        Referer: "http://stats.nba.com/",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        Origin: "http://stats.nba.com",
      }
}

const express = require('express')
const app = express()
const port = 3000


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/playersList', (req, res) => {
    axios.get('https://stats.nba.com/stats/leaguedashplayerbiostats/?PerMode=Totals&LeagueID=00&Season=2016-17&SeasonType=Playoffs', config).then((resultado) => {
        res.send(resultado.data);
    }).catch((err) => {
        console.log('Error en playersList');
    });
    
});
app.post('/playerInfo', (req, res) => {
    axios.get(`https://stats.nba.com/stats/commonplayerinfo/?PlayerID=${req.body.playerID}`, config).then((resultado) => {
        res.send(resultado.data);
    }).catch((err) => {
        console.log('Error en playerInfo');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})