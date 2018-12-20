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

}


export const save_inventory_output = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:save-output`)

}


export const get_inventory_movements = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:get`)

}


const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


