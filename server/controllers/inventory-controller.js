import Debug from 'debug'
import { nameProject  } from '../config'
import { Existences   } from '../models'

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


const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


