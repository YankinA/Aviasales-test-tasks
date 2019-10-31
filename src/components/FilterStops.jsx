import React from 'react';
import uniqid from 'uniqid';
import style from '../../style/style.less';

export default class FilterStops extends React.Component {
  method = () => {}

  render() {
    const {
      toggleCheckboxes, stops, filterStopsState, closesFilterStops,
    } = this.props;
    const isChecked = stopState => stopState === 'on';
    const stopNames = ['Все', 'Без пересадок', '1 Пересадка', '2 Пересадки', '3 Пересадки'];
    const stopKeys = Object.keys(stops);
    const toggleClassModal = filterStopsState === 'open' ? style['filter-modal'] : '';
    return (
      <div className={`${style['filter-stops']} ${toggleClassModal}`}>
        <button className={`${style['filter-closed_btn']}`} onClick={closesFilterStops} type="submit" />
        <div className={style['filter-header']}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        <div className={style['filter-content-list_checkbox']}>
          {stopKeys.map((stopKey, i) => (
            <div key={uniqid()} className={style['filter-content-item']}>
              <label className={style['filter-content-item_label']} htmlFor={stopKey}>
                {stopNames[i]}
                <input checked={isChecked(stops[stopKey])} onChange={toggleCheckboxes} id={stopKey} type="checkbox" className={style['filter-content-item_input']} />
                <span className={style.checkbox} />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
