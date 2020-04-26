import axios from 'axios';
import Moment from "react-moment";
import React, { Component } from 'react';

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
  Label, ModalHeader, ModalBody, ModalFooter, Button, Modal
} from 'reactstrap';

import { authHeader } from "../../helpers/authHeaders";

function TransactionRow(props) {
  const stt = props.stt;
  const transaction = props.transaction;
  const transactionLink = `/transaction/${transaction._id}`;

  const getBadge = (status) => {
    return status === 10 ? 'success' : 'danger'
  };

  const getStatusLabel = (status) => {
    return status === 10 ? 'Đang hoạt động' : 'Ngừng hoạt động'
  };

  return (
    <tr key={transaction._id}>
      <td>{stt+1}</td>
      <td>
        <div>
          <a href={transactionLink}>
            {transaction.user.fullName}
          </a>
        </div>
        <div className="small text-muted" style={{fontSize: '90%'}}>
          {transaction.user.code}
        </div>
      </td>
      <td>
        <div>
          <strong>
            {transaction.bank.name} - {transaction.bank.branch}
          </strong>
        </div>
        <div className="small text-muted" style={{fontSize: '90%'}}>
          <strong>{transaction.bank.accountNumber}</strong> - {transaction.bank.accountHolder}
        </div>
      </td>
      <td>
        <div>
          <span>
            <Moment format="DD/MM/Y">
                {transaction.createdAt}
            </Moment>
          </span>
        </div>
        <div className="small text-muted">
          <strong>
            <Moment format="HH:mm">
              {transaction.createdAt}
            </Moment>
          </strong>
        </div>
      </td>
      <td className="th-text-right">
        ₫<strong>{transaction.amount}</strong>
      </td>
      <td><Badge color={getBadge(transaction.status)}>{getStatusLabel(transaction.status)}</Badge></td>
      <td>
        --:--
      </td>
      <td>
        <button className="btn btn-danger btn-sm">
          <i className="nav-icon icon-printer"></i>
          Xử lý nhanh
        </button>
      </td>
    </tr>
  )
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      transactionActive: 0
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount(){
    axios.get("/api/admin/transactions",{headers: authHeader()}).then(response => {
      this.setState({ transactions: response.data });
    }).catch(function (error) {
      console.log(error);
    })
  }

  toggleModal(_id) {
    this.setState({
      transactionActive: _id,
      modal: !this.state.modal
    });
  }

  render() {

    const { transactions } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={3}>
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
          <Col xl={9}>
            <Card>
              <CardHeader>
                <p style={{float: 'left',fontWeight: 'bold',marginBottom: 0}}>
                  Transactions
                </p>
              </CardHeader>
              <CardBody style={{padding:0}}>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">stt</th>
                      <th scope="col">người rút tiền</th>
                      <th scope="col">ngân hàng</th>
                      <th scope="col">ngày rút</th>
                      <th scope="col">số tiền rút</th>
                      <th scope="col">trạng thái</th>
                      <th scope="col">ngày xử lý</th>
                      <th scope="col">xử lý</th>
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
                      <td></td>
                    </tr>
                    {transactions.map((transaction, index) =>
                      <TransactionRow toggleModel={this.toggleModal} stt={index} key={index} transaction={transaction}/>
                    )}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={() => this.toggleModal(this.state.transactionActive)}>
                    Thêm địa điểm
                  </ModalHeader>
                  <ModalBody>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="success">
                      <i className="fa fa-check"></i> Hoàn thành
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index;
