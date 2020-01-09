import jwt from 'jsonwebtoken'

const {
  JWT_SECRET,
} = process.env

export const signJwt = (uid: string) => {
  jwt.sign({ uid }, JWT_SECRET, { expiresIn: '1 week' })
}