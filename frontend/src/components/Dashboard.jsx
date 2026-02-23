import { motion } from 'framer-motion';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-hot-toast';
import { FiSend, FiCamera, FiClock, FiHash } from 'react-icons/fi';

const Dashboard = ({
  account,
  balance,
  formData,
  handleInputChange,
  sendPayment,
  transactions,
  loading,
  setFormData,
}) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (result, error) => {
    if (!!result) {
      setFormData((prev) => ({ ...prev, recipient: result?.text }));
      setShowScanner(false);
      toast.success('QR Code Scanned!');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 border-l-4 border-l-indigo-500"
          >
            <h3 className="text-current/70 text-sm font-medium">Wallet Balance</h3>
            <p className="text-2xl md:text-3xl font-bold font-display mt-2 text-current">
              {balance} ETH
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 border-l-4 border-l-cyan-500"
          >
            <h3 className="text-current/70 text-sm font-medium">Total Transactions</h3>
            <p className="text-2xl md:text-3xl font-bold font-display mt-2 text-current">
              {transactions.length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 border-l-4 border-l-emerald-500"
          >
            <h3 className="text-current/70 text-sm font-medium">Network</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-lg font-semibold font-display text-current">Localhost</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Payment Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 h-fit"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-bold font-display text-current">Send Payment</h2>
              <button
                type="button"
                onClick={() => setShowScanner(!showScanner)}
                className="text-sm font-semibold flex items-center gap-2 border border-cyan-500/40 px-4 py-2 rounded-xl hover:bg-cyan-500/10 text-cyan-400 transition-all"
              >
                <FiCamera className="w-4 h-4" />
                {showScanner ? 'Close Scanner' : 'Scan QR'}
              </button>
            </div>

            {showScanner && (
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 relative bg-black/40">
                <QrReader
                  onResult={handleScan}
                  constraints={{ facingMode: 'environment' }}
                  style={{ width: '100%' }}
                  className="w-full h-64 object-cover"
                />
                <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-current/80 bg-black/60 py-2">
                  Point camera at a wallet QR code
                </p>
              </div>
            )}

            <form onSubmit={sendPayment} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-current/80 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 font-mono text-sm text-current placeholder-current/40 transition-all"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-current/80 mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.0001"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-mono text-lg font-semibold text-current placeholder-current/40 transition-all"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-current/80 mb-2">Message</label>
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What is this for?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-current placeholder-current/40 transition-all"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mt-2 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                  loading
                    ? 'bg-white/10 cursor-not-allowed text-current/60'
                    : 'btn-primary'
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Now
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 min-h-[500px] flex flex-col"
          >
            <h2 className="text-xl font-bold font-display text-current mb-6">Recent Activity</h2>
            <div className="overflow-y-auto flex-1 pr-2 space-y-4 min-h-[320px]">
              {transactions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-current/50 py-12">
                  <FiHash className="w-12 h-12 mb-3 opacity-50" />
                  <p className="font-medium">No transactions yet</p>
                  <p className="text-sm mt-1">Your history will appear here</p>
                </div>
              ) : (
                transactions.map((tx, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={`${tx.from}-${tx.to}-${tx.timestamp}-${i}`}
                    className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/[0.07] hover:border-indigo-500/20 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <FiClock className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-current/50">From</span>
                          <span
                            className="text-xs font-mono text-current"
                            title={tx.from}
                          >
                            {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-current/50">To</span>
                        <span
                          className="text-xs font-mono text-current"
                          title={tx.to}
                        >
                          {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-2">
                      <div>
                        <p className="text-current/90 text-sm">{tx.message || 'No message'}</p>
                        <p className="text-xs text-current/50 mt-1">{tx.timestamp}</p>
                      </div>
                      <p className="text-lg font-bold text-current">
                        {tx.amount} <span className="text-xs font-normal text-current/60">ETH</span>
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
