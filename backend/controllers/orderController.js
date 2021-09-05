import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc        Create new order
// @routes      POST /api/orders
// @access      Private
 
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // making sure order items coming in is not empty
     if(orderItems && orderItems.length === 0) {
        //  400 bad request
         res.status(400)
         throw new Error('No order items')
         return
     } else {
         
        const order = new Order ({
            // ALL ARE IN THE FORM X: X
            orderItems,
            // attaching the user so you will be able to get the user 
            // details and token respectively
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        // res.status 201 means something was created

        res.status(201).json(createdOrder)

     }


});



// @desc        Get order by id
// @routes      GET /api/orders/:id
// @access      Private

export const getOrderById = asyncHandler(async (req, res) => {
    // getOrderById we are getting the Id of everything 
    // not the id of the user alone

    // we don't have other informations about the user that's
    // why we use .populate get it
    // because we only have the id of the user
    // not the name and the email
    const order = await Order
                        .findById(req.params.id)
                        .populate('user', 'name email')

    if(order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('order not found')
    }

});


// @desc        Update order to paid
// @routes      PUT /api/orders/:id/pay
// @access      Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {

    // getOrderById we are getting the Id of everything 
    // not the id of the user alone

    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.PaidAt = Date.now()
        
        // THE ORDER.PAYMENT RESULT WILL COME FROM PAYPAL
        // PAYPAL RESPONSE

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }
    else {
        res.status(404)
        throw new Error('order not found')
    }

});


// @desc        Update order to delivered
// @routes      PUT /api/orders/:id/deliver
// @access      Private/Admin

export const updateOrderToDelivered = asyncHandler(async (req, res) => {

    // getOrderById we are getting the Id of everything 
    // not the id of the user alone

    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }
    else {
        res.status(404)
        throw new Error('order not found')
    }

});



// @desc        Get logged in user orders 
// @routes      GET /api/orders/myorders
// @access      Private

export const getMyOrders = asyncHandler(async (req, res) => {

    // we are finding the orders by the ID
    // we are finding the user with the exact ID

    const orders = await Order.find({ user: req.user._id})

    res.json(orders)


});


// @desc        Get all orders
// @routes      GET /api/orders
// @access      Private/Admin

export const getOrders = asyncHandler(async (req, res) => {


    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)


});


