import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);

    const windowWidth = window.innerWidth;
    this.active = this.props.active ? this.props.active : 0;

    if (this.props.display.default && windowWidth >= 1200) {
      this.display = this.props.display.default
    } else if (this.props.display.desktop && windowWidth < 1200) {
      this.display = this.props.display.desktop
    }

    if (this.display === 1) {
      this.state = {
        index: this.active
      }
    } else if (this.display > 1) {
      if (this.active > 0) {
        this.state = {
          index: Math.floor((this.active + 1) / this.display) * this.display
        }
      }
    }
  }

  componentDidMount = () => {
    const sliderItem = document.querySelectorAll('.slider__item');
    const sliderListWrapWidth = document.querySelector('.slider__list-wrap').offsetWidth;
    document.querySelector('.slider__list').style.width = (sliderListWrapWidth * sliderItem.length / this.display) + 'px';
    sliderItem.forEach((item, index) => {
      item.style.width = sliderListWrapWidth / this.display + 'px';
      this.setState({
        itemWidth: sliderListWrapWidth / this.display
      })
      if (index === this.active) {
        item.classList.add('active');
        if (index > 0) {
          sliderItem[index - 1].classList.add('prev-active')
        }
        if (index < sliderItem.length - 1) {
          sliderItem[index + 1].classList.add('next-active')
        }
      }
    });
  }

  render() {
    return (
      <div className="slider js-slider">
        <div className="slider__list-wrap">
          <div className="slider__list" style={{ transform: 'translateX(-' + this.state.index*this.state.itemWidth + 'px)'}}>
            {
              this.props.list.map(item => item)
            }
          </div>
        </div>
        <div className="slider__control-btn slider__btn-prev js-prev-slide">
          <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13">
            <g>
              <g>
                <g>
                  <path d="M.775 7.045l5.152 5.152a.839.839 0 1 0 1.187-1.186L2.555 6.45l4.559-4.558A.84.84 0 0 0 5.927.707L.775 5.859a.836.836 0 0 0 0 1.186z" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="slider__control-btn slider__btn-next js-next-slide">
          <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13">
            <g>
              <g>
                <path fill="#fff" d="M7.042 7.045l-5.153 5.152a.839.839 0 1 1-1.186-1.186l4.559-4.56-4.56-4.558A.84.84 0 0 1 1.89.707l5.152 5.152a.836.836 0 0 1 0 1.186z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default Slider;
