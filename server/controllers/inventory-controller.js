import Debug from 'debug'
import { nameProject          } from '../config'
import { Existences, Products } from '../models'

export const initialize_existences = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:initialize-existences`)

  try {

    const product_id = req.product_id

    const init = new Existences({
      product:      product_id,
      existences:   0,
      transactions: []
    })
    const save = await init.save();

    debug('Inicializando existencias')
    next()


  } catch (error) {


    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})

    
  }

}

export const save_inventory_entry = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: inventory:save-entry`)

  try {
    

    const order    = req.order
    const order_id = order._id
    const articles = order.articles

    for (let i = 0; i < articles.length; i++) {

      const article     = articles[i];
      const transaction = { order: order_id, quantity: article.quantity, typeTransaction:  'SAVEN'}
      const product     = article.product
      const decrement   = -(article.quantity)

      const addT = await Existences.findOneAndUpdate(
        { product },
        { $push: { transactions: transaction } }
      )

      const uE = await Existences.findOneAndUpdate(
        { product },
        { $inc: { existences: decrement } }
      )

    }

    debug('Existencias actualizadas')
    res.status(200).json({
      message: 'Pedido Facturado'
    })


  } catch (error) {
    debug(error)    
    const err = 'Error al facturar'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }


}




export const save_inventory_output = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:save-output`)

  try {
    

    const purchase    = req.purchase
    const purchase_id = purchase._id
    const articles = purchase.articles

    for (let i = 0; i < articles.length; i++) {

      const article     = articles[i];
      const transaction = { purchase: purchase_id, quantity: article.quantity, typeTransaction:  'ENCOM'}
      const product     = article.product
      const increment   = article.quantity

      const addT = await Existences.findOneAndUpdate(
        { product },
        { $push: { transactions: transaction } }
      )

      const uE = await Existences.findOneAndUpdate(
        { product },
        { $inc: { existences: increment } }
      )

    }

    debug('Existencias actualizadas')
    res.status(200).json({
      message: 'Compra Registrada'
    })


  } catch (error) {
    debug(error)    
    const err = 'Error al facturar'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}




export const get_inventory = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:get`)

  try {

    const inventory = await Existences.find({}, {transactions: 0, __v: 0, _id: 0})
      .populate('product', { sku: 1, description: 1 })

    res.status(200).json(inventory)

  } catch (error) {

    debug(error)    
    const err = 'Error al facturar'
    debug(err)
    res.status(400).json({message: err, error: err}) 

  }

}

export const get_product_existence = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: inventory:product-existence`)


  try {
    
    const code = req.params.id
    let product;
    

    product = await Products.findOne({sku: code})


    if (!product) {
      product = await Products.findOne({barcode: code})
    }

    if ( !product ) {

      debug('No se ha encontrado el producto')
      res.status(404).json({
        message: 'Producto No encontrado'
      })

    }

    if (product) {

      const existences = await Existences.findOne({product: product._id}).populate('product', { sku: 1, description: 1 })
      res.status(200).json(existences)

    }

    

  } catch (error) {

    debug(error)    
    const err = 'Error al consultar las existencias'
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


