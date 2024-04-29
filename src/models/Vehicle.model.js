import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const vehicleSchema = new Schema({
    vehicleNumber: { type: String, required: true },
    ownerName: { type: String, required: true }
});

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;
