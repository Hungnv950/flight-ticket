import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

// const airports = [
//   { key: 'Dave', name: "Ha Noi" },
//   { key: 'Kellie', name: "TP Ho Chi Minh" },
//   { key: 'Max', name: "Da Nang" },
//   { key: 'Jack', name: "Viet Nam" }
// ];


class AirportDropDown extends Component {
  constructor() {
    super();

    this.state = {
      airports: [
        { key: 'Dave', name: "Ha Noi" },
        { key: 'Kellie', name: "TP Ho Chi Minh" },
        { key: 'Max', name: "Da Nang" },
        { key: 'Jack', name: "Viet Nam" }
      ],
      suggestions: [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  selectAirport(airport) {
    this.setState({
      value: airport.name
    })
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.airports.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className="dropdown__item">
      {suggestion.name}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'hành phố - Quốc Gia - Sân Bay',
      value,
      onChange: this.onChange,
      className: "form-control",
      type: "text"
    };

    return(
      <React.Fragment>
        <div className="group-input">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />

          <div className="icon-search js-control-show-dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
              <g>
                <g>
                  <g>
                    <path fill="#989898" d="M1.572 6.926a5.356 5.356 0 0 1 5.35-5.35 5.356 5.356 0 0 1 5.35 5.35 5.358 5.358 0 0 1-5.35 5.353 5.358 5.358 0 0 1-5.35-5.353zm13.596 7.628l-3.547-3.547a6.198 6.198 0 0 0 1.528-4.082A6.23 6.23 0 0 0 6.925.702 6.23 6.23 0 0 0 .701 6.925a6.232 6.232 0 0 0 6.224 6.224c1.56 0 2.987-.576 4.081-1.527l3.547 3.547a.44.44 0 0 0 .308.13.438.438 0 0 0 .307-.744z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <ul className="dropdown__list">
          {
            this.state.airports.map((airport, key) => {
              return (
                <li key={key} onClick={this.selectAirport.bind(this, airport)} className="dropdown__item">
                  <span>{airport.name}</span>
                </li>
              )
            })
          }
        </ul>
      </React.Fragment>
    )
  }
}

export default AirportDropDown;
