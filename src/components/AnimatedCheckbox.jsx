import { motion } from 'framer-motion';

const AnimatedCheckbox = ({ isChecked, onClick }) => {
  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      initial={false}
      animate={isChecked ? "checked" : "unchecked"}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Circle Outline */}
        <motion.circle
          cx="16"
          cy="16"
          r="12"
          stroke="var(--accent-color)"
          strokeWidth="2.5"
          variants={{
            checked: { fill: 'var(--accent-color)' },
            unchecked: { fill: 'transparent' }
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* The Animated Checkmark */}
        <motion.path
          d="M10 16L14 20L22 12"
          stroke="var(--bg-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            checked: { pathLength: 1, opacity: 1 },
            unchecked: { pathLength: 0, opacity: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        />
      </motion.svg>
    </motion.button>
  );
};

export default AnimatedCheckbox;
