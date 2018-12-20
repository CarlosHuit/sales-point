import Debug from 'debug'
import { nameProject } from '../config'
import { Providers } from '../models'

export const get_providers = async ( req, res, next) => {

  const debug = new Debug(`${nameProject}: providers:get-all`)

  try {
    
    const providers = await Providers.find({}, {__v: 0})

    debug('Mostrando todos los clientes')
    res.status(200).json(providers)

  } catch (error) {

    const debug = new Debug(`${nameProject}: providers:error`)
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    return res.status(400).json({message: err, error: err}) 
  }

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
      message: 'Proveedor Guardado',
      provider: saveProvider
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

  try {

    const user_id = req.user._id
    const {name, tel} = req.body
    const _id = req.params.id

    const update = await Providers.findByIdAndUpdate( _id, { $set: { registerBy: user_id, name, tel }}, { new: true })
    
    debug('Proveedor Actulizado')
    res.status(200).json(update)

  } catch (error) {
    debug(error)    
    const err = 'Ha ocurrido un error'
    debug(err)
    res.status(400).json({message: err, error: err}) 
  }

}


const handleError = (res, error) => {
  const debug = new Debug(`${nameProject}: providers:error`)
  debug(error)    
  const err = 'Ha ocurrido un error'
  debug(err)
  return res.status(400).json({message: err, error: err}) 
}


