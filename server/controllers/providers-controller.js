import Debug from 'debug'
import { nameProject } from '../config'
import { User      } from '../models'
import { Providers } from '../models'

export const get_providers = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:get-all`)
  res.send('Mostrar todos los proveedores')  

}

export const get_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:get-one`)
  res.send('Mostrar un solo proveedor')  
  
}

export const save_provider = async (req, res, next) => {
  
  const debug = new Debug(`${nameProject}: providers:save-one`)

  try {

    const { registerBy, name, tel } = req.body

    const newProvider  = new Providers({registerBy, name, tel}) 
    const saveProvider = await newProvider.save()    

    debug('Guardando Cliente')
    res.status(200).json({
      message: 'Proveedor Guardado'
    })

  } catch (error) {
    handleError(res, error)
  }

}

export const save_providers = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:save-many`)
  res.send('Guardar varios proveedores')  

}

export const update_provider = async (req, res, next) => {

  const debug = new Debug(`${nameProject}: provicers:update`)
  res.send('Actualizar proveedor')

}


const handleError = (res, error) => {
  const debug = new Debug(`${nameProject}: providers:error`)
  debug(error)    
  const err = 'Ha ocurrido un error'
  debug(err)
  return res.status(400).json({message: err, error: err}) 
}


