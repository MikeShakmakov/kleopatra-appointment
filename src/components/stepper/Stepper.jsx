import React from 'react'
import PropTypes from 'prop-types'
import styles from './Stepper.scss'
import {Icons} from '../Icons/Icons'

export class Stepper extends React.PureComponent {
  getCurrentIndexContent(index, currentStep) {
    return currentStep > index ? <Icons type={'tick'} />: index + 1;
  }

  render() {
    const labels = this.props.steps.map((step, ind) => 
        <div key={ind} className={styles['step'] + (this.props.currentStep === ind ? ' ' + styles['step--active'] : '')}>
        <span className={styles['step__index']}>{this.getCurrentIndexContent(ind, this.props.currentStep)}</span>
        <span className={styles['step__label']}>{step.label}</span>
      </div>
    );
    
    return(
      <div className={styles['stepper']}>
        {labels}
      </div>
    )
  }
}

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  })),
  currentStep: PropTypes.number
}