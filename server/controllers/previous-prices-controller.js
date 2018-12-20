import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { PreviousPrices, Prices, Products } from '../models'


export const get_prev_prices = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-previous-prices`)
  res.send('Mostrar todo el historial de precios ');
  
}

export const save_prev_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-previous-price`)

  try {

    const product_id = req.product_id
    const price_id   = req.price_id
    const { changedBy, product, date, costPrice, salesPrice } = req.body.price

    const newPrice    = {changedBy, product: product_id, date, costPrice, salesPrice}
    const addnewPrice = await PreviousPrices.findOneAndUpdate({product: product_id}, {$push: {historial: newPrice}})

    const prod = await Products.findById(product_id).populate('price', {salesPrice: 1, costPrice: 1})


    debug('Precio Guardado correctamente')
    res.status(200).json(prod)

  } catch (error) {

    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})   

  }


}

export const add_prev_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-previous-price`)

  try {

    const { changedBy, product, date, costPrice, salesPrice } = req.body

    const newPrice    = {changedBy, product, date, costPrice, salesPrice}
    const addnewPrice = await PreviousPrices.findOneAndUpdate({product: product}, {$push: {historial: newPrice}})

    debug('Prev Preci added')
    next()

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


