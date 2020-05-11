import { connect } from 'react-redux';
import React, { Component } from 'react'
import { imagesUrl } from '../../constants/path';
import { setTourAction, selectTourAction } from '../../actions/tour.action';

import history from "../../history";
import PriceDropdown from '../dropdowns/PriceDropdown';

class Tour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      endPrice: 0,
      startPrice: 0,
      estimateDays: 0,
      currentGrid: "col-12"
    }

    this.handleSearchTour = this.handleSearchTour.bind(this);
    this.handleSelectPrice = this.handleSelectPrice.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.convertObjectToParams = this.convertObjectToParams.bind(this);
  }

  componentDidMount() {
    const {page} = this.state;

    this.props.setTours(this.convertObjectToParams({page: page})).then(() => {});

    const script = document.createElement("script");
    script.src = "/assests/javascripts/fixed.js";
    script.async = true;
    document.body.appendChild(script);
  }

  convertObjectToParams(obj){
    var str = '';
    for (let key in obj) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(obj[key]);
    }

    return str;
  }

  handleControlGrid = (type) => {
    this.setState({
      currentGrid: type
    })
  }

  handleCurrentGridView = (type) => {
    if (this.state.currentGrid === type){
      return 'active'
    }
  }

  onLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    });

    this.props.setTours(this.state).then(() => {});
  }

  onSelectTour = (id) => {
    this.props.selectTour(id).then(() => {
      history.push('/tour/' + id);
    });
  }

  formatNumber(num) {
    if (num === undefined) num = 0;

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  formatDate(date,full) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    if(full){
      let dt = new Date(date);

      let day = dt.getDay();

      return (day === 0 ? 'CN': 'Thứ '+(day+1))+', ngày '+day+', tháng '+month+', '+year;
    }

    return [day, month, year].join('/');
  }

  handleChangeField(key, event) {
    let value = event.target.value;

    this.setState({
      [key]: value
    });
  };

  handleSearchTour(){
    const { startPrice, endPrice, estimateDays } = this.state;

    this.props.setTours(this.convertObjectToParams({ startPrice, endPrice, estimateDays })).then(() => {});
  }

  handleSelectPrice(key,value){
    this.setState({
      [key]: value
    });
  }

  renderTour = ((tour, index) =>
    <div className={this.state.currentGrid + " col-custom js-display-grid"} key={"tour-" + index}>
      <div className="tour-result">
        <div className="tour-result__thumbnail bg-img-base js-lazy-load" data-src={tour.avatar}
          data-type="background-image" style={{ backgroundImage: `url(${tour.avatar})` }} onClick={() => this.onSelectTour(tour.schedules[0]._id)}>
        </div>
        <div className="tour-result__title">
          <a className="title" onClick={() => this.onSelectTour(tour.schedules[0]._id)}>{tour.title}</a>
          <p className="day-start">{this.formatDate(tour.schedules[0].departureDay,true)}</p>
          <div className="tour-result__review">
            <img src={imagesUrl + "star-solid.svg"} />
            <img src={imagesUrl + "star-solid.svg"} />
            <img src={imagesUrl + "star-solid.svg"} />
            <img src={imagesUrl + "star-solid.svg"} />
          </div>
        </div>
        <div className="tour-result__date">
          <div className="days-left">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
              <g id="calendar-with-a-clock-time-tools" transform="translate(-0.001)" opacity="0.68">
                <path id="Path_413" data-name="Path 413" d="M2.5,3.125V.625a.625.625,0,0,1,1.25,0v2.5a.625.625,0,0,1-1.25,0Zm10.625.625a.625.625,0,0,0,.625-.625V.625a.625.625,0,0,0-1.25,0v2.5A.625.625,0,0,0,13.126,3.75ZM20,15a5,5,0,1,1-5-5A5,5,0,0,1,20,15Zm-1.25,0A3.75,3.75,0,1,0,15,18.75,3.754,3.754,0,0,0,18.751,15ZM5,7.5H2.5V10H5ZM2.5,13.75H5v-2.5H2.5ZM6.251,10h2.5V7.5h-2.5Zm0,3.75h2.5v-2.5h-2.5Zm-5,1.126V6.25H15v2.5h1.25V3.875A1.364,1.364,0,0,0,14.9,2.5h-.521v.625a1.25,1.25,0,1,1-2.5,0V2.5h-7.5v.625a1.25,1.25,0,1,1-2.5,0V2.5H1.355A1.364,1.364,0,0,0,0,3.875v11A1.366,1.366,0,0,0,1.355,16.25h7.4V15h-7.4A.118.118,0,0,1,1.251,14.876ZM12.5,10V7.5H10V10Zm4.375,5H15V13.125a.625.625,0,0,0-1.25,0v2.5a.625.625,0,0,0,.625.625h2.5a.625.625,0,0,0,0-1.25Z" />
              </g>
            </svg>
            <span className="text-blue-sky whitespace-nowrap">{tour.estimateDays} ngày</span>
            <span>, {this.formatDate(tour.schedules[0].departureDay,true)}</span>
            <span></span>
          </div>
          <div className="tour-result__bought">
            <span>+&nbsp;0&nbsp;bought</span>
          </div>
          <div className="tour-result__price-col-6">
            <p className="price">{this.formatNumber(tour.basePrice)} đ</p>
          </div>
        </div>
        <p className="tour-result__description">{tour.description}</p>
      </div>
    </div>
  )

  render () {
    const { startPrice, endPrice, estimateDays } = this.state;

    return (
      <main className="main">
        <div className="banner bg-img-base js-lazy-load mb-12px" data-src={imagesUrl + "banner-tour.png"} data-type="background-image" style={{ backgroundImage: `url(${imagesUrl + "banner-tour.png"})`}}>
          <div className="d-flex align-items-center h-100">
            <div className="container container-custom">
              <div className="banner__content">
                <h1 className="title">ThankTours</h1>
                <p className="slogan"><span>There are&nbsp;</span><span>3,456 tours</span><span>&nbsp;in ThankTrip</span></p>
                <a href="/tour/supports" className="btn btn--medium btn-support">HỖ TRỢ</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-custom">
          <div className="row row-custom">
            <div className="col-xl-3 col-md-4 col-12 col-custom">
              <div className="js-col-fixed">
                <div className="card card-filter-tour">
                  <h2 className="title">Lọc theo</h2>
                  <h3 className="form-group-title">Ngày khởi hành</h3>
                  <div className="form-group form-group--datepicker">
                    <input className="form-control include-icon-calendar datepicker" type="text" defaultValue={startPrice === 0 ? 'Chọn ngày khởi hành': ''} onChange={(ev) => this.handleChangeField('startPrice',ev)}
                           value={startPrice === 0 ? 'Chọn ngày khởi hành': ''}/>
                  </div>
                  <div className="form-group input-range">
                    <label>Đi trong bao lâu?</label>
                    <p className="min-day">0 ngày</p>
                    <div className="range-wrap">
                      <div className="range-value js-range-value" style={{left: 'calc('+estimateDays*10+'% + '+(6.5-estimateDays*1.3)+'px)'}}>
                        <span>{estimateDays} ngày</span>
                      </div>
                      <input className="field js-input-range" type="range" defaultValue={1} min={0} max={10} step={1} onChange={(ev) => this.handleChangeField('estimateDays',ev)}
                             value={estimateDays} style={{backgroundImage: 'linear-gradient(90deg, rgb(255, 163, 17) 0%, rgb(255, 69, 0) '+estimateDays*10+'%, rgb(243, 242, 242) '+estimateDays*10+'%)'}}/>
                    </div>
                  </div>
                  <h3 className="form-group-title">Khởi hành từ</h3>
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Nhập địa điểm" />
                  </div>
                  <h3 className="form-group-title pb-2">Khoảng giá</h3>
                  <PriceDropdown key="startPrice" defaultValue={startPrice} onSelectPrice={this.handleSelectPrice} formTitle="Bắt đầu từ"/>
                  <PriceDropdown key="endPrice" defaultValue={endPrice} onSelectPrice={this.handleSelectPrice} formTitle="Đến"/>
                  <h3 className="form-group-title pb-2">Hiển thị theo</h3>
                  <div className="checkbox">
                    <input id={1} type="checkbox" />
                    <label className="title" htmlFor={1}>Theo giá từ thấp đến cao</label>
                  </div>
                  <div className="checkbox">
                    <input id={2} type="checkbox" />
                    <label className="title" htmlFor={2}>Theo giá từ cao đến thấp</label>
                  </div>
                  <div className="checkbox">
                    <input id={3} type="checkbox" />
                    <label className="title" htmlFor={3}>Theo thời gian cập nhật</label>
                  </div>
                  <div className="checkbox">
                    <input id={4} type="checkbox" />
                    <label className="title" htmlFor={4}>Theo đánh giá</label>
                  </div>
                  <div className="checkbox">
                    <input id={6} type="checkbox" />
                    <label className="title" htmlFor={6}>Bán chạy nhất</label>
                  </div>
                  <h3 className="form-group-title pb-2">Ngôn ngữ</h3>
                  <div className="checkbox">
                    <input id={7} type="checkbox" />
                    <label className="title" htmlFor={7}>Tiếng Anh</label>
                  </div>
                  <div className="checkbox">
                    <input id={8} type="checkbox" />
                    <label className="title" htmlFor={8}>Tiếng Việt</label>
                  </div>
                  <div className="checkbox">
                    <input id={9} type="checkbox" />
                    <label className="title" htmlFor={9}>Ngôn ngữ khác</label>
                  </div>
                  <button onClick={this.handleSearchTour} className="btn btn--medium btn--bg-linear btn-submit">OK</button>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-8 col-12 col-custom">
              <div className="card card-search-tour-address">
                <div className="d-flex justify-content-between">
                  <h2 className="title">Bạn muốn đi đâu?</h2>
                  <div className="control-grid">
                    <svg className={this.handleCurrentGridView('col-12') + " icon-one-col"} xmlns="http://www.w3.org/2000/svg" width="13.442" height="15.565" viewBox="0 0 13.442 15.565" onClick={() => this.handleControlGrid('col-12')}>
                      <g transform="translate(-0.247 0)">
                        <g transform="translate(0.247 0)">
                          <path d="M195.047,201h-11.2a1.417,1.417,0,0,0-.793.214.616.616,0,0,0-.327.519V203.2a.616.616,0,0,0,.327.519,1.417,1.417,0,0,0,.793.214h11.2a1.416,1.416,0,0,0,.793-.214.616.616,0,0,0,.327-.519v-1.467a.616.616,0,0,0-.327-.519A1.416,1.416,0,0,0,195.047,201Z" transform="translate(-182.725 -194.683)" fill="#afafaf" />
                          <path d="M195.047,347.177h-11.2a1.417,1.417,0,0,0-.793.214.616.616,0,0,0-.327.519v1.467a.616.616,0,0,0,.327.52,1.417,1.417,0,0,0,.793.214h11.2a1.417,1.417,0,0,0,.793-.214.616.616,0,0,0,.327-.52V347.91a.616.616,0,0,0-.327-.519A1.418,1.418,0,0,0,195.047,347.177Z" transform="translate(-182.725 -334.545)" fill="#afafaf" />
                          <path d="M195.84,55.032a1.417,1.417,0,0,0-.793-.214h-11.2a1.417,1.417,0,0,0-.793.214.616.616,0,0,0-.327.519v1.467a.616.616,0,0,0,.327.519,1.417,1.417,0,0,0,.793.214h11.2a1.417,1.417,0,0,0,.793-.214.616.616,0,0,0,.327-.519V55.551A.616.616,0,0,0,195.84,55.032Z" transform="translate(-182.725 -54.818)" fill="#afafaf" />
                        </g>
                      </g>
                    </svg>
                    <svg className={this.handleCurrentGridView('col-6') +" icon-two-col"} xmlns="http://www.w3.org/2000/svg" width="15.565" height="15.565" viewBox="0 0 15.565 15.565" onClick={() => this.handleControlGrid('col-6')}>
                      <g>
                        <g>
                          <path d="M5.375,0H1.8A1.8,1.8,0,0,0,0,1.8V5.375a1.8,1.8,0,0,0,1.8,1.8H5.375a1.8,1.8,0,0,0,1.8-1.8V1.8A1.8,1.8,0,0,0,5.375,0Zm.584,5.375a.585.585,0,0,1-.584.584H1.8a.585.585,0,0,1-.584-.584V1.8A.585.585,0,0,1,1.8,1.216H5.375a.585.585,0,0,1,.584.584Z" fill="#afafaf" />
                        </g>
                      </g>
                      <g transform="translate(8.391)">
                        <g>
                          <path d="M281.35,0h-3.526A1.826,1.826,0,0,0,276,1.824V5.35a1.826,1.826,0,0,0,1.824,1.824h3.526a1.826,1.826,0,0,0,1.824-1.824V1.824A1.826,1.826,0,0,0,281.35,0Zm.608,5.35a.609.609,0,0,1-.608.608h-3.526a.609.609,0,0,1-.608-.608V1.824a.609.609,0,0,1,.608-.608h3.526a.609.609,0,0,1,.608.608Z" transform="translate(-276)" fill="#afafaf" />
                        </g>
                      </g>
                      <g data-name="Group 447" transform="translate(0 8.391)">
                        <g>
                          <path d="M5.375,276H1.8A1.8,1.8,0,0,0,0,277.8v3.575a1.8,1.8,0,0,0,1.8,1.8H5.375a1.8,1.8,0,0,0,1.8-1.8V277.8A1.8,1.8,0,0,0,5.375,276Zm.584,5.375a.585.585,0,0,1-.584.584H1.8a.585.585,0,0,1-.584-.584V277.8a.585.585,0,0,1,.584-.584H5.375a.585.585,0,0,1,.584.584Z" transform="translate(0 -276)" fill="#afafaf" />
                        </g>
                      </g>
                      <g transform="translate(8.391 8.391)">
                        <g>
                          <path d="M281.35,276h-3.526A1.826,1.826,0,0,0,276,277.824v3.526a1.826,1.826,0,0,0,1.824,1.824h3.526a1.826,1.826,0,0,0,1.824-1.824v-3.526A1.826,1.826,0,0,0,281.35,276Zm.608,5.35a.609.609,0,0,1-.608.608h-3.526a.609.609,0,0,1-.608-.608v-3.526a.609.609,0,0,1,.608-.608h3.526a.609.609,0,0,1,.608.608Z" transform="translate(-276 -276)" fill="#afafaf" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="field-search">
                  <input type="text" placeholder="Việt Nam" />
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
              <p className="number-result">CÓ {this.props.tours.length} KẾT QUẢ TÌM KIẾM</p>
              <div className="row row-custom">
                {
                  this.props.tours.map(this.renderTour)
                }
              </div>
              <a className="btn btn-load-more-tour" onClick={this.onLoadMore}><img src={imagesUrl +"spinner-of-dots.png"}/><span>TẢI THÊM</span></a>
            </div>
            <div className="col-xl-3 col-12 col-custom">
              <div className="js-col-fixed">
                <div className="card card-sale-tour">
                <h2 className="card__title">Sale Tours</h2>
                <div className="card__content">
                  <div className="tour bg-img-base js-lazy-load" style={{ backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}} data-src={imagesUrl + "bg-banner.png"} data-type="background-image">
                    <div className="tour__review">
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#fff" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="price-tag">
                      <p className="current">5.000.000 đ</p>
                      <p className="sale"><span className="sale__percent">- 30%&nbsp;</span><span className="old-price">7.000.000 đ</span></p>
                    </div>
                    <div className="tour__content">
                      <div className="tour__content-bottom">
                        <h3 className="tour__title">Phượt Vũng Tàu</h3>
                        <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span className="text-white ml-1">nữa khởi hành</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="tour bg-img-base js-lazy-load" style={{ backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}} data-src={imagesUrl + "bg-banner.png"} data-type="background-image">
                    <div className="tour__review">
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#fff" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="price-tag">
                      <p className="current">5.000.000 đ</p>
                      <p className="sale"><span className="sale__percent">- 30%&nbsp;</span><span className="old-price">7.000.000 đ</span></p>
                    </div>
                    <div className="tour__content">
                      <div className="tour__content-bottom">
                        <h3 className="tour__title">Phượt Vũng Tàu</h3>
                        <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span className="text-white ml-1">nữa khởi hành</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="tour bg-img-base js-lazy-load" style={{ backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}} data-src={imagesUrl + "bg-banner.png"} data-type="background-image">
                    <div className="tour__review">
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#ff4827" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} viewBox="0 0 8 7">
                        <g>
                          <g>
                            <path fill="#fff" d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="price-tag">
                      <p className="current">5.000.000 đ</p>
                      <p className="sale"><span className="sale__percent">- 30%&nbsp;</span><span className="old-price">7.000.000 đ</span></p>
                    </div>
                    <div className="tour__content">
                      <div className="tour__content-bottom">
                        <h3 className="tour__title">Phượt Vũng Tàu</h3>
                        <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span className="text-white ml-1">nữa khởi hành</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="link-wrap">
                    <a className="link-show-all">
                      <span>Show All</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7} viewBox="0 0 13 7">
                        <g>
                          <g>
                            <g>
                              <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    selectTour: (id) => selectTourAction(dispatch, id),
    setTours: (params) => setTourAction(dispatch, params)
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.tour.page,
    per_page: state.tour.per_page,
    tours: state.tour.tours,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
