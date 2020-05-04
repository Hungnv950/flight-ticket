import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
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

function EmployeeRow(props) {
  const stt = props.stt;
  const employee = props.employee;
  const employeeLink = `/employee/${employee._id}`;

  const getBadge = (status) => {
    return status === 10 ? 'success' : 'danger'
  };

  const getStatusLabel = (status) => {
    return status === 10 ? 'Đang hoạt động' : 'Ngừng hoạt động'
  };

  return (
    <tr key={employee._id}>
      <td>{stt+1}</td>
      <td><img src="https://ui-avatars.com/api/?size=50&name=V%C3%B5%20Thanh%20S%C6%A1n" alt=""/></td>
      <td><Link to={employeeLink}>{employee.code}</Link></td>
      <td>{employee.fullName}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
      <td><Badge color={getBadge(employee.status)}>{getStatusLabel(employee.status)}</Badge></td>
    </tr>
  )
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      loading: true,
      redirect: false
    };
  }

  componentDidMount(){
    const that = this;

    axios.get("/api/admin/employees",{headers: authHeader()}).then(response => {
      this.setState({
        loading: false,
        employees: response.data.employees
      });
    }).catch(function (error) {
      console.log(error);
      that.setState({ loading: false, redirect: true });
    })
  }

  render() {
    const { employees, loading, redirect } = this.state;

    if (loading) {
      return null;
    }

    if (redirect) {
      return <Redirect to="/login"/>;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={4}>
            <Card>
              <CardHeader>
                <p style={{margin: '6px 0'}}>
                  <strong>
                    <i className="fa fa-search"></i> Tìm kiếm
                  </strong>
                </p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Input type="text" id="name" placeholder="Theo Mã, Tên, SĐT Nhân viên" required />
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
                        <Label check className="form-check-label" htmlFor="radio1">Tất cả</Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="statusBooking" name="status" value="1" />
                        <Label check className="form-check-label" htmlFor="radio2">Hoạt động</Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="statusPaid" name="status" value="2" />
                        <Label check className="form-check-label" htmlFor="radio3">Ngừng hoạt động</Label>
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
                  Nhân viên
                </p>
                <div className="card-header-actions">
                  <a href="#/employees/create" className="btn btn-rounded btn-custom btn-linear">
                    <i className="fa fa-plus"></i> Thêm nhân viên mới
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
                    {employees.map((employee, index) =>
                      <EmployeeRow stt={index} key={index} employee={employee}/>
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
