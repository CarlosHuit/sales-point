import Debug from 'debug'
import { nameProject } from '../config'
import { Orders      } from '../models'
import { PreviousPrices, Prices } from '../models'


export const get_order = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-one-order`)
  
}

export const get_orders = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-orders`)

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
        message: 'Mostrando ventas',
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

export const save_order = async (req, res, next) => {
  
  const debug   = new Debug(`${nameProject}: prices:save-order`)
  
  try {


    const user_id = req.params.id
    const { billedBy, client, dateBilled, total, received, articles } = req.body
    const newOrder  = new Orders({billedBy, client: client._id, dateBilled, total, received, articles})
    const saveOrder = await newOrder.save();
    
    debug('Pedido Guardado')
    req.order = saveOrder

    next()

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}

export const save_orders = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-orders`)

}

export const update_order = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:update-order`)


}

