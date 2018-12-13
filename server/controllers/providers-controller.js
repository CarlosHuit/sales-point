import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Providers } from '../models'

export const get_providers = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:get-all`)
  res.send('Mostrar todos los proveedores')  

}

export const get_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:get-one`)
  res.send('Mostrar un solo proveedor')  
  
}

export const save_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:save-one`)
  res.send('Guardar un proveedor')  

}

export const save_providers = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:save-many`)
  res.send('Guardar varios proveedores')  

}

export const update_provider = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: provicers:update`)
  res.send('Actualizar proveedor')

}


const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


