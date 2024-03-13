import Customer from "../customer/entity/customer";
import Order from "../checkout/entity/order";
import OrderItem from "../checkout/entity/order_item";
import { v4 as uuidv4 } from "uuid";

export default class OrderService {
    static total(orders: Order[]) {
        return orders.reduce((total, order) => total + order.total(), 0);
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
        if (orderItems.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const orderId = uuidv4();
        const order = new Order(orderId, customer.id, orderItems);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
};