import Debug from 'debug'
import { nameProject } from '../config'
import { Orders      } from '../models'
import { PreviousPrices, Prices } from '../models'


export const get_order = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-one-order`)
  
}

export const get_orders = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-orders`)
  
}

export const save_order = async (req, res, next) => {
  
  const debug   = new Debug(`${nameProject}: prices:save-order`)
  
  try {


    const user_id = req.params.id
    const { billedBy, client, dateBilled, total, received, articles } = req.body
    const newOrder  = new Orders({billedBy, client: client._id, dateBilled, total, received, articles})
    const saveOrder = await newOrder.save();
    
    debug('Pedido Guardado')
    res.status(200).json({
      message: 'Pedido Facturado'
    })

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

const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


