import express from 'express'
import {
  get_product,
  get_products,
  save_product,
  save_products,
  update_product,
} from '../controllers/products-controller'

import { save_price                } from '../controllers/prices-controller'
import { save_prev_price           } from '../controllers/previous-prices-controller'
import { validateUser, verifyToken, validateSKU } from '../middleware'


const app = express.Router()

app.get('/:id', get_product  )
app.get('/',    get_products )

app.post('/',          verifyToken, validateUser, validateSKU, save_product, save_price, save_prev_price  )
app.post('/save-many', save_products )

app.put('/:id', update_product)

export default app