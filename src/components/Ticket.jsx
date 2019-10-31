import React from 'react';
import style from '../../style/style.less';

const addDate = (currentDate, setDateObj) => {
  currentDate.setDate(currentDate.getDate() + setDateObj.day);
  currentDate.setUTCHours(currentDate.getUTCHours() + setDateObj.day);
  currentDate.setMinutes(currentDate.getMinutes() + setDateObj.day);
  return currentDate;
};

const getFullTime = (dateArg) => {
  const hours = `0${dateArg.getUTCHours()}`.slice(-2);
  const minutes = `0${dateArg.getMinutes()}`.slice(-2);
  return `${hours}.${minutes}`;
};
const getDurationTime = (durationArg) => {
  const day = durationArg > 1439 ? Math.trunc(durationArg / 1440) : 0;
  const hours = day
    ? Math.trunc(durationArg / 60) - (day * 24) : Math.trunc(durationArg / 60);
  const minutes = durationArg % 60;
  return { day, hours, minutes };
};
const formatDurationTime = (timeObj) => {
  const day = timeObj.day > 0 ? `${timeObj.day}д ` : '';
  const hours = timeObj.hours > 0 ? `${timeObj.hours}ч `.slice(-4) : '';
  const minutes = timeObj.minutes > 0 ? `${timeObj.minutes}м`.slice(-3) : '';
  return `${day}${hours}${minutes}`;
};

export default class Ticket extends React.Component {
  method = () => {}

  ticketPreviewSegment = (
    {
      origin,
      destination,
      date,
      stops,
      duration,
    },
  ) => {
    const durationTimeObj = getDurationTime(duration);
    const dardepartureDate = getFullTime(new Date(date));
    const arrivalDate = getFullTime(addDate(new Date(date), durationTimeObj));

    const stopsList = ['Без пересадок', 'Пересадка', 'Пересадки', 'Пересадки'];
    return (
      <div className={style['ticket-preview__segment']}>
        <div className={style['ticket-preview__flight']}>
          <p className={style['ticket-preview__flight-label']}>{`${origin} – ${destination}`}</p>
          <p className={style['ticket-preview__flight-value']}>{`${dardepartureDate} - ${arrivalDate}`}</p>
        </div>
        <div className={style['ticket-preview__flight']}>
          <p className={style['ticket-preview__flight-label']}>В пути</p>
          <p className={style['ticket-preview__flight-value']}>
            {`${formatDurationTime(durationTimeObj)}`}
          </p>
        </div>
        <div className={style['ticket-preview__flight']}>
          <p className={style['ticket-preview__flight-label']}>
            {`${stops.length || ''} ${stopsList[stops.length]}`}
          </p>
          <p className={style['ticket-preview__flight-value']}>{stops.join(' ')}</p>
        </div>
      </div>
    );
  }

  render() {
    const { ticket: { price, carrier, segments } } = this.props;
    const flightThere = segments[0];
    const flightBack = segments[1];
    return (
      <section className={style.ticket}>
        <div className={style['ticket-header']}>
          <span className={style['ticket-price']}>{`${String(price).slice(0, -3)} ${String(price).slice(-3)} Р`}</span>
          <img className={style['ticket-carrier_img']} src={`//pics.avs.io/99/36/${carrier}@2x.png`} alt={carrier} />
        </div>
        <div className={style['ticket-body']}>
          {this.ticketPreviewSegment(flightThere)}
          {this.ticketPreviewSegment(flightBack)}
        </div>
      </section>
    );
  }
}
