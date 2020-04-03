import React from 'react'
import './TimerHistory.scss'

const TimerHistory = ({ history = [] }) => {
  if (!history || history.length < 1) {
    return null
  }

  return (
    <table className="timer__table">
      <thead>
        <tr>
          <th>Начало</th>
          <th>Окончание</th>
          <th>Установленное время</th>
          <th>Фактическое время</th>
        </tr>
      </thead>
      <tbody>
        {history.map(({ startTime, finishTime, initialTimer, factualTimer }, key) => (
          <tr key={key}>
            <td>{startTime}</td>
            <td>{finishTime}</td>
            <td>{initialTimer}</td>
            <td>{factualTimer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimerHistory
