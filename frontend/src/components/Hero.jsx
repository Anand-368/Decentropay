import { motion } from 'framer-motion';

const Hero = ({ connectWallet }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                    The Future of <br />
                    <span className="text-gradient">Decentralized Payments</span>
                </h1>

                <p className="text-xl text-current opacity-70 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Send crypto instantly with zero friction. Scan QR codes, pay securely,
                    and track your transaction history on the blockchain.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectWallet}
                    className="btn-primary text-lg px-10 py-4 shadow-2xl"
                >
                    Get Started Now
                </motion.button>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-current/10 pt-10">
                    <div>
                        <h3 className="text-3xl font-bold text-current">10k+</h3>
                        <p className="text-current opacity-60 text-sm">Active Users</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-current">$5M+</h3>
                        <p className="text-current opacity-60 text-sm">Volume Traded</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-current">0.01s</h3>
                        <p className="text-current opacity-60 text-sm">Latency</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-current">100%</h3>
                        <p className="text-current opacity-60 text-sm">Secure</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
