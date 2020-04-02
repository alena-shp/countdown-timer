import React, { useState, useEffect, useRef } from 'react'
import './timer.scss'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [delay, setDelay] = useState(null)
  const [startTime, setStartTime] = useState(undefined)

  useInterval(() => {
    setSeconds(seconds - 1)
  }, delay)

  useEffect(() => {
    if (seconds < 1) {
      timerStop()
    }
  }, [seconds])

  const timerStart = () => {
    if (seconds > 0) {
      setStartTime(Date.now())
      setDelay(1000)
    }
  }

  const timerStop = () => {
    setSeconds(0)
    setDelay(null)
  }

  const timerTooglePause = () => {
    setDelay(delay => {
      return delay === null ? 1000 : null
    })
  }

  return (
    <div className="timer">
      <h1 className="timer__title">Tаймер</h1>
      <div className="timer__main">
        <div className="timer__count">
          <h1>00:{seconds}</h1>
        </div>
        <div className="timer__startTime">{startTime}</div>
        <div className="timer__input">
          <input type="text" placeholder="Минуты" />
          <input
            type="text"
            placeholder="Секунды"
            value={seconds}
            onChange={e => {
              setSeconds(e.target.value)
            }}
          />
        </div>
        <div className="timer__action">
          <button className="timer__action-cancel" onClick={timerStop}>
            Отмена
          </button>
          <button className="timer__action-start" onClick={timerStart}>
            Старт
          </button>
          {seconds > 0 && delay !== null && (
            <button className="timer__action-pause" onClick={timerTooglePause}>
              {delay !== null ? 'Пауза' : 'Продолжить'}
            </button>
          )}
        </div>
        <div className="progressbar">[progressbar]</div>
        <div className="timer__statistics">
          <div className="timer__statistics-start">
            отсчет начался <span>00 : 10</span> назад
          </div>
          <div className="timer__statistics-end">
            отсчет заканчится через <span>09 : 50</span>
          </div>
        </div>
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
            <tr>
              <td>10 : 00</td>
              <td>10 : 10</td>
              <td>10 минут 00 секунд</td>
              <td>10 минут 00 секунд</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Timer
