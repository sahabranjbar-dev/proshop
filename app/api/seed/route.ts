import { faker } from "@faker-js/faker";
import prisma from "@/utils/prisma";

export async function GET() {
  console.log("Start seeding...");

  const products = [];

  for (let i = 0; i < 100; i++) {
    const title = faker.commerce.productName();
    const price = faker.commerce.price({
      min: 100_00,
      max: 100_000_000,
    });

    const product = {
      title: title,
      slug:
        faker.helpers.slugify(title).toLowerCase() +
        "-" +
        faker.string.alphanumeric(6),
      description: faker.commerce.productDescription(),
      content: faker.lorem.paragraphs(3),
      price: price,
      stock: faker.number.int({ min: 0, max: 1000 }),
      sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
      isPublished: faker.datatype.boolean(0.8), // 80% محصولات published
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    products.push(product);
  }

  // حذف محصولات موجود (اختیاری)
  await prisma.product.deleteMany();

  // ایجاد محصولات جدید
  await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${products.length} products.`);
}
