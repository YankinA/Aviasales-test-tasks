import React from 'react';
import uniqid from 'uniqid';

export default class FilterStops extends React.Component {
  method = () => {}

  render() {
    const {
      toggleCheckboxes, stops, filterStopsState, closesFilterStops,
    } = this.props;
    const isChecked = stopState => stopState === 'on';
    const stopNames = ['Все', 'Без пересадок', '1 Пересадка', '2 Пересадки', '3 Пересадки'];
    const stopKeys = Object.keys(stops);
    const toggleClassModal = filterStopsState === 'open' ? 'filter-modal' : '';
    return (
      <div className={`filter-stops ${toggleClassModal}`}>
        <button className="filter-closed_btn" onClick={closesFilterStops} type="submit" />
        <div className="filter-header">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        <div className="filter-content-list_checkbox">
          {stopKeys.map((stopKey, i) => (
            <div key={uniqid()} className="filter-content-item">
              <label className="filter-content-item_label" htmlFor={stopKey}>
                {stopNames[i]}
                <input checked={isChecked(stops[stopKey])} onChange={toggleCheckboxes} id={stopKey} type="checkbox" className="filter-content-item_input" />
                <span className="checkbox" />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
