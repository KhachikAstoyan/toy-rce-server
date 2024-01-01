import express from 'express'
import cors from 'cors'
import { authRouter } from './auth/auth.router'
import { validateEnv } from './utils/env'
import { db } from './db'
import { errorHandler } from './middleware/errorHandler'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use('/auth', authRouter())
app.use(errorHandler)

async function main() {
  await validateEnv()
  await db.connect()

  app.listen(PORT, () => {
    console.log('App listening on port ' + PORT)
  })
}

main()
