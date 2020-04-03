import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as moment from 'moment'
import ProgressBar from './ProgressBar'
import TimerHistory from './TimerHistory'
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
    setCountdown(countdown - 100)
  }, delay)

  useEffect(() => {
    setCountdown((minutes * 60 + seconds) * 1000)
  }, [minutes, seconds])

  const timerStart = () => {
    if (countdown > 0) {
      setInitialCountdown(countdown)
      setIsStarted(true)
      setStartTime(Date.now())
      setDelay(100)
    }
  }

  const timerStop = useCallback(() => {
    setHistory(history => [
      ...history,
      {
        startTime: moment(startTime).format('HH:mm:ss'),
        finishTime: moment(Date.now()).format('HH:mm:ss'),
        initialTimer: moment(initialCountdown).format('mm:ss'),
        factualTimer: moment(Date.now() - startTime).format('mm:ss')
      }
    ])
    setIsStarted(false)
    setCountdown(0)
    setMinutes(0)
    setSeconds(0)
    setDelay(null)
  }, [startTime, initialCountdown])

  const timerTooglePause = () => {
    setDelay(delay => {
      return delay === null ? 100 : null
    })
  }

  useEffect(() => {
    if (isStarted && countdown < 1) {
      timerStop()
    }
  }, [isStarted, countdown, timerStop])

  const h = Math.trunc(Math.ceil(countdown / 1000) / 3600)
  const m = Math.trunc((Math.ceil(countdown / 1000) % 3600) / 60)
  const s = Math.ceil(Math.ceil(countdown / 1000) % 60)
  const formated = `${h ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`

  return (
    <div className="timer">
      <h1 className="timer__title">Tаймер</h1>
      <div className="timer__main">
        {isStarted && <div className="timer__count">{formated}</div>}
        {isStarted && (
          <ProgressBar progress={(initialCountdown - countdown) / (initialCountdown - 100)} />
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
            <>
              отсчет начался в&nbsp;
              {startTime && moment(startTime).format('HH:mm:ss')}
              {delay !== null && (
                <>
                  &nbsp;и закончится в&nbsp;
                  {startTime && moment(Date.now() + countdown).format('HH:mm:ss')}
                </>
              )}
            </>
          )}
        </div>
        <TimerHistory history={history} />
      </div>
    </div>
  )
}

export default Timer
