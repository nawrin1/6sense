import express, { Application, Request } from 'express'
import cors from 'cors'
import router from './app/config/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'

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

app.use(globalErrorHandler);

app.use(notFound);
export default app
