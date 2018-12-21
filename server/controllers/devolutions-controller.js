import Debug from 'debug'
import { nameProject } from '../config'
import { Devolutions } from '../models'

export const save_devolution = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: save-devolution`)

  try {

    const { product, registerBy, dateDevolution, quantity, observation } = req.body
    const devolution = new Devolutions({ product, registerBy, dateDevolution, quantity, observation })
    const saveDevolution = await devolution.save()

    debug('Guardando devolucion')
    req.devolution = saveDevolution
    next()

  } catch (error) {


    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})

    
  }

}



export const get_devolutions = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: get-devolutions`)

  try {

    const user_id = req.user._id
    const { initialDate, finalDate } = req.query
    const ins = initialDate;

    const devolutions = await Devolutions.find({
      dateDevolution: {
        '$gte': new Date(initialDate).toISOString(),
        '$lt':  new Date(finalDate).toISOString() 
      }
    })
    .populate('user',     { __v: 0 })
    .populate('product',  { __v: 0 })

    if (devolutions.length > 0) {
      debug('Mostrando devoluciones')
      res.status(200).json({
        message: 'Mostrando devoluciones',
        devolutions
      })
    } else {

      debug('No hay devoluciones registradas en el rango de fechas seleccionado')
      res.status(200).json({
        message:  'No hay devoluciones registradas en el rango de fechas seleccionado',
        devolutions:   []
      })

    }

  } catch (error) {

    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(500).json({message: err, error: err}) 

  }

}
