import express, { Application, Request } from 'express'
import cors from 'cors'
import router from './app/config/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

//routes
app.use('/api/v1', router);

const test = async (req: Request, res: any) => {
  res.status(200).json({
    message: 'Hello ',
  })
}

app.get('/', test)
export default app
