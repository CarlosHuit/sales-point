import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Prices } from '../models'

export const get_prices = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: prices:get-all`)
  res.send('Mostrar todos los precios')

}

export const get_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-one`)
  res.send('mostrar un solo precio')
  
}

export const save_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-one`)
  res.send('guardar el precio de un producto')

}

export const save_prices = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: prices:save-many`)
  res.send('guardar varios precios')

}

export const update_price = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: prices:update`)
  res.send('actualizar precio')

}


const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


