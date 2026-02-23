import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MARQUEE_ITEMS = [
  'Zero Fees',
  'Instant Settlement',
  'QR Payments',
  'Smart Contracts',
  'Non-Custodial',
  'Polygon Network',
  'MetaMask',
  'Decentralized',
];

const FEATURES = [
  { icon: '🔐', title: 'Non-Custodial', desc: 'You own your keys. Full control, zero middlemen.' },
  { icon: '⚡', title: 'QR Payments', desc: 'Scan and pay instantly. Simple as your favorite app.' },
  { icon: '🌐', title: 'No Borders', desc: 'Send anywhere, anytime. No banks, no restrictions.' },
  { icon: '📜', title: 'Smart Contracts', desc: 'Powered by Ethereum. Secure and immutable.' },
  { icon: '🔍', title: 'Transparent', desc: 'Every transaction on-chain. Verify everything.' },
  { icon: '🛡️', title: 'Censorship Resistant', desc: 'Unstoppable payments. No one can freeze funds.' },
];

const STEPS = [
  { num: '01', title: 'Connect Wallet', desc: 'Link MetaMask in seconds' },
  { num: '02', title: 'Scan QR Code', desc: "Point camera at merchant's code" },
  { num: '03', title: 'Confirm Amount', desc: 'Review and approve' },
  { num: '04', title: 'Done!', desc: 'Payment sent on-chain instantly' },
];

const COMPARISON = [
  { feature: 'Fees', us: '✓ 0%', them: '✗ 1-3%' },
  { feature: 'Custody', us: '✓ Self-custodial', them: '✗ Custodial' },
  { feature: 'Censorship', us: '✓ Resistant', them: '✗ Possible' },
  { feature: 'Cross-border', us: '✓ Instant', them: '✗ Days + fees' },
  { feature: 'Privacy', us: '✓ Pseudonymous', them: '✗ KYC' },
  { feature: 'Downtime', us: '✓ Never', them: '✗ Occasional' },
];

export default function Home({ connectWallet }) {
  const navigate = useNavigate();
  const handleLaunch = async () => {
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (_) {}
  };

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-orbs">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <span className="hero-badge-dot" />
          Live on Blockchain
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <span className="hero-title-line1">Send Crypto.</span>
          <span className="hero-title-line2">Instantly.</span>
        </motion.h1>

        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          The future of payments is here. Scan QR codes, send crypto instantly, and stay in full control. No banks, no limits.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <button type="button" className="btn-primary" onClick={handleLaunch}>
            Launch App →
          </button>
          <a href="#how-it-works" className="btn-ghost">
            How it works
          </a>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip">
        <div className="marquee-inner animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-width">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">0%</div>
            <div className="stat-label">Platform Fees</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">&lt;2s</div>
            <div className="stat-label">Transaction Speed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">∞</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Built different. By design.</h2>
        <p className="section-subtitle">
          Not your typical payment app. Powered by blockchain, owned by you.
        </p>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-section">
        <h2 className="section-title">How it works</h2>
        <p className="section-subtitle">Four simple steps to financial freedom.</p>
        <div className="how-grid">
          <ul className="how-steps">
            {STEPS.map((s) => (
              <li key={s.num} className="how-step">
                <span className="how-step-num">{s.num}</span>
                <div className="how-step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>DecentroPay</th>
                  <th>PhonePe / GPay</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className="us">{row.us}</td>
                    <td className="them">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
