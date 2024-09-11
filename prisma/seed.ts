const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Housing 🏡', type: 'expense' },
      { name: 'Utilities 💡', type: 'expense' },
      { name: 'Transportation 🚗', type: 'expense' },
      { name: 'Groceries 🛒', type: 'expense' },
      { name: 'Health 🩺', type: 'expense' },
      { name: 'Entertainment 🎉', type: 'expense' },
      { name: 'Education 🎓', type: 'expense' },
      { name: 'Clothing 👗', type: 'expense' },
      { name: 'Personal Care 🧴', type: 'expense' },
      { name: 'Savings 💰', type: 'expense' },
      { name: 'Debt Repayment 💳', type: 'expense' },
      { name: 'Gifts and Donations 🎁', type: 'expense' },
      { name: 'Travel ✈️', type: 'expense' },
      { name: 'Miscellaneous 🗂️', type: 'expense' },
      { name: 'Salary 💼', type: 'income' },
      { name: 'Bonuses 🎉', type: 'income' },
      { name: 'Freelance Work 🖥️', type: 'income' },
      { name: 'Rental Income 🏠', type: 'income' },
      { name: 'Investment Income 📈', type: 'income' },
      { name: 'Dividends 💵', type: 'income' },
      { name: 'Interest 💸', type: 'income' },
      { name: 'Gifts 🎁', type: 'income' },
      { name: 'Government Benefits 💼', type: 'income' },
      { name: 'Pension 👴', type: 'income' },
      { name: 'Royalties 📚', type: 'income' },
      { name: 'Side Hustles 🚀', type: 'income' },
      { name: 'Reimbursements 💳', type: 'income' },
      { name: 'Other Income 🌟', type: 'income' },
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
