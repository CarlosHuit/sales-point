import express from 'express'
import { get_provider, get_providers, save_provider, save_providers, update_provider } from '../controllers/providers-controller'
import { verifyToken, validateUser } from '../middleware'

const app = express.Router()


app.get('/:id',  get_provider    )
app.get('/',     verifyToken, validateUser,  get_providers   )

app.post('/:id', verifyToken, validateUser, save_provider   )
app.post('/',    save_providers  )

app.put('/:id',  verifyToken, validateUser, update_provider )

export default app