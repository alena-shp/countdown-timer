import React, { useState, useEffect, useRef } from 'react'
import * as moment from 'moment'
import ProgressBar from './ProgressBar'
import './Timer.scss'

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
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [initialCountdown, setInitialCountdown] = useState(0)
  const [delay, setDelay] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [startTime, setStartTime] = useState(undefined)
  const [history, setHistory] = useState([])

  useInterval(() => {
    setCountdown(countdown - 1)
  }, delay)

  useEffect(() => {
    setCountdown(minutes * 60 + seconds)
  }, [minutes, seconds])

  useEffect(() => {
    if (isStarted && countdown < 1) {
      timerStop()
    }
  }, [isStarted, countdown])

  const timerStart = () => {
    if (countdown > 0) {
      setInitialCountdown(countdown)
      setIsStarted(true)
      setStartTime(Date.now())
      setDelay(1000)
    }
  }

  const timerStop = () => {
    setHistory(history => [
      ...history,
      {
        startTime: moment(startTime).format('HH:mm:ss'),
        finishTime: moment(Date.now()).format('HH:mm:ss'),
        initialTimer: moment(initialCountdown * 1000).format('mm:ss'),
        factualTimer: moment(Date.now() - startTime).format('mm:ss')
      }
    ])
    setIsStarted(false)
    setCountdown(0)
    setMinutes(0)
    setSeconds(0)
    setDelay(null)
  }

  const timerTooglePause = () => {
    setDelay(delay => {
      return delay === null ? 1000 : null
    })
  }

  const h = Math.trunc(countdown / 3600)
  const m = Math.trunc((countdown % 3600) / 60)
  const s = countdown % 60
  const formated = `${h ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`

  return (
    <div className="timer">
      <h1 className="timer__title">Tаймер</h1>
      <div className="timer__main">
        {isStarted && <div className="timer__count">{formated}</div>}
        {isStarted && (
          <ProgressBar progress={(initialCountdown - countdown + 1) / initialCountdown} />
        )}
        {!isStarted && (
          <div className="timer__input">
            <div className="timer__input-min">
              <p>Минуты</p>
              <input
                type="text"
                value={minutes}
                onChange={e => {
                  setMinutes(parseInt(e.target.value) || 0)
                }}
              />
            </div>
            <div className="timer__input-sec">
              <p>Секунды</p>
              <input
                type="text"
                value={seconds}
                onChange={e => {
                  setSeconds(parseInt(e.target.value) || 0)
                }}
              />
            </div>
          </div>
        )}
        <div className="timer__action">
          {!isStarted && (
            <button className="timer__action-start" onClick={timerStart}>
              Старт
            </button>
          )}
          {isStarted && (
            <button className="timer__action-cancel" onClick={timerStop}>
              Отмена
            </button>
          )}
          {isStarted && (
            <button className="timer__action-pause" onClick={timerTooglePause}>
              {delay !== null ? 'Пауза' : 'Продолжить'}
            </button>
          )}
        </div>
        <div className="timer__statistics">
          {isStarted && (
            <div className="timer__statistics-start">
              отсчет начался в&nbsp;
              {startTime && moment(startTime).format('HH:mm:ss')}
            </div>
          )}
          {isStarted && delay !== null && (
            <div className="timer__statistics-end">
              отсчет заканчится в&nbsp;
              {startTime && moment(Date.now() + countdown * 1000).format('HH:mm:ss')}
            </div>
          )}
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
      </div>
    </div>
  )
}

export default Timer
