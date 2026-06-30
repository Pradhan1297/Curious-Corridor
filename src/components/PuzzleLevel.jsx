import { motion } from 'framer-motion';
import { useState } from 'react';

function PuzzleLevel({
  levelKey,
  title,
  prompt,
  inputValue,
  onChange,
  onSubmit,
  error,
  success,
  hint,
  type,
  placeholder,
  options,
}) {
  const [localValue, setLocalValue] = useState(inputValue || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formValue = event.currentTarget.elements[levelKey]?.value ?? localValue;
    onSubmit(formValue);
  };

  const handleChoice = (value) => {
    setLocalValue(value);
    onSubmit(value);
  };

  return (
    <motion.div
      className="screen-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="level-head">
        <p className="eyebrow">{title}</p>
        <h2>{prompt}</h2>
      </div>

      <div className="level-body">
        {type === 'choice' ? (
          <div className="choice-grid" role="listbox" aria-label="Multiple choice options">
            {options.map((option) => (
              <button
                key={option.label}
                className={`choice-btn ${localValue === option.label ? 'selected' : ''}`}
                onClick={() => handleChoice(option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="stack">
            <label className="sr-only" htmlFor={levelKey}>
              Enter your answer
            </label>
            <input
              id={levelKey}
              name={levelKey}
              value={localValue}
              onChange={(event) => {
                const nextValue = event.target.value;
                setLocalValue(nextValue);
                onChange(nextValue);
              }}
              placeholder={placeholder}
              className="text-input"
              autoComplete="off"
            />
            <button type="submit" className="primary-btn">
              Check answer
            </button>
          </form>
        )}

        <p className="hint">Hint: {hint}</p>
        {error ? <p className="error-text">{error}</p> : null}
        {success ? <p className="success-text">Correct.</p> : null}
      </div>
    </motion.div>
  );
}

export default PuzzleLevel;
