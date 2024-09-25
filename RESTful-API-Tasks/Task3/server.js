import express from 'express'
import axios from 'axios'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from 'cors'
import 'dotenv/config.js'
import bodyParser from 'body-parser'
import { error } from 'console'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

const API_KEY = process.env.API_KEY;

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.post('/weather', async (req, res) => {
  const { lat, lon } = req.body

  console.log(lat, lon)
  try {
   

    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )  //http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
