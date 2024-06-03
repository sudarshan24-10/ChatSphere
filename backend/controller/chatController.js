import Chat from "../model/chatModel.js"
import User from "../model/userModel.js" 

export const createChat = async function (req,res,next){
    try{
        const userId = req.body.userId;
        console.log("userId: " + userId);
        console.log("divide")
        console.log(req.user.id);
        let chat = await Chat.find({
            isGroupChat: false,
            $and: [
              { users: { $elemMatch: { $eq: req.user.id} } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users", "-password")
            .populate("latestMessage");

        chat=await User.populate(chat,{
          path:"latestMessage.sender",
          select:"firstName lastName email pic"
        })

        if (chat.length > 0) {
          res.send(chat[0]);
        } else {
          var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
          };
        }
        try{
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        }catch(err){
          res.status(400);
          throw new Error(err.message);
        }
    }catch(err){
        next(err);
    }
}

export const getChats=async(req,res,next)=>{
  console.log(req.user.id);
  try{
    const result=await Chat.find({users:{ $elemMatch:{$eq:req.user.id}}}).populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })

    result=await User.populate(result,{
      path:"latestMessage.sender",
      select:"firstName lastName email pic"
    })
    res.send(result);
  }catch(err){
    next(err);
  }
}


export const createGroupChat = async (req, res, next) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  var users = JSON.parse(req.body.users);
  const groupAdmin = await User.findByIdAndUpdate(req.user.id,{$set:{isAdmin:true}},{new:true});
  
  users.push(groupAdmin._id);
  
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user.id,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    next(error);
  }
};

export const renameGroupChat =async (req,res,next)=>{
  try{
    const result = await Chat.findByIdAndUpdate(req.body.chatId,{chatName:req.body.chatName},{new:true}).populate("users", "-password")
    .populate("groupAdmin", "-password");
    res.send(result);
  }catch(err){
    next(err);
  }
}

export  const addToGroupChat = async(req,res,next)=>{

  try{

    const added = await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        $push: { users: req.body.userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
      if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(added);
      }
  }catch(err){
      next(err);
  }
}

export const removeFromGroupChat = async(req,res,next)=>{
  try{

    const removed = await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        $pull: { users: req.body.userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
      if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(removed);
      }
  }catch(err){
      next(err);
  }
}