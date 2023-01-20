import app, { server } from '../src/server'
import prismaClient from "../src/helpers/db";
import request from 'supertest'


beforeAll(async () => {
  await prismaClient.movie.create({
    data: {
      title: "Lock, Stock and Two Smoking Barrels",
      year: 1998,
      director: "Guy Ritchie",
      runningTime: "1h47",
      trailerLink: "https://www.youtube.com/watch?v=HY7mRdQuUSw",
      thumbPath: "img/lock-stock-and-two-smoking-barrels.jpg",
      imdbScore: 8.2,
      synopsis: "Eddy persuades his three pals to pool money for a vital poker game against a powerful local mobster, Hatchet Harry. Eddy loses, after which Harry gives him a week to pay back 500,000 pounds."
    }
  })
})

afterAll(async () => {
  await prismaClient.movie.deleteMany({})
  server.close()
})

describe("GET /movie", () => {
  it("retrieve the complete list of movies", async () => {
    const res = await request(app).get("/movie")
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.data.length >= 0).toBe(true)
  })
})




