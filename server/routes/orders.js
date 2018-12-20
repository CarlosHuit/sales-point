import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { get_order, get_orders, save_order, save_orders, update_order } from '../controllers/orders-controller'
import { save_inventory_entry } from '../controllers/inventory-controller'

const app = express.Router()

app.get('/:id',   verifyToken, validateUser, get_order    )
app.get('/',      verifyToken, validateUser, get_orders   )
app.post('/:id',  verifyToken, validateUser, save_order, save_inventory_entry )
app.post('/',     verifyToken, validateUser, save_orders  )
app.put('/:id',   verifyToken, validateUser, update_order )



export default app