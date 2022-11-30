import express  from 'express';
import get from './router';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

dotenv.config()

const app=express()

mongoose.connect(process.env.DB_CREDENTIALS).then(() => {
  console.log('Database connection successful')
})
.catch(err => {
  console.error('Database connection error')
});
get(app) 
 
app.listen(process.env.PORT)


