import Debug from 'debug'
import { nameProject } from '../config'
import { User } from '../models'
import { Clients } from '../models'

export const get_clients = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:get-all`)
  res.send('Mostrar todos los clientes');

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
    debug(req.body)
    const newCLient = new Clients({registerBy: user_id, name, address})
    const save = await newCLient.save()

    debug('Guardando cliente')
    res.status(200).json({
      message: 'Cliente Guardado'
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
  res.send('Actualizar datos de cliente')

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


