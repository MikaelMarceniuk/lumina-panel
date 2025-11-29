import { PrismaClient, VehicleType } from 'generated/prisma/client';
import { faker } from '@faker-js/faker';

export const delivererSeed = async (ctx: PrismaClient) => {
  console.log('🌱 Seeding deliverers...');

  const vehicleTypes: VehicleType[] = [
    VehicleType.MOTORCYCLE,
    VehicleType.CAR,
    VehicleType.BICYCLE,
    VehicleType.VAN,
    VehicleType.SMALL_TRUCK,
  ];

  const deliverers = Array.from({ length: 50 }).map(() => {
    const vehicleType = faker.helpers.arrayElement(vehicleTypes);

    // Placa apenas para veículos motorizados
    const hasPlate = ['MOTORCYCLE', 'CAR', 'VAN', 'SMALL_TRUCK'].includes(
      vehicleType,
    );

    return {
      name: faker.person.fullName(),
      vehicleType,
      plateNumber: hasPlate
        ? faker.string.alphanumeric({ length: 7 }).toUpperCase()
        : null,
      isActive: faker.datatype.boolean(),
    };
  });

  await ctx.deliverer.createMany({
    data: deliverers,
  });

  console.log('✅ Deliverers seeded');
};
