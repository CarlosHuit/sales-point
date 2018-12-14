import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { PreviousPrices } from '../models'


export const get_prev_prices = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:get-previous-prices`)
  res.send('Mostrar todo el historial de precios ');
  
}

export const save_prev_price = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: prices:save-previous-price`)
  res.send('Agregar un precio al historial');

}

const handLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login Fallido',
    error:   message || 'Email y/o password no coinciden.'
  })
}

