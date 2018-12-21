import express from 'express'
import { verifyToken, validateUser } from '../middleware'
import { saveDevolution } from '../controllers/devolutions-controller'

const app = express.Router()

app.post('/:id', verifyToken, validateUser, saveDevolution  )
// app.post('/',    save_prices  )

// app.get('/:id',  get_price    )
// app.get('/',     get_prices   )

// app.put('/:id_price_doc',   verifyToken, validateUser, add_prev_price, update_price )

export default app