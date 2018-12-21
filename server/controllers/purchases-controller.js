import Debug from 'debug'
import { nameProject } from '../config'
import { Orders, Purchases      } from '../models'


export const get_purchase = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: purchase:get-purchase`)
  
}

export const get_purchases = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: purchase:get-purchases`)

  try {

    const user_id = req.user._id
    const { initialDate, finalDate } = req.query
    const ins = initialDate;

    const orders = await Orders.find({
      dateBilled: {
        '$gte': new Date(initialDate).toISOString(),
        '$lt':  new Date(finalDate).toISOString() 
      }
    })
    .populate('client', {__v: 0})
    .populate('articles.product', { __v: 0, _d: 0 })
    .populate('billedBy', {firstName:1 , lastName: 1})

    if (orders.length > 0) {
      debug('Mostrando ventas')
      res.status(200).json({
        message: 'Hola mundo',
        orders
      })
    } else {

      debug('No hay ventas registradas en el rango de fechas seleccionado')
      res.status(200).json({
        message:  'No hay ventas registradas en el rango de fechas seleccionado',
        orders:   []
      })

    }

  } catch (error) {

    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(500).json({message: err, error: err}) 

  }
}

export const save_purchase = async (req, res, next) => {
  
  const debug   = new Debug(`${nameProject}: purchase:save-purchase`)

  try {


    const user_id = req.params.id
    const { registerBy, provider, purchaseDate, total, payment, articles } = req.body
    const newOrder  = new Purchases({registerBy, provider: provider._id, purchaseDate, total, payment, articles})
    const saveOrder = await newOrder.save();
    
    debug('Compra Guardada')
    req.order = saveOrder

    next()

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}

export const save_purchases = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: purchase:save-purchases`)

}

export const update_purchase = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: purchase:update-order`)


}

