import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Products  } from '../models'

export const get_products = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: products:get-all`)

}

export const get_product = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: products:get-one`)
  
}

export const save_product = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: products:save-one`)

}

export const save_products = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: products:save-many`)

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


