import express from 'express'
import { save_client, save_clients, get_client, get_clients, update_client } from '../controllers/clients-controller'
import { verifyToken, validateUser } from '../middleware'

const app = express.Router()

app.post('/:id', verifyToken, validateUser, save_client   )
app.post('/',    save_clients  )

app.get('/:id',  get_client    )
app.get('/',     get_clients   )

app.put('/:id',  update_client )

export default app