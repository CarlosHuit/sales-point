import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Providers } from '../models'

export const get_providers = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:get-all`)

}

export const get_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:get-one`)
  
}

export const save_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:save-one`)

}

export const save_providers = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:save-many`)

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


