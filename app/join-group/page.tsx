'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import abi from '@/abi/Ajo.json';

export default function JoinGroup() {
  const [groupId, setGroupId] = useState('');
  const { writeContract } = useWriteContract();

  return (
    <div>
      <h2>Join Group</h2>
      <input placeholder="Group ID" onChange={(e) => setGroupId(e.target.value)} />
      <button onClick={() =>
        writeContract({
          address: 'YOUR_CONTRACT_ADDRESS',
          abi,
          functionName: 'joinGroup',
          args: [groupId],
        })
      }>
        Join
      </button>
    </div>
  );
}
