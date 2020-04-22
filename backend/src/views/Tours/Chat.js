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
                  <div className="float-left">
                    <h1>My Tours</h1>
                    <small>There are <span>4</span> tours</small>
                  </div>
                  <div className="float-right"><a href="#/tours/create">
                    <button className="btn btn-rounded btn-custom">Tạo mới</button>
                  </a></div>
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
                            <a className="text-active" href={linkGeneral}>General</a>
                          </li>
                          <li className="custom-tab list-inline-item react-tabs__tab--selected">
                            <a className="text-gray" href={linkChat}>Chat room</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                          <li className="custom-tab list-inline-item">
                            <a className="text-gray" href={linkSupport}>Support</a>
                            <i className="fa fa-circle dot-notification"></i>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days"><h5><b>18</b></h5><small>Apr, 20</small></div>
                          </div>
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days"><h5><b>19</b></h5><small>Apr, 20</small></div>
                            <span className="badge-xs badge-top-right badge badge-danger">10</span>
                          </div>
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days"><h5><b>20</b></h5><small>Apr, 20</small></div>
                          </div>
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days"><h5><b>21</b></h5><small>Apr, 20</small></div>
                          </div>
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days"><h5><b>22</b></h5><small>Apr, 20</small></div>
                          </div>
                          <div className="col-6 col-md-3 col-lg-2">
                            <div className="days day-selected"><h5><b>23</b></h5><small>Apr, 20</small></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="chat-wrapper">
                    <div className="chat-main-body">
                      <div className="chat-head">
                        <div className="clearfix">
                          <div className="float-left"><h4><b>Thursday, April 23rd 2020</b> (4 members)</h4></div>
                        </div>
                      </div>
                      <div className="rct-scroll" style={{position: 'relative', overflow: 'hidden', width: '100%', height: '100%', minHeight: '600px'}}>
                        <div style={{position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', overflow: 'scroll', marginRight: '0px', marginBottom: '0px'}}>
                          <div className="chat-body p-30">
                            <div className="d-flex flex-nowrap flex-row-reverse mb-3">
                              <div className="chat-bubble-wrap">
                                <div className="chat-bubble odd bg-primary text-white">
                                  <p className="mb-0">
                                    Pellentesque mollis neque vel enim pellentesque, vel scelerisque erat ullamcorper.
                                  </p>
                                </div>
                                <span className="text-right d-block font-xs text-muted mt-1">03:01</span></div>
                            </div>
                            <div className="d-flex flex-nowrap mb-3">
                              <div className="jss-fluid img-fluid rounded-circle mr-15 align-self-start">
                                <img alt="Huong Le Thi" src="https://cdn1-www.familylife.com/wp-content/uploads/sites/51/2019/03/women-day-2-35-300x300.jpg"
                                  className="jss-img"/>
                              </div>
                              <div className="chat-bubble-wrap">
                                <div className="chat-bubble even bg-aqua"><p className="mb-0">Pellentesque mollis neque
                                  vel enim pellentesque, vel scelerisque erat ullamcorper.</p></div>
                              </div>
                            </div>
                            <div className="d-flex flex-nowrap mb-3">
                              <div className="jss-fluid img-fluid rounded-circle mr-15 align-self-start"><img
                                  alt="Huong Le Thi"
                                  src="https://cdn1-www.familylife.com/wp-content/uploads/sites/51/2019/03/women-day-2-35-300x300.jpg"
                                  className="jss-img"/></div>
                              <div className="chat-bubble-wrap">
                                <div className="chat-bubble even bg-aqua"><p className="mb-0">Pellentesque mollis neque
                                  vel enim pellentesque, vel scelerisque erat ullamcorper.</p></div>
                              </div>
                            </div>
                            <div className="d-flex flex-nowrap flex-row-reverse mb-3">
                              <div className="chat-bubble-wrap">
                                <div className="chat-bubble odd bg-primary text-white"><p className="mb-0">Pellentesque
                                  mollis neque vel enim pellentesque, vel scelerisque erat ullamcorper.</p></div>
                                <span className="text-right d-block font-xs text-muted mt-1">05:11</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-footer d-flex px-4 align-items-center py-3">
                        <form className="mr-3 w-100">
                          <div className="input-group"><input type="text" className="form-control"
                                                              placeholder="Type your message..." id="chat-input"
                                                              value=""/>
                            <div className="input-group-append" id="button-addon4">
                              <button className="btn btn-chat-inside" type="button" id="btn-chat-1"><img
                                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMC43NDUiIGhlaWdodD0iMTcuOTg4IiB2aWV3Qm94PSIwIDAgMjAuNzQ1IDE3Ljk4OCI+DQogIDxnIGlkPSJwaWN0dXJlcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMzMuNDc2KSI+DQogICAgPHBhdGggaWQ9IlBhdGhfMzc0IiBkYXRhLW5hbWU9IlBhdGggMzc0IiBkPSJNLjY4LDM3LjY5MmwxNS42NTMtNC4xODVhLjkzNC45MzQsMCwwLDEsMS4xMzUuNjQ5bDMuMSwxMS41YS45MTQuOTE0LDAsMCwxLS42NjUsMS4xMTlMNC4yNDksNTAuOTYxYS45MzQuOTM0LDAsMCwxLTEuMTM1LS42NDlMLjAzMSwzOC44MTJBLjkxNy45MTcsMCwwLDEsLjY4LDM3LjY5MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiIGZpbGw9IiNlNGU3ZTciLz4NCiAgICA8cGF0aCBpZD0iUGF0aF8zNzUiIGRhdGEtbmFtZT0iUGF0aCAzNzUiIGQ9Ik0zNi4wMTYsNzIuOGwxMy42OTEtMy42NWEuNzM0LjczNCwwLDAsMSwuODc2LjVsMi41NjMsOS41MjJhLjcwOS43MDksMCwwLDEtLjUuODZsLTEzLjY5MSwzLjY1YS43MzQuNzM0LDAsMCwxLS44NzYtLjVsLTIuNTYzLTkuNTIyQS42ODQuNjg0LDAsMCwxLDM2LjAxNiw3Mi44WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0LjAyMiAtMzQuMTgpIiBmaWxsPSIjMjA4ZGIyIi8+DQogICAgPHBhdGggaWQ9IlBhdGhfMzc2IiBkYXRhLW5hbWU9IlBhdGggMzc2IiBkPSJNNjMuOSwxMzEuOUg4MC4yYS45MjQuOTI0LDAsMCwxLC45MjUuOTI1djEyLjA4NWEuOTI0LjkyNCwwLDAsMS0uOTI1LjkyNUg2My45YS45MjQuOTI0LDAsMCwxLS45MjUtLjkyNVYxMzIuODI0QS45MzUuOTM1LDAsMCwxLDYzLjksMTMxLjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjAuMzgyIC05NC4zNjkpIiBmaWxsPSIjZjNmM2YzIi8+DQogICAgPHBhdGggaWQ9IlBhdGhfMzc3IiBkYXRhLW5hbWU9IlBhdGggMzc3IiBkPSJNOTUuMiwxNjMuNDA3aDE0LjE2MWEuNzIuNzIsMCwwLDEsLjcxNC43MTR2OS45MjdhLjcyLjcyLDAsMCwxLS43MTQuNzE0SDk1LjJhLjcyLjcyLDAsMCwxLS43MTQtLjcxNHYtOS45MjdBLjcxLjcxLDAsMCwxLDk1LjIsMTYzLjQwN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MC41OTIgLTEyNC41NzkpIiBmaWxsPSIjYTNlMGY1Ii8+DQogICAgPHBhdGggaWQ9IlBhdGhfMzc4IiBkYXRhLW5hbWU9IlBhdGggMzc4IiBkPSJNOTQuNDg0LDE2NC4xMjF2My40NzFjLjE2Mi4wMTYuMzI0LjAzMi40ODcuMDMyYTMuNzMxLDMuNzMxLDAsMCwwLDMuNzMxLTMuNzMxYzAtLjE2Mi0uMDE2LS4zMjQtLjAzMi0uNDg3SDk1LjJBLjcxLjcxLDAsMCwwLDk0LjQ4NCwxNjQuMTIxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkwLjU5MiAtMTI0LjU3OSkiIGZpbGw9IiNlZmM3NWUiLz4NCiAgICA8cGF0aCBpZD0iUGF0aF8zNzkiIGRhdGEtbmFtZT0iUGF0aCAzNzkiIGQ9Ik05NS42NjgsMzU2LjM5MmE5LjI2LDkuMjYsMCwwLDAtMS4xODQuMDgxdjIuNjEyYS43Mi43MiwwLDAsMCwuNzE0LjcxNGg1LjRhMS44NjksMS44NjksMCwwLDAsLjA0OS0uNDIyQzEwMC42NDgsMzU3LjcyMiw5OC40MjYsMzU2LjM5Miw5NS42NjgsMzU2LjM5MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MC41OTIgLTMwOS42MTYpIiBmaWxsPSIjM2RiMzllIi8+DQogICAgPHBhdGggaWQ9IlBhdGhfMzgwIiBkYXRhLW5hbWU9IlBhdGggMzgwIiBkPSJNMjA4LjkzMywzMjAuOTQ1Yy00LjQ0NSwwLTguMDYyLDIuMTc0LTguMTExLDQuODY2SDIxMS4zYS43Mi43MiwwLDAsMCwuNzE0LS43MTR2LTMuNzhBMTMuMzY1LDEzLjM2NSwwLDAsMCwyMDguOTMzLDMyMC45NDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkyLjU1IC0yNzUuNjI5KSIgZmlsbD0iIzRiYzJhZCIvPg0KICA8L2c+DQo8L3N2Zz4NCg=="
                                  alt="btn-chat-1"/></button>
                              <button className="btn btn-chat-inside btn-last-inside" type="button" id="btn-chat-2"><img
                                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iaGFwcHkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPg0KICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzMzIiBkYXRhLW5hbWU9IkVsbGlwc2UgMzMiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIgZmlsbD0iI2ZiZDk3MSIvPg0KICA8cGF0aCBpZD0iUGF0aF8zOTEiIGRhdGEtbmFtZT0iUGF0aCAzOTEiIGQ9Ik0xNC43MTQsMjkuMTlBNS43MjEsNS43MjEsMCwwLDEsOSwyMy40NzZhLjQ3Ni40NzYsMCwwLDEsLjk1MiwwLDQuNzYyLDQuNzYyLDAsMCwwLDkuNTI0LDAsLjQ3Ni40NzYsMCwwLDEsLjk1MiwwQTUuNzIxLDUuNzIxLDAsMCwxLDE0LjcxNCwyOS4xOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00LjcxNCAtMTIuMDQ4KSIgZmlsbD0iI2YwYzQxOSIvPg0KICA8cGF0aCBpZD0iUGF0aF8zOTIiIGRhdGEtbmFtZT0iUGF0aCAzOTIiIGQ9Ik0xMS4yODYsMTMuODU3YS40NzYuNDc2LDAsMCwxLS40NzYtLjQ3NiwxLjQyOSwxLjQyOSwwLDEsMC0yLjg1NywwLC40NzYuNDc2LDAsMCwxLS45NTIsMCwyLjM4MSwyLjM4MSwwLDEsMSw0Ljc2MiwwQS40NzYuNDc2LDAsMCwxLDExLjI4NiwxMy44NTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy42NjcgLTUuNzYyKSIgZmlsbD0iI2YyOWMxZiIvPg0KICA8cGF0aCBpZD0iUGF0aF8zOTMiIGRhdGEtbmFtZT0iUGF0aCAzOTMiIGQ9Ik0yOS4yODYsMTMuODU3YS40NzYuNDc2LDAsMCwxLS40NzYtLjQ3NiwxLjQyOSwxLjQyOSwwLDEsMC0yLjg1NywwLC40NzYuNDc2LDAsMCwxLS45NTIsMCwyLjM4MSwyLjM4MSwwLDEsMSw0Ljc2MiwwQS40NzYuNDc2LDAsMCwxLDI5LjI4NiwxMy44NTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMuMDk1IC01Ljc2MikiIGZpbGw9IiNmMjljMWYiLz4NCjwvc3ZnPg0K"
                                  alt="btn-chat-2"/></button>
                            </div></div>
                        </form>
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