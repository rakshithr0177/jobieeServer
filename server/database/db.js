import mongoose from "mongoose";

const Connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connect to database")
    })
    .catch(err => {
        console.log('error')
    })
}

export default Connect;