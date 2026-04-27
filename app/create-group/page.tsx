'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import abi from '@/abi/Ajo.json';

export default function CreateGroup() {
  const [amount, setAmount] = useState('');
  const [members, setMembers] = useState('');
  const { writeContract } = useWriteContract();

  return (
    <div>
      <h2>Create Group</h2>
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Members" onChange={(e) => setMembers(e.target.value)} />
      <button onClick={() =>
        writeContract({
          address: 'YOUR_CONTRACT_ADDRESS',
          abi,
          functionName: 'createGroup',
          args: [amount, members],
        })
      }>
        Create
      </button>
    </div>
  );
}
