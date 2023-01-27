import dotenv from "dotenv"
dotenv.config()
import config from "./config/config"
import express from "express"
import cors from "cors"
import { protect } from "./middlewares/auth"
import { createMovie, getMovie, getMovies } from "./handlers/movie"

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/movie", async (req, res, next) => {
  try {
    console.log(req.query.offset)
    console.log(req.query.limit)
    let movies = await getMovies(req)
    res.json({ data: movies })
  } catch (e) {
    next(e)
  }
})

app.get("/movie/:id", async (req, res, next) => {
  try {
    let movie = await getMovie(req)
    res.json({ data: movie })
  } catch (e) {
    next(e)
  }
})

app.post("/movie", protect, async (req: express.Request, res, next) => {
  try {
    let newMovie = await createMovie(req)
    res.json({ data: newMovie })
  } catch (e) {
    next(e)
  }
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500)
  res.json({ message: "An error occured" })
})

let server = app.listen(config.port)

export { server }
export default app
