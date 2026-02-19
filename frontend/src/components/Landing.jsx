import { motion } from 'framer-motion';
import {
  FiZap,
  FiShield,
  FiGlobe,
  FiActivity,
  FiLock,
  FiSmartphone,
  FiFileText,
  FiPlay,
} from 'react-icons/fi';

const FEATURES_MARQUEE = [
  'Instant Transfers',
  'Zero Fees',
  'Bank-Grade Security',
  'Global Access',
  'Lightning Fast',
  '100% Uptime',
  'Permissionless',
  'Decentralized',
];

const BUILT_DIFFERENT = [
  {
    icon: FiLock,
    title: 'Non-Custodial',
    desc: 'You own your keys, you own your crypto. Full control, zero middlemen.',
  },
  {
    icon: FiSmartphone,
    title: 'QR Payments',
    desc: 'Scan and pay instantly. As simple as your favorite payment app.',
  },
  {
    icon: FiGlobe,
    title: 'No Borders',
    desc: 'Send money anywhere, anytime. No banks, no restrictions.',
  },
  {
    icon: FiFileText,
    title: 'Smart Contracts',
    desc: 'Powered by Ethereum. Secure, transparent, and immutable.',
  },
  {
    icon: FiActivity,
    title: 'Transparency',
    desc: 'Every transaction on-chain. Verify everything yourself.',
  },
  {
    icon: FiShield,
    title: 'Censorship Resistant',
    desc: 'Unstoppable payments. No one can freeze or block your funds.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Connect Wallet', desc: "Link your MetaMask wallet in seconds" },
  { step: '02', title: 'Scan QR Code', desc: "Point camera at merchant's payment code" },
  { step: '03', title: 'Confirm Amount', desc: 'Review and approve the transaction' },
  { step: '04', title: 'Done!', desc: 'Payment sent on-chain instantly' },
];

const COMPARISON = [
  { feature: 'Transaction Fees', us: '✓ 0%', them: '1-3%' },
  { feature: 'Custody', us: '✓ Self-Custodial', them: 'Custodial' },
  { feature: 'Censorship', us: '✓ Resistant', them: 'Possible' },
  { feature: 'Cross-Border', us: '✓ Instant', them: 'Days + Fees' },
  { feature: 'Privacy', us: '✓ Pseudonymous', them: 'KYC Required' },
  { feature: 'Downtime', us: '✓ Never', them: 'Occasional' },
];

const Landing = ({ connectWallet }) => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative text-text-color">
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight mb-6 text-current">
            Pay Anyone,<br />
            <span className="text-gradient">Anywhere.</span>
          </h1>
          <p className="text-lg md:text-xl text-current/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            The future of payments is here. Scan QR codes, send crypto instantly, and stay in full control. No banks, no limits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={connectWallet}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToHowItWorks}
              className="btn-outline text-lg px-8 py-4 flex items-center gap-2"
            >
              <FiPlay className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="py-6 border-y border-white/10 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...FEATURES_MARQUEE, ...FEATURES_MARQUEE].map((label, i) => (
            <span
              key={i}
              className="text-current/70 font-medium text-sm md:text-base flex items-center gap-2"
            >
              <FiZap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="max-content grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center"
          >
            <div className="text-4xl mb-3">💸</div>
            <div className="text-3xl font-bold font-display text-current">0%</div>
            <div className="text-current/70 text-sm font-medium">Transaction Fees</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 text-center"
          >
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl font-bold font-display text-current">&lt;5s</div>
            <div className="text-current/70 text-sm font-medium">Average Speed</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 text-center"
          >
            <div className="text-4xl mb-3">🔥</div>
            <div className="text-3xl font-bold font-display text-current">24/7</div>
            <div className="text-current/70 text-sm font-medium">Uptime</div>
          </motion.div>
        </div>
      </section>

      {/* Built Different */}
      <section className="section-padding border-t border-white/5">
        <div className="max-content text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display text-current mb-4"
          >
            Built Different
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-current/70 text-lg max-w-2xl mx-auto"
          >
            Not your typical payment app. Powered by blockchain, owned by you.
          </motion.p>
        </div>
        <div className="max-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUILT_DIFFERENT.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 hover:border-indigo-500/30 transition-colors"
            >
              <div className="text-2xl mb-3 text-indigo-400">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold font-display text-current mb-2">{item.title}</h3>
              <p className="text-current/70 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding border-t border-white/5">
        <div className="max-content text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display text-current mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-current/70 text-lg"
          >
            Four simple steps to financial freedom
          </motion.p>
        </div>
        <div className="max-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-4xl font-bold font-display text-indigo-400/80 mb-3">{item.step}</div>
              <h3 className="text-lg font-semibold font-display text-current mb-2">{item.title}</h3>
              <p className="text-current/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Comparison Table */}
      <section className="section-padding border-t border-white/5">
        <div className="max-content text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display text-current mb-4"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-current/70 text-lg"
          >
            See how we stack up against traditional payment apps
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-content overflow-x-auto rounded-xl border border-white/10"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-semibold text-current">Feature</th>
                <th className="p-4 font-semibold text-emerald-400">DecentroPay</th>
                <th className="p-4 font-semibold text-current/70">PhonePe / GPay</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 text-current/90">{row.feature}</td>
                  <td className="p-4 text-emerald-400 font-medium">{row.us}</td>
                  <td className="p-4 text-current/60">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="section-padding border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-content text-center glass-card p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-current mb-4">
            Ready to take control?
          </h2>
          <p className="text-current/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands already using DecentroPay for fast, secure, and free crypto payments.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={connectWallet}
            className="btn-primary text-lg px-10 py-4"
          >
            Start Now — It's Free
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default Landing;
