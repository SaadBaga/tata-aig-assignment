import React, { Fragment } from 'react'
import { Input, Row, Col, InputNumber, Button, Select, message } from 'antd';
import validator from 'validator';
// import nookies from 'nookies';
import _ from 'lodash';
import config from '../config/index'
import cookies from 'next-cookies';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnSubmit: false,
    }
  }

  static async getInitialProps(req) {
    const { apiToken } = cookies(req);
    return {
      isLogin: _.isEmpty(apiToken) ? false : true
    }
  }
  componentDidMount() {
    // this.props.isLogin ? window.location.href = "/meal/list" : ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = this.state;

    if (!data.email) {
      message.error('Please Enter Email', 7);
      return;
    }
    if (!validator.isEmail(data.email)) {
      message.error('Please Enter Valid Email', 7);
      return;
    }
    if (!data.password) {
      message.error('Please Enter Password', 7);
      return;
    }

    this.setState({ btnSubmit: true });
    const loginApiResponse = await checkLogin(data);

    if (loginApiResponse && loginApiResponse.data && loginApiResponse.data.isSugatiSucess === 1) {
      nookies.set({}, 'apiToken', loginApiResponse.data.userResult.apiToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      window.location = `${config.CMS_URL}/city/add`;
    } else {
      message.error("Improper Credentials", 7)
      await this.setState({ btnSubmit: false });
      window.location.href = '/';
    }
    // if (loginApiResponse && loginApiResponse.message) {
    //     await this.setState({btnSubmit:false});
    //     message.success(loginApiResponse.message, 7);
    // } else {
    //     await this.setState({btnSubmit:false});
    //     message.error("Some Error occurred", 7)
    // }
  }

  render() {
    return (
      <div className="py-12 bg-light-grey">
        <Row>
          <Col span={8} xs={22} sm={22} md={8}></Col>
          <Col span={8} xs={22} sm={22} md={8}>
            <Row className="mb-10">
              <Col span={24}>
                <div className="custom-font font-bold text-4xl leading-tight text-navy flex justify-center py-4">
                  Tata AIG Assignment
                </div>
              </Col>
              <Col offset={2} span={16}>
                <div className="custom-font font-bold text-2xl leading-tight text-navy">
                  Log in to your account
                </div>
              </Col>

              <Col offset={2} span={20}>
                <div className="py-6">
                  <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">EMAIL ID</div>
                  <Input
                    name='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                    className='custom-font text-steel bg-pale-grey font-bold'
                    size="large"
                    type="email"
                    placeholder="user email"
                  />
                </div>
              </Col>
              <Col offset={2} span={20}>
                <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">PASSWORD</div>
                <div>
                  <Input.Password
                    name='password'
                    onChange={this.handleChange}
                    className='brandon-font text-steel bg-pale-grey font-bold'
                    size="large"
                    type="password"
                    placeholder="user password"
                  />
                </div>
              </Col>
              <Col offset={2} span={20}>
                <div className="py-6">
                  <Button loading={this.state.btnSubmit} onClick={this.handleSubmit} type="primary" >Submit</Button>
                </div>
              </Col>
              <Col offset={2} span={20}>
                <div className="py-6">
                  <span className="custom-font text-lg font-medium leading-tight text-navy">Don’t have an account? </span>
                  <span className="custom-font text-lg font-medium leading-tight text-teal-blue cursor-pointer"><a href="/register">Sign up!</a></span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={8} xs={22} sm={22} md={8}></Col>
        </Row>

      </div>
    )
  }
}

export default Login;