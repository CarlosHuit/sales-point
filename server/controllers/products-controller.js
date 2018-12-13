import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Products  } from '../models'

export const get_products = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: products:get-all`)
  res.send('Mostrar todos los productos')

}

export const get_product = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: products:get-one`)
  res.send('Mostrar un solo producto')  
  
}

export const save_product = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: products:save-one`)
  res.send('guardar un producto')

}

export const save_products = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: products:save-many`)
  res.send('guardar varios productos')

}

export const update_product = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: products:update`)
  res.send('actualizar producto')
}


const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


