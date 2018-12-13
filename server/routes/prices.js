import express from 'express'
import { get_price, get_prices, save_price, save_prices, update_price } from '../controllers/prices-controller'

const app = express.Router()

app.post('/:id', save_price   )
app.post('/',    save_prices  )

app.get('/:id',  get_price    )
app.get('/',     get_prices   )

app.put('/:id',  update_price )

export default app