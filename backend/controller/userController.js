import User from "../model/userModel.js";

export const getUser = async function (req,res,next){
    try{
        const searchQuery = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        } : {};
    
        const users = await User.find({
            ...searchQuery,
            _id: { $ne: req.user._id }
        });
    
        res.send(users);
    }catch(err){
        next(err);
    }
}


