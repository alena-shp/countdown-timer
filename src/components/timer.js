import React from 'react'
import './timer.css'

const Timer = () => {
  return (
    <div className="timer">
      <h1 className="timer__title">Tаймер</h1>
      <div className="timer__main">
        <div className="timer__count">
          <h1>00:00</h1>
        </div>
        <div className="timer__input">
          <input type="text" placeholder="Минуты" />
          <input type="text" placeholder="Секунды" />
        </div>
        <div className="timer__actions">
          <button className="timer__action-cancel">Отмена</button>
          <button className="timer__action-start">Старт</button>
          <button className="timer__action-pause">Пауза</button>
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
