import axios from "axios";
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { authHeader } from "../../helpers/authHeaders";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flight: Object
    };
  };

  componentDidMount(){
    axios.get("/api/admin/flight/"+this.props.match.params.id,{headers: authHeader()}).then(response => {
      const flight = response.data;

      this.setState({
        flight: flight
      });
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {

    const {flight} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <strong>Chuyến bay: {flight.flightCode}</strong>
              </CardHeader>
              <CardBody style={{padding: 0}}>
                <div className="content-list row row-padding-15 mb15" style={{padding: '15px 20px'}}>
                  <div className="col-md-4 col-sm-6">
                    <div className="form-group">
                      <label className="form-label control-label">Mã chuyến bay:</label>
                      <div className="form-wrap form-control-static">
                        <div className="input-group mb-3" id="product_coupon">
                          <input type="text" className="form-control" value={flight.flightCode} disabled/>
                            <div className="input-group-append">
                              <span className="input-group-text">
                                <i className="nav-icon icon-docs"></i>
                              </span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="form-group">
                      <label className="form-label control-label">Mã CTV:</label>
                      <div className="form-wrap form-control-static">
                        <div className="input-group mb-3" id="product_coupon">
                          <input type="text" className="form-control" value={flight.collaboratorCode} disabled/>
                            <div className="input-group-append">
                              <span className="input-group-text">
                                <i className="nav-icon icon-docs"></i>
                              </span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="form-group">
                      <label className="form-label control-label">Trạng thái:</label>
                      <div className="form-wrap form-control-static">
                        <div className="input-group mb-3" id="product_coupon">
                          <button className="btn btn-block btn-success" type="button">
                            <i className="nav-icon icon-check"></i>
                            Đã thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="info-flight mt-1">
                          <div className="card__title">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="info-flight__logo-airline">
                                  <img src="/images/logo-vietnam-airlines.png"/>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="type">
                                  <label><span className="serial__title">Ghế</span> <strong>Hạng thương
                                    gia</strong></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="info-flight__detail">
                            <div className="serial">
                              <span className="serial__title">Chuyến bay</span>
                              <span className="serial__content">FLIGHT61</span>
                            </div>
                          </div>
                          <div className="info-flight__location">
                            <div className="row">
                              <div className="col-md-4">
                                <span className="location">SGN</span>
                                <br/>
                                  <span className="location-full">TP Hồ Chí Minh</span>
                              </div>
                              <div className="col-md-4">
                                <div className="img">
                                  <img src="/images/img-flight-between-2-location.svg"/>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <span className="location">HNN</span>
                                <br/>
                                  <span className="location-full">Hà Nội</span>
                              </div>
                            </div>
                          </div>
                          <div className="info-flight__time">
                            <div className="row">
                              <div className="col-md-4">
                                <span className="time-title">KHỞI HÀNH</span>
                                <span className="time-content">23:58:50</span>
                                <br/>
                                  <span className="text-blue-sky">27/03/2020</span>
                              </div>
                              <div className="col-md-4">
                                <div className="img">
                                  <img src="/images/logo-vietnam-airlines-short.png"/>
                                    <div className="time-spent">
                                      <span className="badge badge-danger">2h40m</span>
                                    </div>
                                    <span className="text-smoke-dark">Bay thẳng</span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <span className="time-title">ĐẾN NƠI</span>
                                <span className="time-content">01:58:50</span>
                                <br/>
                                  <span className="text-blue-sky">28/03/2020</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr/>
                          <h6 className="text-uppercase">Thông tin liên hệ khách hàng</h6>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label control-label">Ông:</label>
                          <div className="form-wrap form-control-static">
                            <strong>Võ Thanh Sơn KH</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label control-label">
                            Số điện thoại:
                          </label>
                          <div className="form-wrap form-control-static">
                            <a href="javascript:void(0)">
                              09667845762
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-label control-label">Email:</label>
                          <div className="form-wrap form-control-static">
                            09667845762@thinkflight.com
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <br/>
                  <h6 className="text-uppercase">Thông tin khách hàng và chuyến đi</h6>
                </div>
                <table className="table table-responsive-sm table-outline" style={{marginBottom: 0}}>
                  <thead>
                  <tr>
                    <th style={{width: '40px'}}>STT</th>
                    <th>Họ và tên</th>
                    <th className="th-text-right">Giá vé</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      Lê Văn Việt
                    </td>
                    <td className="th-text-right">
                      ₫ <strong>1.450.000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      Lê Văn Việt
                    </td>
                    <td className="th-text-right">
                      ₫ <strong>1.450.000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      Giảm giá theo
                      <span className="text-orange font-weight-regular">
                        ID giới thiệu
                        <strong style={{color: '#e55353'}}>SON25304830</strong>
                      </span>
                    </td>
                    <td className="th-text-right">-₫ <strong>30.000</strong></td>
                  </tr>
                  <tr style={{backgroundColor: 'rgba(255, 219, 196, 0.46)'}}>
                    <td colSpan="2">
                      <div>
                        <strong>Tổng tiền thanh toán</strong>
                      </div>
                      <div className="small text-muted" style={{fontSize: '90%'}}>
                        (Đã bao gồm thuế và phí)
                      </div>
                    </td>
                    <td className="th-text-right">
                      <span style={{fontWeight: 700,fontSize: '18px',color: '#00a6d1', whiteSpace: 'nowrap'}}>
                        ₫ 2.870.000
                      </span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default View;
