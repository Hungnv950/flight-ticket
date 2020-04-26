import axios from 'axios';
import {Link} from "react-router-dom";
import React, { Component } from 'react';

import { Input, InputGroup } from 'reactstrap';

import { authHeader } from "../../helpers/authHeaders";

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
      viewMode: false,
      tourSelected:{}
    };

    this.handleViewMode = this.handleViewMode.bind(this);
  }

  componentDidMount(){
    axios.get("/api/admin/tours",{headers: authHeader()}).then(response => {
      this.setState({ tours: response.data.tours });
    }).catch(function (error) {
      console.log(error);
    });

    axios.get("/api/admin/tour/"+this.props.match.params.id,{headers: authHeader()}).then(response => {
      this.setState({tourSelected: response.data});
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleViewMode(){
    this.setState({
      viewMode: !this.state.viewMode
    });
  }

  render() {
    const tourId = this.props.match.params.id;

    const { tours, viewMode } = this.state;

    const linkChat = `/#/tour/${tourId}/chat`;
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
                  <div className="rct-block">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <ul className="list-inline">
                          <li className="custom-tab list-inline-item">
                            <a className="text-gray" href={linkGeneral}>General</a>
                          </li>
                          <li className="custom-tab list-inline-item">
                            <a className="text-gray" href={linkChat}>Chat room</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                          <li className="custom-tab list-inline-item react-tabs__tab--selected">
                            <a className="text-active" href={linkSupport}>Support</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                        </ul>
                        <div>
                          <h5><b>Trả lời câu hỏi của khách hàng</b></h5>
                          <small>Có <span>12</span> câu hỏi liên quan đến tour này cần giải quyết</small>
                          <div className="mb-4"></div>
                          <div className="mb-4"><h6><b>1/ Làm sao để đặt tour?</b></h6>
                            <div className="mb-2"><textarea className="form-control answer-block"></textarea></div>
                            <div className="d-flex justify-content-end">
                              <button className="btn btn-sm btn-rounded btn-white mr-2">Bỏ qua</button>
                              <button className="btn btn-sm btn-rounded btn-custom">Save</button>
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
        </div>
    )
  }
}

export default Index;