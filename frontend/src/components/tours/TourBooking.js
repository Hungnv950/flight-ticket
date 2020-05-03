import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { imagesUrl } from '../../constants/path'
import LuggageDropdown from '../LuggageDropdown';
import {selectTourAction} from "../../actions/tour.action";

class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fare: [],
            luggage: 0,
            logged: true,
            fullName:'',
            phone: '',
            email: '',
            gender: 0,
            exportInvoice: false,
            company:{
                name: '',
                mst: '',
                address: '',
                invoiceRecipient: ''
            },
            luggageGo:{
                title: 'Không, cảm ơn',
                cost: 0
            },
            luggageTo:{
                title: 'Không, cảm ơn',
                cost: 0
            },
            otherRequirements: '',
            passengers: [],
            luggage_money: 0,
            hasPassenger: false,
            is_return: this.props.is_return
        }

        this.addPassenger = this.addPassenger.bind(this);
        this.hasPassenger = this.hasPassenger.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeObjectField = this.handleChangeObjectField.bind(this);
        this.handleChangePassengerDetail = this.handleChangePassengerDetail.bind(this);
    }

    handleChangeObjectField(key, event) {
        const keyArray = key.split('.');

        const value = event.target.value;

        this.setState(prevState => ({
            [keyArray[0]]: {
                ...prevState[keyArray[0]],
                [keyArray[1]]:  value
            }
        }));
    };

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

    handleChangePassengerDetail(index,key,event){
        const value = event.target.value;

        let passengers = this.state.passengers;

        passengers[index][key] = value;

        this.setState({
            passengers: passengers
        });
    }

    componentDidMount() {
        if (_.isEmpty(this.props.tour)) {
            let id = this.props.match.params.id;
            this.props.getTour(id).then(() => {});
        }
    }

    onSelectLuggage(item) {
        this.setState({
            luggage: item.value,
            luggage_money: item.price
        })
    }

    hasPassenger(){
        let passengers = [];

        console.log(this.state.hasPassenger);

        if(!this.state.hasPassenger){
            passengers.push({id: 0, gender: 0,firstName: '', lastName:''});
        }

        this.setState({
            passengers: passengers,
            hasPassenger: !this.state.hasPassenger
        });
    }

    addPassenger(){
        let id = this.state.passengers.length + 1;
        let passenger = {id: id,gender: 0,firstName: '', lastName:''};

        this.setState(prevState => ({
            ...prevState.passengers,
            passengers:  [...prevState.passengers, passenger]
        }));
    }

    handleSubmitForm(){
        const { fullName, gender, phone, email, otherRequirements, company, exportInvoice } = this.state;

        let that = this;

        let schedule = this.props.match.params.id;

        const paramsBody = {
            phone,
            email,
            gender,
            company,
            fullName,
            schedule,
            exportInvoice,
            otherRequirements
        };

        axios.post('/api/v1/booking/create', paramsBody).then(response => {
            that.setState({
                loading: false
            });

            this.props.history.push('/tour/'+response.data._id+'/preview');
        });
    }

    render() {
        const { schedule } = this.props;

        const tour = schedule.tour;

        const { fullName, gender, phone, email, otherRequirements, company, exportInvoice, logged, passengers } = this.state;

        let fare = this.state.fare;

        function formatNumber(num) {
            if (num === undefined) num = 0;

            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }

        function formatDate(date,full) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            if(full){
                let dt = new Date(date);

                let dayOfWeek = dt.getDay();

                return (dayOfWeek === 0 ? 'CN': 'Thứ '+(dayOfWeek+1))+', ngày '+day+', tháng '+month+', '+year;
            }

            return [day, month, year].join('/');
        }

        return (
            <div>
                {!('tour' in schedule) ? (
                    <div>Loading...</div>
                ) : (
                    <main className="main main--phone-821">
                        <div className="step">
                            <div className="step__wrap">
                                <div className="step__item active current">
                                    <div className="step__number">1</div>
                                    <span className="step__title">Đặt chỗ</span>
                                </div>
                                <div className="step__wire">
                                    <div className="step__wire-line"/>
                                </div>
                                <div className="step__item">
                                    <div className="step__number">2</div>
                                    <span className="step__title">Thanh toán</span>
                                </div>
                                <div className="step__wire">
                                    <div className="step__wire-line"/>
                                </div>
                                <div className="step__item">
                                    <div className="step__number">3</div>
                                    <span className="step__title">Chờ xử lý</span>
                                </div>
                                <div className="step__wire">
                                    <div className="step__wire-line"/>
                                </div>
                                <div className="step__item">
                                    <div className="step__number">4</div>
                                    <span className="step__title">Phát hành vé điện tử</span>
                                </div>
                                <svg className="step__tree1 gray active" xmlns="http://www.w3.org/2000/svg" width={38}
                                     height={42} viewBox="0 0 38 42">
                                    <defs>
                                        <linearGradient id="h65ja" x1="19.13" x2="19.13" y1=".2" y2="41.86"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#919191"/>
                                            <stop offset={1} stopColor="#919191"/>
                                        </linearGradient>
                                    </defs>
                                    <g>
                                        <g>
                                            <path fill="url(#h65ja)"
                                                  d="M20.583 29.346c-1.437.399-.577-2.577-.165-4.3.298-.11.586-.24.86-.396a6.08 6.08 0 0 0 1.519 3.285c-.7.622-1.506 1.214-2.214 1.41zm-2.64-1.224c-.62.113-1.678-1.8-2.43-3.355.833.425 1.773.67 2.772.67.257 0 .509-.022.757-.053-.193 1.245-.533 2.635-1.098 2.738zm-4.488-1.553a6.141 6.141 0 0 0 1.216-1.621l1.2 2.514s-.654.289-2.416-.893zm22.818-14.032c0-3.16-2.399-5.76-5.475-6.08a6.11 6.11 0 0 0-5.728-3.991 6.074 6.074 0 0 0-3.143.877A6.109 6.109 0 0 0 16.59.204a6.11 6.11 0 0 0-6.03 5.14c-.248-.03-.499-.05-.755-.05a6.114 6.114 0 0 0-6.114 6.113c0 .165.012.327.025.49a6.103 6.103 0 0 0-.573 9.921c-.006.11-.017.22-.017.331a6.114 6.114 0 0 0 6.114 6.114c1.012 0 1.964-.25 2.804-.684 1.165.836 2.832 1.882 3.64 1.674 0 0 .3 4.653.235 5.834-.123 2.248-.798 4.75-1.272 6.776h7.35s-1.083-4.515-1.13-6.022c-.048-1.508.47-4.284.47-4.284l2.55-2.638a6.074 6.074 0 0 0 3.446 1.053 6.12 6.12 0 0 0 6.08-5.481 6.118 6.118 0 0 0 3.992-5.734 6.084 6.084 0 0 0-1.537-4.044 6.093 6.093 0 0 0 .406-2.176z"/>
                                        </g>
                                    </g>
                                </svg>
                                <svg className="step__tree1 orange" xmlns="http://www.w3.org/2000/svg" width={38} height={42}
                                     viewBox="0 0 38 42">
                                    <defs>
                                        <linearGradient id="h66ja" x1="19.13" x2="19.13" y1=".2" y2="41.86" gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffa700"/>
                                            <stop offset={1} stopColor="#ef5e03"/>
                                        </linearGradient>
                                    </defs>
                                    <g>
                                        <g>
                                            <path fill="url(#h66ja)"
                                                  d="M20.583 29.346c-1.437.399-.577-2.577-.165-4.3.298-.11.586-.24.86-.396a6.08 6.08 0 0 0 1.519 3.285c-.7.622-1.506 1.214-2.214 1.41zm-2.64-1.224c-.62.113-1.678-1.8-2.43-3.355.833.425 1.773.67 2.772.67.257 0 .509-.022.757-.053-.193 1.245-.533 2.635-1.098 2.738zm-4.488-1.553a6.141 6.141 0 0 0 1.216-1.621l1.2 2.514s-.654.289-2.416-.893zm22.818-14.032c0-3.16-2.399-5.76-5.475-6.08a6.11 6.11 0 0 0-5.728-3.991 6.074 6.074 0 0 0-3.143.877A6.109 6.109 0 0 0 16.59.204a6.11 6.11 0 0 0-6.03 5.14c-.248-.03-.499-.05-.755-.05a6.114 6.114 0 0 0-6.114 6.113c0 .165.012.327.025.49a6.103 6.103 0 0 0-.573 9.921c-.006.11-.017.22-.017.331a6.114 6.114 0 0 0 6.114 6.114c1.012 0 1.964-.25 2.804-.684 1.165.836 2.832 1.882 3.64 1.674 0 0 .3 4.653.235 5.834-.123 2.248-.798 4.75-1.272 6.776h7.35s-1.083-4.515-1.13-6.022c-.048-1.508.47-4.284.47-4.284l2.55-2.638a6.074 6.074 0 0 0 3.446 1.053 6.12 6.12 0 0 0 6.08-5.481 6.118 6.118 0 0 0 3.992-5.734 6.084 6.084 0 0 0-1.537-4.044 6.093 6.093 0 0 0 .406-2.176z"/>
                                        </g>
                                    </g>
                                </svg>
                                <svg className="step__tree2 gray active" xmlns="http://www.w3.org/2000/svg" width={25}
                                     height={35} viewBox="0 0 25 35">
                                    <g>
                                        <g>
                                            <g>
                                                <path fill="#919191"
                                                      d="M22.577 12.58a6.273 6.273 0 0 0 1.175-3.657 6.309 6.309 0 0 0-6.308-6.309c-.052 0-.102.007-.153.008a6.025 6.025 0 0 0-5.059-2.75A6.032 6.032 0 0 0 6.72 3.456C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.744-.12l.185-1.902a7.68 7.68 0 0 0 9.61-11.602z"/>
                                            </g>
                                            <g>
                                                <path fill="#919191"
                                                      d="M12.78 23.316c-.88.228-1.854.22-2.896-.272-1.41-.666-2.433-2.02-2.572-3.575a4.387 4.387 0 0 1 .192-1.738.543.543 0 0 0-.192-.58A6.014 6.014 0 0 1 5.1 12.489a6.028 6.028 0 0 1 3.536-5.487.552.552 0 0 0 .333-.553 5.392 5.392 0 0 1-.029-.544 6.032 6.032 0 0 1 4.657-5.87 6.017 6.017 0 0 0-1.365-.164A6.032 6.032 0 0 0 6.72 3.457C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.743-.12V23.316z"/>
                                            </g>
                                            <g>
                                                <path fill="#919191"
                                                      d="M11.683 23.46l-.052-.002-.496 10.425h3.291l-.485-10.2c-.018-.366-.384-.63-.726-.5-.477.178-.992.277-1.532.277z"/>
                                            </g>
                                            <g>
                                                <path fill="#919191"
                                                      d="M13.94 23.682c-.017-.365-.383-.629-.725-.5-.477.18-.992.278-1.532.278l-.052-.002-.496 10.426h1.646v-8.931c0-.236.15-.446.375-.52l.807-.27z"/>
                                            </g>
                                            <g>
                                                <path fill="#919191"
                                                      d="M15.524 34.432h-5.486a.548.548 0 1 1 0-1.097h5.486a.548.548 0 1 1 0 1.097z"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg className="step__tree2 orange" xmlns="http://www.w3.org/2000/svg" width={25} height={35}
                                     viewBox="0 0 25 35">
                                    <defs>
                                        <linearGradient id="al19a" x1="12.24" x2="12.24" y1="-.13" y2="26.2"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffe200"/>
                                            <stop offset={1} stopColor="#ff6200"/>
                                        </linearGradient>
                                        <linearGradient id="al19b" x1="6.89" x2="6.89" y1="-.13" y2="26.2"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffe200"/>
                                            <stop offset={1} stopColor="#ff6200"/>
                                        </linearGradient>
                                        <linearGradient id="al19c" x1="12.79" x2="12.79" y1="23.15" y2="33.88"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffe200"/>
                                            <stop offset={1} stopColor="#ff6200"/>
                                        </linearGradient>
                                        <linearGradient id="al19d" x1="12.56" x2="12.56" y1="23.15" y2="33.88"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffe200"/>
                                            <stop offset={1} stopColor="#ff6200"/>
                                        </linearGradient>
                                        <linearGradient id="al19e" x1="12.79" x2="12.79" y1="33.33" y2="34.43"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset={0} stopColor="#ffe200"/>
                                            <stop offset={1} stopColor="#ff6200"/>
                                        </linearGradient>
                                    </defs>
                                    <g>
                                        <g>
                                            <g>
                                                <path fill="url(#al19a)"
                                                      d="M22.577 12.58a6.273 6.273 0 0 0 1.175-3.657 6.309 6.309 0 0 0-6.308-6.309c-.052 0-.102.007-.153.008a6.025 6.025 0 0 0-5.059-2.75A6.032 6.032 0 0 0 6.72 3.456C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.744-.12l.185-1.902a7.68 7.68 0 0 0 9.61-11.602z"/>
                                            </g>
                                            <g>
                                                <path fill="url(#al19b)"
                                                      d="M12.78 23.316c-.88.228-1.854.22-2.896-.272-1.41-.666-2.433-2.02-2.572-3.575a4.387 4.387 0 0 1 .192-1.738.543.543 0 0 0-.192-.58A6.014 6.014 0 0 1 5.1 12.489a6.028 6.028 0 0 1 3.536-5.487.552.552 0 0 0 .333-.553 5.392 5.392 0 0 1-.029-.544 6.032 6.032 0 0 1 4.657-5.87 6.017 6.017 0 0 0-1.365-.164A6.032 6.032 0 0 0 6.72 3.457C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.743-.12V23.316z"/>
                                            </g>
                                            <g>
                                                <path fill="url(#al19c)"
                                                      d="M11.683 23.46l-.052-.002-.496 10.425h3.291l-.485-10.2c-.018-.366-.384-.63-.726-.5-.477.178-.992.277-1.532.277z"/>
                                            </g>
                                            <g>
                                                <path fill="url(#al19d)"
                                                      d="M13.94 23.682c-.017-.365-.383-.629-.725-.5-.477.18-.992.278-1.532.278l-.052-.002-.496 10.426h1.646v-8.931c0-.236.15-.446.375-.52l.807-.27z"/>
                                            </g>
                                            <g>
                                                <path fill="url(#al19e)"
                                                      d="M15.524 34.432h-5.486a.548.548 0 1 1 0-1.097h5.486a.548.548 0 1 1 0 1.097z"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="book-ticket">
                            <div className="container container-small">
                                <div className="row row-small">
                                    <div className="col-12 col-lg-8 col-small">
                                        <div style={{display: !logged ? 'inline-flex' : 'none'}} className="recommend-regis">
                                            <img src={imagesUrl + "gift.png"} alt="flight"/>
                                            <p className="recommend-regis__content">
                                                Bạn chưa là thành viên.<br/>Vui lòng&nbsp;<a href="# ">đăng nhập</a>&nbsp;hoặc&nbsp;<a href="# ">đăng kí</a>&nbsp;tài khoản
                                                để hưởng các ưu đãi đặc biệt cho thành viên từ ThankTrip
                                            </p>
                                        </div>
                                        <div className="card info-contact">
                                            <h2 className="card__title mbpx-30">THÔNG TIN LIÊN HỆ</h2>
                                            <div className="card__content">
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-title required">Danh xưng</label>
                                                            <select className="form-control" onChange={(ev) => this.handleChangeField('gender',ev)}
                                                                    value={gender}>
                                                                <option value="0">Quý Ông</option>
                                                                <option value="1">Quý Bà</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-title required">Họ và Tên</label>
                                                            <input className="form-control" type="text" onChange={(ev) => this.handleChangeField('fullName',ev)}
                                                                   value={fullName} placeholder="Vui lòng nhập họ và tên"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-title required">Số điện thoại</label>
                                                            <input className="form-control" type="text" onChange={(ev) => this.handleChangeField('phone',ev)}
                                                                   value={phone} placeholder="Vui lòng nhập Số điện thoại"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-title required">Địa chỉ email</label>
                                                            <input className="form-control" type="email" onChange={(ev) => this.handleChangeField('email',ev)}
                                                                   value={email} placeholder="Vui lòng nhập email"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-title">Yêu cầu đặc biệt khác</label>
                                                    <textarea className="form-control form-control--textarea" onChange={(ev) => this.handleChangeField('otherRequirements',ev)}
                                                              value={otherRequirements} placeholder="Vui lòng nhập yêu cầu của bạn nếu có" defaultValue={""}/>
                                                </div>
                                                <div className="regis-get-bill">
                                                    <div className="checkbox">
                                                        <input id="bill" type="checkbox" onChange={(ev) => this.handleChangeField('exportInvoice',ev)}
                                                               value={exportInvoice}/>
                                                        <label htmlFor="bill">Tôi muốn xuất hoá đơn</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-title required">Tên Công Ty</label>
                                                                <input className="form-control" type="text" onChange={(ev) => this.handleChangeObjectField('company.name',ev)}
                                                                       value={company.name}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-title required">Mã Số Thuế</label>
                                                                <input className="form-control" type="text" onChange={(ev) => this.handleChangeObjectField('company.mst',ev)}
                                                                       value={company.mst}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-title required">Địa chỉ</label>
                                                                <input className="form-control" type="text" onChange={(ev) => this.handleChangeObjectField('company.address',ev)}
                                                                       value={company.address}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-title required">Người Nhận Hoá
                                                                    Đơn</label>
                                                                <input className="form-control" type="text" onChange={(ev) => this.handleChangeObjectField('company.invoiceRecipient',ev)}
                                                                       value={company.invoiceRecipient}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card passenger">
                                            <h2 className="card__title text-uppercase">DANH SÁCH KHÁCH HÀNG</h2>
                                            <div className="add-passenger">
                                                <div className="switch">
                                                    <input onChange={this.hasPassenger} checked={this.state.hasPassenger} className="switch__control" type="checkbox" id="st"/>
                                                    <label className="switch__content" htmlFor="st">
                                                        <span className="title">Bổ sung thêm thông tin thành viên</span>
                                                        <span className="note">Bạn có thể bổ sung sau khi đặt tour hoàn tất</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="card__content">
                                                {passengers.map((passenger,index) =>
                                                    <div key={'passenger-'+index}>
                                                        <div className="separator-round">
                                                            <svg className="separator-round__left" xmlns="http://www.w3.org/2000/svg"
                                                                 width="25" height="49" viewBox="0 0 25 49">
                                                                <g>
                                                                    <g>
                                                                        <path fill="#f5f5f5"
                                                                              d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <div className="separator-round__dashed"></div>
                                                            <svg className="separator-round__right" xmlns="http://www.w3.org/2000/svg"
                                                                 width="24" height="49" viewBox="0 0 24 49">
                                                                <g>
                                                                    <g>
                                                                        <path fill="#f5f5f5"
                                                                              d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="passenger__item">
                                                            <p className="passenger__title">Khách hàng thứ {index+1}</p>
                                                            <div className="passenger__row">
                                                                <div className="passenger__col-6">
                                                                    <div className="passenger__row-sm">
                                                                        <div className="form-group">
                                                                            <label className="form-title required">Danh xưng</label>
                                                                            <select className="form-control" onChange={(ev) => this.handleChangePassengerDetail(index,'gender',ev)}
                                                                                    value={passenger.gender}>
                                                                                <option value="0">Quý Ông</option>
                                                                                <option value="1">Quý Bà</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="form-title required">Họ</label>
                                                                            <input className="form-control text-uppercase" type="text" onChange={(ev) => this.handleChangePassengerDetail(index,'firstName',ev)}
                                                                                   value={passenger.firstName}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="passenger__col-6">
                                                                    <div className="form-group">
                                                                        <label className="form-title required">Tên và tên đệm</label>
                                                                        <input className="text-uppercase form-control" type="text" onChange={(ev) => this.handleChangePassengerDetail(index,'lastName',ev)}
                                                                               value={passenger.lastName}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div style={{display: this.state.hasPassenger ? 'block' : 'none'}}>
                                                    <div className="separator-round">
                                                        <svg className="separator-round__left" xmlns="http://www.w3.org/2000/svg"
                                                             width="25" height="49" viewBox="0 0 25 49">
                                                            <g>
                                                                <g>
                                                                    <path fill="#f5f5f5"
                                                                          d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <div className="separator-round__dashed"></div>
                                                        <svg className="separator-round__right" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="49" viewBox="0 0 24 49">
                                                            <g>
                                                                <g>
                                                                    <path fill="#f5f5f5"
                                                                          d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="passenger__item" style={{textAlign: 'center'}}>
                                                        <button onClick={this.addPassenger}>
                                                            <i className="fa fa-plus"></i>
                                                            Thêm thành viên
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card passenger">
                                            <div className="regis-luggage">
                                                <p className="regis-luggage__title">Mua hành lý kí gửi</p>
                                                <div className="regis-luggage__content">
                                                    <div className="regis-luggage__item">
                                                        <label className="regis-luggage__item-title">Chiều Đi</label>
                                                        <LuggageDropdown onSelectLuggage={this.onSelectLuggage.bind(this)}/>
                                                    </div>
                                                    <div className="regis-luggage__item">
                                                        <label className="regis-luggage__item-title">Chiều Về</label>
                                                        <LuggageDropdown onSelectLuggage={this.onSelectLuggage.bind(this)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 col-small">
                                        <div className="card card-trip-info">
                                            <h2 className="card__title">THÔNG TIN CHUYẾN ĐI</h2>
                                            <div className="card__content">
                                                <div className="trip__thumbnail bg-img-base js-lazy-load" style={{backgroundImage: 'url('+tour.avatar+')'}}></div>
                                                <p className="trip__date">
                                                    {formatDate(schedule.departureDay,true)}
                                                </p>
                                                <h3 className="trip__title">
                                                    {tour.title}
                                                </h3>
                                                <div className="trip__rating">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7"
                                                         viewBox="0 0 8 7">
                                                        <g>
                                                            <g>
                                                                <path fill="#ff4827"
                                                                      d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7"
                                                         viewBox="0 0 8 7">
                                                        <g>
                                                            <g>
                                                                <path fill="#ff4827"
                                                                      d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7"
                                                         viewBox="0 0 8 7">
                                                        <g>
                                                            <g>
                                                                <path fill="#ff4827"
                                                                      d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7"
                                                         viewBox="0 0 8 7">
                                                        <g>
                                                            <g>
                                                                <path fill="#ff4827"
                                                                      d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7"
                                                         viewBox="0 0 8 7">
                                                        <g>
                                                            <g>
                                                                <path fill="#e2e2e2"
                                                                      d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="trip__days-left">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="calendar_1_"
                                                             data-name="calendar(1)" width="15.946" height="15.946"
                                                             viewBox="0 0 15.946 15.946">
                                                            <g id="Group_451" data-name="Group 451">
                                                                <g id="Group_450" data-name="Group 450">
                                                                    <circle id="Ellipse_6" data-name="Ellipse 6" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(11.399 5.918)"
                                                                            fill="#878181"></circle>
                                                                    <path id="Path_387" data-name="Path 387"
                                                                          d="M13.455,1.246h-.81V.623a.623.623,0,0,0-1.246,0v.623H8.565V.623a.623.623,0,1,0-1.246,0v.623h-2.8V.623a.623.623,0,1,0-1.246,0v.623H2.492A2.494,2.494,0,0,0,0,3.737v9.717a2.494,2.494,0,0,0,2.492,2.492H7.257a.623.623,0,0,0,0-1.246H2.492a1.247,1.247,0,0,1-1.246-1.246V3.737A1.247,1.247,0,0,1,2.492,2.492H3.27v.623a.623.623,0,1,0,1.246,0V2.492h2.8v.623a.623.623,0,1,0,1.246,0V2.492H11.4v.623a.623.623,0,0,0,1.246,0V2.492h.81A1.247,1.247,0,0,1,14.7,3.737V7.288a.623.623,0,0,0,1.246,0V3.737A2.494,2.494,0,0,0,13.455,1.246Z"
                                                                          fill="#878181"></path>
                                                                    <path id="Path_388" data-name="Path 388"
                                                                          d="M273.769,270a3.769,3.769,0,1,0,3.769,3.769A3.773,3.773,0,0,0,273.769,270Zm0,6.291a2.523,2.523,0,1,1,2.523-2.523A2.526,2.526,0,0,1,273.769,276.291Z"
                                                                          transform="translate(-261.591 -261.591)"
                                                                          fill="#878181"></path>
                                                                    <path id="Path_389" data-name="Path 389"
                                                                          d="M372.526,331.277h-.28v-.654a.623.623,0,1,0-1.246,0V331.9a.623.623,0,0,0,.623.623h.9a.623.623,0,1,0,0-1.246Z"
                                                                          transform="translate(-359.445 -319.722)"
                                                                          fill="#878181"></path>
                                                                    <circle id="Ellipse_7" data-name="Ellipse 7" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(8.689 5.918)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_8" data-name="Ellipse 8" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(5.98 8.627)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_9" data-name="Ellipse 9" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(3.27 5.918)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(3.27 8.627)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_11" data-name="Ellipse 11" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(3.27 11.337)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_12" data-name="Ellipse 12" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(5.98 11.337)"
                                                                            fill="#878181"></circle>
                                                                    <circle id="Ellipse_13" data-name="Ellipse 13" cx="0.623"
                                                                            cy="0.623" r="0.623"
                                                                            transform="translate(5.98 5.918)"
                                                                            fill="#878181"></circle>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <span>{tour.estimateDays} ngày</span>
                                                    </div>
                                                    <span className="trip__price">{formatNumber(tour.basePrice)} đ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card compendious">
                                            <p className="card__title">Tóm tắt</p>
                                            <div className="compendious__wrap">
                                                <div className="form-control">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="number-passenger active"><span
                                                            className="number-passenger__content">{0}</span><span
                                                            className="number-passenger__title">người lớn</span></div>
                                                        <span className="price">{0}đ</span>
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="number-passenger active"><span
                                                            className="number-passenger__content">{0}</span><span
                                                            className="number-passenger__title">trẻ em 2 - 11 tuổi</span></div>
                                                        <span className="price">{0}đ</span>
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="number-passenger active"><span
                                                            className="number-passenger__content">{fare.Inf}</span><span
                                                            className="number-passenger__title">trẻ em &lt; 2 tuổi</span>
                                                        </div>
                                                        <span className="price">{0}đ</span>
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="luggage active"><span
                                                            className="luggage__number">{0}</span><span
                                                            className="luggage__title">hành lý kí gửi</span></div>
                                                        <span className="price">{0}đ</span>
                                                    </div>
                                                </div>
                                                <div className="compendious__total">
                                                    <span className="compendious__total-title">Tổng tiền</span>
                                                    <div className="compendious__total-price"><span
                                                        className="price">{0} đ</span><span className="note">(Đã bao gồm thuế và phí)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card submit">
                                            <input className="form-control border introduce" type="text"
                                                   placeholder="ID giới thiệu"/>
                                            <button className="submit__btn btn btn--large btn--bg-linear" onClick={this.handleSubmitForm}>
                                                <span>Tiếp theo</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13}
                                                     viewBox="0 0 8 13">
                                                    <g>
                                                        <g>
                                                            <path fill="#fff"
                                                                  d="M7.042 7.045l-5.153 5.152a.839.839 0 1 1-1.186-1.186l4.559-4.56-4.56-4.558A.84.84 0 0 1 1.89.707l5.152 5.152a.836.836 0 0 1 0 1.186z"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                            <p className="introduce-note">
                                                Nhập ID người giới thiệu để tiết kiệm ngay&nbsp;
                                                <br/>
                                                <span className="text-blue-sky font-weight-bold">
                                            30.000đ
                                        </span>
                                                &nbsp;cho chuyến đi này.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTour: (id) => selectTourAction(dispatch, id)
    }
}

const mapStateToProps = (state) => ({
    fare: state.booking.fareData,
    schedule: state.tour.tour,
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);