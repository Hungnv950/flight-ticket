import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

import flightsData from './FlightsData'

function FlightRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  };

  return (
    <tr key={user.id.toString()}>
      <td><Link to={userLink}>{user.id}</Link></td>
      <td>
        <div>
          <a href="/admin/user/view/5e7bb53191354b79ba1c1665">
            Võ Thanh Sơn KH
          </a>
        </div>
        <div className="small text-muted">
          <span className="ng-binding">09667845762</span>
        </div>
      </td>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}

class Flights extends Component {

  render() {

    const flightList = flightsData.filter((flight) => flight.id < 10);

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
                <i className="fa fa-plane"></i> Flights <small className="text-muted">list</small>
              </CardHeader>
              <CardBody style={{padding:0}}>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">stt</th>
                      <th scope="col">code</th>
                      <th scope="col">customer</th>
                      <th scope="col">ctv code</th>
                      <th scope="col">time</th>
                      <th scope="col">cost</th>
                      <th scope="col">status</th>
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
                    {flightList.map((flight, index) =>
                      <FlightRow key={index} user={flight}/>
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

export default Flights;
