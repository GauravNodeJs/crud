import express  from 'express';
import get from './router.js';
import mongoose from 'mongoose'


const app=express()

mongoose.connect('mongodb://localhost:27017/NewUsers').then(() => {
  console.log('Database connection successful')
})
.catch(err => {
  console.error('Database connection error')
});
get(app) 
 
app.listen(3000)


