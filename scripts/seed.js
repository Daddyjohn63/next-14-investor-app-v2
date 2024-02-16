const { PrismaClient } = require('@prisma/client');

// Set the DATABASE_URL environment variable
process.env.DATABASE_URL = '';

const database = new PrismaClient();

async function main() {
  try {
    await database.sector.createMany({
      data: [
        { name: 'Agriculture' },
        { name: 'Automotive' },
        { name: 'Banking' },
        { name: 'Biotechnology' },
        { name: 'Chemicals' },
        { name: 'Construction' },
        { name: 'Consumer Goods' },
        { name: 'Education' },
        { name: 'Energy' },
        { name: 'Entertainment' },
        { name: 'Environmental' },
        { name: 'Financial Services' },
        { name: 'Food and Beverage' },
        { name: 'Healthcare' },
        { name: 'Hospitality' },
        { name: 'Information Technology' },
        { name: 'Insurance' },
        { name: 'Manufacturing' },
        { name: 'Media' },
        { name: 'Mining' },
        { name: 'Pharmaceuticals' },
        { name: 'Real Estate' },
        { name: 'Retail' },
        { name: 'Telecommunications' },
        { name: 'Transportation' },
        { name: 'Utilities' }
      ]
    });
    console.log('success');
  } catch (error) {
    console.log('Error seeding the data', error);
  } finally {
    await database.$disconnect();
  }
}

main();

//node scripts/seed.js
