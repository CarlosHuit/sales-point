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
  res.send('Guardar un solo cliente');

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


