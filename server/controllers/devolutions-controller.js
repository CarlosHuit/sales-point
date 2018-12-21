import Debug from 'debug'
import { nameProject          } from '../config'
import { Existences, Devolutions } from '../models'

export const saveDevolution = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: inventory:initialize-existences`)

  try {

    debug(req.body)


  } catch (error) {


    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err})

    
  }

}

