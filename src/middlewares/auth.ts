import jwt from "jsonwebtoken"
import config from "../config/config"

export function protect(req, res, next) {
  const authHeader = req.headers.authorization

  if (!validAuthHeader(authHeader)) {
    res.status(401)
    res.json({ error: "Not a well-formed authorization header" })
    return
  }

  try {
    jwt.verify(getToken(authHeader), config.jwtSecret)
    next()
  } catch (e) {
    res.status(401)
    res.json({ error: "invalid token" })
    return
  }
}

function validAuthHeader(authHeader) {
  return !(authHeader === undefined || getToken(authHeader) === undefined)
}

function getToken(authHeader) {
  let [, token] = authHeader.split(" ") // considering "bearer" as first
  return token
}
