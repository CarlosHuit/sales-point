import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { get_order, get_orders, save_order, save_orders, update_order } from '../controllers/orders-controller'

const app = express.Router()

app.get('/:id',   verifyToken, validateUser, get_order    )
app.get('/',      verifyToken, validateUser, get_orders   )
app.post('/:id',  verifyToken, validateUser, save_order   )
app.post('/',     verifyToken, validateUser, save_orders  )
app.put('/:id',   verifyToken, validateUser, update_order )



export default app