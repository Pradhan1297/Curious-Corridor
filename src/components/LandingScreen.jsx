import { motion } from 'framer-motion';
import { gameConfig } from '../config/gameConfig';

function LandingScreen({ onBegin }) {
  return (
    <motion.div
      className="screen-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center space-y-4">
        <p className="eyebrow">The Curious Corridor</p>
        <h1>Four Doors</h1>
        <p className="subtitle">Four locked doors. One hidden secret behind them all.</p>
        <p className="muted-text">When you begin, the first door will appear. Solve it to reveal the next one, one step at a time.</p>
      </div>

      <button className="primary-btn" onClick={onBegin}>
        Begin
      </button>
    </motion.div>
  );
}

export default LandingScreen;
