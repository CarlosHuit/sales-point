import Debug from 'debug'
import { nameProject } from '../config'
import { User } from '../models'
import { Clients } from '../models'

export const get_clients = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:get-all`)

  try {

    const clients = await Clients.find({}, {__v: 0})

    debug('Mostrando todos los clientes')
    res.status(200).json(clients)

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}

export const get_client = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: clients:get-one`)
  res.send('Mostrar un solo cliente');

}

export const save_client = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: clients:save-one`)

  try {

    const user_id = req.params.id
    const {name, address} = req.body

    const newCLient = new Clients({registerBy: user_id, name, address})
    const clientSaved = await newCLient.save()

    debug('Guardando cliente')
    res.status(200).json({
      message: 'Cliente Guardado',
      client: clientSaved
    })
    
  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }


}

export const save_clients = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:save-many`)
  res.send('Guardar varios clientes');

}

export const update_client = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:update`)

  try {

    const user_id = req.user._id
    const {name, address} = req.body
    const _id = req.params.id

    const update = await Clients.findByIdAndUpdate( _id, { $set: { registerBy: user_id, name, address }}, { new: true })
    
    debug('Cliente Actualizado')
    res.status(200).json(update)

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


