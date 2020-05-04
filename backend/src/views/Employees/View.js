import axios from "axios";
import {Link} from "react-router-dom";
import React, { Component } from 'react';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';

import {authHeader} from "../../helpers/authHeaders";

function BankRow(props) {
  const stt = props.stt;
  const collaborator = props.bank;
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

function TransactionRow(props) {
  const stt = props.stt;
  const transaction = props.transaction;
  const transactionLink = `/collaborator/${transaction._id}`;

  const getBadge = (status) => {
    return status === 10 ? 'success' : 'danger'
  };

  const getStatusLabel = (status) => {
    return status === 10 ? 'Đang hoạt động' : 'Ngừng hoạt động'
  };

  return (
      <tr key={transaction._id}>
        <td>{stt+1}</td>
        <td><img src="https://ui-avatars.com/api/?size=50&name=V%C3%B5%20Thanh%20S%C6%A1n" alt=""/></td>
        <td><Link to={transactionLink}>{transaction.code}</Link></td>
        <td>{transaction.fullName}</td>
        <td>{transaction.phone}</td>
        <td>{transaction.email}</td>
        <td><Badge color={getBadge(transaction.status)}>{getStatusLabel(transaction.status)}</Badge></td>
      </tr>
  )
}

class View extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      hits: 0,
      profit: 0,
      revenue: 0,
      guestsBooked: 0,
      flights: [],
      transactions: [],
      collaborator: [],
      activeTab: new Array(4).fill('1')
    };
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  tabPane(hits, profit, revenue, gustBoooked,collaborator, flights, transactions) {

    const linkUpdate = `#/collaborator/${collaborator._id}/update`;
    const linkChangePassword = `#/collaborator/${collaborator._id}/change-password`;

    return (<>
      <TabPane tabId="1" style={{padding: 0}}>
        <div className="dashboardBox dashboardStatistic ovh dashboard-top">
          <div className="uln ovh pd0" style={{borderBottom: '1px solid #c8ced3'}}>
            <div className="row">
              <div className="col-md-3">
                <div className="c-callout total" style={{border: 'none'}}>
                  <label className="dash_icon">
                    <i className="nav-icon icon-diamond"></i>
                  </label>
                  <label className="dash_title">Doanh số</label>
                  <span className="number">
                    <span className="txt ng-binding">{profit}</span>
                  </span>
                  <span className="yesterday">Doanh thu thuần</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-callout return">
                  <label className="dash_icon">
                    <i className="nav-icon icon-plane"></i>
                  </label>
                  <label className="dash_title">Khách đặt</label>
                  <span className="number">
                    <span className="txt ng-binding">{gustBoooked}</span>
                  </span>
                  <span className="yesterday">Số lượng khách đặt</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-callout">
                  <label className="dash_icon">
                    <i className="nav-icon icon-share"></i>
                  </label>
                  <label className="dash_title">Lượt truy cập</label>
                  <span className="number">
                    <span className="txt ng-binding">{hits}</span>
                  </span>
                  <span className="yesterday">Số lượt truy cập vào</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-callout down">
                  <label className="dash_icon">
                    <i className="nav-icon icon-bag"></i>
                  </label>
                  <label className="dash_title">Hoa hồng</label>
                  <span className="number">
                    <span className="txt ng-binding">{revenue}</span>
                  </span>
                  <span className="yesterday">Tiền hoa hồng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-list row row-padding-15 mb15" style={{padding: '15px 20px',textAlign: 'left'}}>
          <div className="col-md-6 col-sm-6">
            <div className="chart">
              <canvas id="barChart" style={{height: '267px', width: '784px'}} height="534" width="1568"></canvas>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label className="form-label control-label">Mã CTV:</label>
                  <div className="form-wrap form-control-static">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" value={collaborator.code} disabled=""/>
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="nav-icon icon-docs"></i>
                          </span>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label control-label">Link chia sẻ:</label>
                  <div className="form-wrap form-control-static">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" value={collaborator.code} disabled/>
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="nav-icon icon-docs"></i>
                          </span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor=""><strong>QR CODE</strong></label>
                  <div className="form-wrap form-control-static" style={{textAlign: 'center'}}>
                    <img src="data:image/png;base64,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" alt="" style={{width: '115px'}}/>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">Họ và tên:</label>
                    <div className="form-wrap form-control-static">
                      <strong>{collaborator.fullName}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">
                      Số điện thoại:
                    </label>
                    <div className="form-wrap form-control-static payOrder">
                      {collaborator.phone}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">Email:</label>
                    <div className="form-wrap form-control-static payOrder">
                      {collaborator.email}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">Hoa hồng CTV:</label>
                    <div className="form-wrap form-control-static payOrder">
                      ₫<strong>{collaborator.commission}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">Chiết khấu KH:</label>
                    <div className="form-wrap form-control-static payOrder">
                      ₫<strong>{collaborator.discount}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label control-label">Trạng thái:</label>
                    <div className="form-wrap form-control-static payOrder">
                      <span className="badge badge-success">Hoạt động</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <br/>
          </div>
          <div className="col-md-12 col-sm-12" style={{textAlign: 'right'}}>
            <form action="/admin/collaborator/de-active/5e7bb53191354b79ba1c1664" method="post"
                  className="ng-pristine ng-valid">
              <a href={linkUpdate} className="btn btn-success btn-sm">
                <i className="nav-icon icon-check"></i>
                Cập nhật
              </a>
              <a href={linkChangePassword} className="btn btn-primary btn-sm" style={{margin: '0 5px'}}>
                <i className="nav-icon icon-key"></i>
                Đổi mật khẩu
              </a>
              <button type="submit" className="btn btn-danger btn-sm">
                <i className="nav-icon icon-lock"></i>
                Ngừng hoạt động
              </button>
            </form>
          </div>
        </div>
      </TabPane>
      <TabPane tabId="2">
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
          {flights.map((flight, index) =>
              <BankRow stt={index} key={index} flight={flight}/>
          )}
          </tbody>
        </Table>
      </TabPane>
      <TabPane tabId="3">
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
          {transactions.map((transaction, index) =>
              <TransactionRow stt={index} key={index} transaction={transaction}/>
          )}
          </tbody>
        </Table>
      </TabPane>
    </>);
  }

  componentDidMount(){
    axios.get("/api/admin/collaborator/"+this.props.match.params.id,{headers: authHeader()}).then(response => {
      this.setState({
        hits: response.data.hits,
        profit: response.data.profit,
        revenue: response.data.revenue,
        flights: response.data.flights,
        guestsBooked: response.data.guestsBooked,
        transactions: response.data.transactions,
        collaborator: response.data.collaborator
      });
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {

    const {hits, profit, revenue, guestsBooked, collaborator, flights, transactions, activeTab} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>{collaborator.fullName}</strong>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink active={activeTab[3] === '1'} onClick={() => { this.toggle(3, '1'); }}>
                      <i className="icon-info"></i> Thông tin cá nhân
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={activeTab[3] === '2'} onClick={() => { this.toggle(3, '2'); }}>
                      <i className="icon-bag"></i> Tài khoản ngân hàng
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={activeTab[3] === '3'} onClick={() => { this.toggle(3, '3'); }} >
                      <i className="icon-calendar"></i> Lịch sử giao dịch
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab[3]}>
                  {this.tabPane(hits, profit, revenue, guestsBooked, collaborator, flights, transactions)}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default View;