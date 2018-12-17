import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Products, PreviousPrices } from '../models'
import mongoose from 'mongoose'

export const get_products = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: products:get-all`)


  try {

    const products  = await Products.find({}, {__v: 0}).populate('price', {salesPrice: 1, costPrice: 1})

    if (products) {
      res.status(200).json(products)
    } else {
      res.status(200).json([])
    }

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }


}

export const get_product = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: products:get-one`)

  try {
    
    const code = req.params.code

    const prodBySku     = await Products.findOne({sku: code}, {__v: 0}).populate('price', {salesPrice: 1, costPrice: 1})
    const prodByBarcode = await Products.findOne({barcode: code}, {__v: 0}).populate('price', {salesPrice: 1, costPrice: 1})

    if (prodBySku) {

      res.status(200).json(prodBySku)

    } else if ( !prodBySku && prodByBarcode ) {

      res.status(200).json(prodByBarcode)

    } else if ( !prodBySku && !prodByBarcode ) {

      res.status(404).json({
        message: `El SKU ${code} no esta registrado`
      })

    }

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})
  }
  
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

  try {
    const product_id = req.params.id
    const user_id = req.user._id
    const { _id, barcode, sku, description } = req.body

    const update = await Products.findOneAndUpdate({_id: product_id}, { $set: {registerBy: user_id, barcode, sku, description}}, {new: true} )

    debug('Producto actualizado')
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


