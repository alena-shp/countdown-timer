import React from 'react'
import './ProgressBar.scss'

const ProgressBar = ({ progress = 0 }) => (
  <div className="ProgressBar">
    <div
      className="ProgressBar__bar"
      style={{ width: `${progress * 100}%` }}
    ></div>
  </div>
)

export default ProgressBar
