import Address from "../models/address.model.js";

export const addAddress = async (request, response) => {

    try {
        const { userId, recipientName, streetAddress, city, state, postalCode, country } = request.body;
        if (!userId || !recipientName || !streetAddress || !city || !state || !postalCode || !country) {
            return response.status(400).json({ error: 'Missing required fields' });
        }
        const existAddress = await Address.findOne({ userId });
        if (existAddress) {
            return response.status(409).json({ error: 'UserAddress alredy Exist' });
        }
        const result = await Address.create({ userId, recipientName, streetAddress, city, state, postalCode, country });
        return response.status(201).json({ message: "Address Add Succesfully", address: result });

    } catch (error) {
        console.log("Error in Add Address   : ", error);
        return response.status(500).json("Internal server error");
    }
}

export const getAddressByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;
        const address = await Address.find({ userId });
        if (!address) return response.status(404).json({ error: "userId not found" });
        return response.status(201).json(address);
    } catch (error) {
        console.log("Error in getting address by id", error);
        return response.status(500).json({ message: "Internal server error" });
    }
}

export const updateAddressById = async (request, response) => {
    const { userId } = request.params;
    const { recipientName, streetAddress, city, state, postalCode, country } = request.body;
    if (!userId || !recipientName || !streetAddress || !city || !state || !postalCode || !country) {
        return response.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const updatedAddress = await Address.updateOne({ userId }, { $set: request.body });
        if (!updatedAddress.matchedCount) {
            return response.status(404).json({ error: 'Address not found' });
        }
        const updatedData = await Address.find({ userId });
        response.status(200).json(updatedData);
    } catch (error) {
        console.log("Error in updating address ", error);
        return response.status(500).json({ error: "Internal server error" });
    }
};


export const deleteAddressByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;

        const result = await Address.deleteOne({ userId });

        if (result.deletedCount > 0) {
            return response.status(200).json({ message: "Address deleted successfully" });
        } else {
            return response.status(404).json({ error: "Address not found" });
        }
    } catch (error) {
        console.log("Error in delete Address ", error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};