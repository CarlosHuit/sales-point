import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { save_devolution  } from '../controllers/devolutions-controller'
import { save_inventory_entry_devolution } from '../controllers/inventory-controller'
const app = express.Router()

app.post('/:id', verifyToken, validateUser, save_devolution, save_inventory_entry_devolution )
// app.post('/',    save_prices  )

// app.get('/:id',  get_price    )
// app.get('/',     get_prices   )

// app.put('/:id_price_doc',   verifyToken, validateUser, add_prev_price, update_price )

export default app