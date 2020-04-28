import axios from 'axios';
import React, { Component } from 'react';
import {
  Button, ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Modal, ModalBody
} from "reactstrap";

import Todos from "./Todos";
import AddTodo from "./AddTodo";
import FileBase64 from "./FileBase64";
import PlaceDetail from "./PlaceDetail";

import {authHeader} from "../../helpers/authHeaders";
import PlaceItem from "./PlaceItem";

class Create extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalMore = this.toggleModalMore.bind(this);

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
      basePrice: 10000000,
      edtiBasePirce: false,
      estimateDays: 1,
      tpe: 1,
      schedule:[{
        tpe:1,
        places:[]
      }, {
          tpe:2,
          places:[]
        }],
      avatar: '',
      description: '',
      departureSchedule: {
        tpe: 1,
        days: [],
        allDays: false
      },
      companyTour:{
        name: '',
        avatar: ''
      },
      imageTour:[],
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
        before20Days: 0,
        before15Days: 0,
        before7Days: 0
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
      collapse: -1,
      model: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      step: 1,
      dayActive: 0,
      placeActive: 0,
      placeDetailActive:{
        images:[],
        description: '',
        checkInTime: '7:30'
      },
      loading: false,
      titleError: false,
      descriptionError: false,
      textSearch: '',
      cities: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);

    this.addPlace = this.addPlace.bind(this);

    this.addBoard = this.addBoard.bind(this);
    this.delBoard = this.delBoard.bind(this);

    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleBackStep = this.handleBackStep.bind(this);

    this.addTodoToBoard = this.addTodoToBoard.bind(this);
    this.delTodoFromBoard = this.delTodoFromBoard.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveTour = this.handleSaveTour.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleEditBasePrice = this.handleEditBasePrice.bind(this);
    this.handleChangePlaceDetail = this.handleChangePlaceDetail.bind(this);
    this.handleChangeEstimateDays = this.handleChangeEstimateDays.bind(this);

    this.handleUploadCompanyLogo = this.handleUploadCompanyLogo.bind(this);
    this.handleUpInputNumberField = this.handleUpInputNumberField.bind(this);
    this.handleDownInputNumberField = this.handleDownInputNumberField.bind(this);
  };

  handleSubmit() {
    this.setState({
      titleError: this.state.title === '',
      descriptionError: this.state.description === ''
    });

    if(this.state.step === 1 && (this.state.title === '' || this.state.description === '')){
      return;
    }

    this.setState({ loading: true });

    setTimeout(this.handleSaveTour, 500);
  };

  handleSaveTour() {
    const { title, basePrice, estimateDays, companyTour, imageTour, tpe, description, faresByAge, faresByPeople, faresByTime, refundCancel, priceNotIncluded, cancelTour, boardOthers, schedule } = this.state;

    const avatar = 'https://duybnd-1659.github.io/images/tour-place.png';

    let that = this;

    axios.post('/api/admin/tour/create', {
      title,
      estimateDays,
      basePrice,
      companyTour,
      imageTour,
      tpe,
      avatar,
      description,
      faresByAge,
      faresByPeople,
      faresByTime,
      refundCancel,
      priceNotIncluded,
      cancelTour,
      boardOthers,
      schedule
    },{headers:authHeader()}).then(() => {
      that.setState({
        loading: false,
        step: ++that.state.step
      });
    });
  }

  handleChangeField(key, event) {
    let value = event.target.value;
    if(key === 'title' || key === 'description'){
      this.setState({
        [key+'Error']: !value
      });
    }

    this.setState({
      [key]: value
    });
  };

  handleChangeEstimateDays(event){
    const value = event.target.value;

    this.setState(prevState => ({
      estimateDays: value,
      schedule: [...prevState.schedule, {tpe:2, places: []}]
    }));
  }

  handleChangePlaceDetail(key,event){
    const value = event.target.value;

    let schedule = this.state.schedule;

    const {dayActive, placeActive} = this.state;

    schedule[dayActive]['places'][placeActive][key] = value;

    this.setState(prevState => ({
      placeDetailActive: {
        ...prevState.placeDetailActive,
        [key]: value
      },
      schedule: schedule
    }));
  }

  handleNextStep(e) {
    e.preventDefault();

    this.setState({
      titleError: this.state.title === '',
      descriptionError: this.state.description === ''
    });

    if(this.state.step === 1 && (this.state.title === '' || this.state.description === '')){
      return;
    }

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

  toggleModal(index) {
    this.setState({
      dayActive: index,
      modal: !this.state.modal
    });
  }

  toggleModalMore(indexPlace) {
    const {dayActive} = this.state;

    let place = this.state.schedule[dayActive]['places'][indexPlace];

    this.setState(prevState => ({
      placeActive: indexPlace,
      placeDetailActive: {
        ...prevState.placeDetailActive,
        checkInTime: place.checkInTime,
        description: place.description
      },
      modalMore: !this.state.modalMore
    }));
  }

  toggle(index) {
    this.setState({ collapse: index });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state
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

  toggleModalLoading() {
    this.setState({ loading: !this.state.loading });
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

  addPlace(key,place,action) {
    const scheduleOld = this.state.schedule;

    if(action){
      scheduleOld[key].places.push(place);
    }
    else{
      scheduleOld[key].places = scheduleOld[key].places.filter(item => item.id !== place.id);
    }

    this.setState({
      schedule: scheduleOld
    });
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

  handleEditBasePrice() {
    this.setState({
      editBasePrice:this.state.editBasePrice !== true
    });
  };

  getCompanyLogo(file){
    this.setState(prevState => ({
      companyTour: {
        ...prevState.companyTour,
        avatar: file
      }
    }));
  }

  handleUploadCompanyLogo(key,event) {
    this.setState({
      [key]: event.target.value
    });

    axios.get("https://bo-api.thankdev.xyz/api/v2/cities?textSearch="+this.state.textSearch).then(response => {
      this.setState({ cities: response.data.results });
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    axios.get("https://bo-api.thankdev.xyz/api/v2/cities?textSearch="+this.state.textSearch).then(response => {
      this.setState({ cities: response.data.results });
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {

    const { title, titleError, descriptionError, tpe, basePrice, editBasePrice, estimateDays, companyTour, description, faresByAge, faresByPeople, faresByTime, departureSchedule, refundCancel, schedule, step, placeDetailActive } = this.state;

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
                  <div className={step === 5 ? 'rc-steps-item rc-steps-item-process' : step > 5 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-icon"><span className="rc-steps-icon">5</span></div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Hoàn thành và gửi duyệt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'none'}} className={step === 1 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4>Thông tin cơ bản</h4>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleSubmit}>
                    Save
                  </button>
                  <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={this.handleNextStep}>
                    <strong>Next step</strong> <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="">
                <div className="rct-block">
                  <div className="collapse show">
                    <div className="rct-block-content">
                      <div className="row">
                        <div className="col-md-7">
                          <div>
                            <div className="form-group">
                              <label>Tiêu đề:</label>
                              <input type="text" className={titleError ? 'form-control is-invalid' : 'form-control'} name="title" onChange={(ev) => this.handleChangeField('title', ev)}
                                     value={title} placeholder="Vui lòng nhập tiêu đề chuyến đi" required=""/>
                              <em style={{display: titleError ? 'block' : ''}} className="error invalid-feedback">Vui lòng nhập tiêu đề chuyến đi</em>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-7">
                                  <label>Số ngày dự tính:</label>
                                  <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                      <button className="btn btn-beside-input btn-beside-left" type="button">-</button>
                                    </div>
                                    <input type="number" name="numDays" className="form-control" onChange={(ev) => this.handleChangeEstimateDays(ev)}
                                           value={estimateDays} required=""/>
                                    <div className="input-group-prepend">
                                      <button className="btn btn-beside-input btn-beside-right" type="button">+</button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-5">
                                  <div className="d-flex align-items-center justify-content-end" style={{marginTop: '35px'}}>
                                    <div className="custom-control custom-radio custom-control-inline">
                                      <input type="radio" id="customRadioInline1" name="tpe" className="custom-control-input" required=""
                                             onChange={(ev) => this.handleChangeField('tpe', ev)} value="1"/>
                                      <label className={tpe === 1 ? 'custom-control-label-checked': 'custom-control-label'} htmlFor="customRadioInline1">Tour nội địa</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                      <input type="radio" id="customRadioInline2" name="tpe" className="custom-control-input" required=""
                                             onChange={(ev) => this.handleChangeField('tpe', ev)} value="2"/>
                                      <label className={tpe === 2 ? 'custom-control-label-checked': 'custom-control-label'} htmlFor="customRadioInline2">Tour quốc tế</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Mô tả:</label>
                            <textarea rows="5" name="description" className={descriptionError ? 'form-control is-invalid' : 'form-control'} onChange={(ev) => this.handleChangeField('description', ev)}
                                      value={description} placeholder="Vui lòng nhập mô tả chuyến đi" required=""></textarea>
                            <em style={{display: descriptionError ? 'block' : ''}} className="error invalid-feedback">Vui lòng nhập mô tả chuyến đi</em>
                          </div>
                          <div className="form-group company-tour">
                            <div className="row">
                              <div className="col-md-7">
                                <div className="form-group">
                                  <label>Công ty tổ chức Tour:</label>
                                  <input type="text" className="form-control" name="title" onChange={(ev) => this.handleChangeObjectField('companyTour.name', ev)}
                                         value={companyTour.name} placeholder="Tên Công ty - Tổ chức" required=""/>
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div tabIndex="0" className="dropzone">
                                  <FileBase64 multiple={ false } onDone={ this.getCompanyLogo.bind(this)} />
                                  <img style={{width: '100%'}} src={companyTour.avatar.base64} alt=""/>
                                  <div className="text-center">
                                    <i className="fa fa-cloud-upload"></i>
                                    <small>Upload Logo 400 x 400</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Chọn ảnh đại diện</label>
                            <div>
                              <div tabIndex="0" className="dropzone">
                                <input type="file" autoComplete="off" tabIndex="-1" style={{display: 'none'}}/>
                                <div className="text-center dropzone-placeholder-lg">
                                  <i className="fa fa-cloud-upload fa-6x"></i>
                                  <h5 className="mt-2 mb-4">Drag and drop a file here, or click to select file</h5>
                                  <small>Lưu ý: Hình ảnh có độ phân giải cao và kích thước nhỏ hơn 2MB</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Hình ảnh chuyến đi</label>
                            <div className="upload-preview">
                              <div tabIndex="0" className="dropzone">
                                <input type="file" autoComplete="off" tabIndex="-1" style={{display: 'none'}}/>
                                <div className="text-center">
                                  <i className="fa fa-cloud-upload"></i>
                                  <small>Upload Picture</small>
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
            <div style={{display: 'none'}} className={step === 2 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h5 className="mb-1">Địa điểm du lịch</h5>
                  <small>Tour du lịch {estimateDays} ngày
                </small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleSubmit}>
                    Save
                  </button>
                  <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={this.handleNextStep}>
                    Next Step <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              {schedule.map((day, indexDay) =>
                  <Card>
                    <CardHeader className="rct-block">
                      <i className="fa fa-arrow-right"></i>
                      <strong onClick={() => this.toggle(indexDay)}>
                        {indexDay === 0 ? 'Điểm khởi hành' : 'Ngày thứ '+indexDay}
                      </strong>
                      <div className="card-header-actions">
                        <a onClick={() => this.toggleModal(indexDay)} className="card-header-action" style={{color: '#FF4827 !important'}}>
                          <i className="fa fa-plus"></i> Thêm địa điểm
                        </a>
                      </div>
                    </CardHeader>
                    <Collapse isOpen={this.state.collapse === indexDay} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                      <CardBody>
                        <div className="tour-schedule-items">
                          <div className="row">
                            <div className="col-md-8">
                              <ul>
                                {day.places.map((place,indexPlace) =>
                                    <PlaceDetail toggleModalMore={this.toggleModalMore} place={place} indexDay={indexDay} indexPlace={indexPlace}/>
                                )}
                              </ul>
                            </div>
                            <div className="col-md-4">
                              <div className="map-wrapper">
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Collapse>
                  </Card>
              )}
              <Modal isOpen={this.state.modal} toggle={() => this.toggleModal(this.state.dayActive)}>
                <ModalBody>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bd-highlight align-self-center">
                      <h5>Thêm địa điểm</h5><small></small>
                    </div>
                    <div className="bd-highlight align-self-center">
                      <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={() => this.toggleModal(this.state.dayActive)}>
                        <i className="fa fa-check"></i> Hoàn thành
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="input-group">
                      <input placeholder="Nhập tên địa điểm tìm kiếm" type="text" className="form-control" onChange={(ev) => this.handleUploadCompanyLogo('textSearch', ev)}/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                    <hr/>
                    <ul className="list-inline">
                      <li className="list-inline-item react-tabs__tab--selected">Tất cả</li>
                      <li className="list-inline-item ">Nhà hàng</li>
                      <li className="list-inline-item ">Khách sạn</li>
                      <li className="list-inline-item ">Sinh thái</li>
                    </ul>
                    {this.state.cities.map((city) => (
                        <PlaceItem index={this.state.dayActive} addPlace={this.addPlace} key={city.id} place={city}/>
                    ))}
                  </div>
                </ModalBody>
              </Modal>
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
              <Modal isOpen={this.state.modalMore} toggle={() => this.toggleModalMore(this.state.placeActive)} className="modal-lg">
                <ModalBody>
                  <div className="mb-4">
                    <h4 className="mb-1">Thêm thông tin chi tiết</h4>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <div className="form-group">
                          <label>Thời gian check-in địa điểm này:</label>
                          <FormGroup>
                            <Input type="select" name="ccmonth" id="ccmonth" onChange={(ev) => this.handleChangePlaceDetail('checkInTime', ev)}
                                   value={placeDetailActive.checkInTime}>
                              <option value="7:30">7:30</option>
                              <option value="7:45">7:45</option>
                              <option value="8:00">8:00</option>
                              <option value="8:15">8:15</option>
                            </Input>
                          </FormGroup>
                        </div>
                        <div className="form-group">
                          <label>Mô tả hoạt động tại địa điểm:</label>
                          <textarea rows="8" name="description" className="form-control tour-description-textarea" placeholder="Thêm mô tả" required="" onChange={(ev) => this.handleChangePlaceDetail('description', ev)}
                                    value={placeDetailActive.description}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <div className="container">
                          <div tabIndex="0" className="dropzone">
                            <input multiple="" type="file" autoComplete="off" tabIndex="-1" style={{display: 'none'}}/>
                            <div className="text-center dropzone-placeholder-md">
                              <i className="fa fa-cloud-upload fa-5x"></i>
                              <h6 className="mt-2 mb-4">Drag and drop a file here, or click to select file</h6>
                              <small>Lưu ý: Hình ảnh có độ phân giải cao và kích thước nhỏ hơn 2MB</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="float-right">
                      <button className="btn btn-white btn-rounded mr-2" onClick={() => this.toggleModalMore(this.state.placeActive)}>
                        Hủy
                      </button>
                      <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={() => this.toggleModalMore(this.state.placeActive)}>
                        Hoàn thành
                      </button>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
            <div style={{display: 'none'}} className={step === 3 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4 className="mb-1">Thêm lịch khởi hành và giá tour</h4>
                  <small>Tour du lịch {estimateDays} ngày</small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleSubmit}>
                    Save
                  </button>
                  <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={this.handleNextStep}>
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
                            <div className="custom-control custom-radio">
                              <input type="radio" className="custom-control-input" value="1" checked={departureSchedule.tpe === 1}
                                     onChange={(ev) => this.handleChangeObjectField('departureSchedule.tpe', ev)}/>
                              <label className="custom-control-label" htmlFor="option_1">
                                Hằng ngày
                              </label>
                            </div>
                            <div className="custom-control custom-radio">
                              <input type="radio" className="custom-control-input" value="2" checked={departureSchedule.tpe === 2}
                                     onClick={(ev) => this.handleChangeObjectField('departureSchedule.tpe', ev)}/>
                              <label className="custom-control-label" htmlFor="option_2">
                                Các ngày cố định trong tuần
                              </label>
                            </div>
                            <div className="mt-2 mb-4 ml-4" style={{display: departureSchedule.tpe === 2 ? 'block': 'none' }}>
                              <ButtonGroup>
                                <Button>2</Button>
                                <Button>3</Button>
                                <Button>4</Button>
                                <Button>5</Button>
                                <Button>6</Button>
                                <Button>7</Button>
                                <Button>CN</Button>
                              </ButtonGroup>
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1">Tất cả các ngày lễ tết</label>
                              </div>
                            </div>
                            <div className="custom-control custom-radio">
                              <input type="radio" className="custom-control-input" value="3"
                                     onChange={(ev) => this.handleChangeObjectField('departureSchedule.tpe', ev)}/>
                              <label className="custom-control-label" htmlFor="option_3">
                                Các ngày cố định trong tháng
                              </label>
                            </div>
                            <div className="mt-2 mb-4 ml-4" style={{display: departureSchedule.tpe === 3 ? 'block': 'none' }}>
                              <div className="css-1pcexqc-container" id="date-selector">
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
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                                <label className="custom-control-label" htmlFor="customCheck2">Tất cả các ngày lễ tết</label>
                              </div>
                            </div>
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
                              <div style={{display: editBasePrice ? 'flex' : 'none'}} className="field field-price">
                                <input  type="text" className="form-control" autoFocus={true} onBlur={this.handleEditBasePrice}
                                        onChange={(ev) => this.handleChangeField('basePrice', ev)} value={basePrice}/>
                                <span className="unit blue">vnđ</span>
                              </div>
                              <h3 style={{display: !editBasePrice ? 'block' : 'none'}} onClick={this.handleEditBasePrice}>
                                <b><span tabIndex="0">{basePrice}</span><span> VNĐ</span></b>
                              </h3>
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
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByAge.adult', ev)}
                                               value={faresByAge.adult} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - faresByAge.adult)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trẻ 2-11 tuổi</td>
                                    <td className="table-custom-cell">
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByAge.from2to11YO', ev)}
                                               value={faresByAge.from2to11YO} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - faresByAge.from2to11YO)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Dưới 2 tuổi</td>
                                    <td className="table-custom-cell">
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByAge.under2YO', ev)}
                                               value={faresByAge.under2YO} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - faresByAge.under2YO)/100} đ
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
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from10To20', ev)}
                                             value={faresByPeople.from10To20} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByPeople.from10To20)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">20 người</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from20To30', ev)}
                                             value={faresByPeople.from20To30} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByPeople.from20To30)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">30 người</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByPeople.from30', ev)}
                                             value={faresByPeople.from30} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByPeople.from30)/100} đ
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
                      <div className="rct-block">
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
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.normalDay', ev)}
                                             value={faresByTime.normalDay} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByTime.normalDay)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Cuối tuần</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.weekend', ev)}
                                             value={faresByTime.weekend} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByTime.weekend)/100} đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Ngày lễ</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                  <td className="table-custom-cell"></td>
                                  <td className="table-custom-cell table-text-right">
                                    {basePrice*(100 - faresByTime.holiday)/100} đ
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
                      <div className="rct-block">
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
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 3 sao</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 4 sao</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} />
                                      <span className="unit">%</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-cell">Phòng đơn 5 sao</td>
                                  <td className="table-custom-cell">
                                    <div className="field field-add">
                                      <Input type="text" onChange={(ev) => this.handleChangeObjectField('faresByTime.holiday', ev)}
                                             value={faresByTime.holiday} />
                                      <span className="unit">%</span>
                                    </div>
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
                      <div className="rct-block">
                        <div className="collapse show">
                          <div className="rct-block-content">
                            <h4>Phí hoàn hủy Tour (đối với Tour cách ngày khởi hàng > 15 ngày)</h4>
                            <hr/>
                              <div>
                                <table style={{width: '100%'}}>
                                  <thead>
                                  <tr>
                                    <td className="table-head-label table-custom-cell" width="30%">NGÀY KHỞI HÀNH</td>
                                    <td className="table-head-label table-custom-cell">PHÍ PHẠT %/ GIÁ TOUR</td>
                                    <td className="table-head-label table-custom-cell">THÀNH TIỀN</td>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td className="table-custom-cell">Trước 20 ngày</td>
                                    <td className="table-custom-cell">
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('refundCancel.before20Days', ev)}
                                               value={refundCancel.before20Days} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - refundCancel.before20Days)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trước 15 ngày</td>
                                    <td className="table-custom-cell">
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('refundCancel.before15Days', ev)}
                                               value={refundCancel.before15Days} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - refundCancel.before15Days)/100} đ
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-custom-cell">Trước 7 ngày</td>
                                    <td className="table-custom-cell">
                                      <div className="field field-add">
                                        <Input type="text" onChange={(ev) => this.handleChangeObjectField('refundCancel.before7Days', ev)}
                                               value={refundCancel.before7Days} />
                                        <span className="unit">%</span>
                                      </div>
                                    </td>
                                    <td className="table-custom-cell table-text-right">
                                      {basePrice*(100 - refundCancel.before7Days)/100} đ
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
              </div>
            </div>
            <div style={{display: 'none'}} className={step === 4 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4>Thông tin và điểu khoản Tour</h4>
                  <small>Tour du lịch 1 ngày</small>
                </div>
                <div className="float-right">
                  <button className="btn btn-white btn-rounded mr-2" onClick={this.handleSubmit}>
                    Save
                  </button>
                  <button className="btn btn-rounded btn-custom btn-linear btn-next-step" onClick={this.handleNextStep}>
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
                                      <FormGroup>
                                        <Input type="select" name="ccmonth" id="ccmonth">
                                          <option value="">Chọn phương tiện</option>
                                          <option value="1">Ô tô</option>
                                          <option value="2">Xe khách</option>
                                          <option value="3">Tàu hỏa</option>
                                          <option value="4">Máy bay</option>
                                          <option value="5">Ca nô</option>
                                        </Input>
                                      </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                      <FormGroup>
                                        <Input type="select" name="ccmonth" id="ccmonth">
                                          <option value="">Hãng phương tiện</option>
                                          <option value="1">Văn Minh</option>
                                          <option value="2">Đường sắt Việt Nam</option>
                                          <option value="3">Vietnam Airlines</option>
                                          <option value="4">VietJet Air</option>
                                          <option value="5">Bambo Airways</option>
                                        </Input>
                                      </FormGroup>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-md-2">
                                    <label htmlFor="" style={{marginTop: '6px'}}>Khởi hành</label>
                                  </div>
                                  <div className="col-md-4">
                                    <Input type="select" name="ccmonth" id="ccmonth">
                                      <option value="">Chọn điểm đi</option>
                                      <option value="1">Hà Nội</option>
                                      <option value="2">Hải Phòng</option>
                                      <option value="3">Quảng Ninh</option>
                                      <option value="4">Nha Trang</option>
                                      <option value="5">TP. Hồ Chí Minh</option>
                                    </Input>
                                  </div>
                                  <div className="col-md-2">
                                    <i className="fa fa-exchange fa-2x text-primary"></i>
                                  </div>
                                  <div className="col-md-4">
                                    <Input type="select" name="ccmonth" id="ccmonth">
                                      <option value="">Chọn điểm đến</option>
                                      <option value="1">Seoul</option>
                                      <option value="2">Bắc Kinh</option>
                                      <option value="3">Bangkok</option>
                                      <option value="4">Tokyo</option>
                                      <option value="5">Kyoto</option>
                                    </Input>
                                  </div>
                                </div>
                                <div className="mb-3">Hành lý mang theo (Miễn phí)</div>
                                <div className="form-group row">
                                  <div className="col-md-2 align-self-center">Xách tay</div>
                                  <div className="col-md-4">
                                    <input type="text" className="form-control text-right" name="luggage_weight_1" value="0.0 kg"/>
                                  </div>
                                  <div className="col-md-2 align-self-center">Kí gửi</div>
                                  <div className="col-md-4">
                                    <input type="text" className="form-control text-right" name="luggage_weight_2" value="0.0 kg"/>
                                  </div>
                                </div>
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
            <div style={{display: 'none'}} className={step === 5 ? 'mt-4 step-active' : 'mt-4'}>
              <div id="form-step-5">
                <div className="">
                  <div className="rct-block">
                    <div className="collapse show">
                      <div className="rct-block-content">
                        <div className="text-center">
                          <h3><b>CONGRATULATION</b></h3>
                          <div className="mb-4">Bạn đã tạo tour du lịch thành công</div>
                          <button onClick={this.handleSubmit} type="button" className="btn btn-rounded btn-custom btn-linear btn-next-step">Submit for Review</button>
                          <p className="mt-4">
                            <img src={'assets/img/congratulation.svg'} alt="congratulation-img"/>
                          </p>
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