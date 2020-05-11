import PropTypes from 'prop-types';
import React, { Component } from 'react'

const priceList = [
  {label: "1.000.000đ", value: "1000000"},
  {label: "2.000.000đ", value: "2000000"},
  {label: "3.000.000đ", value: "3000000"},
  {label: "4.000.000đ", value: "4000000"}
]

class PriceDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: this.props.defaultValue
    }

    this.onToggleShow = this.onToggleShow.bind(this);
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

  render() {
    const { formTitle } = this.props;
    const { value, isOpen } = this.state;

    function formatNumber(num) {
      if(num === undefined) num = 0;

      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+'đ'
    }

    return (
        <div className="form-group form-group-price-range">
          <label className="form-title">{formTitle}</label>
          <div className={this.state.isOpen ? 'js-dropdown dropdown show' : 'js-dropdown dropdown'}>
            <input className="form-control" value={formatNumber(value)}/>
            <svg className="js-control-show-dropdown" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" onClick={this.onToggleShow}>
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
                <p><span>Chọn khoảng giá</span>
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
              {priceList.map((item,index) => (
                  <li key={'price-'+index} className="dropdown__item" onClick={() => this.onSelectValue(item.value)}>
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