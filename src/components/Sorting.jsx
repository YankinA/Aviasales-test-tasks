import React from 'react';
import style from '../../style/style.less';

export default class FilterStops extends React.Component {
  method = () => {}

  render() {
    const { changeSort, sorting } = this.props;
    const activateTabCheap = sorting === 'cheap' ? style['sorting-tab_active'] : '';
    const activateTabFast = sorting === 'fast' ? style['sorting-tab_active'] : '';
    return (
      <div className={style['sorting-tabs']}>
        <button onClick={changeSort} type="submit" className={`${style['sorting-tab']} ${activateTabCheap}`} data-btn="cheap">САМЫЙ ДЕШЕВЫЙ</button>
        <button onClick={changeSort} type="submit" className={`${style['sorting-tab']} ${activateTabFast}`} data-btn="fast">САМЫЙ БЫСТРЫЙ</button>
      </div>
    );
  }
}
