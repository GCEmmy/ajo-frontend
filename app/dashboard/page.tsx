"use client";
import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { ajoContract } from "@/lib/contract";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function Dashboard() {
  const { isConnected } = useAccount();

  const { writeContract: writeCreate, isPending: creatingGroup, isSuccess: groupCreated } = useWriteContract();
  const { writeContract: writeJoin, isPending: joiningGroup, isSuccess: groupJoined } = useWriteContract();
  const { writeContract: writeContribute, isPending: contributing, isSuccess: contributed } = useWriteContract();
  const { writeContract: writePayout, isPending: payingOut, isSuccess: payoutDone } = useWriteContract();

  const [createAmount, setCreateAmount] = useState("");
  const [createMembers, setCreateMembers] = useState("");
  const [joinGroupId, setJoinGroupId] = useState("");
  const [contributeGroupId, setContributeGroupId] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");
  const [payoutGroupId, setPayoutGroupId] = useState("");

  function createGroup() {
    if (!createAmount || !createMembers) return;
    writeCreate({
      ...ajoContract,
      functionName: "createGroup",
      args: [parseEther(createAmount), BigInt(createMembers)],
    });
  }

  function joinGroup() {
    if (!joinGroupId) return;
    writeJoin({
      ...ajoContract,
      functionName: "joinGroup",
      args: [BigInt(joinGroupId)],
    });
  }

  function contribute() {
    if (!contributeGroupId || !contributeAmount) return;
    writeContribute({
      ...ajoContract,
      functionName: "contribute",
      args: [BigInt(contributeGroupId)],
      value: parseEther(contributeAmount),
    });
  }

  function triggerPayout() {
    if (!payoutGroupId) return;
    writePayout({
      ...ajoContract,
      functionName: "triggerPayout",
      args: [BigInt(payoutGroupId)],
    });
  }

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #B67E7D15 0%, #ffffff 50%, #5DA87A15 100%)'}}>
      <nav style={{backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(46,107,70,0.1)'}} className="sticky top-0 z-50 flex justify-between items-center px-8 py-4">
        <a href="/" className="text-xl font-bold" style={{color: '#2E6B46'}}>Ajo</a>
        <ConnectWallet />
      </nav>

      {!isConnected ? (
        <div className="text-center py-32">
          <p className="text-gray-500 mb-4">Connect your wallet to continue</p>
          <ConnectWallet />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-6 py-12 grid gap-6">

          {/* FAUCET BANNER */}
          <div style={{background: 'rgba(93,168,122,0.1)', border: '1px solid rgba(46,107,70,0.2)'}} className="p-4 rounded-2xl text-center">
            <p className="text-sm text-gray-600 mb-2">Need test ETH to use Ajo on ARC Testnet?</p>
            <a href="https://faucet.circle.com/" target="_blank" style={{background: '#2E6B46'}} className="inline-block px-4 py-2 text-sm text-white rounded-xl hover:opacity-90">
              Get Free Test ETH from Circle Faucet
            </a>
          </div>

          {/* CREATE GROUP */}
          <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Create a New Ajo</h2>
            <input className="w-full border rounded-xl px-4 py-3 mb-3 text-sm" placeholder="Contribution amount (ETH e.g 0.01)" value={createAmount} onChange={e => setCreateAmount(e.target.value)} />
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Number of members (e.g 5)" value={createMembers} onChange={e => setCreateMembers(e.target.value)} />
            <button onClick={createGroup} disabled={creatingGroup} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
              {creatingGroup ? "Creating..." : "Create Ajo"}
            </button>
            {groupCreated && <p className="text-green-600 text-sm mt-2">Ajo created successfully!</p>}
          </div>

          {/* JOIN GROUP */}
          <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Join an Ajo</h2>
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Group ID" value={joinGroupId} onChange={e => setJoinGroupId(e.target.value)} />
            <button onClick={joinGroup} disabled={joiningGroup} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
              {joiningGroup ? "Joining..." : "Join Ajo"}
            </button>
            {groupJoined && <p className="text-green-600 text-sm mt-2">Joined successfully!</p>}
          </div>

          {/* CONTRIBUTE */}
          <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Make Contribution</h2>
            <input className="w-full border rounded-xl px-4 py-3 mb-3 text-sm" placeholder="Group ID" value={contributeGroupId} onChange={e => setContributeGroupId(e.target.value)} />
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Amount (ETH)" value={contributeAmount} onChange={e => setContributeAmount(e.target.value)} />
            <button onClick={contribute} disabled={contributing} style={{background: '#5DA87A'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
              {contributing ? "Sending..." : "Contribute"}
            </button>
            {contributed && <p className="text-green-600 text-sm mt-2">Contribution sent!</p>}
          </div>

          {/* TRIGGER PAYOUT */}
          <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Trigger Payout (Admin only)</h2>
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Group ID" value={payoutGroupId} onChange={e => setPayoutGroupId(e.target.value)} />
            <button onClick={triggerPayout} disabled={payingOut} style={{background: '#17402A'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
              {payingOut ? "Processing..." : "Trigger Payout"}
            </button>
            {payoutDone && <p className="text-green-600 text-sm mt-2">Payout triggered!</p>}
          </div>

        </div>
      )}
    </main>
  );
}
