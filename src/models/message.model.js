import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'admin', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    scrapProductId: { type: Schema.Types.ObjectId, ref: 'ScrapProduct', required: true },
    message: { type: String, required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vahicle', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = model('Message', messageSchema);

export default Message;
