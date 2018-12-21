import express from 'express'
import { verifyToken, validateUser, validateSKU } from '../middleware'
import { save_devolution, get_devolutions  } from '../controllers/devolutions-controller'
import { save_inventory_entry_devolution   } from '../controllers/inventory-controller'

const app = express.Router()

app.post('/:id', verifyToken, validateUser, save_devolution, save_inventory_entry_devolution )
app.get('/',     verifyToken, validateUser, get_devolutions  )
// app.post('/',    save_prices  )

// app.get('/:id',  get_price    )

// app.put('/:id_price_doc',   verifyToken, validateUser, add_prev_price, update_price )

export default app