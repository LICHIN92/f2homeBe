import mongoose from "mongoose";

const Db=async()=>{
    try {
       await mongoose.connect(process.env.connect_url)
        console.log(`connected with ${process.env.connect_url}`);
        
    } catch (error) {
        console.log(error);
        console.log('mongodb connection errr');
        
    }
}
 
export default Db