import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PlaceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { rateAvgList } = this.state;

    const { name, avatar, rateAvg } = this.props.place;

    return (
        <li style={{listStyle: 'none'}}>
          <div className="">
            <div className="rct-block">
              <div className="place-item-card rct-block-content">
                <div className="d-flex justify-content-between">
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
                    <a onClick={() => this.props.toggleModalMore(this.props.indexPlace)} className="card-header-action text-primary">
                      <i className="fa fa-plus"></i>
                      <span> Thêm nội dung</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
    )
  }
}

// PropTypes
PlaceItem.propTypes = {
  place: PropTypes.object.isRequired,
  indexDay: PropTypes.number.isRequired,
  indexPlace: PropTypes.number.isRequired,
  toggleModalMore: PropTypes.func.isRequired
}

export default PlaceItem;