import Debug from 'debug'
import { nameProject } from '../config'
import { User } from '../models'
import { Clients } from '../models'

export const get_clients = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:get-all`)

}

export const get_client = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: clients:get-one`)
  
}

export const save_client = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: clients:save-one`)

}

export const save_clients = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: clients:save-many`)

}



const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}


