import Order from "../models/order.model.js"


export const addOrder = async (request, response, next) => {
    try {
        const { userId, orderItems, totalPrice, status, orderPrice } = request.body;
        if (!userId || !orderItems || !totalPrice) {
            return res.status(400).json({ error: 'invalid Data' });
        }
        const newOrder = { userId, orderItems, totalPrice, status: status || 'pending', orderPrice }
        const savedOrder = await Order.create(newOrder);
        return response.status(201).json({ Order: savedOrder });
    } catch (error) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

// Get All order
export const getAllOrders = async (request, response) => {
    try {
        const orders = await Order.find().populate('userId').populate('orderItems.productId');
        return response.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const getOrderById = async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const order = await Order.findById(orderId).populate('userId').populate('orderItems.productId');
        if (!order) {
            return response.status(404).json({ error: 'Order not found' });
        }
        return response.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order by id:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const updateOrderStatus = async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const { status } = request.body;
        if (!status) {
            return response.status(400).json({ error: 'Status is required' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return response.status(404).json({ error: 'Order not found' });
        }
        return response.status(201).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteOrderById = async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return response.status(404).json({ error: 'Order not found' });
        }
        return response.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order by ID:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const getOrdersByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;
        const orders = await Order.find({ userId }).populate('userId').populate('orderItems.productId');
        if (!orders || orders.length === 0) {
            return response.status(404).json({ error: 'No orders found for this user' });
        }
        return response.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving order by user id:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const updateOrderByUserId = async (request, response) => {
    try {
        const { userId } = request.params;
        const { status } = request.body;
        if (!status) {
            return response.status(400).json({ error: 'Status is required' });
        }
        const updatedOrders = await Order.updateMany({ userId }, { status });

        if (!updatedOrders.modifiedCount) {
            return response.status(404).json({ error: 'No orders found for this user' });
        }
        return response.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status by user ID:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteOrdersByUserId = async (request, response) => {
    try {
        const { userId } = request.params;
        const deletedOrders = await Order.deleteMany({ userId });
        if (deletedOrders.deletedCount === 0) {
            return response.status(404).json({ error: 'No orders found for this user' });
        }
        return response.status(200).json({ message: 'Orders deleted successfully' });
    } catch (error) {
        console.error('Error deleting orders by user ID:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};


export const removeProductFromOrder = async (request, response) => {
    try {
        const { orderId, productId } = request.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return response.status(404).json({ error: 'Order not found' });
        }
        order.orderItems = order.orderItems.filter(item => item.productId.toString() !== productId);

        const updatedOrder = await order.save();
        response.status(201).json({ message: 'Product removed from order successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error removing product from order:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};