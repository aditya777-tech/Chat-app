import mongoose from 'mongoose';

const connectToMongoDB= async ()=>{
try{
await mongoose.connect(process.env.MONGO_DB_URI);
console.log("connected to mongo db");
}
catch(err){
    console.log(`something went wrong ${err.message}`);
}
}

export default connectToMongoDB;