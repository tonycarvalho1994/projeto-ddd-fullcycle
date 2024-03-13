import Product from "./product";


describe("Product unit tests", () => {

    it("should throw error if id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("Id is required");
    });

    it("should throw error if name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrow("Name is required");
    });

    it("should throw error if price is equal to zero", () => {
        expect(() => {
            const product = new Product("123", "Product 1", 0);
        }).toThrow("Price must be greater than zero");
    });

    it("should change name", () => {
        // Arrange
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it("should throw error if name is empty after change", () => {
        expect(() => {
            const product = new Product("123", "Product 1", 100);
            product.changeName("");
        }).toThrow("Name is required");
    });

    it("should change price", () => {
        // Arrange
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);

        expect(product.price).toBe(200);
    });

    it("should throw error if price is equal to zero after change", () => {
        expect(() => {
            const product = new Product("123", "Product 1", 100);
            product.changePrice(0);
        }).toThrow("Price must be greater than zero");
    });
});