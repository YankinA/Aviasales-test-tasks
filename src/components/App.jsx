import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import style from '../../style/style.less';
import FilterStops from './FilterStops';
import Sorting from './Sorting';
import Ticket from './Ticket';

const mapStateToProps = (state) => {
  const props = {
    tickets: state.tickets,
  };
  return props;
};

class App extends React.Component {
  // UI state
  state = {
    filterStopsState: 'closed',
    sorting: 'cheap',
    stops: {
      stops_all: 'off',
      stops_0: 'on',
      stops_1: 'on',
      stops_2: 'off',
      stops_3: 'off',
    },
  }

  closesFilterStops = () => this.setState({ filterStopsState: 'closed' });

  openFilterStops = () => this.setState({ filterStopsState: 'open' });

  changeSort = ({ target: { dataset } }) => this.setState({ sorting: dataset.btn });

  toggleCheckboxes = ({ target: { id } }) => {
    const { stops } = this.state;
    const stopKeys = Object.keys(stops);
    if (id === 'stops_all') {
      const toggleStopState = stops[id] === 'on' ? 'off' : 'on';
      stopKeys.forEach((stopsKey) => {
        const copyStops = stops;
        copyStops[stopsKey] = toggleStopState;
        this.setState({ stops: copyStops });
      });
    } else {
      const toggleStopState = stops[id] === 'on' ? 'off' : 'on';
      const stopAllValue = new Set(Object.values({ ...stops, [id]: toggleStopState, stops_all: 'on' }))
        .size === 1 ? 'on' : 'off';
      this.setState({ stops: { ...stops, [id]: toggleStopState, stops_all: stopAllValue } });
    }
  };

  render() {
    const { filterStopsState, sorting, stops } = this.state;
    const { tickets } = this.props;
    const filtredTickets = tickets.filter(({ segments }) => {
      const flightThereStops = `stops_${segments[0].stops.length}`;
      const flightBackStops = `stops_${segments[1].stops.length}`;
      return stops[flightThereStops] === 'on' && stops[flightBackStops] === 'on';
    });
    const sortedTickets = filtredTickets.sort((currentTicket, nextTicket) => {
      const sortMethods = {
        cheap: () => currentTicket.price - nextTicket.price,
        fast: () => {
          const durationCurrentTicket = currentTicket
            .segments[0].duration + currentTicket.segments[1].duration;
          const durationNextTicket = nextTicket
            .segments[0].duration + nextTicket.segments[1].duration;
          return durationCurrentTicket - durationNextTicket;
        },
      };
      return sortMethods[sorting]();
    });
    return (
      <div className={style.app}>
        <div className={style['logo-wrap']}>
          <img alt="logo" className={style.logo} src="/images/logo.svg" />
        </div>
        <FilterStops
          filterStopsState={filterStopsState}
          stops={stops}
          toggleCheckboxes={this.toggleCheckboxes}
          closesFilterStops={this.closesFilterStops}
        />
        <main className={style.content}>
          <Sorting sorting={sorting} changeSort={this.changeSort} />
          <div className={style.tickets}>
            {sortedTickets.slice(0, 5).map(ticket => <Ticket ticket={ticket} key={uniqid()} />)}
          </div>
        </main>
        {filterStopsState === 'open'
          ? (
            <div
              role="button"
              tabIndex={0}
              onClick={this.closesFilterStops}
              onKeyDown={this.closesFilterStops}
              className={style['background-modal']}
            />
          )
          : <button onClick={this.openFilterStops} type="submit" className={style['filter-open_btn']}>ФИЛЬТР</button>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
