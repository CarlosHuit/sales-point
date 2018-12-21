import Debug from 'debug'
import { nameProject          } from '../config'
import { Existences, Devolutions } from '../models'

export const save_devolution = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:initialize-existences`)

  try {

    const { product, registerBy, dateDevolution, quantity, observation } = req.body
    const devolution = new Devolutions({ product, registerBy, dateDevolution, quantity, observation })
    const saveDevolution = await devolution.save()

    debug('Guardando devolucion')
    req.devolution = saveDevolution
    next()
    // res.status(200).json({
    //   message: 'Devolución Guardada'
    // })

  } catch (error) {


    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})

    
  }

}

