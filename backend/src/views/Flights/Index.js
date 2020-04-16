import axios from "axios";
import Moment from 'react-moment';
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

function FlightRow(props) {
  const stt = props.stt;
  const flight = props.flight;
  const flightLink = `/flight/${flight._id}`;
  const userLink = `/flight/${flight._id}`;

  const getBadge = (status) => {
    return status === 1 ? 'danger' : 'success'
  };

  const getStatusLabel = (status) => {
    return status === 1 ? 'Đang đặt hàng' : 'Đã thanh toán'
  };

  return (
    <tr key={stt+1}>
      <td>{stt+1}</td>
      <td><Link to={flightLink}>{flight.flightCode}</Link></td>
      <td>
        <div>
          <a href={userLink}>
            {flight.fullName}
          </a>
        </div>
        <div className="small text-muted">
          <span>{flight.phone}</span>
        </div>
      </td>
      <td>{flight.collaboratorCode}</td>
      <td>
        <div>
          <span>
            <Moment format="DD/MM/Y">
                {flight.createdAt}
            </Moment>
          </span>
        </div>
        <div className="small text-muted">
          <strong>
            <Moment format="HH:mm">
              {flight.createdAt}
            </Moment>
          </strong>
        </div>
      </td>
      <td style={{textAlign: 'right'}}>
        <div>
          <strong>{ flight.totalMoney }</strong>
        </div>
        <div className="small text-muted">
          <strong>Số chỗ đặt: { flight.passengers.length }</strong>
        </div>
      </td>
      <td><Link to={flightLink}><Badge color={getBadge(flight.status)}>{getStatusLabel(flight.status)}</Badge></Link></td>
    </tr>
  )
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: []
    };
  }

  componentDidMount(){
    axios.get("/api/admin/flights",{headers: authHeader()}).then(response => {
      this.setState({ flights: response.data });
    }).catch(function (error) {
      console.log(error);
    })
  }
  render() {

    const { flights } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={4}>
            <Card>
              <CardHeader>
                <strong>Tìm kiếm</strong>
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
                <strong>Chuyến bay</strong>
              </CardHeader>
              <CardBody style={{padding:0}}>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">stt</th>
                      <th scope="col">mã đơn hàng</th>
                      <th scope="col">khách hàng</th>
                      <th scope="col">mã ctv</th>
                      <th scope="col">thời gian</th>
                      <th scope="col">tổng chi phí</th>
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
                    {flights.map((flight, index) =>
                      <FlightRow stt={index} key={index} flight={flight}/>
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
