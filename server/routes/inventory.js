import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { get_inventory } from '../controllers/inventory-controller'

const app = express.Router()


// app.get('/:id',   verifyToken, validateUser, get_order    )
app.get('/',      verifyToken, validateUser, get_inventory   )


// app.post('/:id',  verifyToken, validateUser, save_order   )
// app.put('/:id',   verifyToken, validateUser, update_order )



export default app