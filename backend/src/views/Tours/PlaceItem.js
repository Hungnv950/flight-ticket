import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PlaceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      rateAvgList:[1,2,3,4,5]
    };

    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected() {
    this.props.addPlace(this.props.index, this.props.place,!this.state.selected);

    this.setState({
      selected:this.state.selected !== true
    });
  };

  render() {
    const { selected, rateAvgList } = this.state;

    const { name, avatar, rateAvg } = this.props.place;

    return (
        <div className="d-flex justify-content-between place-result-item">
          <div className="bd-highlight align-self-center">
            <img alt="place" src={avatar} className="tour-places-image float-left mr-4"/>
            <div className="d-inline-block">
              <h5><b>{name}</b></h5>
              <div style={{overflow: 'hidden', position: 'relative'}}>
                {rateAvgList.map((value) =>
                  <span className={(rateAvg >= value) ? 'place-star place-star-active' : 'place-star' }>★</span>
                )}
              </div>
            </div>
          </div>
          <div className="bd-highlight align-self-center">
            <div><i style={{fontSize: '20px',cursor: 'pointer'}} onClick={this.handleSelected} className={selected ? 'fa fa-check fa-active' : 'fa fa-plus'}></i></div>
          </div>
        </div>
    )
  }
}

// PropTypes
PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
  addPlace: PropTypes.func.isRequired,
  keyObject: PropTypes.string.isRequired
}

export default PlaceItem;