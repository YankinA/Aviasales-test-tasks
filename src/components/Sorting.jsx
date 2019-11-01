import React from 'react';

export default class FilterStops extends React.Component {
  method = () => {}

  render() {
    const { changeSort, sorting } = this.props;
    const activateTabCheap = sorting === 'cheap' ? 'sorting-tab_active' : '';
    const activateTabFast = sorting === 'fast' ? 'sorting-tab_active' : '';
    return (
      <div className="sorting-tabs">
        <button onClick={changeSort} type="submit" className={`sorting-tab ${activateTabCheap}`} data-btn="cheap">САМЫЙ ДЕШЕВЫЙ</button>
        <button onClick={changeSort} type="submit" className={`sorting-tab ${activateTabFast}`} data-btn="fast">САМЫЙ БЫСТРЫЙ</button>
      </div>
    );
  }
}
