import express from 'express'
import { get_provider, get_providers, save_provider, save_providers } from '../controllers/providers-controller'

const app = express.Router()

app.post('/:id', get_provider  )
app.post('/',    get_providers )

app.get('/:id', save_provider  )
app.get('/',    save_providers )

export default app