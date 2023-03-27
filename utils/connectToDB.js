const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(conn);
    } catch (error) {
        console.log(`An error occurred while connecting to MongoDB - ${error}`);
    }
};

module.exports = connectToDB;