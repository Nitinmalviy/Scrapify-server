import { Cart } from "../models/cart.model.js";
import { product } from "../models/product.model.js";

export const addToCart = async (request, response, next) => {
    try {
        let { userId, productId } = request.body;
        let cart = await Cart.findOne({ userId });

        if (cart) {
            let status = cart.cartItems.some((product) => product.productId == productId);
            if (status) {
                return response.status(200).json({ message: "Product already added to your cart." });
            } else {
                cart.cartItems.push({ productId });
                await cart.save();
                return response.status(200).json({ message: "Product added to your cart items." });
            }
        } else {
            cart = await Cart.create({ userId, cartItems: [{ productId }] });
            return response.status(200).json({ message: "Product added successfully to the cart", cart: cart });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error" });
    }
}
//------
export const fetchCart = (request, response, next) => {
    let userId = request.params.userId;
    Cart.find({ userId: userId }).populate("userId").populate("cartItems.productId")
        .then((result) => {
            return response.status(200).json({ cart: result });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error..." });
        })
}
//--------
export const removeCartItems = (request, response, next) => {
    let { userId, productId } = request.body;
    Cart.updateOne({ userId: userId }, {
        $pull: { cartItems: { productId: productId } }
    })
        .then(result => {
            if (result.modifiedCount)
                return response.status(200).json({ message: "product removed successfully" });
            return response.status(401).json({ error: "Bad request (id not found)" });
        })
        .catch(err => {
            return response.status(500).json({ error: "Internal server error" });
        })
}
//--------
export const increaseQuantity = (request, response, next) => {
    let productId = request.body.productId;
    let userId = request.body.userId;
    Cart.findOneAndUpdate(
        { "cartItems.productId": productId, "userId": userId },
        { $inc: { "cartItems.$.quantity": 1 } },
        { new: true }
    )
        .then(updatedCart => {
            if (!updatedCart) {
                return response.status(404).json({ error: "Cart or product not found" });
            }
            return response.status(200).json({ data: updatedCart });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        });
};
//-------
export const decreaseQuantity = (request, response, next) => {
    let productId = request.body.productId;
    let userId = request.body.userId;

    Cart.findOneAndUpdate(
        { "cartItems.productId": productId, "userId": userId, "cartItems.quantity": { $gt: 0 } },
        { $inc: { "cartItems.$.quantity": -1 } },
        { new: true }
    )
        .then(updatedProduct => {
            if (!updatedProduct) {
                return response.status(404).json({ error: "Product not found or quantity already at 0" });
            }
            if (updatedProduct.cartItems.some(item => item.quantity === 0)) {
                return Cart.findOneAndUpdate(
                    { "userId": userId },
                    { $pull: { "cartItems": { quantity: 0 } } },
                    { new: true }
                );
            }
            return updatedProduct;
        })
        .then(finalUpdatedProduct => {
            return response.status(200).json({ data: finalUpdatedProduct });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        });
};



