const express = require('express');
require('dotenv').config();
require('./db/connection');
const cors=require('cors');  
const Feedbackroutes = require('./routes/feedbackroutes');     
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/feedback', Feedbackroutes);

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
