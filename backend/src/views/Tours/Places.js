import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PlaceItem from "./PlaceItem";

class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [{
        id: 1,
        name: 'Hà Nội',
        rateAvg: 4,
        avatar: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/91/7f/47/asia-travel-image.jpg'
      }, {
        id: 2,
        name: 'Nam Định',
        rateAvg: 4,
        avatar: 'https://d3hne3c382ip58.cloudfront.net/resized/750x420/real-sapa-experience-by-bus-4d3n-tour-2-2566_1510029029.JPG'
      }, {
        id: 3,
        name: 'Hải Dương',
        rateAvg: 3,
        avatar: 'https://www.vivutravel.com/images/Blogs2/travel-to-vietnam-with-kids.jpg'
      }]
    }
  }
  render() {
    const { places } = this.state;

    return places.map((place) => (
        <PlaceItem index={this.props.index} addPlace={this.props.addPlace} key={place.id} place={place}/>
    ));
  }
}

// PropTypes
Places.propTypes = {
  index: PropTypes.number.isRequired,
  addPlace: PropTypes.func.isRequired
}

export default Places;