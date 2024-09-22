# Budget Tracker

A budget tracking application built with Next.js and TypeScript. This app allows users to manage their finances effectively, track expenses, and visualize their spending patterns.

## Project Description

Budget Tracker is a user-friendly application designed to help you manage your finances effectively. It features three main pages:

### 1. Dashboard

The dashboard offers a comprehensive overview of your financial situation, including:

- **Total Current Balance**
- **Monthly Balance**
- **Monthly Income**
- **Monthly Expenses**

From here, you can easily add new income or expenses through intuitive buttons. Clicking a button opens a modal where you can enter details such as description, amount, date, and category.

Additionally, the dashboard showcases:

- **Recent Transactions**: A list displaying the date, description, and amount of your latest transactions.
- **Visual Analytics**: Three dynamic graphs to help you understand your finances:
  - **Pie Chart**: Breakdown of income and expenses by category.
  - **Bar Chart**: Monthly history of income and expenses.
  - **Radial Chart**: Ratio of income to expenses.

You can navigate between months effortlessly using arrow buttons.
<img width="1000" alt="dashboard-1" src="https://github.com/user-attachments/assets/726c2a6b-fa0c-46e3-96ee-e6794db71848">

### 2. Transactions

The transactions page provides a detailed view of all your monthly transactions, including:

- Date
- Description
- Category
- Amount

You also have the option to delete any transaction, and navigation between months is made easy with arrow buttons.
<img width="1000" alt="transactions" src="https://github.com/user-attachments/assets/802c77dc-377a-4cff-9579-048c5b087d26">


### 3. Settings

In the settings page, you can view and edit your total current balance, giving you full control over your finances.

### Account Creation

During the account creation process, you’ll have access to a dedicated page where you can set your initial balance. This page is only accessible while creating your account (but you can still edit it later in Settings page).

### Data Encryption
All data related to transactions is securely encrypted, ensuring that your financial information remains confidential and protected.
<img width="1000" alt="transactions" src="https://github.com/user-attachments/assets/a7e37fd1-0e36-4a8b-8d8b-09199b920009">


### Responsive Design

The application is fully mobile-responsive, ensuring a seamless experience on devices of all sizes. Users can enjoy a consistent interface whether on a desktop, tablet, or smartphone.

### Light and Dark Mode

The app automatically adjusts between light and dark modes based on the user's system settings, providing a comfortable viewing experience at all times.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd budget-tracker
   ```

2. Install the dependencies: `npm i`

3. Create a Clerk account at [clerk.com](https://clerk.com/) and set up your application.

4. Create a `.env.local` file in the root directory of the project with the following environment variables:

   ```NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

   NEXT_PUBLIC_ENCRYPTION_KEY=
   ```

   Make sure to fill in the values from your Clerk account. The encryption key should be a long enough random string to secure the encryption process.

## Running the Project

To start the development server, run the following command: `npm run dev`

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Scripts

Here are the available scripts for managing your project:

- **Development:** `npm run dev` - Starts the development server.
- **Build:** `npm run build` - Compiles the application for production.
- **Start:** `npm run start` - Starts the production server.
- **Lint:** `npm run lint` - Runs ESLint to check for code quality issues.
- **Prepare Husky:** `npm run prepare` - Installs Husky for Git hooks.
- **Storybook:** `npm run storybook` - Starts Storybook for developing UI components.
- **Build Storybook:** `npm run build-storybook` - Builds the Storybook static files.
- **Seed Database:** `npm run seed` - Seeds the database with initial data.

## Technologies Used

- **Next.js:** A React framework for building server-side rendered applications.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **shadcn/ui:** A UI component library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Storybook:** A tool for developing and showcasing UI components.
- **Prisma:** A modern database toolkit to manage the database schema and migrations.
- **Clerk:** A user authentication solution.
- **GitHub CI:** Continuous integration for automating tests and deployments.
- **Husky:** A tool for managing Git hooks.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements or bugs.
