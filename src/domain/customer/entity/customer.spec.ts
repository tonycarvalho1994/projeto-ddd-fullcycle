import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error if ID is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrow("Id is required");
    
    });

    it("should throw error if name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    
    });

    it("should change name", () => {
        // Arrange
        const customer = new Customer("123", "John Doe");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "12345", "City");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John Doe");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined while trying to activate customer", () => {
        expect(() => {
            const customer = new Customer("123", "John Doe");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
        
    });

    it("should add reward points", () => {
        const customer = new Customer("123", "John Doe");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })

});