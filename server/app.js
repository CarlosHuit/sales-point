import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import path from 'path'
import {
  auth,
  clients,
  providers,
  prices,
  products,
  orders,
  inventory,
  purchases
} from './routes'


const app = express()
const compress = compression()

app.use(compress)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if ( process.env.NODE_ENV === 'development' ) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT')
    next()
  })
}


if ( process.env.NODE_ENV === 'production' ) {

  app.use(express.static(path.join(process.cwd(), 'dist/sales-point')))

}



app.use('/api/auth',        auth      )
app.use('/api/clients',     clients   )
app.use('/api/providers',   providers )
app.use('/api/prices',      prices    )
app.use('/api/products',    products  )
app.use('/api/orders',      orders    )
app.use('/api/inventory',   inventory )
app.use('/api/purchases',   purchases )


export default app

