import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Day.module.css';
import { chooseDayAC, typeOfChosenDayAC } from '../../../redux/actionCreators/calendarAC';

function Day({ year, month, date }) {
  const dispatch = useDispatch();
  const periodDays = useSelector((state) => state.calendar.periodStart);
  const chooseDay = useSelector((state) => state.calendar.chooseDay);

  const [options] = useState({
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const [currentDate] = useState(new Date(year, month, date));
  const [typeOfDay, setTypeOfDay] = useState('');

  const dayRef = useRef();

  useEffect(() => {
    if (currentDate.toLocaleDateString('en-US', options) === chooseDay) {
      dayRef.current.classList.add(`${style.days_td_selected}`);
    } else {
      dayRef.current.classList.remove(`${style.days_td_selected}`);
    }
  }, [chooseDay]);

  useEffect(() => {
    let exist = 0;
    periodDays.forEach((period) => {
      if (period.includes(currentDate.toLocaleDateString('en-US', options))) {
        exist += 1;
      }
    });
    if (exist > 0) {
      dayRef.current.classList.add(`${style.day_td_period}`);
      setTypeOfDay(() => 'cycle');
      if (currentDate.toLocaleDateString('en-US', options) === chooseDay) {
        dispatch(typeOfChosenDayAC('cycle'));
      }
    } else {
      dayRef.current.classList.remove(`${style.day_td_period}`);
      setTypeOfDay(() => 'clear');
    }
  }, [periodDays]);

  const setActive = () => {
    dispatch(typeOfChosenDayAC(typeOfDay));
    dispatch(chooseDayAC(currentDate.toLocaleDateString('en-US', options)));
  };

  return (
        <>
            {currentDate && <td className={style.days_td}
            ref={dayRef}
            onClick={setActive}
            title={date}
            data-value={date}>{currentDate.getDate()}</td>}
        </>
  );
}

export default Day;
