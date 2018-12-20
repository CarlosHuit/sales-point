import express from 'express'
import {
  get_product,
  get_products,
  save_product,
  save_products,
  update_product,
} from '../controllers/products-controller'
import {
  validateUser,
  verifyToken,
  validateSKU
} from '../middleware'

import { save_price             } from '../controllers/prices-controller'
import { save_prev_price        } from '../controllers/previous-prices-controller'
import { initialize_existences  } from '../controllers/inventory-controller'

const app = express.Router()


app.get(
  '/:code',
  verifyToken,
  validateUser,
  get_product
)


app.get( 
  '/',
  verifyToken,
  validateUser,
  get_products
)


app.post(
  '/',
  verifyToken,
  validateUser,
  validateSKU,
  save_product,
  initialize_existences,
  save_price,
  save_prev_price
)


app.post(
  '/save-many',
  verifyToken,
  validateUser,
  save_products
)

app.put(
  '/:id',
  verifyToken,
  validateUser,
  update_product
)

export default app