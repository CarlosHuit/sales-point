import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Products, PreviousPrices } from '../models'
import mongoose from 'mongoose'

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

  try {

    const { registerBy, barcode, sku, description } = req.body.product

    const idProduct   = new mongoose.Types.ObjectId()
    const idPrice     = new mongoose.Types.ObjectId()
    const newProduct  = new Products({_id: idProduct, registerBy, barcode, sku, description, price: idPrice})
    const saveProduct = await newProduct.save()


    const newHistorialPrices = new PreviousPrices({product: idProduct, historial: []})
    const savePrevPricesHis  = await newHistorialPrices.save()

    debug('Producto Guardado')
    req.product_id = idProduct
    req.price_id   = idPrice
    next()

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }


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


