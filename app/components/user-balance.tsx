'use client';

import { useState, useEffect } from 'react';

function UserBalance() {
  const [balance, setBalance] = useState<string | null>(null);

  async function fetchBalance() {
    const response = await fetch('/api/user/balance');
    const data = await response.json();

    if (response.ok) {
      setBalance(data.balance);
    } else {
      console.error('Error fetching balance');
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return <p>Current balance: {balance}€</p>;
}

export default UserBalance;
