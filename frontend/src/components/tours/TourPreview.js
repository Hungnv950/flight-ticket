import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { imagesUrl } from '../../constants/path'
import LuggageDropdown from '../LuggageDropdown';
import {selectTourAction} from "../../actions/tour.action";
import {SELECT_TOUR} from "../../constants/tour.constants";

class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            booking: {}
        }

        this.addPassenger = this.addPassenger.bind(this);
        this.hasPassenger = this.hasPassenger.bind(this);
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
        let id = this.props.match.params.id;

        axios.get('/api/v1/booking/' + id)
            .then((result) => {
                this.setState({
                    booking: result.data
                })
            }).catch(error => console.log(error));
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

    render() {
        const { booking } = this.state;

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
                {!('fullName' in booking) ? (
                    <div>Loading...</div>
                ) : (
                    <main className="main main--phone-821">
                        <div className="step">
                            <div className="step__wrap">
                                <div className="step__item active">
                                    <div className="step__number">1</div>
                                    <span className="step__title">Đặt chỗ</span>
                                </div>
                                <div className="step__wire">
                                    <div className="step__wire-line active"/>
                                </div>
                                <div className="step__item active current">
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
                                <svg className="step__tree1 orange active" xmlns="http://www.w3.org/2000/svg" width={38} height={42}
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
                                <div className="row row-custom">
                                    <div className="col-12 col-lg-8 col-custom">
                                        <div className="pay-status">
                                            <div className="pay-status__code">
                                                <p className="title">MÃ ĐƠN HÀNG</p>
                                                <p className="code">THANKTRIP21903</p>
                                            </div>
                                            <div className="pay-status__content">
                                                <p className="title">Đặt Giữ Chỗ</p>
                                                <p className="content">Chưa Thanh Toán</p>
                                            </div>
                                            <p className="pay-status__note">Vui lòng thanh toán trước&nbsp;<span
                                                className="text-orange-medium font-weight-bold">15:30</span>&nbsp;ngày&nbsp;
                                                <span
                                                    className="text-orange-medium font-weight-bold">15/9/2020</span>&nbsp;,
                                                sau thời gian trên&nbsp;<strong>Mã giữ chỗ&nbsp;</strong>sẽ bị huỷ</p>
                                        </div>
                                        <div className="contact-passenger card">
                                            <h2 className="card__title">THÔNG TIN LIÊN HỆ KHÁCH HÀNG</h2>
                                            <div className="card__content">
                                                <div className="contact-passenger__main">
                                                    <div className="name">
                                                        <p className="sex">
                                                            Ông:&nbsp;</p>
                                                        <p className="full-name">
                                                            {booking.fullName}
                                                        </p>
                                                    </div>
                                                    <div className="tell">
                                                        <p className="tell__title">SĐT:&nbsp;</p>
                                                        <p className="tell__content">
                                                            {booking.phone}
                                                        </p>
                                                    </div>
                                                    <div className="mail">
                                                        <p className="mail__title">Mail:&nbsp;</p>
                                                        <p className="mail__content">
                                                            {booking.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="separator-round">
                                                <svg className="separator-round__left"
                                                     xmlns="http://www.w3.org/2000/svg" width="25" height="49"
                                                     viewBox="0 0 25 49">
                                                    <g>
                                                        <g>
                                                            <path fill="#f5f5f5"
                                                                  d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <div className="separator-round__dashed"></div>
                                                <svg className="separator-round__right"
                                                     xmlns="http://www.w3.org/2000/svg" width="24" height="49"
                                                     viewBox="0 0 24 49">
                                                    <g>
                                                        <g>
                                                            <path fill="#f5f5f5"
                                                                  d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <h2 className="card__title mt-2">THÔNG TIN KHÁCH HÀNG VÀ CHUYẾN ĐI</h2>
                                            <div className="card__content">
                                                <table className="contact-passenger__table">
                                                    <thead>
                                                    <tr>
                                                        <th className="stt">STT</th>
                                                        <th className="fullname">Họ và Tên</th>
                                                        <th className="text-right">Giá vé</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="pl-2">1</td>
                                                        <td className="text-uppercase">VÕ THANH SƠN</td>
                                                        <td className="price">1.500.000đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-2">2</td>
                                                        <td className="text-uppercase">NGUYỄN HỒNG NHUNG</td>
                                                        <td className="price">1.500.000đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-2">3</td>
                                                        <td>15kg hành lý kí gửi</td>
                                                        <td className="price">200.000đ</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="total-pay">
                                                <div>
                                                    <p className="total-pay__title">Tổng tiền thanh toán</p>
                                                    <p className="total-pay__note">(Đã bao gồm thuế và phí)</p>
                                                </div>
                                                <p className="total-pay__price">3.170.000đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 col-custom">
                                        <div className="js-block-countdown" style={{width: '365.328px'}}>
                                            <div className="card pay-countdown">
                                                <p className="pay-countdown__title">
                                                    Thời gian thanh toán còn lại<br/>(theo phút)
                                                </p>
                                                <div className="countdown">
                                                    <div className="bloc-time min" data-init-value="120">
                                                        <div className="figure min min-1"><span className="top">1</span><span
                                                            className="top-back"><span>1</span></span><span
                                                            className="bottom">1</span><span
                                                            className="bottom-back"><span>1</span></span>
                                                            <div className="separator-round">
                                                                <svg className="separator-round__left"
                                                                     xmlns="http://www.w3.org/2000/svg" width="25"
                                                                     height="49" viewBox="0 0 25 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div className="separator-round__dashed"></div>
                                                                <svg className="separator-round__right"
                                                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="49" viewBox="0 0 24 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="figure min min-2">
                                                            <span className="top" style={{transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'}}>1</span>
                                                            <span className="top-back"><span>1</span></span><span
                                                            className="bottom">1</span><span
                                                            className="bottom-back"><span>1</span></span>
                                                            <div className="separator-round">
                                                                <svg className="separator-round__left"
                                                                     xmlns="http://www.w3.org/2000/svg" width="25"
                                                                     height="49" viewBox="0 0 25 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div className="separator-round__dashed"></div>
                                                                <svg className="separator-round__right"
                                                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="49" viewBox="0 0 24 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="figure min min-3">
                                                            <span className="top" style={{transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'}}>5</span><span
                                                            className="top-back"><span>5</span></span><span
                                                            className="bottom">5</span><span
                                                            className="bottom-back"><span>5</span></span>
                                                            <div className="separator-round">
                                                                <svg className="separator-round__left"
                                                                     xmlns="http://www.w3.org/2000/svg" width="25"
                                                                     height="49" viewBox="0 0 25 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div className="separator-round__dashed"></div>
                                                                <svg className="separator-round__right"
                                                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="49" viewBox="0 0 24 49">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="countdown-hms"><span
                                                    className="hour">01</span><span>&nbsp;:&nbsp;</span><span
                                                    className="min">59</span><span>&nbsp;:&nbsp;</span><span
                                                    className="sec">43</span></div>
                                                <p className="pay-countdown__remind">
                                                    vui lòng thanh toán trước&nbsp;15:30
                                                    &nbsp;ngày&nbsp;
                                                    15/9/2020
                                                    , sau thời gian trên Mã giữ chỗ của bạn sẽ bị huỷ
                                                </p>
                                                <p className="pay-countdown__title-tablet">Thời gian thanh toán còn
                                                    lại</p><a
                                                className="btn btn--large btn--bg-linear w-100 btn-pay-tablet"
                                                href="/thanh_toan_02.html">Thanh Toán</a>
                                            </div>
                                            <a className="btn btn--large btn--bg-linear w-100 btn-pay hide-on-tablet"
                                               href="/thanh_toan_02.html">Thanh Toán</a>
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
    booking: state.tour.tour,
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);