import express from 'express'
import cors from 'cors'
import router from './router/index'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', router)

const port = 4000

app.listen(port, () => {
  console.log(`Starting app at port ${port}`)
})
