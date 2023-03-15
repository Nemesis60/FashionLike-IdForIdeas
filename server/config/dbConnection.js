const mongoose = require('mongoose');

const mongoDBConnection = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB connected successfully')
    })
    .catch((error) => {
        console.log('Oh no an error in DB :O', error)
    })
}

module.exports = mongoDBConnection