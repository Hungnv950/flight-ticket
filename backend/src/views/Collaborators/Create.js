import axios from 'axios';
import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText, InputGroup
} from 'reactstrap';

import {authHeader} from "../../helpers/authHeaders";

class Collaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: String,
      phone: String,
      address: String,
      fullName: String,
      discount: 0,
      commission: 0,
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  };

  handleSubmit() {
    const { email, username, address, fullName, discount, commission } = this.state;

    axios.post('/api/admin/collaborator/create', {
      email,
      address,
      fullName,
      username,
      discount,
      commission
    },{headers:authHeader()}).then(res => {
      this.setState({ redirect: true })
    });
  };

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    const { email, username, address, fullName, discount, commission, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/collaborators'/>;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Cộng tác viên <small>Thêm mới</small></strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={4}>
                    <div className="wp-st-logo">
                      <div className="wrap-logo">
                        <div className="preview-image">
                          <img src="" style={{display: 'none'}}/>
                        </div>
                      </div>
                      <div className="wp-ip-file">
                        <input name="avatar" type="file" id="input-file" style={{display: 'none'}} accept="image/*"/>
                        <button id="btn-upload-avatar" className="btn btn-outline-secondary" type="button">
                          <i className="nav-icon icon-cloud-upload"></i>
                          Chọn ảnh đại diện
                        </button>
                      </div>
                      <p className="ng-binding">Lưu ý: Ảnh không vượt quá 2MB</p>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <FormGroup>
                      <Label>Số điện thoại: <span className="required">(*)</span></Label>
                      <Input type="text" id="username" onChange={(ev) => this.handleChangeField('username', ev)}
                             value={username} placeholder="Nhập số điện thoại" required />
                    </FormGroup>
                    <Row>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>Họ và tên: <span className="required">(*)</span></Label>
                          <Input type="text" id="fullName" onChange={(ev) => this.handleChangeField('fullName', ev)}
                                 value={fullName} placeholder="Nhập họ và tên" required />
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>Email: <span className="required">(*)</span></Label>
                          <Input type="text" id="email" onChange={(ev) => this.handleChangeField('email', ev)}
                                 value={email} placeholder="example@thanktrip.com" required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label>Địa chỉ: </Label>
                      <Input type="text" id="address" onChange={(ev) => this.handleChangeField('address', ev)}
                             value={address} placeholder="127 Yến Xá, Trân Triều, Thanh Trì, Hà Nội" />
                    </FormGroup>
                    <hr/>
                    <Label><strong>Hoa hồng và chiết khấu</strong></Label>
                    <Row>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>Hoa hồng CTV: </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>₫</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="numbef" id="commission" onChange={(ev) => this.handleChangeField('commission', ev)}
                                   value={commission} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>Chiết khấu KH: </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>₫</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="numbef" id="discount" onChange={(ev) => this.handleChangeField('discount', ev)}
                                   value={discount}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <a href="index" className="btn btn-danger pull-left">
                  <i className="nav-icon icon-close"></i>
                  Hủy bỏ
                </a>
                <button onClick={this.handleSubmit} className="btn btn-success pull-right" type="submit">
                  <i className="nav-icon icon-check"></i>
                  Lưu & Tiếp tục
                </button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Collaborator;