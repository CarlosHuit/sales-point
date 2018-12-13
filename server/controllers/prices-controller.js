import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Prices } from '../models'

export const get_prices = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: prices:get-all`)

}

export const get_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-one`)
  
}

export const save_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-one`)

}

export const save_prices = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: prices:save-many`)

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


