import Vehicle from "../models/Vehicle.model.js";

export const addVahicle = async (request, response) => {
    try {
        const { vehicleNumber, ownerName } = request.body;
        const newVehicle = new Vehicle({ vehicleNumber, ownerName });
        const savedVehicle = await newVehicle.save();
        return response.status(201).json({ message: "vahhicle addedd successfully", Vahicle: savedVehicle });
    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
}