import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("id1", "Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "id1" }});
        expect(productModel.toJSON()).toStrictEqual({
            id: "id1",
            name: "Product 1",
            price: 100,
        }); 
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("id1", "Product 1", 100);
        await productRepository.create(product);

        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({ where: { id: "id1" }});
        expect(productModel.toJSON()).toStrictEqual({
            id: "id1",
            name: "Product 2",
            price: 200,
        }); 
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("id1", "Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "id1" }});
        const productFound = await productRepository.find("id1");
        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price,
        });
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("id1", "Product 1", 100);
        const product2 = new Product("id2", "Product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2];
        expect(products.length).toBe(2);
        expect(products).toEqual(foundProducts);
    })


});