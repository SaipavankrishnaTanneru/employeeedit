import React from 'react';
// 1. Import the CSS module
import styles from './Stepper.module.css';

/**
 * A reusable stepper component using CSS Modules.
 * Now supports "Completed", "Active", and "Inactive" states.
 *
 * @param {Array} steps - An array of step objects (label, icon).
 * @param {number} currentStepIndex - The 0-based index of the active step.
 */
function Stepper({ steps = [], currentStepIndex = 0 }) {
  return (
    <nav aria-label="Progress Stepper">
      <ol className={styles.stepperContainer}>
        {steps.map((step, index) => {
          
          // --- LOGIC UPDATED HERE ---
          const isCurrent = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          // Conditionally apply classes based on the new 3-state logic
          const stepClasses = `
            ${styles.step}
            ${isCurrent ? styles.stepActive : ''}
            ${isCompleted ? styles.stepCompleted : ''}
            ${!isCurrent && !isCompleted ? styles.stepInactive : ''}
          `;
          // --- END OF UPDATE ---

          return (
            // .trim() removes any leading/trailing whitespace
            <li key={step.label} className={stepClasses.trim()}>
              <div className={styles.stepContent}>
                <span className={styles.stepIcon}>{step.icon}</span>
                
                {/* Only show label for the CURRENT active step */}
                {isCurrent && (
                  <span className={styles.stepLabel}>{step.label}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;