import path from 'path'
import express  from "express";
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import  {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'




/* 

warning your postman no auth is not working oo

*/

const app = express();



dotenv.config()

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("API IS RUNNING ");
})

app.use('/api/products', productRoutes )
app.use('/api/users', userRoutes )
app.use('/api/orders', orderRoutes )
app.use('/api/upload', uploadRoutes )

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


// __dirname which will refer to the current directory is not available if we are using
// es modules it is only available if you are using common js
// then path.resolve we use to solve that
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(notFound)

app.use(errorHandler)



const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
