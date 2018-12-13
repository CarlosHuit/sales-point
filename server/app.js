import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import path from 'path'
import { auth } from './routes'


const app = express()
const compress = compression()

app.use(compress)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if ( process.env.NODE_ENV === 'development' ) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}


if ( process.env.NODE_ENV === 'production' ) {

  app.use(express.static(path.join(process.cwd(), 'dist/weduc')))

}





app.use('/api/auth',                auth              )


export default app
