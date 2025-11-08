import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connect = mongoose.connect("mongodb+srv://goyanihitisha32_db_user:VIlnNhbjIFr7QbnX@cluster0.bakloxs.mongodb.net/");

        return connect;

    }catch(error){
        throw new Error(error.message);
    };
};

export default connectDB;