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

function GroupCard({ groupId, address }: { groupId: number; address: string }) {
  const { data: group } = useReadContract({
    ...ajoContract,
    functionName: "groups",
    args: [BigInt(groupId)],
  });

  const { data: members } = useReadContract({
    ...ajoContract,
    functionName: "getMembers",
    args: [BigInt(groupId)],
  });

  const { data: hasPaid } = useReadContract({
    ...ajoContract,
    functionName: "hasPaid",
    args: [BigInt(groupId), address as `0x${string}`],
  });

  if (!group) return null;

  const [admin, contributionAmount, memberCount, currentRound, active] = group as [string, bigint, bigint, bigint, boolean];
  const isAdmin = admin.toLowerCase() === address.toLowerCase();
  const isMember = (members as string[] || []).map((m: string) => m.toLowerCase()).includes(address.toLowerCase());

  if (!isAdmin && !isMember) return null;

  return (
    <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.2)'}} className="p-4 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold" style={{color: '#17402A'}}>Group #{groupId}</h3>
        <div className="flex gap-2">
          {isAdmin && <span className="text-xs px-2 py-1 rounded-lg" style={{background: '#2E6B4620', color: '#2E6B46'}}>Admin</span>}
          {isMember && !isAdmin && <span className="text-xs px-2 py-1 rounded-lg" style={{background: '#5DA87A20', color: '#5DA87A'}}>Member</span>}
          <span className="text-xs px-2 py-1 rounded-lg" style={{background: active ? '#5DA87A20' : '#e5353520', color: active ? '#5DA87A' : '#e53535'}}>{active ? 'Active' : 'Completed'}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">Contribution: {Number(contributionAmount) / 1e6} USDC</p>
      <p className="text-sm text-gray-600">Members: {(members as string[] || []).length}/{Number(memberCount)}</p>
      <p className="text-sm text-gray-600">Round: {Number(currentRound)}/{Number(memberCount)}</p>
      <p className="text-sm text-gray-600">Paid this round: {hasPaid ? "Yes ✅" : "No ❌"}</p>
    </div>
  );
}

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState("mygroups");

  const { writeContract: writeCreate, isPending: creatingGroup, isSuccess: groupCreated } = useWriteContract();
  const { writeContract: writeJoin, isPending: joiningGroup, isSuccess: groupJoined } = useWriteContract();
  const { writeContract: writeApprove, isPending: approving, isSuccess: approved } = useWriteContract();
  const { writeContract: writeContribute, isPending: contributing, isSuccess: contributed } = useWriteContract();
  const { writeContract: writePayout, isPending: payingOut, isSuccess: payoutDone } = useWriteContract();

  const { data: groupCount, refetch: refetchCount } = useReadContract({
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

  const totalGroups = groupCount ? Number(groupCount) : 0;
  const groupIds = Array.from({ length: totalGroups }, (_, i) => i + 1);

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
        <div className="max-w-2xl mx-auto px-6 py-8">

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {["mygroups", "create", "join", "contribute", "payout"].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); if(tab === "mygroups") refetchCount(); }}
                className="px-4 py-2 text-sm rounded-xl font-semibold whitespace-nowrap"
                style={{
                  background: activeTab === tab ? '#2E6B46' : 'rgba(255,255,255,0.8)',
                  color: activeTab === tab ? 'white' : '#2E6B46',
                  border: '1px solid rgba(46,107,70,0.2)'
                }}>
                {tab === "mygroups" ? "My Groups" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{background: 'rgba(93,168,122,0.1)', border: '1px solid rgba(46,107,70,0.2)'}} className="p-4 rounded-2xl text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Need test USDC to use Ajo on ARC Testnet?</p>
            <a href="https://faucet.circle.com/" target="_blank" style={{background: '#2E6B46'}} className="inline-block px-4 py-2 text-sm text-white rounded-xl hover:opacity-90">
              Get Free Test USDC from Circle Faucet
            </a>
          </div>

          {activeTab === "mygroups" && (
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold" style={{color: '#17402A'}}>My Groups</h2>
                <button onClick={() => refetchCount()} style={{color: '#2E6B46', border: '1px solid #2E6B46'}} className="px-3 py-1 text-xs rounded-xl">Refresh</button>
              </div>
              {totalGroups === 0 && <p className="text-gray-500 text-sm">No groups yet. Create or join one!</p>}
              {groupIds.map(id => (
                <GroupCard key={id} groupId={id} address={address || ""} />
              ))}
            </div>
          )}

          {activeTab === "create" && (
            <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Create a New Ajo</h2>
              <input className="w-full border rounded-xl px-4 py-3 mb-3 text-sm" placeholder="Contribution amount in USDC (e.g 10)" value={createAmount} onChange={e => setCreateAmount(e.target.value)} />
              <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Number of members (e.g 5)" value={createMembers} onChange={e => setCreateMembers(e.target.value)} />
              <button onClick={createGroup} disabled={creatingGroup} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
                {creatingGroup ? "Creating..." : "Create Ajo"}
              </button>
              {groupCreated && (
                <div style={{background: '#2E6B4610', border: '1px solid #2E6B46'}} className="mt-3 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-600">Ajo created successfully!</p>
                  <p className="text-sm text-gray-500 mt-1">Go to My Groups tab and click Refresh to see it.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "join" && (
            <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Join an Ajo</h2>
              <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Group ID" value={joinGroupId} onChange={e => setJoinGroupId(e.target.value)} />
              <button onClick={joinGroup} disabled={joiningGroup} style={{background: '#2E6B46'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
                {joiningGroup ? "Joining..." : "Join Ajo"}
              </button>
              {groupJoined && <p className="text-green-600 text-sm mt-2">Joined! Go to My Groups and click Refresh.</p>}
            </div>
          )}

          {activeTab === "contribute" && (
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
          )}

          {activeTab === "payout" && (
            <div style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{color: '#17402A'}}>Trigger Payout (Admin only)</h2>
              <input className="w-full border rounded-xl px-4 py-3 mb-4 text-sm" placeholder="Group ID" value={payoutGroupId} onChange={e => setPayoutGroupId(e.target.value)} />
              <button onClick={triggerPayout} disabled={payingOut} style={{background: '#17402A'}} className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90">
                {payingOut ? "Processing..." : "Trigger Payout"}
              </button>
              {payoutDone && <p className="text-green-600 text-sm mt-2">Payout triggered!</p>}
            </div>
          )}

        </div>
      )}
    </main>
  );
}
