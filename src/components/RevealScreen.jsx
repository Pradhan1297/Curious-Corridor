import { motion } from 'framer-motion';
import { gameConfig } from '../config/gameConfig';

function RevealScreen({ onPlayAgain, doorsUnlocked }) {
  return (
    <motion.div
      className="screen-card reveal-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="door-row" aria-label="Unlocked doors">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={`door door-unlocked ${doorsUnlocked[index] ? 'active' : ''}`}>
            <div className="door-shape door-shape-unlocked">
              <span>✨</span>
            </div>
            <span className="door-label">Door {index + 1}</span>
          </div>
        ))}
      </div>

      <div className="reveal-text">
        <h2>Happy Birthday, {gameConfig.birthdayPersonName}!!!🥳</h2>
        <p>{gameConfig.birthdayWish}</p>
        <p className="muted-text">— {gameConfig.senderInitial}</p>
      </div>

      <button className="primary-btn" onClick={onPlayAgain}>
        Play again
      </button>
    </motion.div>
  );
}

export default RevealScreen;
