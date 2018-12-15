import { nameProject } from '../config'
import { User } from '../models'
import Debug           from 'debug'
import { Products } from '../models'

const debug = new Debug(`${nameProject}: validate-SKU`)

export const validateSKU = async (req, res, next) => {

  
  try {
    const { sku } = req.body.product

    const existSku = await Products.findOne({sku})

    if (existSku) {
      
      debug('El SKU ya esta en uso')
      return res.status(400).json({
        message: 'Sku ya esta en uso',
        error:   'Sku ya esta en uso' 
      })
    }
  

    if (!existSku) {
      debug('SKU disponible')
      next()
    }

  } catch (error) {
    
    debug('Error al validar el SKU')
    debug(error)
    return res.status(400).json({
      message: 'Ha ocurrido un erro',
      error:   'Ha ocurrido un error'
    })

  }


}