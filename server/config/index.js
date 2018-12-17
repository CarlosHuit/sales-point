const MONGODB_URI_SERVER = process.env.MONGODB_URI || 'mongodb://admin:mX79zAzA@ds157549.mlab.com:57549/sales-point'
const MONGODB_URI_LOCAL  = process.env.MONGODB_URI || 'mongodb://localhost/salesPoint'

const PORT_SERVER = process.env.PORT || 8000
const PORT_LOCAL  = process.env.PORT || 3000


export const nameProject = 'SALES-POINT'
export const secret      = process.env.SECRET || 'mi clave secreta'
export const port        = process.env.NODE_ENV === 'production' ? PORT_SERVER        : PORT_LOCAL
export const mongoURL    = process.env.NODE_ENV === 'production' ? MONGODB_URI_SERVER : MONGODB_URI_LOCAL

