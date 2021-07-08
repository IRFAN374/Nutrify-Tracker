import mongoose from 'mongoose'

const connectDB = async (DB_URL)=>{
    try {
        await mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("Successfull connected to DB:...");
    } catch (error) {
       console.log("Error in Connection DB",error);   
    }
}

export default connectDB;


