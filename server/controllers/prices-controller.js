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

  try {

    const product_id = req.product_id
    const price_id   = req.price_id

    const { changedBy, product, date, costPrice, salesPrice } = req.body.price
  
    const newPrice = new Prices({_id: price_id, changedBy, product: product_id, date, costPrice, salesPrice})
    const save     = await newPrice.save()

    debug('Precio Guardado correctament')
    next()

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})    
  }


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


