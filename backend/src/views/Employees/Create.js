import axios from 'axios';
import React, { Component } from 'react';

import FileBase64 from "./FileBase64";

import permissionsData from './PermissionsData';

import {authHeader} from "../../helpers/authHeaders";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      note: '',
      email: '',
      phone: '',
      avatar: '',
      address: '',
      fullName: '',
      loading: false,
      phoneError: false,
      emailError: false,
      fullNameError: false,
      idEmployeeCurrent: 0,
      permissions: permissionsData
    };

    this.uploadAvatar = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSaveEmployee = this.handleSaveEmployee.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.handleSubmitForReview = this.handleSubmitForReview.bind(this);
    this.handleChangeObjectField = this.handleChangeObjectField.bind(this);
  };

  handleSubmit() {
    this.setState({
      emailError: this.state.email === '',
      phoneError: this.state.phone === '',
      fullNameError: this.state.fullName === ''
    });

    if(this.state.step === 1 && (this.state.email === '' || this.state.phone === '' || this.state.fullName === '')){
      return;
    }

    this.setState({ loading: true });

    setTimeout(this.handleSaveEmployee(false), 500);
  };

  handleSaveEmployee(redirect) {
    const { fullName, avatar, phone, email, address, note, permissions } = this.state;
    let that = this;

    const paramsBody = {
      note,
      phone,
      email,
      avatar,
      address,
      fullName,
      permissions
    };

    if(this.state.idEmployeeCurrent){
      axios.post('/api/admin/employee/'+this.state.idEmployeeCurrent+'/update', paramsBody,{headers:authHeader()}).then(() => {
        that.setState({
          loading: false
        });

        if(redirect){
          this.props.history.push('/tour/'+this.state.idEmployeeCurrent+'/view');
        }
      });
    }
    else{
      axios.post('/api/admin/employee/create', paramsBody,{headers:authHeader()}).then(response => {
        that.setState({
          loading: false,
          idEmployeeCurrent: response.data._id
        });

        if(redirect){
          this.props.history.push('/tour/'+this.state.idEmployeeCurrent+'/view');
        }
      });
    }
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

  handleChangeObjectField(index1, index2) {
    let permissions = this.state.permissions;

    permissions[index1]['actions'][index2]['value'] = !permissions[index1]['actions'][index2]['value'];

    this.setState({
      permissions: permissions
    });
  };

  handleSubmitForReview(){
    this.setState({ loading: true });

    setTimeout(this.handleSaveTour(true), 500);
  }

  handleNextStep(e) {
    e.preventDefault();

    this.setState({
      emailError: this.state.email === '',
      phoneError: this.state.phone === '',
      fullNameError: this.state.fullName === ''
    });

    if(this.state.step === 1 && (this.state.email === '' || this.state.phone === '' || this.state.fullName === '')){
      return;
    }

    if(this.state.step === 2){
      this.handleSubmit();
    }

    this.setState({
      step: this.state.step + 1
    });
  };

  getAvatar(file){
    this.setState({
      avatar: file.base64
    });
  }

  handleUploadAvatar() {
    this.uploadAvatar.current.click();
  }

  render() {
    const { fullName, avatar, phone, email, address, note, step, fullNameError, phoneError, emailError, permissions } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="rct-page-content">
          <div>
            <div className="tour-header d-flex justify-content-between mb-3">
              <div className="bd-highlight align-self-center"><h4>Thêm mới nhân viên</h4></div>
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
                      <div className="rc-steps-item-title">Vai trò và phân quyền</div>
                    </div>
                  </div>
                  <div className={step === 3 ? 'rc-steps-item rc-steps-item-process' : step > 3 ? 'rc-steps-item rc-steps-item-finish' : 'rc-steps-item rc-steps-item-wait'}>
                    <div className="rc-steps-item-icon"><span className="rc-steps-icon">3</span></div>
                    <div className="rc-steps-item-content">
                      <div className="rc-steps-item-title">Hoàn thành và xem trước</div>
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
                        <div className="col-md-8">
                          <div className="form-group">
                            <label>Họ và tên:</label>
                            <input type="text" className={fullNameError ? 'form-control is-invalid' : 'form-control'} name="fullName"
                                   onChange={(ev) => this.handleChangeField('fullName', ev)} value={fullName} placeholder="Vui lòng nhập tiêu đề chuyến đi" required=""/>
                            <em style={{display: fullNameError ? 'block' : ''}} className="error invalid-feedback">Vui lòng nhập họ và tên</em>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Số điện thoại:</label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-headphones"></i>
                                    </span>
                                  </div>
                                  <input type="text" className={phoneError ? 'form-control is-invalid' : 'form-control'} name="phone"
                                         onChange={(ev) => this.handleChangeField('phone', ev)} value={phone} required=""/>
                                  <em style={{display: phoneError ? 'block' : ''}} className="error invalid-feedback">Vui lòng nhập số điện thoại</em>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email:</label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-envelope"></i>
                                    </span>
                                  </div>
                                  <input type="text" className={emailError ? 'form-control is-invalid' : 'form-control'} name="email"
                                         onChange={(ev) => this.handleChangeField('email', ev)} value={email} required=""/>
                                  <em style={{display: emailError ? 'block' : ''}} className="error invalid-feedback">Vui lòng nhập email</em>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Địa chỉ:</label>
                            <input type="text" className="form-control" name="address"
                                   onChange={(ev) => this.handleChangeField('address', ev)} value={address}/>
                          </div>
                          <div className="form-group">
                            <label>Ghi chú:</label>
                            <textarea rows="5" name="note" className="form-control"
                                      onChange={(ev) => this.handleChangeField('note', ev)} value={note}></textarea>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Chọn ảnh đại diện</label>
                            <div>
                              <div tabIndex="0" className="dropzone" onClick={this.handleUploadAvatar} style={{minHeight: '360px'}}>
                                <FileBase64 refName={this.uploadAvatar} multiple={ false } onDone={this.getAvatar.bind(this)} />
                                <div style={{display: !avatar ? 'block' : 'none'}} className="text-center dropzone-placeholder-lg">
                                  <div>
                                    <i className="fa fa-cloud-upload fa-6x"></i>
                                    <h5 className="mt-2 mb-4">Drag and drop a file here, or click to select file</h5>
                                    <small>Lưu ý: Hình ảnh có độ phân giải cao và kích thước nhỏ hơn 2MB</small>
                                  </div>
                                </div>
                                <div style={{display: avatar ? 'block' : 'none'}}>
                                  <div className="row">
                                    <div className="col-sm-12 col-md-12 preview-img">
                                      <img alt="Preview" src={avatar}/>
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
            </div>
            <div style={{display: 'none'}} className={step === 2 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4>Vai trò và phân quyền</h4>
                  <small>Roles and Permissions</small>
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
                      <strong>Permissions</strong>
                      <br/><br/>
                      {permissions.map((permission,index1) =>
                          <div key={permission.ctrl} className="row">
                            <div className="col-md-12">
                              <strong>{permission.ctrl}</strong>
                            </div>
                            {permission.actions.map((action,index2) =>
                                <div key={permission.ctrl+'-'+action.name} className="col-md-3">
                                  <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                      <input id={permission.ctrl+'-'+action.name} type="checkbox" className="custom-control-input"
                                             onChange={() => this.handleChangeObjectField(index1,index2)} checked={action.value}/>
                                      <label className="custom-control-label" htmlFor={permission.ctrl+'-'+action.name}>
                                        {permission.ctrl+':'+action.name}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                            )}
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'none'}} className={step === 3 ? 'mt-4 step-active' : 'mt-4'}>
              <div className="clearfix mb-4">
                <div className="float-left">
                  <h4>Hoàn thành và xem trước</h4>
                </div>
                <div className="float-right">
                  <a href="/#/employees" className="btn btn-rounded btn-custom btn-linear btn-next-step" style={{width: 'auto'}}>
                    <strong>Tới danh sách nhân viên</strong> <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div className="">
                <div className="rct-block">
                  <div className="collapse show">
                    <div className="rct-block-content">
                      <div className="row">
                        <div className="col-md-12">
                          <h6 className="text-uppercase">Thông tin nhân viên</h6>
                          <hr/>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group"><label className="form-label control-label">Họ và tên:</label>
                            <div className="form-wrap form-control-static"><strong>{fullName}</strong></div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group"><label className="form-label control-label">Số điện thoại:</label>
                            <div className="form-wrap form-control-static">
                              {phone}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group"><label className="form-label control-label">Email:</label>
                            <div className="form-wrap form-control-static">
                              {email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr/>
                      <strong>Permissions</strong>
                      <br/><br/>
                      {permissions.map((permission) =>
                          <div key={permission.ctrl} className="row">
                            <div className="col-md-12">
                              <strong>{permission.ctrl}</strong>
                            </div>
                            {permission.actions.map((action) =>
                                <div key={permission.ctrl+'-'+action.name} className="col-md-3">
                                  <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                      <input id={permission.ctrl+'-'+action.name} type="checkbox" className="custom-control-input"
                                             onChange={() => {}} checked={action.value}/>
                                      <label className="custom-control-label" htmlFor={permission.ctrl+'-'+action.name}>
                                        {permission.ctrl+':'+action.name}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                            )}
                          </div>
                      )}
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