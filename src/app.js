import 'dotenv/config.js'
import { connect } from 'mongoose'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

const server = express()

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(expressSession({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))
server.use('',express.static('public'))
server.use('/img',express.static('img'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

//database
connect('mongodb+srv://igna:hola1234@cluster0.dbl4oxi.mongodb.net/commerce') //requiere mínimo un parámetro: el link de conexión (URI)
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err))

export default server