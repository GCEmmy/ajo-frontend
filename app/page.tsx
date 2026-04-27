import { ConnectWallet } from "@/components/ConnectWallet";

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900" style={{background: 'linear-gradient(135deg, #B67E7D15 0%, #ffffff 50%, #5DA87A15 100%)'}}>

      {/* NAVBAR */}
      <nav style={{backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(46,107,70,0.1)'}} className="sticky top-0 z-50 flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold" style={{color: '#2E6B46'}}>Ajo</h1>
        <ConnectWallet />
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-24 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight mb-6" style={{color: '#17402A'}}>
          Run your Ajo<br/>without stress.
        </h1>
        <p className="text-lg mb-4 font-semibold" style={{color: '#2E6B46'}}>
          No cheating. No stories. No disappearing treasurers.
        </p>
        <p className="text-gray-700 mb-10">
          Track contributions, automate payouts, and keep everyone accountable.
          Your circle stays in control, always.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/dashboard" style={{background: '#2E6B46'}} className="px-8 py-4 text-white rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg">
            Start an Ajo
          </a>
          <a href="/dashboard" style={{border: '2px solid #2E6B46', color: '#2E6B46', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.6)'}} className="px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-all">
            Join a Circle
          </a>
        </div>
        <p className="text-xs mt-6" style={{color: '#5DA87A'}}>Secure. Transparent. No middleman handling your money.</p>
      </section>

      {/* PROBLEM */}
      <section className="px-6 py-16 text-center" style={{background: 'rgba(182,126,125,0.08)'}}>
        <h2 className="text-2xl font-bold mb-10" style={{color: '#17402A'}}>Ajo is powerful — but it comes with problems</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-left mb-6">
          {['Someone delays payment', 'Records get messy or lost', 'Organizer stress is too much', 'Trust issues start creeping in'].map((item, i) => (
            <div key={i} style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-4 rounded-2xl shadow-sm text-sm text-gray-700">{item}</div>
          ))}
        </div>
        <p className="text-sm italic text-gray-600">It should not be this hard to save together.</p>
      </section>

      {/* SOLUTION */}
      <section className="px-6 py-16 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-10" style={{color: '#17402A'}}>Now your Ajo runs itself</h2>
        <div className="grid grid-cols-1 gap-4 text-left max-w-md mx-auto">
          {['Contributions are tracked automatically', 'Everyone sees what is happening in real time', 'Payouts happen based on agreed rules', 'No one can change things halfway'].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-bold mt-1" style={{color: '#5DA87A'}}>—</span>
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-semibold" style={{color: '#2E6B46'}}>No arguments. Just structure.</p>
      </section>

      {/* TRUST */}
      <section className="px-6 py-16 text-center" style={{background: 'rgba(93,168,122,0.08)'}}>
        <h2 className="text-2xl font-bold mb-10" style={{color: '#17402A'}}>Built so nobody can cheat the system</h2>
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto text-left">
          {['Rules are locked from the start', 'Money follows the plan, not people moods', 'Every transaction is visible to the group'].map((item, i) => (
            <div key={i} style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-4 rounded-2xl shadow-sm text-sm text-gray-700">{item}</div>
          ))}
        </div>
        <p className="text-xs mt-8" style={{color: '#5DA87A'}}>Powered by secure blockchain technology.</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-10" style={{color: '#17402A'}}>How it works</h2>
        <div className="grid grid-cols-2 gap-6 text-left">
          {[
            {n:'1', t:'Create your circle', d:'Set contribution amount, members, and payout order'},
            {n:'2', t:'Invite your people', d:'Friends, family, colleagues'},
            {n:'3', t:'Everyone contributes', d:'Payments are tracked automatically'},
            {n:'4', t:'Payouts happen on schedule', d:'No reminders. No pressure. No drama.'},
          ].map((item, i) => (
            <div key={i} style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,107,70,0.1)'}} className="p-5 rounded-2xl shadow-sm">
              <p className="font-bold text-lg mb-1" style={{color: '#5DA87A'}}>{item.n}</p>
              <p className="font-semibold text-sm mb-1" style={{color: '#17402A'}}>{item.t}</p>
              <p className="text-xs text-gray-500">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6" style={{color: '#17402A'}}>Start your Ajo the smarter way</h2>
        <a href="/dashboard" style={{background: '#2E6B46'}} className="inline-block px-10 py-4 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl">
          Create Your Circle Now
        </a>
        <p className="text-sm mt-4" style={{color: '#5DA87A'}}>Takes less than 2 minutes. No stress.</p>
      </section>

    </main>
  );
}
