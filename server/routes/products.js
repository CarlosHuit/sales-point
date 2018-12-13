import express from 'express'
import { get_product, get_products, save_product, save_products } from '../controllers/products-controller'

const app = express.Router()

app.post('/:id', get_product  )
app.post('/',    get_products )

app.get('/:id', save_product  )
app.get('/',    save_products )

export default app