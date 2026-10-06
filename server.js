require('dotenv').config();
const express = require('express');
const cors = require('cors');
const otpRoutes = require('./routes/otpRoutes');

const app = express();



const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', otpRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'OTP Service API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
