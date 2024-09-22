const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      // Expenses
      { name: '🏡 Housing', type: 'expense' },
      { name: '💡 Utilities', type: 'expense' },
      { name: '🛒 Groceries', type: 'expense' },
      { name: '🚗 Transportation', type: 'expense' },
      { name: '🍽️ Dining', type: 'expense' },
      { name: '🏥 Health', type: 'expense' },
      { name: '💳 Debt Repayment', type: 'expense' },
      { name: '🛍️ Shopping', type: 'expense' },
      { name: '🛡️ Insurance', type: 'expense' },
      { name: '📚 Education', type: 'expense' },
      { name: '🧾 Subscriptions', type: 'expense' },
      { name: '🛠️ Home Maintenance', type: 'expense' },
      { name: '✈️ Travel', type: 'expense' },
      { name: '🎬 Entertainment', type: 'expense' },
      { name: '💇‍♀️ Personal Care', type: 'expense' },
      { name: '🏋️‍♂️ Sports', type: 'expense' },
      { name: '🧸 Childcare', type: 'expense' },
      // Incomes
      { name: '💼 Salary', type: 'income' },
      { name: '📈 Business Income', type: 'income' },
      { name: '🎉 Bonuses', type: 'income' },
      { name: '💹 Investments', type: 'income' },
      { name: '💸 Pensions', type: 'income' },
      { name: '🧑‍🏫 Freelance', type: 'income' },
      { name: '🏛️ Government Benefits', type: 'income' },
      { name: '💰 Dividends', type: 'income' },
      { name: '🏠 Rental Income', type: 'income' },
      { name: '🎁 Gifts', type: 'income' },
      { name: '🔄 Refunds', type: 'income' },
      { name: '📚 Royalties', type: 'income' },
      { name: '🎯 Lottery', type: 'income' },
      { name: '🪙 Other', type: 'income' },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
