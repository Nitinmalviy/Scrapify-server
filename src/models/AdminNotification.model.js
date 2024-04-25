import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ScrapProductId: {
        type: Schema.Types.ObjectId,
        ref: 'ScrapProduct',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

const AdminNotification = model('AdminNotification', notificationSchema);

export default AdminNotification;
