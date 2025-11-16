import { faker } from '@faker-js/faker';
import { PrismaClient } from 'generated/prisma/client';

export async function ordersSeed(ctx: PrismaClient) {
  console.log('🌱 Seeding orders...');

  const products = await ctx.product.findMany();
  const customers = await ctx.customer.findMany();

  if (products.length === 0) {
    throw new Error(
      '❌ Nenhum produto encontrado. Rode o seed de products primeiro.',
    );
  }

  if (customers.length === 0) {
    throw new Error(
      '❌ Nenhum customer encontrado. Rode o seed de customers primeiro.',
    );
  }

  const pickRandom = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  for (let i = 0; i < 200; i++) {
    const orderCode = `ORD-${new Date().getFullYear()}-${String(i + 1).padStart(4, '0')}`;

    // Decide o tipo do pedido
    const type = faker.helpers.arrayElement(['ONLINE', 'IN_STORE']);

    // Lógica para escolher cliente:
    // - ONLINE → sempre precisa cliente
    // - IN_STORE → 40% com cliente, 60% sem cliente
    let customerId: string | null = null;

    if (type === 'ONLINE') {
      customerId = pickRandom(customers).id;
    } else {
      const hasCustomer = Math.random() > 0.6;
      customerId = hasCustomer ? pickRandom(customers).id : null;
    }

    // Itens do pedido
    const itemsCount = faker.number.int({ min: 1, max: 4 });
    const selectedProducts = faker.helpers.arrayElements(products, itemsCount);

    const items = selectedProducts.map((product) => {
      const quantity = faker.number.int({ min: 1, max: 5 });
      return {
        productId: product.id,
        quantity,
        unitPriceInCents: product.priceInCents,
        totalInCents: product.priceInCents * quantity,
      };
    });

    const subtotalInCents = items.reduce(
      (acc, item) => acc + item.totalInCents,
      0,
    );
    const discountInCents =
      Math.random() < 0.15 ? Math.floor(subtotalInCents * 0.05) : 0;
    const totalInCents = subtotalInCents - discountInCents;

    // Endereço só para pedidos ONLINE
    const addressData =
      type === 'ONLINE'
        ? {
            address: faker.location.streetAddress(),
            complement: faker.location.secondaryAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
          }
        : {
            address: null,
            complement: null,
            city: null,
            state: null,
            zipCode: null,
          };

    await ctx.order.create({
      data: {
        orderCode,
        customerId,
        type,
        paymentMethod: faker.helpers.arrayElement(
          type === 'ONLINE'
            ? ['CREDIT_CARD', 'PIX', 'BOLETO']
            : ['CASH', 'PIX', 'CREDIT_CARD'],
        ),
        status: faker.helpers.arrayElement([
          'PENDING',
          'PROCESSING',
          'PREPARING_SHIPMENT',
          'SHIPPED',
          'DELIVERED',
          'CANCELED',
          'REFUNDED',
        ]),

        subtotalInCents,
        discountInCents,
        totalInCents,

        notes: faker.lorem.sentence(),

        ...addressData,

        items: {
          create: items,
        },
      },
    });
  }

  console.log('✅ Orders seed finalizado!');
}
