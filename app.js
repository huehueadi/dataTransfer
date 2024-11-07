import express, { Router } from 'express';
import connection from './src/config/db.connect.js';
import router from './src/routes/authUser.js';

const app = express();

connection();

app.use(express.json());

// app.use('/api', router); 
app.use('/api', router);

   
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
