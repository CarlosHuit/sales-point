import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { get_inventory, get_product_existence } from '../controllers/inventory-controller'

const app = express.Router()


app.get('/:id',   verifyToken, validateUser, get_product_existence )
app.get('/',      verifyToken, validateUser, get_inventory         )


// app.post('/:id',  verifyToken, validateUser, save_order   )
// app.put('/:id',   verifyToken, validateUser, update_order )



export default app