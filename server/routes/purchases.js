import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { get_order, get_orders, save_order, save_orders, update_order } from '../controllers/orders-controller'
import { get_purchase, get_purchases, save_purchase, save_purchases, update_purchase } from '../controllers/purchases-controller'
import { save_inventory_entry } from '../controllers/inventory-controller'

const app = express.Router()

app.get('/:id',   verifyToken, validateUser, get_purchase    )
app.get('/',      verifyToken, validateUser, get_purchases   )
app.post('/:id',  verifyToken, validateUser, save_purchase   )
app.post('/',     verifyToken, validateUser, save_purchases  )
app.put('/:id',   verifyToken, validateUser, update_purchase )



export default app