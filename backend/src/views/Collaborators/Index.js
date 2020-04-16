import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { authHeader } from "../../helpers/authHeaders";

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

function CollaboratorRow(props) {
  const stt = props.stt;
  const collaborator = props.collaborator;
  const collaboratorLink = `/collaborator/${collaborator._id}`;

  const getBadge = (status) => {
    return status === 10 ? 'success' : 'danger'
  };

  const getStatusLabel = (status) => {
    return status === 10 ? 'Đang hoạt động' : 'Ngừng hoạt động'
  };

  return (
    <tr key={collaborator._id}>
      <td>{stt+1}</td>
      <td><img src="https://ui-avatars.com/api/?size=50&name=V%C3%B5%20Thanh%20S%C6%A1n" alt=""/></td>
      <td><Link to={collaboratorLink}>{collaborator.code}</Link></td>
      <td>{collaborator.fullName}</td>
      <td>{collaborator.phone}</td>
      <td>{collaborator.email}</td>
      <td><Badge color={getBadge(collaborator.status)}>{getStatusLabel(collaborator.status)}</Badge></td>
    </tr>
  )
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: []
    };
  }

  componentDidMount(){
    axios.get("/api/admin/collaborators",{headers: authHeader()}).then(response => {
      this.setState({ collaborators: response.data });
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {

    const {collaborators} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={4}>
            <Card>
              <CardHeader>
                <i className="fa fa-search"></i> Search
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Input type="text" id="name" placeholder="Theo mã chuyến bay, SĐT khách hàng" required />
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Input type="text" id="name" placeholder="Theo mã CTV" required />
                    </FormGroup>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name" style={{width: '100%'}}>
                        <strong>Thời gian đặt vé</strong>
                        <a href="/" className="pull-right">
                          <i className="fa fa-calendar"></i>Tìm nâng cao
                        </a>
                      </Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col xs="12">
                    <Label htmlFor="name">
                      <strong>Theo trạng thái</strong>
                    </Label>
                    <FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="statusALl" name="status" value="0" />
                        <Label check className="form-check-label" htmlFor="radio1">All</Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="statusBooking" name="status" value="1" />
                        <Label check className="form-check-label" htmlFor="radio2">Booking</Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="statusPaid" name="status" value="2" />
                        <Label check className="form-check-label" htmlFor="radio3">Paid</Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl={8}>
            <Card>
              <CardHeader>
                <p style={{float: 'left',fontWeight: 'bold',marginTop: '8px',marginBottom: 0}}>
                  Collaborators
                </p>
                <div className="card-header-actions">
                  <a href="/#/collaborator/create" className="btn btn-block btn-success active">
                    <i className="nav-icon icon-plus"></i>
                    Create new collaborator
                  </a>
                </div>
              </CardHeader>
              <CardBody style={{padding:0}}>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">stt</th>
                      <th scope="col">hình ảnh</th>
                      <th scope="col">mã ctv</th>
                      <th scope="col">họ và tên</th>
                      <th scope="col">số điện thoại</th>
                      <th scope="col">emal</th>
                      <th scope="col">trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {collaborators.map((collaborator, index) =>
                      <CollaboratorRow stt={index} key={index} collaborator={collaborator}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index;
