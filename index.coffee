express = require 'express'
cors = require 'cors'
bodyParser = require 'body-parser'
TikTokScraper = require('btch-downloader')

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded extended: true)

app.get '/tiktok/api.php', (req, res) ->
  url = req.query.url
  return res.status(400).json message: 'Missing URL' unless url
  TikTokScraper.tiktok(url).then (data) ->
    res.json(data)
  .catch (err) ->
    res.status(500).json message: 'Error processing URL', error: err.toString()

port = process.env.PORT or 3000
app.listen port, ->
  console.log "Server running on port #{port}"
