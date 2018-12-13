import express from 'express'
import { signin_post, signup_post } from '../controllers/auth-controller'

const app = express.Router()

app.post('/signin', signin_post )
app.post('/signup', signup_post )


app.get('', (req, res) => res.send('hello wores'))

export default app