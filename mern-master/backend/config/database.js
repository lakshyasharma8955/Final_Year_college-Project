const mongoose = require('mongoose');


require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
const connectDatabase = () => {
    mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        }).catch(error => console.log(error));;
}



module.exports = connectDatabase;