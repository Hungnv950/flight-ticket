import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { authenticationService } from '../../../services/authentication.service';

class Login extends Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }

    this.state = {
      username: String,
      password: String
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  };

  handleSubmit() {
    const { username, password } = this.state;

    authenticationService.login(username, password).then(() => {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      this.props.history.push(from);
    });
  };

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(ev) => this.handleChangeField('username', ev)}
                             value={username} placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(ev) => this.handleChangeField('password', ev)}
                             value={password} placeholder="Password" autoComplete="current-password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={this.handleSubmit} color="primary" className="px-4">Đăng nhập</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Quên mật khẩu?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;