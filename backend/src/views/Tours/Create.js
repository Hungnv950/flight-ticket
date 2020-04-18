import axios from 'axios';
import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Collapse, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

import Todos from "./Todos";
import AddTodo from "./AddTodo";

import {authHeader} from "../../helpers/authHeaders";

class Create extends Component {
  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      title: '',
      estimateDays: 1,
      tpe: 1,
      schedule:[{
        tpe:1,
        places:[{
          name:{
            type: String,
            required: true
          },
          rateAvg:{
            type: String,
            required: true
          },
          avatar:{
            type: Number,
            default: 0
          },
          latLong:{
            type: String
          },
          checkInTime:{
            type: String
          },
          description:{
            type: String
          },
          images:[{
            path: {
              type: String,
              required: true
            },
          }]
        }]
      }],
      description: '',
      avatar: {
        type: String,
        required: true
      },
      departureSchedule:{
        type: {
          type: Number,
          required: true,
          default: 0
        },
      },
      faresByAge:{
        adult: 0,
        from2to11YO: 0,
        under2YO: 0
      },
      faresByPeople:{
        from10To20: 0,
        from20To30: 0,
        from30: 0
      },
      faresByTime:{
        normalDay: 0,
        weekend: 0,
        holiday: 0,
        fromDate: Date,
        toDate: Date
      },
      refundCancel:{
        before20Days: {
          type: Number,
          default: 0
        },
        before15Days:{
          type: Number,
          default: 0
        },
        before7Days: {
          type: Number,
          default: 0
        }
      },
      priceIncluded:{
        transport:{
          type: String
        },
        transporter:{
          type: String
        },
        pointGo:{
          type: String
        },
        destination:{
          type: String
        },
        otherCosts:[]
      },
      priceNotIncluded:[],
      cancelTour:[],
      boardOthers:[],
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      step: 1
    };

    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);

    this.addBoard = this.addBoard.bind(this);
    this.delBoard = this.delBoard.bind(this);

    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleBackStep = this.handleBackStep.bind(this);

    this.addTodoToBoard = this.addTodoToBoard.bind(this);
    this.delTodoFromBoard = this.delTodoFromBoard.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);

    this.handleUpInputNumberField = this.handleUpInputNumberField.bind(this);
    this.handleDownInputNumberField = this.handleDownInputNumberField.bind(this);
  };

  handleSubmit() {
    const { email, username, address, fullName, discount, commission } = this.state;

    axios.post('/api/admin/tour/create', {
      email,
      address,
      fullName,
      username,
      discount,
      commission
    },{headers:authHeader()}).then(() => {
      this.setState({ redirect: true })
    });
  };

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  };

  handleNextStep(e) {
    e.preventDefault();
    this.setState({
      step: this.state.step + 1
    });
  };

  handleBackStep() {
    this.setState({
      step: this.state.step - 1
    });
  };

  handleChangeObjectField(key, event) {
    const keyArray = key.split('.');

    const value = event.target.value;

    if(value > 100 || value < 0){
      return;
    }

    this.setState(prevState => ({
      [keyArray[0]]: {
        ...prevState[keyArray[0]],
        [keyArray[1]]:  value
      }
    }));
  };

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  delTodo(key,id) {
    const keyArray = key.split('.');

    if(keyArray.length === 2){
      this.setState(prevState => ({
        [keyArray[0]]: {
          ...prevState[keyArray[0]],
          [keyArray[1]]: [...prevState[keyArray[0]][keyArray[1]].filter(todo => todo.id !== id)]
        }
      }));
    }
    else{
      this.setState(prevState => ({
        [key]: [...prevState[key].filter(todo => todo.id !== id)]
      }));
    }
  }

  addTodo(key,title) {

    const keyArray = key.split('.');

    if(keyArray.length === 2){
      const length = this.state[keyArray[0]][keyArray[1]].length + 1;

      this.setState(prevState => ({
        [keyArray[0]]: {
          ...prevState[keyArray[0]],
          [keyArray[1]]:  [...prevState[keyArray[0]][keyArray[1]], { id: length, title:title, cost:0 }]
        }
      }));
    }
    else{
      const length = this.state[key].length + 1;

      this.setState(prevState => ({
        [key]: [...prevState[key], { id: length, title:title, cost:0 }]
      }));
    }
  };

  addTodoToBoard(key,title) {
    const length = this.state.boardOthers[key].items.length + 1;

    this.setState(prevState => ({
      [key]: [...prevState.boardOthers[key].items, { id: length, title: title, cost: 0 }]
    }));
  };

  delTodoFromBoard(key,id) {
    this.setState(prevState => ({
      boardN: {
        ...prevState.boardOthers[key],
        items:  [...prevState.boardOthers[key].items.filter(todo => todo.id !== id)]
      }
    }));
  }

  delBoard(key,id) {
    this.setState(prevState => ({
      boardOthers: [...prevState.boardOthers.filter(todo => todo.id !== id)]
    }));
  }

  addBoard() {
    const length = this.state.boardOthers.length + 1;

    const newBoard = {id: length, boardTile: '', items: []};

    this.setState(prevState => ({
      boardOthers: [...prevState.boardOthers, newBoard]
    }));
  };

  handleUpInputNumberField(key) {
    const value = this.state[key] + 1;
    this.setState({
      [key]: value
    });
  };

  handleDownInputNumberField(key) {
    const value = this.state[key] + 1;

    if(value > 0){
      this.setState({
        [key]: value
      });
    }
  };

  render() {

    const { title, estimateDays, description, faresByAge, faresByPeople, faresByTime, step } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="rct-page-content">
          <div>
            <div className="tour-header d-flex justify-content-between mb-3">
              <div className="bd-highlight align-self-center"><h4>Create New Tour</h4></div>
              <div className="bd-highlight align-self-center">
                <div className="rc-steps rc-steps-horizontal rc-steps-label-vertical">
                  <div className={step === 1 ? 'rc-steps-item rc-steps-item-process' : step > 1 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-tail"></div>
                    <div className="rc-steps-item-icon">
                      <span className="rc-steps-icon">1</span>
                    </div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Thêm thông tin cơ bản</div>
                    </div>
                  </div>
                  <div className={step === 2 ? 'rc-steps-item rc-steps-item-process' : step > 2 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-tail"></div>
                    <div className="rc-steps-item-icon">
                      <span className="rc-steps-icon">2</span>
                    </div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Thêm địa điểm và lịch trình</div>
                    </div>
                  </div>
                  <div className={step === 3 ? 'rc-steps-item rc-steps-item-process' : step > 3 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-tail"></div>
                    <div className="rc-steps-item-icon">
                      <span className="rc-steps-icon">3</span>
                    </div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Lịch khởi hành và giá tour</div>
                    </div>
                  </div>
                  <div className={step === 4 ? 'rc-steps-item rc-steps-item-process' : step > 4 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-tail"></div>
                    <div className="rc-steps-item-icon">
                      <span className="rc-steps-icon">4</span>
                    </div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Thông tin và điều khoản tour</div>
                    </div>
                  </div>
                  <div className="rc-steps-item rc-steps-item-wait">
                    <div className="rc-steps-item-tail"></div>
                    <div className="rc-steps-item-icon"><span className="rc-steps-icon">5</span></div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Hoàn thành và gửi duyệt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'none'}} className={step === 1 ? 'mt-4 step-active' : 'mt-4'}>
              <form>
                <div className="clearfix mb-4">
                  <div className="float-left">
                    <h5>Thông tin cơ bản</h5>
                  </div>
                  <div className="float-right">
                    <button className="btn btn-rounded btn-custom" onClick={this.handleNextStep}>
                      Next Step <i className="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                <div className="">
                  <div className="rct-block">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <div className="row">
                          <div className="col-md-6">
                            <div>
                              <div className="form-group">
                                <label>Tiêu đề:</label>
                                <input type="text" className="form-control" name="title" onChange={(ev) => this.handleChangeField('title', ev)}
                                       value={title} placeholder="Vui lòng nhập tiêu đề chuyến đi" required="" />
                              </div>
                              <div className="row">
                                <div className="col-md-6"><label>Số ngày dự tính:</label>
                                  <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                      <button className="btn btn-beside-input btn-beside-left" type="button">-</button>
                                    </div>
                                    <input type="number" name="numDays" className="form-control" onChange={(ev) => this.handleChangeField('estimateDays', ev)}
                                           value={estimateDays} required=""/>
                                    <div className="input-group-prepend">
                                      <button className="btn btn-beside-input btn-beside-right" type="button">+</button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center justify-content-end">
                                    <div className="custom-control custom-radio custom-control-inline">
                                      <input type="radio" id="customRadioInline1" name="type" className="custom-control-input" required=""
                                             onChange={(ev) => this.handleChangeField('tpe', ev)} value="1" checked/>
                                        <label className="custom-control-label" htmlFor="customRadioInline1">Tour nội địa</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                      <input type="radio" id="customRadioInline2" name="type" className="custom-control-input" required=""
                                             onChange={(ev) => this.handleChangeField('tpe', ev)} value="2"/>
                                      <label className="custom-control-label" htmlFor="customRadioInline2">Tour quốc tế</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Mô tả:</label>
                              <textarea name="description" className="form-control tour-description-textarea" onChange={(ev) => this.handleChangeField('description', ev)}
                                        value={description} placeholder="Vui lòng nhập mô tả chuyến đi" required=""></textarea>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div>
                              <div className="">Chọn ảnh đại diện</div>
                              <div className="container">
                                <div tabIndex="0" className="dropzone">
                                  <input type="file" autoComplete="off" tabIndex="-1" style={{display: 'none'}}/>
                                  <div className="text-center dropzone-placeholder-lg">
                                    <i className="fas fa-cloud-upload-alt fa-6x"></i>
                                    <h3 className="mt-2 mb-4">Drag and drop a file here, or click to select file</h3>
                                    <small>Lưu ý: Hình ảnh có độ phân giải cao và kích thước nhỏ hơn 2MB</small>
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
              </form>
            </div>
            <div style={{display: 'none'}} className={step === 2 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4 className="mb-1">Địa điểm du lịch</h4>
                  <small>Tour du lịch 1 ngày
                </small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleBackStep}>
                    Back
                  </button>
                  <button className="btn btn-rounded btn-custom" onClick={this.handleNextStep}>
                    Next Step <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <Card>
                <CardHeader className="rct-block">
                  <i className="fa fa-arrow-right"></i><strong onClick={this.toggle}>Điểm khởi hành</strong>
                  <div className="card-header-actions">
                    <a href="/" rel="noreferrer noopener" target="_blank" className="card-header-action" style={{color: '#FF4827 !important'}}>
                      <i className="fa fa-plus"></i> Thêm địa điểm
                    </a>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <CardBody>
                    <div className="tour-schedule-items"></div>
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <CardHeader>
                  <i className="fa fa-arrow-right"></i><strong onClick={this.toggle}>Ngày thứ 1</strong>
                  <div className="card-header-actions">
                    <a href="/" rel="noreferrer noopener" target="_blank" className="card-header-action" style={{color: '#FF4827 !important'}}>
                      <i className="fa fa-plus"></i> Thêm địa điểm
                    </a>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <CardBody>
                    <div className="tour-schedule-items">
                      <div className="row">
                        <div className="col-md-8">
                          <ul></ul>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </div>
            <div style={{display: 'none'}} className={step === 3 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4 className="mb-1">Thêm lịch khởi hành và giá tour</h4>
                  <small>Tour du lịch 1 ngày</small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleBackStep}>
                    Back
                  </button>
                  <button className="btn btn-rounded btn-custom" onClick={this.handleNextStep}>
                    Next Step <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content"><h4>Lịch khởi hành</h4>
                            <hr/>
                              <form>
                                <div className="custom-control custom-radio"><input type="radio" id="option_1"
                                                                                    name="option"
                                                                                    className="custom-control-input"
                                                                                    value="1" checked=""/><label
                                    className="custom-control-label" htmlFor="option_1">Hằng ngày</label></div>
                                <div className="custom-control custom-radio"><input type="radio" id="option_2"
                                                                                    name="option"
                                                                                    className="custom-control-input"
                                                                                    value="2"/><label
                                    className="custom-control-label" htmlFor="option_2">Các ngày cố định trong
                                  tuần</label></div>
                                <div className="custom-control custom-radio"><input type="radio" id="option_3"
                                                                                    name="option"
                                                                                    className="custom-control-input"
                                                                                    value="3"/><label
                                    className="custom-control-label" htmlFor="option_3">Các ngày cố định trong
                                  tháng</label></div>
                              </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <h4>Giá Tour tiêu chuẩn</h4>
                            <hr/>
                            <div className="text-center mb-4 mt-4">
                              <h1><b><span tabIndex="0">10,000,000</span><span> VNĐ</span></b></h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content"><h4>Giá vé theo độ tuổi</h4>
                            <hr/>
                            <div>
                              <table style={{width: '100%'}}>
                                  <thead>
                                  <tr>
                                    <td className="table-head-label table-custom-cell" width="30%">ĐỘ TUỔI</td>
                                    <td className="table-head-label table-custom-cell">CHIẾT KHẤU</td>
                                    <td className="table-head-label table-custom-cell table-text-right">ĐƠN GIÁ/NGƯỜI</td>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td className="table-custom-cell">Người lớn</td>
                                    <td className="table-custom-cell">
                                      <InputGroup>
                                        <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByAge.adult', ev)}
                                               value={faresByAge.adult} className="text-right" />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>%</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {10000000*(100 - faresByAge.adult)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trẻ 2-11 tuổi</td>
                                    <td className="table-custom-cell">
                                      <InputGroup>
                                        <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByAge.from2to11YO', ev)}
                                               value={faresByAge.from2to11YO} className="text-right" />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>%</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {10000000*(100 - faresByAge.from2to11YO)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Dưới 2 tuổi</td>
                                    <td className="table-custom-cell">
                                      <InputGroup>
                                        <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByAge.under2YO', ev)}
                                               value={faresByAge.under2YO} className="text-right" />
                                        <InputGroupAddon addonType="append">
                                          <InputGroupText>%</InputGroupText>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {10000000*(100 - faresByAge.under2YO)/100} đ
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content"><h4>Giá khuyến mãi theo số lượng đơn hàng (nếu có)</h4>
                            <hr/>
                            <div>
                              <table style={{width: '100%'}}>
                                <thead>
                                <tr>
                                  <td className="table-head-label table-custom-cell" width="30%">SỐ NGƯỜI</td>
                                  <td className="table-head-label table-custom-cell">CHIẾT KHẤU</td>
                                  <td className="table-head-label table-custom-cell table-text-right">ĐƠN GIÁ/NGƯỜI</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td className="table-custom-cell">10 người</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from10To20', ev)}
                                             value={faresByPeople.from10To20} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByPeople.from10To20)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">20 người</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from20To30', ev)}
                                             value={faresByPeople.from20To30} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByAge.from2to11YO)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">30 người</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from30', ev)}
                                             value={faresByPeople.from30} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByAge.under2YO)/100} đ
                                  </td>
                                </tr>
                                </tbody>
                              </table>
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
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <h4>Giá tour theo thời gian (Phụ thu thời gian cao điểm)</h4>
                            <hr/>
                            <div>
                              <table style={{width: '100%'}}>
                                <tbody>
                                <tr>
                                  <td className="table-custom-cell">Ngày thường</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.normalDay', ev)}
                                             value={faresByTime.normalDay} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByTime.normalDay)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Cuối tuần</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.weekend', ev)}
                                             value={faresByTime.weekend} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByTime.weekend)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Ngày lễ</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>%</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {10000000*(100 - faresByTime.holiday)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">
                                    <small>Mức gá có liệu lức từ</small>
                                  </td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="date" onChange={(ev) => this.handleChangeObjectField('faresByTime.fromDate', ev)}
                                             value={faresByTime.fromDate} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                  <td className="table-custom-cell">
                                    <small>đến</small>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    <InputGroup>
                                      <Input type="date" onChange={(ev) => this.handleChangeObjectField('faresByTime.toDate', ev)}
                                             value={faresByTime.toDate} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <h4>Chi phí dịch vụ gia tăng - Giá phòng/đêm tại khách sạn</h4>
                            <hr/>
                            <div>
                              <table style={{width: '100%'}}>
                                <thead>
                                <tr>
                                  <td className="table-head-label table-custom-cell" width="30%">KHÁCH SẠN</td>
                                  <td className="table-head-label table-custom-cell">PHỤ THU</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td className="table-custom-cell">Tiêu chuẩn</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.normalDay', ev)}
                                             value={faresByTime.normalDay} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>đ</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 3 sao</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.weekend', ev)}
                                             value={faresByTime.weekend} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>đ</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 4 sao</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>đ</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 5 sao</td>
                                  <td className="table-custom-cell">
                                    <InputGroup>
                                      <Input type="number" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} className="text-right" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>đ</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="rct-block ">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <h4>Phí hoàn hủy Tour (đối với Tour cách ngày khởi hàng > 15 ngày)</h4>
                            <hr/>
                              <div>
                                <table>
                                  <thead>
                                  <tr>
                                    <td className="table-head-label table-custom-cell" width="30%">Ngày khởi hành</td>
                                    <td className="table-head-label table-custom-cell">Phí phạt % / Giá tour</td>
                                    <td className="table-head-label table-custom-cell">Thành tiền</td>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td className="table-custom-cell">Trước 20 ngày</td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right"
                                                                             value="30 %"/></td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right readonly"
                                                                             name="refunds_0" value="3,000,000 đ"/></td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trước 15 ngày</td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right"
                                                                             value="50 %"/></td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right readonly"
                                                                             name="refunds_1" value="5,000,000 đ"/></td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trước 7 ngày</td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right"
                                                                             value="70 %"/></td>
                                    <td className="table-custom-cell"><input type="text"
                                                                             className="form-control text-right readonly"
                                                                             name="refunds_2" value="7,000,000 đ"/></td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'none'}} className={step === 4 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4>Thông tin và điểu khoản Tour</h4>
                  <small>Tour du lịch 1 ngày</small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleBackStep}>
                    Back
                  </button>
                  <button className="btn btn-rounded btn-custom" onClick={this.handleNextStep}>
                    Next Step <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <div className="">
                      <div className="rct-block">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <div className="clearfix">
                              <div className="float-left">
                                <h5>Giá bao gồm</h5>
                              </div>
                            </div>
                            <hr/>
                              <form>
                                <div className="form-group">
                                  <label>Phương tiện di chuyển</label>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="css-1pcexqc-container">
                                        <div className="css-bg1rzq-control">
                                          <div className="css-1hwfws3">
                                            <div className="css-151xaom-placeholder">Chọn phương tiện</div>
                                            <div className="css-1g6gooi">
                                              <select className="form-control" name="" id="">
                                                <option value="">Máy bay</option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="css-1wy0on6">
                                            <span className="css-bgvzuu-indicatorSeparator"></span>
                                            <div aria-hidden="true" className="css-16pqwjk-indicatorContainer">
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="css-1pcexqc-container">
                                        <div className="css-bg1rzq-control">
                                          <div className="css-1hwfws3">
                                            <div className="css-151xaom-placeholder">Hãng phương tiện</div>
                                            <div className="css-1g6gooi">
                                              <select className="form-control" name="" id="">
                                                <option value="">Máy bay</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-md-3">Khởi hành</div>
                                  <div className="col-md-4">
                                    <select className="form-control" name="" id="">
                                      <option value="">Máy bay</option>
                                    </select>
                                  </div>
                                  <div className="col-md-1">
                                    <i className="fa fa-exchange fa-2x text-primary"></i>
                                  </div>
                                  <div className="col-md-4">
                                    <select className="form-control" name="" id="">
                                      <option value="">Máy bay</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="mb-3">Hành lý mang theo (Miễn phí)</div>
                              </form>
                              <div>
                                <div>Chi phí khác</div>
                                <div>
                                  <ul className="sortable-list">
                                    <Todos keyObject="priceIncluded.otherCosts" todos={this.state.priceIncluded.otherCosts} markComplete={this.markComplete} delTodo={this.delTodo}/>
                                  </ul>
                                  <AddTodo keyObject="priceIncluded.otherCosts" addTodo={this.addTodo} />
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
                              <div className="float-left">
                                <h5>Giá không bao gồm</h5>
                              </div>
                            </div>
                            <hr/>
                            <div>
                              <ul className="sortable-list">
                                <Todos keyObject="priceNotIncluded" todos={this.state.priceNotIncluded} markComplete={this.markComplete} delTodo={this.delTodo}/>
                              </ul>
                              <AddTodo keyObject="priceNotIncluded" addTodo={this.addTodo} />
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
                              <div className="float-left">
                                <h5>Hủy vé (không tính ngày lễ, thứ 7, chủ nhật)</h5>
                              </div>
                            </div>
                            <hr/>
                            <div>
                              <ul className="sortable-list">
                                <Todos keyObject="cancelTour" todos={this.state.cancelTour} markComplete={this.markComplete} delTodo={this.delTodo}/>
                              </ul>
                              <AddTodo keyObject="cancelTour" addTodo={this.addTodo} />
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
                      <div className="rct-block">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <div className="clearfix">
                              <div className="float-left">
                                <h5>Đối với người nước ngoài, Việt kiều, người già & trẻ em</h5>
                              </div>
                            </div>
                            <hr/>
                            <div>
                              <ul className="sortable-list">
                                <Todos keyObject="cancelTour" todos={this.state.cancelTour} markComplete={this.markComplete} delTodo={this.delTodo}/>
                              </ul>
                              <AddTodo keyObject="cancelTour" addTodo={this.addTodo} />
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
      </div>
    )
  }
}

export default Create;