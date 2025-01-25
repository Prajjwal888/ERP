import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminroute from './routes/adminRoute.js';
import studentRoute from './routes/studentRoute.js'
import { connectDB } from './config/db.js';
import facultyroute from './routes/facultyRoute.js';
const app = express();
const PORT=4000||process.env.PORT;
app.use(cors());
app.use(express.json());
dotenv.config();
app.get('/',(req,res) => {
    res.send('Server is ready and running on port 4000');
});

connectDB(); 

app.use('/api/admin',adminroute);
app.use('/api/student',studentRoute);
app.use('/api/faculty',facultyroute);

app.listen(PORT,() => {        
    console.log(`Server is running on port ${PORT}`);
})
