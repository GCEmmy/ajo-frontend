"use client";
import { useState } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { ajoContract } from "@/lib/contract";
import { ConnectWallet } from "@/components/ConnectWallet";

const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const USDC_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export default function Dashboard() {
  const { isConnected } = useAccount();

  const { writeContract: writeCreate, isPending: creatingGroup, isSuccess: groupCreated } = useWriteContract();
  const { writeContract: writeJoin, isPending: joiningGroup, isSuccess: groupJoined } = useWriteContract();
  const { writeContract: writeApprove, isPending: approving, isSuccess: approved } = useWriteContract();
  const { writeContract: writeContribute, isPending: contributing, isSuccess: contributed } = useWriteContract();
  const { writeContract: writePayout, isPending: payingOut, isSuccess: payoutDone } = useWriteContract();

  const { data: groupCount } = useReadContract({
    ...ajoContract,
    functionName: "groupCount",
  });

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
      args: [parseUnits(createAmount, 6), BigInt(createMembers)],
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

  function approveUSDC() {
    if (!contributeAmount) return;
    writeApprove({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: "approve",
      args: [ajoContract.address, parseUnits(contributeAmount, 6)],
    });
  }

  function contribute() {
    if (!contributeGroupId) return;
    writeContribute({
      ...ajoContract,
      functionName: "contribute",
      args: [BigInt(contributeGroupId)],
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
            <p className="text-sm text-gray-600 mb-2">Need test USDC to use Ajo on ARC Testnet?</p>
            <a href="https://faucet.circle.com/" target="_blank" style={{background: '#2E6B46'}} className="inline-block px-4 py-2 text-sm text-white rounded-xl hover:opacity-90">
              Get Free Test USDC from Circle Faucet
            </a>
          </div>

          {/* CREATE GROUP */}
          <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Create a New Ajo</h2>
            <input className="w-full border rounded-xl px-4 py-3 mb-3 text-sm" placeholder="Contribution amount in USDC (e.g 10)" value={createAmount} onChange={e => setCreateAmount(e.target.value)} />
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Number of members (e.g 5)" value={createMembers} onChange={e => setCreateMembers(e.target.value)} />
            <button onClick={createGroup} disabled={creatingGroup} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
              {creatingGroup ? "Creating..." : "Create Ajo"}
            </button>
            {groupCreated && (
              <div style={{background: '#2E6B4610', border: '1px solid #2E6B46'}} className="mt-3 p-3 rounded-xl text-center">
                <p className="text-sm text-gray-600">Ajo created! Your Group ID is:</p>
                <p className="text-2xl font-bold" style={{color: '#2E6B46'}}>{groupCount ? Number(groupCount).toString() : "..."}</p>
                <p className="text-xs text-gray-400">Share this ID with your members</p>
              </div>
            )}
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
            <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Amount in USDC (e.g 10)" value={contributeAmount} onChange={e => setContributeAmount(e.target.value)} />
            <button onClick={approveUSDC} disabled={approving} style={{background: '#5DA87A'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90 mb-2">
              {approving ? "Approving..." : "Step 1: Approve USDC"}
            </button>
            {approved && (
              <button onClick={contribute} disabled={contributing} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
                {contributing ? "Sending..." : "Step 2: Contribute"}
              </button>
            )}
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
