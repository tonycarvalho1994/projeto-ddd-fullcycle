import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import ConsoleLogWhenAddressIsChangedHandler from "../customer/handler/console-log-when-address-is-changed.handler";
import ConsoleLogWhenCustomerIsCreatedHandler1 from "../customer/handler/console-log-when-customer-is-created-1.handler";
import ConsoleLogWhenCustomerIsCreatedHandler2 from "../customer/handler/console-log-when-customer-is-created-2.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.event";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register event handler", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister event handler", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            price: 100,
            description: "Description",
        });

        eventDispatcher.notify(productCreatedEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify event when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler1 = new ConsoleLogWhenCustomerIsCreatedHandler1();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        
        const eventHandler2 = new ConsoleLogWhenCustomerIsCreatedHandler2();
        const spyEventHandler2 = jest.spyOn(eventHandler1, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: 1,
            name: "Anakin Skywalker",
        });

        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify event when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new ConsoleLogWhenAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
                
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            customerId: 1,
            customerName: "Anakin Skywalker",
            newAddress: "Tatooine, Mos Espa, 1234",
        });

        eventDispatcher.notify(customerAddressChangedEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();
    });
})