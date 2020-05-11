import axios from "axios";
import PropTypes from 'prop-types';
import React, { Component } from 'react'

class PriceDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      isOpen: false,
      textSearch: '',
      value: this.props.defaultValue
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.onToggleShow = this.onToggleShow.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  }

  onToggleShow() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onSelectValue(value) {
    this.setState({
      value: value
    });

    this.onToggleShow();
    this.props.onSelectPrice(this.props.key,value);
  }

  handleChangeField(key, event) {
    let value = event.target.value;

    this.setState({
      [key]: value
    });
  };

  handleSearch(event){
    const value = event.target.value;

    if(value){
      this.setState({
        isOpen: true,
        textSearch: value
      });

      axios.get("https://bo-api.thankdev.xyz/api/v2/cities?textSearch="+value).then(response => {
        this.setState({ cities: response.data.results });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const { cities, textSearch, isOpen } = this.state;

    return (
        <div className="form-group form-group-price-range">
          <div className={this.state.isOpen ? 'js-dropdown dropdown show' : 'js-dropdown dropdown'}>
            <input className="form-control" placeholder="Nhập địa điểm" onChange={(ev) => this.handleSearch(ev)} value={textSearch}/>
            <svg style={{display: 'none'}} className="js-control-show-dropdown" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" onClick={this.onToggleShow}>
              <g>
                <g>
                  <g>
                    <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"></path>
                  </g>
                </g>
              </g>
            </svg>
            <ul className="dropdown__list" style={{display: isOpen ? 'block' : 'none'}}>
              <li className="dropdown__intro">
                <p><span>Chọn điểm khởi hành</span>
                  <svg className="js-control-show-dropdown" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" onClick={this.onToggleShow}>
                    <g>
                      <g>
                        <g>
                          <path fill="#a4afb7" d="M6.027.301l-5.5 5.56L1.953 7.3l4.074-4.117L10.1 7.3l1.426-1.44z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </p>
              </li>
              {cities.map((item,index) => (
                  <li key={this.props.key+'-'+index} className="dropdown__item" onClick={() => this.onSelectValue(item.value)}>
                    <span>{item.label}</span>
                  </li>
              ))}
            </ul>
          </div>
        </div>
    )
  }
}

// PropTypes
PriceDropdown.propTypes = {
  defaultValue: PropTypes.number,
  key: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  onSelectPrice: PropTypes.func.isRequired
}

export default PriceDropdown;