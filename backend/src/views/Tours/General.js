import axios from 'axios';
import {Link} from "react-router-dom";
import React, { Component } from 'react';

import {Input, InputGroup, Modal, ModalBody, Table} from 'reactstrap';

import { authHeader } from "../../helpers/authHeaders";
import Moment from "react-moment";

function TourRow(props) {
  const tour = props.tour;
  const viewMode = props.viewMode;
  const linkTour = `/tour/${tour._id}`;

  if(viewMode){
    return (
        <div className="tour-list-items">
          <Link to={linkTour}>
            <img src={tour.avatar} className="tour-item-img-lg mb-2" alt={tour.title}/>
            <h6><b>{tour.title}</b></h6>
            <div className="clearfix">
              <div className="float-left">
                <div className="tour-price text-bold text-orange">1.200.000 đ</div>
              </div>
              <div className="float-right">
                <i className="fa fa-calendar"></i> <span> {tour.estimateDays} days</span>
              </div>
            </div>
          </Link>
        </div>
    )
  }
  else{
    return (
        <div className="tour-list-items row">
          <div className="col-md-3">
            <img src={tour.avatar} className="tour-item-img-sm" alt={tour.title}/>
          </div>
          <div className="col-md-9">
            <h5><b>{tour.title}</b></h5>
            <div className="clearfix">
              <div className="float-left">
                <div className="tour-price text-bold text-orange">1.200.000 đ</div>
              </div>
              <div className="float-right">
                <i className="fa fa-calendar"></i> <span> {tour.estimateDays} days</span>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tours: [],
      loading: false,
      viewMode: false,
      tourSelected: {}
    };

    this.formatDate = this.formatDate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSaveTour = this.handleSaveTour.bind(this);
    this.handleViewMode = this.handleViewMode.bind(this);
    this.handleChangeOnSale = this.handleChangeOnSale.bind(this);
    this.handleChangeObjectField = this.handleChangeObjectField.bind(this);
  }

  componentDidMount(){
    axios.get("/api/admin/tours",{headers: authHeader()}).then(response => {
      this.setState({ tours: response.data.tours });
    }).catch(function (error) {
      console.log(error);
    });

    axios.get("/api/admin/tour/"+this.props.match.params.id,{headers: authHeader()}).then(response => {
      this.setState({
        tourSelected: response.data
      });
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleChangeObjectField(key, event) {
    const keyArray = key.split('.');

    const value = event.target.value;

    this.setState(prevState => ({
      [keyArray[0]]: {
        ...prevState[keyArray[0]],
        [keyArray[1]]:  value
      }
    }));
  };

  handleChangeOnSale(){
    this.setState(prevState => ({
      tourSelected: {
        ...prevState.tourSelected,
      onSale: !prevState.tourSelected.onSale
      }
    }));
  }

  handleSaveTour() {
    let that = this;

    const { onSale, onSaleTo, onSaleFrom } = this.state.tourSelected;

    const paramsBody = {
      onSale,
      onSaleTo,
      onSaleFrom
    };

    this.setState({
      loading: true
    },function () {
      setTimeout(function () {
        axios.post('/api/admin/tour/'+that.props.match.params.id+'/update', paramsBody,{headers:authHeader()}).then(() => {
          that.setState({
            loading: false
          });
        });
      }, 500);
    })
  }

  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  handleViewMode(){
    this.setState({
      viewMode: !this.state.viewMode
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const tourId = this.props.match.params.id;

    const { tours, viewMode, tourSelected } = this.state;

    const linkChat = `/#/tour/${tourId}/chat`;
    const linkUpdate = `/#/tours/${tourId}/update`;
    const linkGeneral = `/#/tour/${tourId}/general`;
    const linkSupport = `/#/tour/${tourId}/support`;

    return (
        <div className="animated fadeIn">
          <div className="rct-page-content">
            <div className="row">
              <div className="col-md-4 my-tours" style={{position: 'unset'}}>
                <div className="clearfix mb-4">
                  <div>
                    <div className="float-left">
                      <h1>My Tours</h1>
                      <small>There are <span>{tours.length}</span> tours</small>
                    </div>
                    <div className="float-right">
                      <a href="#/tours/create">
                        <button className="btn btn-rounded btn-custom btn-linear" style={{width: '100px'}}>
                          <i className="fa fa-plus"></i> Tạo mới
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <div className="bd-highlight align-self-center w-70">
                    <div className="css-1pcexqc-container">
                      <div className="css-bg1rzq-control">
                        <InputGroup>
                          <Input type="select" name="ccmonth" id="ccmonth">
                            <option value="">Chọn điểm đi</option>
                            <option value="1">Hà Nội</option>
                            <option value="2">Hải Phòng</option>
                            <option value="3">Quảng Ninh</option>
                            <option value="4">Nha Trang</option>
                            <option value="5">TP. Hồ Chí Minh</option>
                          </Input>
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                  <div className="bd-highlight align-self-center">
                    <button className={viewMode ? 'btn btn-display' : 'btn btn-display active'} onClick={this.handleViewMode}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMC4wMjIiIGhlaWdodD0iMTcuNjY1IiB2aWV3Qm94PSIwIDAgMjAuMDIyIDE3LjY2NSI+DQogIDxnIGlkPSJHcm91cF80ODUiIGRhdGEtbmFtZT0iR3JvdXAgNDg1IiBvcGFjaXR5PSIwLjYzNyI+DQogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV81ODMiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDU4MyIgd2lkdGg9IjEzLjE0MyIgaGVpZ2h0PSIxLjA0OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi44NzkgMCkiIGZpbGw9IiMyMzFmMjAiLz4NCiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzU4NCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgNTg0IiB3aWR0aD0iOS42NTIiIGhlaWdodD0iMS4wNDkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuODc5IDQuNzk5KSIgZmlsbD0iIzIzMWYyMCIvPg0KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfNTg1IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1ODUiIHdpZHRoPSI1Ljc1MyIgaGVpZ2h0PSIxLjA0OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi44NzkgOS41OTgpIiBmaWxsPSIjMjMxZjIwIi8+DQogICAgPHBhdGggaWQ9IlBhdGhfNDY2IiBkYXRhLW5hbWU9IlBhdGggNDY2IiBkPSJNMTQyLjMzMiw0OGEuNDIzLjQyMywwLDAsMC0uNTk1LS42bC0zLjA0NiwzLjA0NnYtMTUuOGEuNDE5LjQxOSwwLDAsMC0uNDIxLS40MjEuNDIzLjQyMywwLDAsMC0uNDI3LjQyMXYxNS44TDEzNC44LDQ3LjRhLjQzMS40MzEsMCwwLDAtLjYsMCwuNDIxLjQyMSwwLDAsMCwwLC42bDMuNzY3LDMuNzY3YS40MTQuNDE0LDAsMCwwLC41OTUsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzQuMDc3IC0zNC4yMjQpIiBmaWxsPSIjMWUyMDFkIi8+DQogIDwvZz4NCjwvc3ZnPg0K"
                           alt="list"/>
                    </button>
                    <button className={viewMode ? 'btn btn-display active' : 'btn btn-display'} onClick={this.handleViewMode}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNy4yMDgiIGhlaWdodD0iMTcuODA0IiB2aWV3Qm94PSIwIDAgMTcuMjA4IDE3LjgwNCI+DQogIDxwYXRoIGlkPSJQYXRoXzQ2NyIgZGF0YS1uYW1lPSJQYXRoIDQ2NyIgZD0iTTE1Mi4wNTcsMjY2LjM3OEgxMzkuNjM5YTIuNCwyLjQsMCwwLDEtMi4zOTUtMi4zOTV2LTcuNWEyLjQsMi40LDAsMCwxLDIuMzk1LTIuMzk1aDEyLjQxOGEyLjQsMi40LDAsMCwxLDIuMzk1LDIuMzk1djcuNUEyLjQsMi40LDAsMCwxLDE1Mi4wNTcsMjY2LjM3OFptLS4wMDgsMS43NjdoLTEyLjR2Ljk5aDEyLjRaTTE1MC40LDI3MC45aC05LjEwOHYuOTlIMTUwLjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3LjI0NCAtMjU0LjA4NykiIGZpbGw9IiMyMzFmMjAiIG9wYWNpdHk9IjAuNjEzIi8+DQo8L3N2Zz4NCg=="
                           alt="list"/>
                    </button>
                  </div>
                </div>
                {tours.map((tour,index) =>
                    <TourRow tour={tour} key={index} viewMode={viewMode} />
                )}
              </div>
              <div className="col-md-8">
                <div className="">
                  <div className="rct-block ">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <ul className="list-inline">
                          <li className="custom-tab list-inline-item react-tabs__tab--selected">
                            <a className="text-active" href={linkGeneral}>General</a>
                          </li>
                          <li className="custom-tab list-inline-item ">
                            <a className="text-gray" href={linkChat}>Chat room</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                          <li className="custom-tab list-inline-item">
                            <a className="text-gray" href={linkSupport}>Support</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                        </ul>
                        <div className="clearfix">
                          <div className="float-left text-primary">
                            <i className="fa fa-info-circle"></i> <span> Thông tin về chuyến đi</span>
                          </div>
                          <div className="float-right text-primary">
                            <a href={linkUpdate}>
                              <i className="fa fa-edit"></i> <span> Cập nhật</span>
                            </a>
                          </div>
                        </div>
                        <hr/>
                          <div className="row mb-2">
                            <div className="col-md-3 col-sm-6">
                              <div className="">Tổng doanh số</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className=""><b>0 đ</b></div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className="">Tổng khách hàng</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className=""><b>0</b></div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-3 col-sm-6">
                              <div className="">Đã hoàn thành</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className="text-primary"><b>0 đ</b></div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className="">Đã hoàn thành</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className="text-primary"><b>0</b></div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-3 col-sm-6">
                              <div className="">Chưa hoàn thành</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className=" text-danger"><b>0 đ</b></div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className="">Chưa hoàn thành</div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                              <div className=" text-danger"><b>0</b></div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="rct-block">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <div className="clearfix">
                          <div className="float-left on-sale" style={{marginTop: '10px'}}>
                            <div className="switch" style={{width: 'auto'}}>
                              <input onChange={(ev) => this.handleChangeOnSale()} checked={tourSelected.onSale} className="switch__control" type="checkbox" id="st"/>
                              <label className="switch__content" htmlFor="st">
                                <span className="title">Bắt đầu mở bán</span>
                              </label>
                            </div>
                          </div>
                          <div className="float-right">
                            <table>
                              <tbody>
                              <tr>
                                <td>
                                  <div className="ml-1 mr-1">Từ</div>
                                </td>
                                <td>
                                  <div className="react-datepicker-component react-datepicker-component my-react-component d-inline">
                                    <div className="react-datepicker-input has-value is-small">
                                      <input onChange={(ev) => this.handleChangeObjectField('tourSelected.onSaleFrom',ev)}
                                             value={this.formatDate(tourSelected.onSaleFrom)} className="form-control" type="date"/>
                                      <div className="react-flex-view align-content-center button-wrapper" style={{flex: '0 1 auto'}}>
                                        <div className="react-flex-view input-button" style={{flex: '0 1 auto'}}>
                                          <i className="icon-rc-datepicker icon-rc-datepicker_calendar"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="ml-1 mr-1">Đến</div>
                                </td>
                                <td>
                                  <div className="react-datepicker-component react-datepicker-component my-react-component d-inline">
                                    <div className="react-datepicker-input has-value is-small">
                                      <input onChange={(ev) => this.handleChangeObjectField('tourSelected.onSaleTo',ev)}
                                             value={this.formatDate(tourSelected.onSaleTo)} className="form-control" type="date"/>
                                      <div className="react-flex-view align-content-center button-wrapper" style={{flex: '0 1 auto'}}>
                                        <div className="react-flex-view input-button" style={{flex: '0 1 auto'}}>
                                          <i className="icon-rc-datepicker icon-rc-datepicker_calendar"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <button onClick={this.handleSaveTour} className="btn btn-custom btn-linear" style={{width: '100px'}}>
                                    <i className="fa fa-check"></i> Lưu
                                  </button>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <Modal isOpen={this.state.loading} toggle={() => this.toggleModalLoading}>
                              <ModalBody>
                                <div className="modal-popup__content">
                                  <img src="https://duybnd-1659.github.io/images/loading-popup01.png"/>
                                  <h5>Hệ thống đang xử lý dữ liệu</h5>
                                  <div className="loader">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="12" viewBox="0 0 32 12">
                                      <g>
                                        <g>
                                          <g>
                                            <path fill="#999"
                                                  d="M-.016.503h.458v6.356c0 .214.002.393.006.538.003.145.019.27.046.378.026.107.07.191.131.252s.153.092.275.092v.457c-.214 0-.382-.044-.504-.13a.791.791 0 0 1-.275-.356 1.715 1.715 0 0 1-.114-.527 9.102 9.102 0 0 1-.023-.704z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M2.332 4.51c0-.418.112-.744.338-.972.225-.23.532-.343.921-.343.367 0 .668.114.905.343.236.228.355.554.355.973V6.8c0 .413-.119.735-.355.968-.237.233-.538.35-.905.35-.39 0-.696-.117-.921-.35-.226-.233-.338-.555-.338-.968zm1.923 3.935a1.704 1.704 0 0 0 .917-.928c.092-.217.137-.456.137-.716v-2.29c0-.267-.045-.51-.137-.727a1.734 1.734 0 0 0-.373-.562 1.642 1.642 0 0 0-.544-.36 1.744 1.744 0 0 0-.664-.126c-.244 0-.47.042-.68.126-.211.084-.392.205-.545.36a1.714 1.714 0 0 0-.361.562c-.088.217-.132.46-.132.727V6.8c0 .26.044.499.132.716.088.218.209.405.361.562.153.156.334.279.544.366.21.087.437.131.681.131.237 0 .458-.044.664-.13z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M8.825 5.897a1.241 1.241 0 0 0-.366-.178 1.484 1.484 0 0 0-.435-.063c-.367 0-.67.105-.906.315-.236.21-.354.487-.354.83 0 .413.118.735.354.968.237.233.539.35.906.35.388 0 .696-.117.921-.35.226-.233.338-.555.338-.968v-2.29c0-.42-.112-.745-.338-.973-.225-.23-.533-.343-.921-.343-.436 0-.787.167-1.054.503l-.367-.217c.137-.23.338-.411.602-.544a1.82 1.82 0 0 1 1.5-.074c.21.083.39.204.544.36.152.156.272.343.36.561.088.217.132.46.132.727V6.8c0 .191.002.363.006.516.004.153.019.285.046.395a.502.502 0 0 0 .137.258.376.376 0 0 0 .27.091v.459c-.245 0-.428-.056-.55-.167a.929.929 0 0 1-.264-.44 1.716 1.716 0 0 1-1.362.663 1.689 1.689 0 0 1-1.581-1.059 1.832 1.832 0 0 1-.138-.716c0-.221.046-.429.138-.624.091-.195.215-.364.372-.51.157-.144.338-.259.544-.343.206-.083.427-.126.665-.126.29 0 .556.065.8.195z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M13.463 3.492a1.29 1.29 0 0 0-.366-.178 1.505 1.505 0 0 0-.435-.063c-.367 0-.67.115-.905.344-.237.23-.355.553-.355.973v2.233c0 .413.112.735.338.968.225.233.532.35.922.35.343 0 .635-.11.875-.333.241-.221.368-.53.384-.927V.503h.458v6.241c0 .199.002.378.006.538.004.16.02.298.046.413.027.114.07.204.132.269.06.065.152.097.275.097v.459c-.245 0-.429-.056-.55-.167a.933.933 0 0 1-.263-.452c-.161.206-.36.37-.596.492a1.645 1.645 0 0 1-.767.183 1.76 1.76 0 0 1-.682-.13 1.617 1.617 0 0 1-.544-.367 1.713 1.713 0 0 1-.36-.562 1.89 1.89 0 0 1-.133-.716V4.568c0-.267.047-.51.138-.727a1.73 1.73 0 0 1 .372-.56c.157-.158.338-.277.544-.362.206-.084.427-.126.665-.126.29 0 .556.065.8.195z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M16.04 8.52V2.793h.458V8.52zm-.058-7.044a.28.28 0 0 1 .08-.206.28.28 0 0 1 .206-.08.28.28 0 0 1 .206.08.28.28 0 0 1 .08.206.28.28 0 0 1-.08.206.28.28 0 0 1-.206.081.28.28 0 0 1-.206-.08.28.28 0 0 1-.08-.207z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M17.93 2.793h.457V3.4c.152-.168.34-.32.561-.458.222-.138.454-.206.699-.206.244 0 .47.044.681.132.21.088.391.21.544.366.153.157.273.344.361.561.088.218.132.457.132.716V8.52h-.459V4.51c0-.411-.112-.734-.337-.966-.226-.234-.533-.35-.922-.35-.366 0-.668.116-.905.35-.237.232-.355.555-.355.967V8.52h-.458z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M23.025 4.51c0-.418.113-.744.338-.972.225-.23.533-.343.922-.343.366 0 .669.114.905.343.236.228.355.554.355.973v1.317c0 .413-.119.735-.355.968-.236.233-.539.349-.905.349-.39 0-.697-.116-.922-.35-.225-.232-.338-.554-.338-.967zm-.458 5.27c0 .236.046.457.138.663a1.788 1.788 0 0 0 .916.916c.206.092.427.138.664.138.244 0 .471-.044.681-.132a1.63 1.63 0 0 0 .905-.927c.088-.218.132-.457.132-.716 0-.222-.044-.432-.132-.63a1.727 1.727 0 0 0-1.586-1.031v.459c.39 0 .696.114.922.343.225.23.338.515.338.859 0 .412-.113.735-.338.967-.226.233-.532.35-.922.35-.366 0-.668-.119-.905-.355-.236-.237-.355-.539-.355-.905zm1.718-2.177a1.682 1.682 0 0 0 1.208-.498 1.74 1.74 0 0 0 .373-.561 1.82 1.82 0 0 0 .137-.716V4.511c0-.19.002-.364.006-.52.004-.157.019-.29.045-.396a.534.534 0 0 1 .132-.252c.062-.062.152-.092.275-.092v-.458c-.244 0-.43.05-.555.149a.815.815 0 0 0-.27.447 1.795 1.795 0 0 0-.595-.476 1.674 1.674 0 0 0-.756-.177 1.82 1.82 0 0 0-.682.126 1.57 1.57 0 0 0-.544.36 1.713 1.713 0 0 0-.36.562c-.088.217-.132.46-.132.727v1.317c0 .26.044.498.132.716a1.634 1.634 0 0 0 .904.928c.21.087.437.131.682.131z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M27.32 8.119c0-.107.04-.201.12-.28a.385.385 0 0 1 .562 0 .384.384 0 0 1 0 .56.385.385 0 0 1-.562 0 .383.383 0 0 1-.12-.28z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M29.267 8.119c0-.107.04-.201.12-.28a.386.386 0 0 1 .562 0 .385.385 0 0 1 0 .56.386.386 0 0 1-.562 0 .383.383 0 0 1-.12-.28z"></path>
                                          </g>
                                          <g>
                                            <path fill="#999"
                                                  d="M31.214 8.119c0-.107.04-.201.12-.28a.385.385 0 0 1 .562 0c.08.079.12.173.12.28 0 .106-.04.2-.12.28a.385.385 0 0 1-.562 0 .384.384 0 0 1-.12-.28z"></path>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </ModalBody>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="rct-block ">
                    <div className="rct-block-title "><h4>Tour Rules </h4></div>
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="row">
                              <div className="col-5">
                                <button className="btn-add" type="button" onClick={this.toggleModal}>
                                  <i className="fa fa-plus fa-2x"></i>
                                </button>
                              </div>
                              <div className="col-7">
                                <div style={{marginTop: '15px'}}>Thêm thành viên</div>
                                <div>
                                  <small className="text-gray">Vai trò trong tour</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal isOpen={this.state.loading} toggle={() => this.toggleModalLoading}>
                        <ModalBody>
                          <div className="modal-popup__content">
                            <img src="https://duybnd-1659.github.io/images/loading-popup01.png"/>
                            <h5>Hệ thống đang xử lý dữ liệu</h5>
                            <div className="loader">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="12" viewBox="0 0 32 12">
                                <g>
                                  <g>
                                    <g>
                                      <path fill="#999"
                                            d="M-.016.503h.458v6.356c0 .214.002.393.006.538.003.145.019.27.046.378.026.107.07.191.131.252s.153.092.275.092v.457c-.214 0-.382-.044-.504-.13a.791.791 0 0 1-.275-.356 1.715 1.715 0 0 1-.114-.527 9.102 9.102 0 0 1-.023-.704z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M2.332 4.51c0-.418.112-.744.338-.972.225-.23.532-.343.921-.343.367 0 .668.114.905.343.236.228.355.554.355.973V6.8c0 .413-.119.735-.355.968-.237.233-.538.35-.905.35-.39 0-.696-.117-.921-.35-.226-.233-.338-.555-.338-.968zm1.923 3.935a1.704 1.704 0 0 0 .917-.928c.092-.217.137-.456.137-.716v-2.29c0-.267-.045-.51-.137-.727a1.734 1.734 0 0 0-.373-.562 1.642 1.642 0 0 0-.544-.36 1.744 1.744 0 0 0-.664-.126c-.244 0-.47.042-.68.126-.211.084-.392.205-.545.36a1.714 1.714 0 0 0-.361.562c-.088.217-.132.46-.132.727V6.8c0 .26.044.499.132.716.088.218.209.405.361.562.153.156.334.279.544.366.21.087.437.131.681.131.237 0 .458-.044.664-.13z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M8.825 5.897a1.241 1.241 0 0 0-.366-.178 1.484 1.484 0 0 0-.435-.063c-.367 0-.67.105-.906.315-.236.21-.354.487-.354.83 0 .413.118.735.354.968.237.233.539.35.906.35.388 0 .696-.117.921-.35.226-.233.338-.555.338-.968v-2.29c0-.42-.112-.745-.338-.973-.225-.23-.533-.343-.921-.343-.436 0-.787.167-1.054.503l-.367-.217c.137-.23.338-.411.602-.544a1.82 1.82 0 0 1 1.5-.074c.21.083.39.204.544.36.152.156.272.343.36.561.088.217.132.46.132.727V6.8c0 .191.002.363.006.516.004.153.019.285.046.395a.502.502 0 0 0 .137.258.376.376 0 0 0 .27.091v.459c-.245 0-.428-.056-.55-.167a.929.929 0 0 1-.264-.44 1.716 1.716 0 0 1-1.362.663 1.689 1.689 0 0 1-1.581-1.059 1.832 1.832 0 0 1-.138-.716c0-.221.046-.429.138-.624.091-.195.215-.364.372-.51.157-.144.338-.259.544-.343.206-.083.427-.126.665-.126.29 0 .556.065.8.195z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M13.463 3.492a1.29 1.29 0 0 0-.366-.178 1.505 1.505 0 0 0-.435-.063c-.367 0-.67.115-.905.344-.237.23-.355.553-.355.973v2.233c0 .413.112.735.338.968.225.233.532.35.922.35.343 0 .635-.11.875-.333.241-.221.368-.53.384-.927V.503h.458v6.241c0 .199.002.378.006.538.004.16.02.298.046.413.027.114.07.204.132.269.06.065.152.097.275.097v.459c-.245 0-.429-.056-.55-.167a.933.933 0 0 1-.263-.452c-.161.206-.36.37-.596.492a1.645 1.645 0 0 1-.767.183 1.76 1.76 0 0 1-.682-.13 1.617 1.617 0 0 1-.544-.367 1.713 1.713 0 0 1-.36-.562 1.89 1.89 0 0 1-.133-.716V4.568c0-.267.047-.51.138-.727a1.73 1.73 0 0 1 .372-.56c.157-.158.338-.277.544-.362.206-.084.427-.126.665-.126.29 0 .556.065.8.195z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M16.04 8.52V2.793h.458V8.52zm-.058-7.044a.28.28 0 0 1 .08-.206.28.28 0 0 1 .206-.08.28.28 0 0 1 .206.08.28.28 0 0 1 .08.206.28.28 0 0 1-.08.206.28.28 0 0 1-.206.081.28.28 0 0 1-.206-.08.28.28 0 0 1-.08-.207z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M17.93 2.793h.457V3.4c.152-.168.34-.32.561-.458.222-.138.454-.206.699-.206.244 0 .47.044.681.132.21.088.391.21.544.366.153.157.273.344.361.561.088.218.132.457.132.716V8.52h-.459V4.51c0-.411-.112-.734-.337-.966-.226-.234-.533-.35-.922-.35-.366 0-.668.116-.905.35-.237.232-.355.555-.355.967V8.52h-.458z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M23.025 4.51c0-.418.113-.744.338-.972.225-.23.533-.343.922-.343.366 0 .669.114.905.343.236.228.355.554.355.973v1.317c0 .413-.119.735-.355.968-.236.233-.539.349-.905.349-.39 0-.697-.116-.922-.35-.225-.232-.338-.554-.338-.967zm-.458 5.27c0 .236.046.457.138.663a1.788 1.788 0 0 0 .916.916c.206.092.427.138.664.138.244 0 .471-.044.681-.132a1.63 1.63 0 0 0 .905-.927c.088-.218.132-.457.132-.716 0-.222-.044-.432-.132-.63a1.727 1.727 0 0 0-1.586-1.031v.459c.39 0 .696.114.922.343.225.23.338.515.338.859 0 .412-.113.735-.338.967-.226.233-.532.35-.922.35-.366 0-.668-.119-.905-.355-.236-.237-.355-.539-.355-.905zm1.718-2.177a1.682 1.682 0 0 0 1.208-.498 1.74 1.74 0 0 0 .373-.561 1.82 1.82 0 0 0 .137-.716V4.511c0-.19.002-.364.006-.52.004-.157.019-.29.045-.396a.534.534 0 0 1 .132-.252c.062-.062.152-.092.275-.092v-.458c-.244 0-.43.05-.555.149a.815.815 0 0 0-.27.447 1.795 1.795 0 0 0-.595-.476 1.674 1.674 0 0 0-.756-.177 1.82 1.82 0 0 0-.682.126 1.57 1.57 0 0 0-.544.36 1.713 1.713 0 0 0-.36.562c-.088.217-.132.46-.132.727v1.317c0 .26.044.498.132.716a1.634 1.634 0 0 0 .904.928c.21.087.437.131.682.131z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M27.32 8.119c0-.107.04-.201.12-.28a.385.385 0 0 1 .562 0 .384.384 0 0 1 0 .56.385.385 0 0 1-.562 0 .383.383 0 0 1-.12-.28z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M29.267 8.119c0-.107.04-.201.12-.28a.386.386 0 0 1 .562 0 .385.385 0 0 1 0 .56.386.386 0 0 1-.562 0 .383.383 0 0 1-.12-.28z"></path>
                                    </g>
                                    <g>
                                      <path fill="#999"
                                            d="M31.214 8.119c0-.107.04-.201.12-.28a.385.385 0 0 1 .562 0c.08.079.12.173.12.28 0 .106-.04.2-.12.28a.385.385 0 0 1-.562 0 .384.384 0 0 1-.12-.28z"></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <div className="">
                          <div className="rct-block ">
                            <div className="rct-block-title "><h4>By Years Old </h4></div>
                            <div className="collapse show">
                              <div className="rct-block-content">
                                <div>
                                  <div id="progress_1587585329984" className="progess-wrapper">

                                  </div>
                                  <div className="d-flex justify-content-between mb-3">
                                    <div className="bd-highlight align-self-center">
                                      <div>
                                        <i className="fa fa-circle progress-icon-1"></i>
                                        <small> &gt;= 20 years old</small>
                                      </div>
                                      <small className="text-gray">0</small>
                                    </div>
                                    <div className="bd-highlight align-self-center">
                                      <div>
                                        <i className="fa fa-circle progress-icon-2"></i>
                                        <small> &lt; 20 years old</small>
                                      </div>
                                      <small className="text-gray">0</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <div className="">
                          <div className="rct-block ">
                            <div className="rct-block-title "><h4>By Regions </h4></div>
                            <div className="collapse show">
                              <div className="rct-block-content">
                                <div>
                                  <div id="progress_1587585329987" className="progess-wrapper">

                                  </div>
                                  <div className="d-flex justify-content-between mb-3">
                                    <div className="bd-highlight align-self-center">
                                      <div><i className="fa fa-circle progress-icon-1"></i><small> Domestic</small></div>
                                      <small className="text-gray">0</small></div>
                                    <div className="bd-highlight align-self-center">
                                      <div><i className="fa fa-circle progress-icon-2"></i><small> Foreign</small></div>
                                      <small className="text-gray">0</small></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="rct-block">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <div className="clearfix mb-4">
                          <div className="float-left">
                            <div>Department Schedual</div>
                          </div>
                          <div className="float-right">
                            <form><select className="form-control">
                              <option>Hoàn thành</option>
                              <option>Chưa hoàn thành</option>
                            </select></form>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <Table responsive>
                            <thead>
                            <tr>
                              <th>stt</th>
                              <th>ngày khởi hàng</th>
                              <th>doanh số</th>
                              <th>từ thanktrips</th>
                              <th>từ nguồn khác</th>
                              <th>chỗ còn trồng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {'schedules' in tourSelected ? tourSelected.schedules.map((day,index) =>
                                <tr key={index+1}>
                                  <td>{index+1}</td>
                                  <td>
                                    <a href={'/#/schedule/'+day._id}>
                                      <Moment format="DD/MM/Y">
                                        {day.departureDay}
                                      </Moment>
                                    </a>
                                  </td>
                                  <td>
                                    ₫{day.bookings.length*tourSelected.basePrice}
                                  </td>
                                  <td>
                                    N.A
                                  </td>
                                  <td>
                                    N.A
                                  </td>
                                  <td>10</td>
                                </tr>
                            ) : <tr></tr>}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Index;