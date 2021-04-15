import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, currentUser } from '@mtbtickets/common'

import { createOrderRouter } from './routes/new'
import { indexOrderRouter } from './routes/index'
import { showOrderRouter } from './routes/show'
import { deleteOrderRouter } from './routes/delete'

const app = express()
app.set('trust proxy', true)
app.use(json())
// app.use(
//     cookieSession({
//         signed: false,
//         secure: process.env.NODE_ENV !== 'test'
//     })
// )
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)
app.use(currentUser)

app.use(createOrderRouter)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)

app.get('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }