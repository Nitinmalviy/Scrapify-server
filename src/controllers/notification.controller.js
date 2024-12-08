import Notification from "../models/notification.model.js";

// API to add notifications
export const addNotification  = async(request,response,next)=>{
    try{
        const {userId,message,type} = request.body;
        const notification =  await Notification.create({userId,message,type});
        response.status(201).json({ message: 'Notification sent successfully',notification : notification });
    }catch(error){
        console.log(error)
        response.status(500).json({error:"internal server error"});
    }
}

// API to get notifications for a user
export const getNotification =async (request,response,next)=>{
    try {
      const userId = request.params.userId;
      console.log(userId)
      const notifications = await Notification.find({ userId });
      if(notifications){
      return response.status(200).json(notifications);
      }else{
      return response.status(400).json({massage : "userId not found"});
      }
    } catch (error) {
      return response.status(500).json({ error:"internal server error"});
    }
}

// API to mark as read
export const deleteNotification = async(request,response,next)=>{
    try {
        const notificationId = request.params.notificationId;
        let nobj = await Notification.deleteOne({_id:notificationId});

        if(nobj.deletedCount){
        return response.status(200).json({ message: 'Notification delete successfully' });
        }
        else{
            return response.status(400).json({ message: 'Notification Id  Not Found' });
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({error:"internal server error"});
    }
}


export const markRead = async(request,response,next)=>{
    try {
        const notificationId = request.params.notificationId;
        await Notification.findByIdAndUpdate(notificationId, { read: true });
        response.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.log(error)
        return response.status(500).json({error:"internal server error"});
    }
}