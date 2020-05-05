import React, {
    Component
}
    from 'react';
import {
    connect
} from 'react-redux';
import _ from 'lodash';
import Carousel from "react-elastic-carousel";
import {
    imagesUrl
} from '../../constants/path';
import {
    selectTourAction,
    setAtiveTabDetail,
} from '../../actions/tour.action';
import LuggageDropdown from "../LuggageDropdown";
import axios from "axios";

class TourDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adult: 0,
            under2YO: 0,
            logged: false,
            from2to11YO: 0,
            serviceType: 1,
            hotelService: 1,
            modalBook: false,
            tourBooking: false,
            personalTravel: false,

            luggage: 0,
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

        this.openModalBook = this.openModalBook.bind(this);
        this.openTourBooing = this.openTourBooing.bind(this);
        this.handleCheckService = this.handleCheckService.bind(this);
        this.handleUpAndDownPeople = this.handleUpAndDownPeople.bind(this);

        this.addPassenger = this.addPassenger.bind(this);
        this.hasPassenger = this.hasPassenger.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeObjectField = this.handleChangeObjectField.bind(this);
        this.handleChangePassengerDetail = this.handleChangePassengerDetail.bind(this);
    }

    handleUpAndDownPeople(key,action){
        this.setState({
            [key]: this.state[key] + (action === 'up' ? 1 : -1)
        });
    }

    handleCheckService(key,value){
        this.setState({
            [key]: value
        });
    }

    openModalBook(event){
        event.preventDefault();

        this.setState({
            modalBook: !this.state.modalBook
        })
    }

    openTourBooing(event){
        event.preventDefault();

        this.setState({
            tourBooking: !this.state.tourBooking
        })
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

        const { adult, under2YO, from2to11YO, serviceType, hotelService } = this.state;

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
            otherRequirements,
            adult, under2YO, from2to11YO, serviceType, hotelService
        };

        axios.post('/api/v1/booking/create', paramsBody).then(response => {
            that.setState({
                loading: false
            });

            this.props.history.push('/tour/'+response.data._id+'/preview');
        });
    }

    isActiveTab = (tab) => {
        return tab === this.props.activeTabDetail
    }

    onChangActiveTab = (tab) => {
        this.props.setAtiveTabDetail(tab);
    }

    render() {
        const { logged, adult, under2YO, from2to11YO, serviceType, hotelService, modalBook, tourBooking } = this.state;

        const { fullName, gender, phone, email, otherRequirements, company, exportInvoice, passengers } = this.state;

        const { schedule } = this.props;

        const tour = schedule.tour;

        const sliderBreakPoints = [
            {width: 1, itemsToShow: 2},
            {width: 550, itemsToShow: 3},
            {width: 768, itemsToShow: 3},
            {width: 1200, itemsToShow: 4}
        ];

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
                    <div>
                        <main style={{display: !tourBooking ? 'block':'none'}} className="main main--phone-821">
                            <div className="tour-detail__banner js-lazy-load" data-src={tour.avatar} data-type="background-image"
                                 style={{backgroundImage: `url(${tour.avatar})`}}/>
                            <div className="tour-detail">
                                <div className="container">
                                    {logged ? (
                                        <div className="msg-update-info-member">
                                            <div className="pr-3">
                                                <p>Bạn chưa cập nhật thông tin thành viên.</p>
                                                <p>Vui lòng cập nhật thông tin để chúng tôi chuẩn bị mọi thứ tốt nhất cho chuyến du dịch
                                                    của bạn ( Thời gian cập nhật còn lại:<span className="time">&nbsp;15h</span>)</p>
                                            </div>
                                            <a className="btn btn--medium btn--bg-linear">Cập nhật</a>
                                        </div>
                                    ) : <div></div>}
                                    <div className="tour-detail__title">
                                        <div className="title">
                                            <h1>{tour.title}</h1>
                                            <p>
                                                <span>Khởi hành ngày:</span>
                                                <span className="text-blue-sky">
                                                &nbsp;{formatDate(schedule.departureDay,true)}
                                            </span>
                                            </p>
                                        </div>
                                        <a href="/supports" className="btn btn--medium btn-support">HỖ TRỢ</a>
                                    </div>
                                </div>
                                <div className="tour-detail__content">
                                    <div className="container container-custom">
                                        <div className="row row-custom">
                                            <div className="col-xl-3 col-12 col-custom col-left">
                                                <div className="card card-tour-rating">
                                                    <div className="rating">
                                                        <div className="rating__brief">
                                                            <p className="rating__point">3.5</p>
                                                            <div className="rating__star"><img
                                                                src={imagesUrl + "star-border-active.svg"}/><img
                                                                src={imagesUrl + "star-border-active.svg"}/><img
                                                                src={imagesUrl + "star-border-active.svg"}/><img
                                                                src={imagesUrl + "star-border-active.svg"}/><img
                                                                src={imagesUrl + "star-border-disable.svg"}/></div>
                                                            <p className="rating__number">(1204 reviews)</p>
                                                        </div>
                                                        <div className="rating__right">
                                                            <div className="rating__statistic">
                                                                <div className="rating__statistic-item">
                                                                    <div className="d-flex align-items-center"><span>5</span><img
                                                                        src={imagesUrl + "star-border-disable.svg"}/></div>
                                                                    <div className="rating__statistic-ratio">
                                                                        <div className="ratio" style={{width: '70%'}}/>
                                                                    </div>
                                                                </div>
                                                                <div className="rating__statistic-item">
                                                                    <div className="d-flex align-items-center"><span>4</span><img
                                                                        src={imagesUrl + "star-border-disable.svg"}/></div>
                                                                    <div className="rating__statistic-ratio">
                                                                        <div className="ratio" style={{width: '70%'}}/>
                                                                    </div>
                                                                </div>
                                                                <div className="rating__statistic-item">
                                                                    <div className="d-flex align-items-center"><span>3</span><img
                                                                        src={imagesUrl + "star-border-disable.svg"}/></div>
                                                                    <div className="rating__statistic-ratio">
                                                                        <div className="ratio" style={{width: '70%'}}/>
                                                                    </div>
                                                                </div>
                                                                <div className="rating__statistic-item">
                                                                    <div className="d-flex align-items-center"><span>2</span><img
                                                                        src={imagesUrl + "star-border-disable.svg"}/></div>
                                                                    <div className="rating__statistic-ratio">
                                                                        <div className="ratio" style={{width: '70%'}}/>
                                                                    </div>
                                                                </div>
                                                                <div className="rating__statistic-item">
                                                                    <div className="d-flex align-items-center"><span>1</span><img
                                                                        src={imagesUrl + "star-border-disable.svg"}/></div>
                                                                    <div className="rating__statistic-ratio">
                                                                        <div className="ratio" style={{width: '70%'}}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rating__add-new">
                                                                <a className="btn btn--medium" href="#">Add Rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card card-gallery">
                                                    <h2 className="card__title">Gallery</h2>
                                                    <div className="card__content">
                                                        <div className="gallery">
                                                            <div className="gallery__wrap">
                                                                {tour.imageTour.map((image) =>
                                                                    <img className="gallery__item" src={image}/>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card card-supply-partner">
                                                    <h2 className="title">Đối tác cung cấp</h2>
                                                    <img className="logo" src={tour.companyTour.avatar}/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-8 col-12 col-custom">
                                                <div className="card card-tour-detail">
                                                    <div className="tab js-tab tab-tour-detail tab-style">
                                                        <ul className="tab__nav">
                                                            <li className="tab__nav-item">
                                                                <a className={(this.isActiveTab(1) ? "active" : "") + " js-tab-nav tab__nav-link round-bottom-right"}
                                                                   data-target=".tab-tour-info" onClick={() => this.onChangActiveTab(1)}>THÔNG TIN</a>
                                                            </li>
                                                            <li className="tab__nav-item">
                                                                <a className={(this.isActiveTab(2) ? "active" : "") + " js-tab-nav tab__nav-link"}
                                                                   data-target=".tab-tour-price" onClick={() => this.onChangActiveTab(2)}>CHI TIẾT GIÁ</a>
                                                            </li>
                                                            <li className="tab__nav-item">
                                                                <a className={(this.isActiveTab(3) ? "active" : "") + " js-tab-nav tab__nav-link round-bottom-left"}
                                                                   data-target=".term" onClick={() => this.onChangActiveTab(3)}>ĐIỀU KHOẢN&nbsp;<br/>VÀ CHÍNH SÁCH</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab__content">
                                                            <div className={(this.isActiveTab(1) ? "active" : "") + " tab__content-item js-tab-content-item tab-tour-info"}>
                                                                <div className="description">
                                                                    <h1 className="description__title">Mô tả Tour</h1>
                                                                    <p className="description__content">{tour.description}</p>
                                                                    <a className="see-more" href="#">See more</a>
                                                                    <div className="book-tour">
                                                                        <p className="price">{formatNumber(tour.basePrice)} đ</p>
                                                                        <a href='#' className="btn btn--bg-linear" onClick={(ev) => this.openModalBook(ev)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={27}
                                                                                 height={19} viewBox="0 0 27 19">
                                                                                <g>
                                                                                    <g>
                                                                                        <path fill="#919191"
                                                                                              d="M19.718 14.987c.22 0 .426.042.615.121.198.08.375.198.524.347v.004a1.601 1.601 0 0 1 0 2.273v.003c-.15.15-.326.268-.524.347-.189.08-.396.122-.615.122-.219 0-.426-.042-.615-.122a1.517 1.517 0 0 1-.52-.347l-.003-.003a1.6 1.6 0 0 1 0-2.273v-.004c.149-.149.326-.267.523-.347.19-.079.396-.121.615-.121zm2.682-.38c.155 0 .304.03.442.084.14.058.267.147.374.253.106.107.195.234.253.374a1.203 1.203 0 0 1 0 .89c-.058.14-.147.267-.253.374a1.215 1.215 0 0 1-.374.252 1.187 1.187 0 0 1-.442.086h-.402l.019-.162v-.003l.006-.055v-.003l.003-.054v-.113c0-.347-.086-.633-.198-.865a3.017 3.017 0 0 0-.344-.53l-.003-.002c-.098-.131-.17-.22-.17-.32 0-.073.018-.122.06-.152.046-.04.128-.055.247-.055h.782zM1.56 3.014a1.136 1.136 0 0 1-.374-.25 1.15 1.15 0 0 1-.27-1.215l.005-.012v-.006l.013-.024v-.006a1.172 1.172 0 0 1 .62-.621 1.153 1.153 0 0 1 .883 0c.433.176.82.359 1.166.548.35.191.667.392.947.602.268.201.508.408.727.627.217.22.411.45.588.694l.021.03h19.792v.01l.055.018.052.016a.75.75 0 0 1 .277.155c.082.07.15.155.2.25.047.097.077.2.086.31a.875.875 0 0 1-.036.316l-1.903 5.796c-.076.238-.17.466-.28.68-.113.218-.24.428-.38.623-.14.198-.299.38-.47.551-.17.17-.352.326-.547.469-.195.14-.399.265-.615.374a4.75 4.75 0 0 1-.67.274l-.024.006a4.81 4.81 0 0 1-1.419.22H8.976v-.007l-.08.007a.831.831 0 0 0-.398.124.92.92 0 0 0-.301.302.734.734 0 0 0-.058.121.427.427 0 0 0-.021.231c.009.034.02.068.036.098.049.08.131.15.259.198.106.04.25.07.426.08.122.005.204.03.25.07.04.036.057.09.051.167a.34.34 0 0 1-.051.146 1.9 1.9 0 0 1-.128.188 2.802 2.802 0 0 0-.332.524c-.11.225-.192.502-.192.831l.003.082v.006l.003.07v.016l.015.188-.185-.03a3.69 3.69 0 0 1-.347-.07 2.687 2.687 0 0 1-.326-.095l-.012-.006a2.748 2.748 0 0 1-.57-.27 2.506 2.506 0 0 1-.63-.552 2.268 2.268 0 0 1-.387-.715 2.44 2.44 0 0 1-.06-1.178c.024-.134.061-.268.107-.405.033-.094.073-.188.118-.283.043-.094.092-.192.146-.283.043-.076.092-.152.144-.228.051-.076.103-.152.16-.225l.025-.03-.012-.04a56.02 56.02 0 0 1-.874-2.855l-.24-.871a40.22 40.22 0 0 0-.597-2.025v-.003c-.204-.6-.423-1.123-.697-1.583-.27-.45-.6-.843-1.026-1.19-.426-.35-.946-.654-1.604-.928l-.03-.012zm10.892 11.591h5.586a.21.21 0 0 1 .192.122.21.21 0 0 1-.025.225 2.69 2.69 0 0 0-.581 1.967h-4.758a2.756 2.756 0 0 0-.584-1.97.215.215 0 0 1 .17-.344zm9.12-6.688h1.878l.917-2.794.03-.097h-2.825zm-3.71 0h2.715V5.027H17.86zm-3.708 0h2.715V5.027h-2.715zm-3.708 0h2.715V5.027h-2.715zm-2.749 0h1.757V5.027H6.769l.04.1c.197.493.368.992.52 1.495.131.429.25.861.368 1.296zm1.757.993H7.962c.125.472.256.94.399 1.41.15.483.314.964.502 1.436l.022.049h.569zm3.707 0h-2.715v2.895h2.715zm3.708 0h-2.715v2.895h2.715zm3.708 0H17.86v2.895h2.143c.125 0 .25-.01.375-.025.064-.006.13-.015.198-.027V8.91zm2.548 0h-1.553v2.466c.064-.037.128-.08.186-.122l.006-.003.003-.003c.125-.119.24-.229.35-.341.107-.11.21-.223.298-.335.089-.116.17-.238.244-.372a2.98 2.98 0 0 0 .192-.453zm-12.368 6.076c.219 0 .426.042.615.121.197.08.374.198.523.347v.004a1.601 1.601 0 0 1 0 2.273l-.021.025a1.59 1.59 0 0 1-.502.325 1.603 1.603 0 0 1-1.753-.35l-.022-.02a1.564 1.564 0 0 1-.329-.5 1.655 1.655 0 0 1-.122-.618c0-.216.046-.426.122-.615.082-.195.201-.371.347-.52l.003-.004a1.609 1.609 0 0 1 1.138-.469z"/>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                            <span>Đặt Tour</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="other-day-start">
                                                                        <h2 className="title">Ngày khởi hành khác</h2>
                                                                        <div className="top">
                                                                            <p className="note">Cùng một tour nhưng khác ngày khởi hành</p>
                                                                            <a className="load-more">See more</a>
                                                                        </div>
                                                                        <div className="days">
                                                                            <div className="days__list">
                                                                                <div className="days__wrap">
                                                                                    <Carousel breakPoints={sliderBreakPoints}>
                                                                                        {tour.schedules.map((schedule,index) =>
                                                                                            <div key={'schedule-'+index+1} className="day">
                                                                                                <div className="day__top">
                                                                                                    <span className="seating">Còn 15 Chỗ</span>
                                                                                                    <div className="booked">
                                                                                                        <div className="avatar"><img
                                                                                                            className="img-full-height"
                                                                                                            src={imagesUrl + "avatar-demo.png"}/>
                                                                                                        </div>
                                                                                                        <div className="avatar"><img
                                                                                                            className="img-full-height"
                                                                                                            src={imagesUrl + "avatar-demo.png"}/>
                                                                                                        </div>
                                                                                                        <div className="avatar"><img
                                                                                                            className="img-full-height"
                                                                                                            src={imagesUrl + "avatar-demo.png"}/>
                                                                                                        </div>
                                                                                                        <span>+4</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <p className="start-date">
                                                                                                    {formatDate(schedule.departureDay,false)}
                                                                                                </p>
                                                                                                <div className="day__bottom">
                                                                                                    <span className="price">{formatNumber(tour.basePrice)} đ</span>
                                                                                                    <a href={'/tour/'+schedule._id} className="link">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height="15.14" viewBox="0 0 22 15.14">
                                                                                                            <g transform="translate(0 -41.916)">
                                                                                                                <path d="M21.7,48.763l-6.547-6.547a1.023,1.023,0,0,0-1.447,1.447l4.8,4.8H1.023a1.023,1.023,0,1,0,0,2.046H18.507l-4.8,4.8a1.023,1.023,0,0,0,1.447,1.447L21.7,50.209A1.023,1.023,0,0,0,21.7,48.763Z"
                                                                                                                      transform="translate(0 0)" fill="#fff"/>
                                                                                                            </g>
                                                                                                        </svg>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </Carousel>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="schedual-detail">
                                                                    <h3 className="schedual-detail__title">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24.403"
                                                                             height="24.404" viewBox="0 0 24.403 24.404">
                                                                            <g id="sunset" transform="translate(-0.178 0.001)">
                                                                                <path id="Path_422" data-name="Path 422"
                                                                                      d="M329.4,275.223a4.067,4.067,0,1,0,4.067-4.067A4.067,4.067,0,0,0,329.4,275.223Zm4.067-3.254a3.254,3.254,0,1,1-3.254,3.254A3.254,3.254,0,0,1,333.466,271.97Zm0,0"
                                                                                      transform="translate(-315.392 -259.767)"
                                                                                      fill="#ff4827"/>
                                                                                <path id="Path_423" data-name="Path 423"
                                                                                      d="M370.9,561.637h4.648v.813H370.9Zm0,0"
                                                                                      transform="translate(-355.149 -538.047)"
                                                                                      fill="#ff4827"/>
                                                                                <path id="Path_424" data-name="Path 424"
                                                                                      d="M329.4,522.9h8.134v.813H329.4Zm0,0"
                                                                                      transform="translate(-315.392 -500.939)"
                                                                                      fill="#ff4827"/>
                                                                                <path id="Path_425" data-name="Path 425"
                                                                                      d="M116.379,522.9h.813v.813h-.813Zm0,0"
                                                                                      transform="translate(-111.32 -500.939)"
                                                                                      fill="#ff4827"/>
                                                                                <path id="Path_426" data-name="Path 426"
                                                                                      d="M58.285,542.27H59.1v.813h-.813Zm0,0"
                                                                                      transform="translate(-55.667 -519.493)"
                                                                                      fill="#ff4827"/>
                                                                                <path id="Path_427" data-name="Path 427"
                                                                                      d="M5.1,19.675A30.8,30.8,0,0,0,9.012,7.636l3.782,3.76a.406.406,0,0,0,.285.118.384.384,0,0,0,.066-.005.406.406,0,0,0,.3-.22A3.97,3.97,0,0,0,12.7,6.7l-.333-.333h2.861a.407.407,0,0,0,.386-.536A3.971,3.971,0,0,0,11.84,3.114h-.529l2.031-2.043a.407.407,0,0,0-.106-.651,3.972,3.972,0,0,0-4.591.745l-.388.388a3.978,3.978,0,0,0-.353.407,3.908,3.908,0,0,0-.349-.407l-.388-.388A3.97,3.97,0,0,0,2.578.421a.407.407,0,0,0-.106.651L4.5,3.114H3.971A3.971,3.971,0,0,0,.2,5.832a.407.407,0,0,0,.386.536H3.443L3.11,6.7a3.971,3.971,0,0,0-.745,4.589.407.407,0,0,0,.3.22.386.386,0,0,0,.066.005.406.406,0,0,0,.287-.118l3.522-3.5A22.044,22.044,0,0,1,2.286,18.643,15.176,15.176,0,0,0,.626,18.3l-.254-.026-.081.81.237.023c.407.058.811.14,1.213.233-.081.1-.163.206-.247.306l.624.522A22.9,22.9,0,0,0,7.438,7l.468-.465.35.348A29.736,29.736,0,0,1,3.1,21.321l.666.466c.32-.456.625-.93.92-1.413A14.425,14.425,0,0,1,9.606,24.23l.629-.515a15.191,15.191,0,0,0-2.7-2.565H24.581v-.813H6.33C5.931,20.1,5.519,19.877,5.1,19.675Zm7.831-9.292-4.3-4.272a3.137,3.137,0,0,1,3.1.777l.388.389A3.158,3.158,0,0,1,12.93,10.383Zm1.676-4.828H11.238a3.966,3.966,0,0,0-2.519-.3A3.154,3.154,0,0,1,11.29,3.928h.549A3.158,3.158,0,0,1,14.606,5.555ZM8.83,2.129l.389-.388a3.16,3.16,0,0,1,3.109-.8L9.917,3.362A3.967,3.967,0,0,0,8,4.868a3.078,3.078,0,0,1,.835-2.74ZM6.59,1.741l.388.388a3.087,3.087,0,0,1,.468.616A3.87,3.87,0,0,0,7.135,4.1a3.967,3.967,0,0,0-1.24-.735L3.483.936a3.159,3.159,0,0,1,3.108.8ZM3.969,3.928h.549A3.155,3.155,0,0,1,7.092,5.254a3.968,3.968,0,0,0-2.518.3H1.205A3.158,3.158,0,0,1,3.971,3.928ZM2.881,10.383a3.158,3.158,0,0,1,.8-3.107l.388-.389A3.109,3.109,0,0,1,6.279,5.98a3.217,3.217,0,0,1,.9.129Zm0,0"
                                                                                      transform="translate(0 0)" fill="#ff4827"/>
                                                                            </g>
                                                                        </svg>
                                                                        <span>Schedual Detail</span>
                                                                    </h3>
                                                                    <div className="schedual-detail__map"><a
                                                                        className="btn btn--medium">View in Map</a></div>
                                                                </div>
                                                                <div className="start card-collapse">
                                                                    <div className="card-collapse__icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.839"
                                                                             height="16.507" viewBox="0 0 16.839 16.507">
                                                                            <path id="Path_16834" data-name="Path 16834"
                                                                                  d="M411.3,238.339l.659.659a.388.388,0,0,1,0,.547l-4.192,4.19a.379.379,0,0,1-.4.093l-.986-.329a.376.376,0,0,1-.253-.277.372.372,0,0,1,.1-.363l4.519-4.52a.388.388,0,0,1,.547,0Zm6.367-10.72-.086.076a1.574,1.574,0,0,0-.413,1.693,1.5,1.5,0,0,1-.449,1.745c-.637.5-2.674,2.569-3.436,2.142a4.223,4.223,0,0,0-4.756.793.375.375,0,0,0-.129.277.386.386,0,0,0,.115.284l7.155,7.155a.366.366,0,0,0,.282.112.37.37,0,0,0,.277-.127,4.227,4.227,0,0,0,.8-4.758c-.427-.762,1.638-2.8,2.139-3.433a1.5,1.5,0,0,1,1.745-.449,1.515,1.515,0,0,0,.59.093,1.494,1.494,0,0,0,1.1-.509l.081-.086c1.48-1.635-3.376-6.492-5.014-5.009Zm-3.655,7.351c-2.292-2.292-3.445-1-2.92-.477l3.419,3.416c.458.461,1.793-.647-.5-2.939Zm5.974-6.372c1.292.867,1.163,1.323.721,1.676s-2.7-1.7-2.4-2.149S419.428,228.224,419.986,228.6Z"
                                                                                  transform="translate(-406.12 -227.342)"
                                                                                  fill="#ff6127" fillRule="evenodd"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="title">
                                                                        <span>Khởi hành tại&nbsp;</span>
                                                                        <span className="title__content">
                                                                        {tour.schedule[0].cities.length ? tour.schedule[0].cities[0].name : 'Không xác định!'}
                                                                    </span>
                                                                    </div>
                                                                </div>
                                                                <div className="schedule-tour">
                                                                    {tour.schedule.map((day,index) => index > 0 ?
                                                                        <div style={{display: index !== 0 ? 'block' : 'none'}}>
                                                                            <div className="card-collapse active">
                                                                                <div className="card-collapse__icon"><span>{index}</span></div>
                                                                                <h3 className="card-collapse__title">Ngày thứ {index}</h3>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={13}
                                                                                     height={7} viewBox="0 0 13 7">
                                                                                    <g>
                                                                                        <g>
                                                                                            <g>
                                                                                                <path fill="#919191"
                                                                                                      d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"/>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </svg>
                                                                            </div>
                                                                            <div className="card-collapse-content active">
                                                                                {day.cities.map((city,indexCity) =>
                                                                                    <div className="card-collapse-content__item">
                                                                                        <div className="tag">
                                                                                            <span className="tag__day">{indexCity+1}</span>
                                                                                            <span className="tag__content">{indexCity === 0 ? 'Start' : '~ 50km'}</span>
                                                                                        </div>
                                                                                        <div className="tour-place">
                                                                                            <div className="tour-place__top">
                                                                                                <div className="tour-place__top-left">
                                                                                                    <h1 className="tour-place__title">
                                                                                                        {city.name}
                                                                                                    </h1>
                                                                                                    <div className="tour-place__rating">
                                                                                                        <img src={imagesUrl + "star-solid.svg"}/>
                                                                                                        <img src={imagesUrl + "star-solid.svg"}/>
                                                                                                        <img src={imagesUrl + "star-solid.svg"}/>
                                                                                                        <img src={imagesUrl + "star-solid.svg"}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="tour-place__price">
                                                                                                    <p className="tour-place__price-title">
                                                                                                        Chi phí dự tính
                                                                                                    </p>
                                                                                                    <p className="tour-place__price-content">500.000</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <p className="tour-place__description">
                                                                                                {city.description}
                                                                                            </p>
                                                                                            <a className="see-more" href='#href'>See more</a>
                                                                                            <div className="tour-place__thumbnail js-lazy-load" data-src={imagesUrl + "tour-place.png"}
                                                                                                 style={{backgroundImage: `url(${city.coverImage})`}} data-type="background-image"/>
                                                                                            <div className="tour-place__interaction">
                                                                                                <div className="tour-place__liked"></div>
                                                                                                <div className="tour-place__interaction-right">
                                                                                                    <div className="tour-place__point">
                                                                                                        <div className="icon">
                                                                                                            <svg
                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                width="17.857" height="15.887"
                                                                                                                viewBox="0 0 17.857 15.887">
                                                                                                                <path id="heart"
                                                                                                                      d="M8.928,15.887a1.047,1.047,0,0,1-.69-.259C7.517,15,6.821,14.4,6.208,13.881l0,0A37.761,37.761,0,0,1,1.771,9.717,6.646,6.646,0,0,1,0,5.366,5.581,5.581,0,0,1,1.417,1.555,4.8,4.8,0,0,1,4.988,0,4.492,4.492,0,0,1,7.794.969,5.74,5.74,0,0,1,8.928,2.153,5.741,5.741,0,0,1,10.063.969,4.491,4.491,0,0,1,12.868,0,4.8,4.8,0,0,1,16.44,1.555a5.581,5.581,0,0,1,1.416,3.812,6.646,6.646,0,0,1-1.771,4.35,37.757,37.757,0,0,1-4.433,4.161c-.615.524-1.311,1.117-2.034,1.75a1.048,1.048,0,0,1-.69.259ZM4.988,1.046a3.767,3.767,0,0,0-2.8,1.218,4.54,4.54,0,0,0-1.14,3.1A5.592,5.592,0,0,0,2.576,9.05a37.16,37.16,0,0,0,4.306,4.033l0,0C7.5,13.61,8.2,14.2,8.927,14.84c.731-.637,1.43-1.233,2.047-1.758A37.169,37.169,0,0,0,15.28,9.05a5.593,5.593,0,0,0,1.53-3.683,4.54,4.54,0,0,0-1.14-3.1,3.767,3.767,0,0,0-2.8-1.218A3.469,3.469,0,0,0,10.7,1.8,5.076,5.076,0,0,0,9.5,3.193a.66.66,0,0,1-1.134,0A5.071,5.071,0,0,0,7.154,1.8a3.469,3.469,0,0,0-2.166-.75Zm0,0"
                                                                                                                      transform="translate(0 0)"
                                                                                                                      opacity="0.62"/>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                        <span>0</span>
                                                                                                    </div>
                                                                                                    <div className="tour-place__comment">
                                                                                                        <div className="icon">
                                                                                                            <svg
                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                width="20.801" height="15.887"
                                                                                                                viewBox="0 0 20.801 15.887">
                                                                                                                <g id="comment" opacity="0.62">
                                                                                                                    <path id="Path_382"
                                                                                                                          data-name="Path 382"
                                                                                                                          d="M0,19.47V9.292A5.716,5.716,0,0,1,5.709,3.583H15.09A5.716,5.716,0,0,1,20.8,9.292v1.756a5.716,5.716,0,0,1-5.709,5.709H5.841ZM5.709,4.856A4.441,4.441,0,0,0,1.273,9.292v8.183l4.288-1.992h9.531a4.441,4.441,0,0,0,4.436-4.436V9.291A4.442,4.442,0,0,0,15.09,4.855H5.709ZM6.128,9.2a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,6.128,9.2Zm8.543,0a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,14.671,9.2ZM10.4,9.2a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,10.4,9.2Z"
                                                                                                                          transform="translate(0 -3.583)"
                                                                                                                          fill="#010002"/>
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                        <span>0</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div> : <div></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={(this.isActiveTab(2) ? "active" : "") + " tab__content-item js-tab-content-item tab-tour-price"}>
                                                                <div className="tab-tour-price__top">
                                                                    <div className="book-tour px-0">
                                                                        <p className="price">{formatNumber(tour.basePrice)} đ</p>
                                                                        <a href='#' className="btn btn--bg-linear" onClick={(ev) => this.openModalBook(ev)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={27}
                                                                                 height={19} viewBox="0 0 27 19">
                                                                                <g>
                                                                                    <g>
                                                                                        <path fill="#919191"
                                                                                              d="M19.718 14.987c.22 0 .426.042.615.121.198.08.375.198.524.347v.004a1.601 1.601 0 0 1 0 2.273v.003c-.15.15-.326.268-.524.347-.189.08-.396.122-.615.122-.219 0-.426-.042-.615-.122a1.517 1.517 0 0 1-.52-.347l-.003-.003a1.6 1.6 0 0 1 0-2.273v-.004c.149-.149.326-.267.523-.347.19-.079.396-.121.615-.121zm2.682-.38c.155 0 .304.03.442.084.14.058.267.147.374.253.106.107.195.234.253.374a1.203 1.203 0 0 1 0 .89c-.058.14-.147.267-.253.374a1.215 1.215 0 0 1-.374.252 1.187 1.187 0 0 1-.442.086h-.402l.019-.162v-.003l.006-.055v-.003l.003-.054v-.113c0-.347-.086-.633-.198-.865a3.017 3.017 0 0 0-.344-.53l-.003-.002c-.098-.131-.17-.22-.17-.32 0-.073.018-.122.06-.152.046-.04.128-.055.247-.055h.782zM1.56 3.014a1.136 1.136 0 0 1-.374-.25 1.15 1.15 0 0 1-.27-1.215l.005-.012v-.006l.013-.024v-.006a1.172 1.172 0 0 1 .62-.621 1.153 1.153 0 0 1 .883 0c.433.176.82.359 1.166.548.35.191.667.392.947.602.268.201.508.408.727.627.217.22.411.45.588.694l.021.03h19.792v.01l.055.018.052.016a.75.75 0 0 1 .277.155c.082.07.15.155.2.25.047.097.077.2.086.31a.875.875 0 0 1-.036.316l-1.903 5.796c-.076.238-.17.466-.28.68-.113.218-.24.428-.38.623-.14.198-.299.38-.47.551-.17.17-.352.326-.547.469-.195.14-.399.265-.615.374a4.75 4.75 0 0 1-.67.274l-.024.006a4.81 4.81 0 0 1-1.419.22H8.976v-.007l-.08.007a.831.831 0 0 0-.398.124.92.92 0 0 0-.301.302.734.734 0 0 0-.058.121.427.427 0 0 0-.021.231c.009.034.02.068.036.098.049.08.131.15.259.198.106.04.25.07.426.08.122.005.204.03.25.07.04.036.057.09.051.167a.34.34 0 0 1-.051.146 1.9 1.9 0 0 1-.128.188 2.802 2.802 0 0 0-.332.524c-.11.225-.192.502-.192.831l.003.082v.006l.003.07v.016l.015.188-.185-.03a3.69 3.69 0 0 1-.347-.07 2.687 2.687 0 0 1-.326-.095l-.012-.006a2.748 2.748 0 0 1-.57-.27 2.506 2.506 0 0 1-.63-.552 2.268 2.268 0 0 1-.387-.715 2.44 2.44 0 0 1-.06-1.178c.024-.134.061-.268.107-.405.033-.094.073-.188.118-.283.043-.094.092-.192.146-.283.043-.076.092-.152.144-.228.051-.076.103-.152.16-.225l.025-.03-.012-.04a56.02 56.02 0 0 1-.874-2.855l-.24-.871a40.22 40.22 0 0 0-.597-2.025v-.003c-.204-.6-.423-1.123-.697-1.583-.27-.45-.6-.843-1.026-1.19-.426-.35-.946-.654-1.604-.928l-.03-.012zm10.892 11.591h5.586a.21.21 0 0 1 .192.122.21.21 0 0 1-.025.225 2.69 2.69 0 0 0-.581 1.967h-4.758a2.756 2.756 0 0 0-.584-1.97.215.215 0 0 1 .17-.344zm9.12-6.688h1.878l.917-2.794.03-.097h-2.825zm-3.71 0h2.715V5.027H17.86zm-3.708 0h2.715V5.027h-2.715zm-3.708 0h2.715V5.027h-2.715zm-2.749 0h1.757V5.027H6.769l.04.1c.197.493.368.992.52 1.495.131.429.25.861.368 1.296zm1.757.993H7.962c.125.472.256.94.399 1.41.15.483.314.964.502 1.436l.022.049h.569zm3.707 0h-2.715v2.895h2.715zm3.708 0h-2.715v2.895h2.715zm3.708 0H17.86v2.895h2.143c.125 0 .25-.01.375-.025.064-.006.13-.015.198-.027V8.91zm2.548 0h-1.553v2.466c.064-.037.128-.08.186-.122l.006-.003.003-.003c.125-.119.24-.229.35-.341.107-.11.21-.223.298-.335.089-.116.17-.238.244-.372a2.98 2.98 0 0 0 .192-.453zm-12.368 6.076c.219 0 .426.042.615.121.197.08.374.198.523.347v.004a1.601 1.601 0 0 1 0 2.273l-.021.025a1.59 1.59 0 0 1-.502.325 1.603 1.603 0 0 1-1.753-.35l-.022-.02a1.564 1.564 0 0 1-.329-.5 1.655 1.655 0 0 1-.122-.618c0-.216.046-.426.122-.615.082-.195.201-.371.347-.52l.003-.004a1.609 1.609 0 0 1 1.138-.469z"/>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                            <span>Đặt Tour</span>
                                                                        </a>
                                                                    </div>
                                                                    <h2 className="title">Giá vé bao gồm:</h2>
                                                                    <div className="price-item">
                                                                        <div className="price-item__icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                                 height="20" viewBox="0 0 20 20">
                                                                                <g id="airplane-shape"
                                                                                   transform="translate(0 -0.002)">
                                                                                    <path id="Path_444" data-name="Path 444"
                                                                                          d="M18.685,4.04A5.788,5.788,0,0,0,20,.985a1.13,1.13,0,0,0-.155-.624.5.5,0,0,0-.091-.116.524.524,0,0,0-.107-.083A1.112,1.112,0,0,0,19.016,0a5.772,5.772,0,0,0-3.054,1.315,26.318,26.318,0,0,0-3.007,2.9q-.313.33-.66.694L9.912,4.194l.007-.007a.534.534,0,0,0,0-.752L9.487,3a.536.536,0,0,0-.379-.157A.526.526,0,0,0,8.731,3l-.644.644-.341-.1a.533.533,0,0,0-.043-.7l-.432-.432a.535.535,0,0,0-.379-.156.522.522,0,0,0-.375.156L5.927,3,3.5,2.274a.606.606,0,0,0-.173-.025.642.642,0,0,0-.448.181l-.852.852a.5.5,0,0,0-.15.351.489.489,0,0,0,.26.438L7.236,6.918a.889.889,0,0,1,.124.094L8.812,8.464C7.453,9.9,6.243,11.282,5.3,12.487c-.088.112-.171.221-.253.33l-3.941-.358a.534.534,0,0,0-.068,0,.727.727,0,0,0-.488.2l-.4.4A.493.493,0,0,0,0,13.4a.484.484,0,0,0,.287.446l2.772,1.317a.648.648,0,0,1,.106.076l.23.228A1.683,1.683,0,0,0,3.285,16a.7.7,0,0,0,.193.511l.01.009,0,0a.7.7,0,0,0,.51.191,1.7,1.7,0,0,0,.529-.11l.234.233a.632.632,0,0,1,.073.1L6.15,19.711A.49.49,0,0,0,6.592,20h0a.493.493,0,0,0,.35-.148l.407-.408a.725.725,0,0,0,.194-.487c0-.023,0-.04,0-.05l-.359-3.955c.108-.081.217-.165.33-.252,1.207-.945,2.594-2.156,4.022-3.512l1.453,1.455a.779.779,0,0,1,.095.125l2.84,5.085a.5.5,0,0,0,.793.116l.858-.857a.65.65,0,0,0,.176-.447.613.613,0,0,0-.023-.167L17,14.076l.59-.591a.534.534,0,0,0,0-.753l-.433-.433a.534.534,0,0,0-.7-.044l-.1-.339L17,11.27a.538.538,0,0,0,.155-.378A.527.527,0,0,0,17,10.516l-.431-.431a.533.533,0,0,0-.757,0l0,0-.714-2.382c.247-.235.48-.459.7-.669A26.219,26.219,0,0,0,18.685,4.04Z"
                                                                                          fill="#414141"></path>
                                                                                </g>
                                                                            </svg>

                                                                        </div>
                                                                        <div className="price-item__content not-flex">
                                                                            <p>{tour.priceIncluded.transport}</p>
                                                                            <p className="address"><span className="airport">Sân bay:</span><span
                                                                                className="address__start">{tour.priceIncluded.pointGo}</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     width="15.739" height="25.14"
                                                                                     viewBox="0 0 15.739 25.14">
                                                                                    <g id="Group_1152" data-name="Group 1152"
                                                                                       transform="translate(-467.273 -837)">
                                                                                        <g id="arrow-pointing-to-right"
                                                                                           transform="translate(467.273 837)">
                                                                                            <path id="Path_455" data-name="Path 455"
                                                                                                  d="M15.525,46.814l-4.684-4.684a.732.732,0,1,0-1.035,1.035L13.241,46.6H.732a.732.732,0,1,0,0,1.464H13.241L9.806,51.5a.732.732,0,0,0,1.035,1.035l4.684-4.684A.732.732,0,0,0,15.525,46.814Z"
                                                                                                  transform="translate(0 -41.916)"
                                                                                                  fill="#00a6f0"></path>
                                                                                        </g>
                                                                                        <g id="arrow-pointing-to-right-2"
                                                                                           data-name="arrow-pointing-to-right"
                                                                                           transform="translate(467.273 851.309)">
                                                                                            <path id="Path_455-2"
                                                                                                  data-name="Path 455"
                                                                                                  d="M.214,46.814,4.9,42.131a.732.732,0,1,1,1.035,1.035L2.5,46.6H15.008a.732.732,0,1,1,0,1.464H2.5L5.933,51.5A.732.732,0,0,1,4.9,52.533L.214,47.849A.732.732,0,0,1,.214,46.814Z"
                                                                                                  transform="translate(0 -41.916)"
                                                                                                  fill="#00a6f0"></path>
                                                                                        </g>
                                                                                    </g>
                                                                                </svg>
                                                                                <span className="address__to">{tour.priceIncluded.destination}</span>
                                                                            </p>
                                                                        </div>
                                                                        <span className="price-item__number">2.000.000 đ</span>
                                                                    </div>
                                                                    <div className="price-item">
                                                                        <div className="price-item__icon">
                                                                            <svg id="portfolio" xmlns="http://www.w3.org/2000/svg"
                                                                                 width="22.756" height={20} viewBox="0 0 22.756 20">
                                                                                <path id="Path_445" data-name="Path 445"
                                                                                      d="M211,240h4v1.333h-4Zm0,0"
                                                                                      transform="translate(-201.622 -229.333)"
                                                                                      fill="#414141"/>
                                                                                <path id="Path_446" data-name="Path 446"
                                                                                      d="M18.461,85.97h-3.75v.667a.666.666,0,0,1-.667.667H8.711a.666.666,0,0,1-.667-.667V85.97H4.294A2,2,0,0,1,2.4,84.6L0,77.41V91.97a2,2,0,0,0,2,2H20.756a2,2,0,0,0,2-2V77.411l-2.4,7.192A2,2,0,0,1,18.461,85.97Zm0,0"
                                                                                      transform="translate(0 -73.97)"
                                                                                      fill="#414141"/>
                                                                                <path id="Path_447" data-name="Path 447"
                                                                                      d="M38.706,0H33.373a2,2,0,0,0-2,2v.667H25.809l2.514,7.544a.667.667,0,0,0,.633.456h3.75V10a.666.666,0,0,1,.667-.667h5.333a.666.666,0,0,1,.667.667v.667h3.75a.667.667,0,0,0,.633-.456L46.27,2.667H40.706V2A2,2,0,0,0,38.706,0Zm-6,2.667V2a.667.667,0,0,1,.667-.667h5.333A.667.667,0,0,1,39.373,2v.667Zm0,0"
                                                                                      transform="translate(-24.662)"
                                                                                      fill="#414141"/>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="price-item__content"><span>Hành lý ký gửi {tour.priceIncluded.handed}kg và {tour.priceIncluded.deposit}kg</span>
                                                                        </div>
                                                                        <span className="price-item__number">0 đ</span>
                                                                    </div>
                                                                    <div className="price-item">
                                                                        <div className="price-item__icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="23.084"
                                                                                 height="14.96" viewBox="0 0 23.084 14.96">
                                                                                <g id="visa-pay-logo"
                                                                                   transform="translate(0 -9.939)">
                                                                                    <g id="Group_600" data-name="Group 600"
                                                                                       transform="translate(0 9.939)">
                                                                                        <g id="Group_599" data-name="Group 599"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_448" data-name="Path 448"
                                                                                                  d="M22.49,9.939H.594A.594.594,0,0,0,0,10.533V24.3a.594.594,0,0,0,.594.594h21.9a.594.594,0,0,0,.594-.594V10.533A.594.594,0,0,0,22.49,9.939ZM1.787,14.46H4.251a.639.639,0,0,1,.692.474l.536,2.577a5.057,5.057,0,0,0-3.712-2.934Zm2.981,5.877L3.345,15.475a6.241,6.241,0,0,1,2.2,2.417l.166.6,1.556-3.976H8.953l-2.5,5.82Zm5.422,0H8.6l.994-5.831h1.59Zm2.765.087a5.03,5.03,0,0,1-1.771-.311l.224-1.305.2.093a3.33,3.33,0,0,0,1.5.306c.457,0,.946-.179.95-.569,0-.255-.2-.438-.824-.724-.6-.279-1.4-.746-1.392-1.584.009-1.133,1.115-1.924,2.686-1.924a4.1,4.1,0,0,1,1.424.245l-.215,1.264-.143-.067a2.932,2.932,0,0,0-1.189-.223c-.622,0-.911.259-.911.5,0,.273.337.453.893.723.917.416,1.341.921,1.335,1.584C15.711,19.647,14.627,20.429,12.956,20.429Zm6.887-.085s-.145-.67-.193-.874l-2.035,0c-.062.157-.334.876-.334.876H15.611L17.971,15a.791.791,0,0,1,.833-.484h1.228l1.286,5.827Z"
                                                                                                  transform="translate(0 -9.939)"
                                                                                                  fill="#414141"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_602" data-name="Group 602"
                                                                                       transform="translate(18.071 16.088)">
                                                                                        <g id="Group_601" data-name="Group 601">
                                                                                            <path id="Path_449" data-name="Path 449"
                                                                                                  d="M45.165,25.488l-.107-.5c-.081.219-.22.572-.211.557,0,0-.5,1.294-.633,1.63h1.32Z"
                                                                                                  transform="translate(-44.214 -24.985)"
                                                                                                  fill="#414141"/>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="price-item__content"><span>{tour.priceIncluded.otherCosts[0].title}</span>
                                                                        </div>
                                                                        <span className="price-item__number">{tour.priceIncluded.otherCosts[0].cost} đ</span>
                                                                    </div>
                                                                    <div className="price-item">
                                                                        <div className="price-item__icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={23}
                                                                                 height="22.617" viewBox="0 0 23 22.617">
                                                                                <g id="hotel" transform="translate(0 -4)">
                                                                                    <g id="Group_679" data-name="Group 679"
                                                                                       transform="translate(0 4)">
                                                                                        <g id="Group_678" data-name="Group 678"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_569" data-name="Path 569"
                                                                                                  d="M22.617,7.45H18.4V4.383A.383.383,0,0,0,18.017,4H4.983a.383.383,0,0,0-.383.383V9.75H.383A.383.383,0,0,0,0,10.133V25.85a.383.383,0,1,0,.767,0V10.517H4.6V26.233a.383.383,0,0,0,.383.383H18.017a.383.383,0,0,0,.383-.383V8.217h3.833V25.85a.383.383,0,1,0,.767,0V7.833A.383.383,0,0,0,22.617,7.45Zm-11.5,18.4H9.583V22.4h1.533Zm2.3,0H11.883V22.4h1.533Zm4.217,0h-3.45V22.017a.383.383,0,0,0-.383-.383H9.2a.383.383,0,0,0-.383.383V25.85H5.367V4.767H17.633Z"
                                                                                                  transform="translate(0 -4)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_681" data-name="Group 681"
                                                                                       transform="translate(6.133 5.533)">
                                                                                        <g id="Group_680" data-name="Group 680">
                                                                                            <path id="Path_570" data-name="Path 570"
                                                                                                  d="M130.683,36h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,130.683,36Zm-.383,2.3h-1.533V36.767H130.3Z"
                                                                                                  transform="translate(-128 -36)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_683" data-name="Group 683"
                                                                                       transform="translate(9.967 5.533)">
                                                                                        <g id="Group_682" data-name="Group 682">
                                                                                            <path id="Path_571" data-name="Path 571"
                                                                                                  d="M210.683,36h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,210.683,36Zm-.383,2.3h-1.533V36.767H210.3Z"
                                                                                                  transform="translate(-208 -36)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_685" data-name="Group 685"
                                                                                       transform="translate(13.8 5.533)">
                                                                                        <g id="Group_684" data-name="Group 684">
                                                                                            <path id="Path_572" data-name="Path 572"
                                                                                                  d="M290.683,36h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,290.683,36Zm-.383,2.3h-1.533V36.767H290.3Z"
                                                                                                  transform="translate(-288 -36)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_687" data-name="Group 687"
                                                                                       transform="translate(6.133 9.367)">
                                                                                        <g id="Group_686" data-name="Group 686">
                                                                                            <path id="Path_573" data-name="Path 573"
                                                                                                  d="M130.683,116h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,130.683,116Zm-.383,2.3h-1.533v-1.533H130.3Z"
                                                                                                  transform="translate(-128 -116)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_689" data-name="Group 689"
                                                                                       transform="translate(9.967 9.367)">
                                                                                        <g id="Group_688" data-name="Group 688">
                                                                                            <path id="Path_574" data-name="Path 574"
                                                                                                  d="M210.683,116h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,210.683,116Zm-.383,2.3h-1.533v-1.533H210.3Z"
                                                                                                  transform="translate(-208 -116)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_691" data-name="Group 691"
                                                                                       transform="translate(13.8 9.367)">
                                                                                        <g id="Group_690" data-name="Group 690">
                                                                                            <path id="Path_575" data-name="Path 575"
                                                                                                  d="M290.683,116h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,290.683,116Zm-.383,2.3h-1.533v-1.533H290.3Z"
                                                                                                  transform="translate(-288 -116)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_693" data-name="Group 693"
                                                                                       transform="translate(6.133 13.2)">
                                                                                        <g id="Group_692" data-name="Group 692">
                                                                                            <path id="Path_576" data-name="Path 576"
                                                                                                  d="M130.683,196h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,130.683,196Zm-.383,2.3h-1.533v-1.533H130.3Z"
                                                                                                  transform="translate(-128 -196)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_695" data-name="Group 695"
                                                                                       transform="translate(9.967 13.2)">
                                                                                        <g id="Group_694" data-name="Group 694">
                                                                                            <path id="Path_577" data-name="Path 577"
                                                                                                  d="M210.683,196h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,210.683,196Zm-.383,2.3h-1.533v-1.533H210.3Z"
                                                                                                  transform="translate(-208 -196)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_697" data-name="Group 697"
                                                                                       transform="translate(13.8 13.2)">
                                                                                        <g id="Group_696" data-name="Group 696">
                                                                                            <path id="Path_578" data-name="Path 578"
                                                                                                  d="M290.683,196h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,290.683,196Zm-.383,2.3h-1.533v-1.533H290.3Z"
                                                                                                  transform="translate(-288 -196)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_699" data-name="Group 699"
                                                                                       transform="translate(6.133 17.033)">
                                                                                        <g id="Group_698" data-name="Group 698">
                                                                                            <path id="Path_579" data-name="Path 579"
                                                                                                  d="M130.683,276h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,130.683,276Zm-.383,2.3h-1.533v-1.533H130.3Z"
                                                                                                  transform="translate(-128 -276)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_701" data-name="Group 701"
                                                                                       transform="translate(9.967 17.033)">
                                                                                        <g id="Group_700" data-name="Group 700">
                                                                                            <path id="Path_580" data-name="Path 580"
                                                                                                  d="M210.683,276h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,210.683,276Zm-.383,2.3h-1.533v-1.533H210.3Z"
                                                                                                  transform="translate(-208 -276)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_703" data-name="Group 703"
                                                                                       transform="translate(13.8 17.033)">
                                                                                        <g id="Group_702" data-name="Group 702">
                                                                                            <path id="Path_581" data-name="Path 581"
                                                                                                  d="M290.683,276h-2.3a.383.383,0,0,0-.383.383v2.3a.383.383,0,0,0,.383.383h2.3a.383.383,0,0,0,.383-.383v-2.3A.383.383,0,0,0,290.683,276Zm-.383,2.3h-1.533v-1.533H290.3Z"
                                                                                                  transform="translate(-288 -276)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_705" data-name="Group 705"
                                                                                       transform="translate(1.533 11.283)">
                                                                                        <g id="Group_704" data-name="Group 704"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_582" data-name="Path 582"
                                                                                                  d="M32.767,156h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,156Z"
                                                                                                  transform="translate(-32 -156)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_707" data-name="Group 707"
                                                                                       transform="translate(3.067 11.283)">
                                                                                        <g id="Group_706" data-name="Group 706"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_583" data-name="Path 583"
                                                                                                  d="M64.767,156h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,156Z"
                                                                                                  transform="translate(-64 -156)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_709" data-name="Group 709"
                                                                                       transform="translate(1.533 12.817)">
                                                                                        <g id="Group_708" data-name="Group 708">
                                                                                            <path id="Path_584" data-name="Path 584"
                                                                                                  d="M32.767,188h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,188Z"
                                                                                                  transform="translate(-32 -188)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_711" data-name="Group 711"
                                                                                       transform="translate(3.067 12.817)">
                                                                                        <g id="Group_710" data-name="Group 710">
                                                                                            <path id="Path_585" data-name="Path 585"
                                                                                                  d="M64.767,188h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,188Z"
                                                                                                  transform="translate(-64 -188)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_713" data-name="Group 713"
                                                                                       transform="translate(1.533 14.35)">
                                                                                        <g id="Group_712" data-name="Group 712">
                                                                                            <path id="Path_586" data-name="Path 586"
                                                                                                  d="M32.767,220h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,220Z"
                                                                                                  transform="translate(-32 -220)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_715" data-name="Group 715"
                                                                                       transform="translate(3.067 14.35)">
                                                                                        <g id="Group_714" data-name="Group 714">
                                                                                            <path id="Path_587" data-name="Path 587"
                                                                                                  d="M64.767,220h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,220Z"
                                                                                                  transform="translate(-64 -220)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_717" data-name="Group 717"
                                                                                       transform="translate(1.533 15.883)">
                                                                                        <g id="Group_716" data-name="Group 716">
                                                                                            <path id="Path_588" data-name="Path 588"
                                                                                                  d="M32.767,252h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,252Z"
                                                                                                  transform="translate(-32 -252)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_719" data-name="Group 719"
                                                                                       transform="translate(3.067 15.883)">
                                                                                        <g id="Group_718" data-name="Group 718">
                                                                                            <path id="Path_589" data-name="Path 589"
                                                                                                  d="M64.767,252h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,252Z"
                                                                                                  transform="translate(-64 -252)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_721" data-name="Group 721"
                                                                                       transform="translate(1.533 17.417)">
                                                                                        <g id="Group_720" data-name="Group 720">
                                                                                            <path id="Path_590" data-name="Path 590"
                                                                                                  d="M32.767,284h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,284Z"
                                                                                                  transform="translate(-32 -284)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_723" data-name="Group 723"
                                                                                       transform="translate(3.067 17.417)">
                                                                                        <g id="Group_722" data-name="Group 722">
                                                                                            <path id="Path_591" data-name="Path 591"
                                                                                                  d="M64.767,284h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,284Z"
                                                                                                  transform="translate(-64 -284)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_725" data-name="Group 725"
                                                                                       transform="translate(1.533 18.95)">
                                                                                        <g id="Group_724" data-name="Group 724"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_592" data-name="Path 592"
                                                                                                  d="M32.767,316h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,316Z"
                                                                                                  transform="translate(-32 -316)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_727" data-name="Group 727"
                                                                                       transform="translate(3.067 18.95)">
                                                                                        <g id="Group_726" data-name="Group 726"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_593" data-name="Path 593"
                                                                                                  d="M64.767,316h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,316Z"
                                                                                                  transform="translate(-64 -316)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_729" data-name="Group 729"
                                                                                       transform="translate(1.533 20.483)">
                                                                                        <g id="Group_728" data-name="Group 728">
                                                                                            <path id="Path_594" data-name="Path 594"
                                                                                                  d="M32.767,348h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,348Z"
                                                                                                  transform="translate(-32 -348)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_731" data-name="Group 731"
                                                                                       transform="translate(3.067 20.483)">
                                                                                        <g id="Group_730" data-name="Group 730">
                                                                                            <path id="Path_595" data-name="Path 595"
                                                                                                  d="M64.767,348h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,348Z"
                                                                                                  transform="translate(-64 -348)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_733" data-name="Group 733"
                                                                                       transform="translate(1.533 22.017)">
                                                                                        <g id="Group_732" data-name="Group 732">
                                                                                            <path id="Path_596" data-name="Path 596"
                                                                                                  d="M32.767,380h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,380Z"
                                                                                                  transform="translate(-32 -380)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_735" data-name="Group 735"
                                                                                       transform="translate(3.067 22.017)">
                                                                                        <g id="Group_734" data-name="Group 734">
                                                                                            <path id="Path_597" data-name="Path 597"
                                                                                                  d="M64.767,380h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,380Z"
                                                                                                  transform="translate(-64 -380)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_737" data-name="Group 737"
                                                                                       transform="translate(1.533 23.55)">
                                                                                        <g id="Group_736" data-name="Group 736">
                                                                                            <path id="Path_598" data-name="Path 598"
                                                                                                  d="M32.767,412h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,32.767,412Z"
                                                                                                  transform="translate(-32 -412)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_739" data-name="Group 739"
                                                                                       transform="translate(3.067 23.55)">
                                                                                        <g id="Group_738" data-name="Group 738">
                                                                                            <path id="Path_599" data-name="Path 599"
                                                                                                  d="M64.767,412h-.383a.383.383,0,0,0-.383.383v.383a.383.383,0,0,0,.383.383h.383a.383.383,0,0,0,.383-.383v-.383A.383.383,0,0,0,64.767,412Z"
                                                                                                  transform="translate(-64 -412)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_741" data-name="Group 741"
                                                                                       transform="translate(19.167 8.983)">
                                                                                        <g id="Group_740" data-name="Group 740">
                                                                                            <path id="Path_600" data-name="Path 600"
                                                                                                  d="M401.917,108h-1.533a.383.383,0,0,0-.383.383v1.533a.383.383,0,0,0,.383.383h1.533a.383.383,0,0,0,.383-.383v-1.533A.383.383,0,0,0,401.917,108Zm-.383,1.533h-.767v-.767h.767Z"
                                                                                                  transform="translate(-400 -108)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_743" data-name="Group 743"
                                                                                       transform="translate(19.167 12.05)">
                                                                                        <g id="Group_742" data-name="Group 742">
                                                                                            <path id="Path_601" data-name="Path 601"
                                                                                                  d="M401.917,172h-1.533a.383.383,0,0,0-.383.383v1.533a.383.383,0,0,0,.383.383h1.533a.383.383,0,0,0,.383-.383v-1.533A.383.383,0,0,0,401.917,172Zm-.383,1.533h-.767v-.767h.767Z"
                                                                                                  transform="translate(-400 -172)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_745" data-name="Group 745"
                                                                                       transform="translate(19.167 15.117)">
                                                                                        <g id="Group_744" data-name="Group 744">
                                                                                            <path id="Path_602" data-name="Path 602"
                                                                                                  d="M401.917,236h-1.533a.383.383,0,0,0-.383.383v1.533a.383.383,0,0,0,.383.383h1.533a.383.383,0,0,0,.383-.383v-1.533A.383.383,0,0,0,401.917,236Zm-.383,1.533h-.767v-.767h.767Z"
                                                                                                  transform="translate(-400 -236)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_747" data-name="Group 747"
                                                                                       transform="translate(19.167 18.183)">
                                                                                        <g id="Group_746" data-name="Group 746"
                                                                                           transform="translate(0 0)">
                                                                                            <path id="Path_603" data-name="Path 603"
                                                                                                  d="M401.917,300h-1.533a.383.383,0,0,0-.383.383v1.533a.383.383,0,0,0,.383.383h1.533a.383.383,0,0,0,.383-.383v-1.533A.383.383,0,0,0,401.917,300Zm-.383,1.533h-.767v-.767h.767Z"
                                                                                                  transform="translate(-400 -300)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                    <g id="Group_749" data-name="Group 749"
                                                                                       transform="translate(19.167 21.25)">
                                                                                        <g id="Group_748" data-name="Group 748">
                                                                                            <path id="Path_604" data-name="Path 604"
                                                                                                  d="M401.917,364h-1.533a.383.383,0,0,0-.383.383v1.533a.383.383,0,0,0,.383.383h1.533a.383.383,0,0,0,.383-.383v-1.533A.383.383,0,0,0,401.917,364Zm-.383,1.533h-.767v-.767h.767Z"
                                                                                                  transform="translate(-400 -364)"/>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="price-item__content"><span>{tour.priceIncluded.otherCosts[1].title}</span>
                                                                        </div>
                                                                        <span className="price-item__number">{tour.priceIncluded.otherCosts[1].cost} đ</span>
                                                                    </div>
                                                                    <div className="price-item">
                                                                        <div className="price-item__icon">
                                                                            <svg
                                                                                id="restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle"
                                                                                xmlns="http://www.w3.org/2000/svg" width={23}
                                                                                height={23} viewBox="0 0 23 23">
                                                                                <g id="Group_750" data-name="Group 750">
                                                                                    <path id="Path_605" data-name="Path 605"
                                                                                          d="M39.525,29.813A9.692,9.692,0,0,0,35.35,48.255l.3-5.866s-.571-.187-.7-.248c-1.211-.533-2.091-2.1-2.091-4.143,0-2.225,1.725-4.141,3.393-4.157h.006c1.668.016,3.394,1.932,3.394,4.157,0,2.039-.881,3.609-2.09,4.143l-.7.255.339,6.522a9.507,9.507,0,0,0,5.4-.218l.3-5.812a3.116,3.116,0,0,1-1.89-1.31c-.524-.785.4-7.737.4-7.737h.6v6.523h.6V33.842h.656v6.524h.6V33.842h.68v6.524h.6V33.842h.463s.928,6.951.4,7.737a3.125,3.125,0,0,1-1.87,1.307l-.027.01.261,5a9.693,9.693,0,0,0-4.863-18.082Z"
                                                                                          transform="translate(-28.024 -28.012)"
                                                                                          fill="#414141"/>
                                                                                    <path id="Path_606" data-name="Path 606"
                                                                                          d="M91.56,142.218a2.79,2.79,0,0,1,.084-.278.127.127,0,0,0-.071-.141.116.116,0,0,0-.152.033s-.066.106-.163.262a2.81,2.81,0,0,0-.273.617,5.1,5.1,0,0,0-.187.895,4.269,4.269,0,0,0-.014.519,2.455,2.455,0,0,0,.1.55,3.56,3.56,0,0,0,.867,1.583,2.984,2.984,0,0,0,.464.376l.044.031c.027.018.052.034.078.049a.889.889,0,0,0,.187.077.112.112,0,0,0,.127-.053.114.114,0,0,0-.038-.135,1.213,1.213,0,0,1-.138-.151,2.74,2.74,0,0,1-.178-.244c-.047-.069-.1-.147-.155-.223a7.849,7.849,0,0,1-.612-1.506,2,2,0,0,1-.086-.415,4.235,4.235,0,0,1-.024-.443,5.856,5.856,0,0,1,.036-.823A3.212,3.212,0,0,1,91.56,142.218Z"
                                                                                          transform="translate(-85.297 -133.218)"
                                                                                          fill="#414141"/>
                                                                                    <path id="Path_607" data-name="Path 607"
                                                                                          d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.514,11.514,0,0,0,11.5,0Zm0,22.142A10.643,10.643,0,1,1,22.144,11.5,10.655,10.655,0,0,1,11.5,22.142Z"
                                                                                          fill="#414141"/>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="price-item__content"><span>{tour.priceIncluded.otherCosts[2].title}</span>
                                                                        </div>
                                                                        <span className="price-item__number">{tour.priceIncluded.otherCosts[2].cost} đ</span>
                                                                    </div>
                                                                    {tour.priceIncluded.otherCosts.map((other,index) =>
                                                                        <div style={{display: index > 2 ? 'block' : 'none'}} className="price-item">
                                                                            <div className="price-item__icon">
                                                                                <div className="dot"/>
                                                                            </div>
                                                                            <div className="price-item__content">
                                                                                <p>
                                                                                    {other.title}
                                                                                </p>
                                                                            </div>
                                                                            <span className="price-item__number">{other.cost} đ</span>
                                                                        </div>
                                                                    )}
                                                                    <h2 className="title mt-48px">Giá tour:</h2>
                                                                    <div className="price-table">
                                                                        <p className="price-table__note">
                                                                            Giá tour sẽ giảm tương ứng với số người tham gia. Hãy mời bạn bè hoặc người thân để nhận những ưu đãi từ Thanktriips
                                                                        </p>
                                                                        <div className="table">
                                                                            <div className="thead">
                                                                                <div className="th number"><span>SỐ NGƯỜI</span>
                                                                                </div>
                                                                                <div className="th corresponding-price"><span>MỨC GIÁ TƯƠNG ỨNG</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="tbody">
                                                                                <div className="tr">
                                                                                    <div className="td number">
                                                                                        <span>10 người</span></div>
                                                                                    <div className="th corresponding-price"><span>Discount {tour.faresByPeople.from10To20}% = {formatNumber((100-tour.faresByPeople.from10To20)*tour.basePrice/100)} đ</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tr">
                                                                                    <div className="td number">
                                                                                        <span>20 người</span></div>
                                                                                    <div className="th corresponding-price"><span>Discount {tour.faresByPeople.from20To30}% = {formatNumber((100-tour.faresByPeople.from20To30)*tour.basePrice/100)} đ</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tr">
                                                                                    <div className="td number">
                                                                                        <span>30 người</span></div>
                                                                                    <div className="th corresponding-price"><span>Discount {tour.faresByPeople.from30}% = {formatNumber((100-tour.faresByPeople.from30)*tour.basePrice/100)} đ</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {tour.priceNotIncluded.length > 0 ? (
                                                                        <h2 className="title mt-48px">Không bao gồm:</h2>
                                                                    ) : ''}
                                                                    {tour.priceNotIncluded.map((item)=>
                                                                        <div className="price-item">
                                                                            <div className="price-item__icon">
                                                                                <div className="dot"/>
                                                                            </div>
                                                                            <div className="price-item__content">
                                                                                <p>
                                                                                    {item.title}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <div className="d-flex justify-content-end align-items-center py-3">
                                                                        <a className="btn-download mr-40px" href="#">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={26}
                                                                                 height={24} viewBox="0 0 26 24">
                                                                                <g>
                                                                                    <g>
                                                                                        <g>
                                                                                            <path fill="#656565"
                                                                                                  d="M25 16h-2c-.6 0-1 .4-1 1v2.5c0 .3-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5V17c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h24c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1z"/>
                                                                                        </g>
                                                                                        <g>
                                                                                            <path fill="#656565"
                                                                                                  d="M12.3 15.7c.2.2.5.3.7.3.2 0 .5-.1.7-.3l6-6c.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7l-1.4-1.4c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-1 1c-.3.3-.9.1-.9-.4V1c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v6.6c0 .4-.5.7-.9.4l-1-1c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3L6.3 8.4c-.2.2-.3.4-.3.7 0 .3.1.5.3.7z"/>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                            <span>Download</span>
                                                                        </a>
                                                                        <a className="btn-print" href="#">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={23}
                                                                                 height={21} viewBox="0 0 23 21">
                                                                                <g>
                                                                                    <g>
                                                                                        <g>
                                                                                            <g>
                                                                                                <path fill="#656565"
                                                                                                      d="M7 18.2h8.4v1.4H7zm0-2.8h8.4v1.4H7zM5.6 21h11.2v-7H5.6z"/>
                                                                                            </g>
                                                                                            <g>
                                                                                                <path fill="#656565"
                                                                                                      d="M16.8 4.2V0H5.6v7h11.2z"/>
                                                                                            </g>
                                                                                            <g>
                                                                                                <path fill="#656565"
                                                                                                      d="M19.6 4.2h-1.4V8.4h-14V4.2H2.8C1.4 4.2 0 5.6 0 7v7c0 1.4 1.4 2.8 2.8 2.8h1.4V12.6h14V16.8h1.4c1.4 0 2.8-1.4 2.8-2.8V7c0-1.4-1.4-2.8-2.8-2.8z"/>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                            <span>Print</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="other-start">
                                                                    <h2 className="title">Ngày khởi hành khác</h2>
                                                                    <div className="top">
                                                                        <p className="note">
                                                                            Cùng một tour nhưng khác ngày khởi hành
                                                                        </p>
                                                                        <a className="link">See more</a>
                                                                    </div>
                                                                    {tour.schedules.map((schedule) =>
                                                                        <div className="day">
                                                                            <a href={'/tour/'+schedule._id} className="link">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={22}
                                                                                     height="15.14" viewBox="0 0 22 15.14">
                                                                                    <g transform="translate(0 -41.916)">
                                                                                        <path
                                                                                            d="M21.7,48.763l-6.547-6.547a1.023,1.023,0,0,0-1.447,1.447l4.8,4.8H1.023a1.023,1.023,0,1,0,0,2.046H18.507l-4.8,4.8a1.023,1.023,0,0,0,1.447,1.447L21.7,50.209A1.023,1.023,0,0,0,21.7,48.763Z"
                                                                                            transform="translate(0 0)" fill="#fff"/>
                                                                                    </g>
                                                                                </svg>
                                                                            </a>
                                                                            <div className="day__content">
                                                                                <p className="date">
                                                                                    {formatDate(schedule.departureDay,true)}
                                                                                </p>
                                                                                <div className="joined group-people">
                                                                                    <div className="img-wrap group-people__item"><img
                                                                                        className="img-full-height"
                                                                                        src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                                    <div className="img-wrap group-people__item"><img
                                                                                        className="img-full-height"
                                                                                        src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                                    <div className="img-wrap group-people__item"><img
                                                                                        className="img-full-height"
                                                                                        src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                                    <div className="img-wrap group-people__item"><img
                                                                                        className="img-full-height"
                                                                                        src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                                    <span className="plus">+4 joined</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="day__price">
                                                                                <p className="seating">Còn 15 Chỗ</p>
                                                                                <p className="price">{formatNumber(tour.basePrice)} đ</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={(this.isActiveTab(3) ? "active" : "") + " tab__content-item js-tab-content-item term"}>
                                                                <div className="book-tour px-0">
                                                                    <p className="price">{formatNumber(tour.basePrice)} đ</p>
                                                                    <a href='#' className="btn btn--bg-linear" onClick={(ev) => this.openModalBook(ev)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={27}
                                                                             height={19} viewBox="0 0 27 19">
                                                                            <g>
                                                                                <g>
                                                                                    <path fill="#919191"
                                                                                          d="M19.718 14.987c.22 0 .426.042.615.121.198.08.375.198.524.347v.004a1.601 1.601 0 0 1 0 2.273v.003c-.15.15-.326.268-.524.347-.189.08-.396.122-.615.122-.219 0-.426-.042-.615-.122a1.517 1.517 0 0 1-.52-.347l-.003-.003a1.6 1.6 0 0 1 0-2.273v-.004c.149-.149.326-.267.523-.347.19-.079.396-.121.615-.121zm2.682-.38c.155 0 .304.03.442.084.14.058.267.147.374.253.106.107.195.234.253.374a1.203 1.203 0 0 1 0 .89c-.058.14-.147.267-.253.374a1.215 1.215 0 0 1-.374.252 1.187 1.187 0 0 1-.442.086h-.402l.019-.162v-.003l.006-.055v-.003l.003-.054v-.113c0-.347-.086-.633-.198-.865a3.017 3.017 0 0 0-.344-.53l-.003-.002c-.098-.131-.17-.22-.17-.32 0-.073.018-.122.06-.152.046-.04.128-.055.247-.055h.782zM1.56 3.014a1.136 1.136 0 0 1-.374-.25 1.15 1.15 0 0 1-.27-1.215l.005-.012v-.006l.013-.024v-.006a1.172 1.172 0 0 1 .62-.621 1.153 1.153 0 0 1 .883 0c.433.176.82.359 1.166.548.35.191.667.392.947.602.268.201.508.408.727.627.217.22.411.45.588.694l.021.03h19.792v.01l.055.018.052.016a.75.75 0 0 1 .277.155c.082.07.15.155.2.25.047.097.077.2.086.31a.875.875 0 0 1-.036.316l-1.903 5.796c-.076.238-.17.466-.28.68-.113.218-.24.428-.38.623-.14.198-.299.38-.47.551-.17.17-.352.326-.547.469-.195.14-.399.265-.615.374a4.75 4.75 0 0 1-.67.274l-.024.006a4.81 4.81 0 0 1-1.419.22H8.976v-.007l-.08.007a.831.831 0 0 0-.398.124.92.92 0 0 0-.301.302.734.734 0 0 0-.058.121.427.427 0 0 0-.021.231c.009.034.02.068.036.098.049.08.131.15.259.198.106.04.25.07.426.08.122.005.204.03.25.07.04.036.057.09.051.167a.34.34 0 0 1-.051.146 1.9 1.9 0 0 1-.128.188 2.802 2.802 0 0 0-.332.524c-.11.225-.192.502-.192.831l.003.082v.006l.003.07v.016l.015.188-.185-.03a3.69 3.69 0 0 1-.347-.07 2.687 2.687 0 0 1-.326-.095l-.012-.006a2.748 2.748 0 0 1-.57-.27 2.506 2.506 0 0 1-.63-.552 2.268 2.268 0 0 1-.387-.715 2.44 2.44 0 0 1-.06-1.178c.024-.134.061-.268.107-.405.033-.094.073-.188.118-.283.043-.094.092-.192.146-.283.043-.076.092-.152.144-.228.051-.076.103-.152.16-.225l.025-.03-.012-.04a56.02 56.02 0 0 1-.874-2.855l-.24-.871a40.22 40.22 0 0 0-.597-2.025v-.003c-.204-.6-.423-1.123-.697-1.583-.27-.45-.6-.843-1.026-1.19-.426-.35-.946-.654-1.604-.928l-.03-.012zm10.892 11.591h5.586a.21.21 0 0 1 .192.122.21.21 0 0 1-.025.225 2.69 2.69 0 0 0-.581 1.967h-4.758a2.756 2.756 0 0 0-.584-1.97.215.215 0 0 1 .17-.344zm9.12-6.688h1.878l.917-2.794.03-.097h-2.825zm-3.71 0h2.715V5.027H17.86zm-3.708 0h2.715V5.027h-2.715zm-3.708 0h2.715V5.027h-2.715zm-2.749 0h1.757V5.027H6.769l.04.1c.197.493.368.992.52 1.495.131.429.25.861.368 1.296zm1.757.993H7.962c.125.472.256.94.399 1.41.15.483.314.964.502 1.436l.022.049h.569zm3.707 0h-2.715v2.895h2.715zm3.708 0h-2.715v2.895h2.715zm3.708 0H17.86v2.895h2.143c.125 0 .25-.01.375-.025.064-.006.13-.015.198-.027V8.91zm2.548 0h-1.553v2.466c.064-.037.128-.08.186-.122l.006-.003.003-.003c.125-.119.24-.229.35-.341.107-.11.21-.223.298-.335.089-.116.17-.238.244-.372a2.98 2.98 0 0 0 .192-.453zm-12.368 6.076c.219 0 .426.042.615.121.197.08.374.198.523.347v.004a1.601 1.601 0 0 1 0 2.273l-.021.025a1.59 1.59 0 0 1-.502.325 1.603 1.603 0 0 1-1.753-.35l-.022-.02a1.564 1.564 0 0 1-.329-.5 1.655 1.655 0 0 1-.122-.618c0-.216.046-.426.122-.615.082-.195.201-.371.347-.52l.003-.004a1.609 1.609 0 0 1 1.138-.469z"/>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span>Đặt Tour</span>
                                                                    </a>
                                                                </div>
                                                                <div className="description">
                                                                    <h1 className="description__title">
                                                                        Điều khoản sử dụng dịch vụ
                                                                    </h1>
                                                                    <p className="description__content show">Lorem ipsum dolor sit
                                                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                                                        tempor invidunt ut labore et dolore magna aliquyam erat, sed
                                                                        diam voluptua. At vero eos et accusam et justo duo dolores
                                                                        et ea rebum. Stet clita kasd gubergren.
                                                                    </p>
                                                                    <a className="see-more" href="#">See more</a>
                                                                </div>
                                                                <div className="term__item">
                                                                    <h3 className="term__title">1/ ĐỐI VỚI NGƯỜI NƯỚC NGOÀI, VIỆT
                                                                        KIỀU, NGƯỜI GIÀ &amp; TRẺ EM</h3>
                                                                    <ul className="term__list">
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="term__item">
                                                                    <h3 className="term__title">2/ QUY TRÌNH VÀ THỰC HIỆN</h3>
                                                                    <ul className="term__list">
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="term__item">
                                                                    <h3 className="term__title">3/ GHI CHÚ</h3>
                                                                    <ul className="term__list">
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                        <li><span className="dot"/><span>Hộ chiếu: còn hạn trên 6 tháng tính từ ngày kết thúc chuyến đi</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="d-flex justify-content-end align-items-center pt-2">
                                                                    <a className="btn-download mr-40px" href="#">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={26}
                                                                             height={24} viewBox="0 0 26 24">
                                                                            <g>
                                                                                <g>
                                                                                    <g>
                                                                                        <path fill="#656565"
                                                                                              d="M25 16h-2c-.6 0-1 .4-1 1v2.5c0 .3-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5V17c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h24c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1z"/>
                                                                                    </g>
                                                                                    <g>
                                                                                        <path fill="#656565"
                                                                                              d="M12.3 15.7c.2.2.5.3.7.3.2 0 .5-.1.7-.3l6-6c.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7l-1.4-1.4c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-1 1c-.3.3-.9.1-.9-.4V1c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v6.6c0 .4-.5.7-.9.4l-1-1c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3L6.3 8.4c-.2.2-.3.4-.3.7 0 .3.1.5.3.7z"/>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span>Download</span>
                                                                    </a>
                                                                    <a className="btn-print" href="#">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={23}
                                                                             height={21} viewBox="0 0 23 21">
                                                                            <g>
                                                                                <g>
                                                                                    <g>
                                                                                        <g>
                                                                                            <path fill="#656565"
                                                                                                  d="M7 18.2h8.4v1.4H7zm0-2.8h8.4v1.4H7zM5.6 21h11.2v-7H5.6z"/>
                                                                                        </g>
                                                                                        <g>
                                                                                            <path fill="#656565"
                                                                                                  d="M16.8 4.2V0H5.6v7h11.2z"/>
                                                                                        </g>
                                                                                        <g>
                                                                                            <path fill="#656565"
                                                                                                  d="M19.6 4.2h-1.4V8.4h-14V4.2H2.8C1.4 4.2 0 5.6 0 7v7c0 1.4 1.4 2.8 2.8 2.8h1.4V12.6h14V16.8h1.4c1.4 0 2.8-1.4 2.8-2.8V7c0-1.4-1.4-2.8-2.8-2.8z"/>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        <span>Print</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tour-comment">
                                                    <div className="tour-comment__top">
                                                        <div className="tour-place__liked"></div>
                                                        <div className="tour-place__interaction-right">
                                                            <div className="tour-place__point">
                                                                <div className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.857"
                                                                         height="15.887" viewBox="0 0 17.857 15.887">
                                                                        <path id="heart"
                                                                              d="M8.928,15.887a1.047,1.047,0,0,1-.69-.259C7.517,15,6.821,14.4,6.208,13.881l0,0A37.761,37.761,0,0,1,1.771,9.717,6.646,6.646,0,0,1,0,5.366,5.581,5.581,0,0,1,1.417,1.555,4.8,4.8,0,0,1,4.988,0,4.492,4.492,0,0,1,7.794.969,5.74,5.74,0,0,1,8.928,2.153,5.741,5.741,0,0,1,10.063.969,4.491,4.491,0,0,1,12.868,0,4.8,4.8,0,0,1,16.44,1.555a5.581,5.581,0,0,1,1.416,3.812,6.646,6.646,0,0,1-1.771,4.35,37.757,37.757,0,0,1-4.433,4.161c-.615.524-1.311,1.117-2.034,1.75a1.048,1.048,0,0,1-.69.259ZM4.988,1.046a3.767,3.767,0,0,0-2.8,1.218,4.54,4.54,0,0,0-1.14,3.1A5.592,5.592,0,0,0,2.576,9.05a37.16,37.16,0,0,0,4.306,4.033l0,0C7.5,13.61,8.2,14.2,8.927,14.84c.731-.637,1.43-1.233,2.047-1.758A37.169,37.169,0,0,0,15.28,9.05a5.593,5.593,0,0,0,1.53-3.683,4.54,4.54,0,0,0-1.14-3.1,3.767,3.767,0,0,0-2.8-1.218A3.469,3.469,0,0,0,10.7,1.8,5.076,5.076,0,0,0,9.5,3.193a.66.66,0,0,1-1.134,0A5.071,5.071,0,0,0,7.154,1.8a3.469,3.469,0,0,0-2.166-.75Zm0,0"
                                                                              transform="translate(0 0)" opacity="0.62"/>
                                                                    </svg>
                                                                </div>
                                                                <span>0</span>
                                                            </div>
                                                            <div className="tour-place__comment">
                                                                <div className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20.801"
                                                                         height="15.887" viewBox="0 0 20.801 15.887">
                                                                        <g id="comment" opacity="0.62">
                                                                            <path id="Path_382" data-name="Path 382"
                                                                                  d="M0,19.47V9.292A5.716,5.716,0,0,1,5.709,3.583H15.09A5.716,5.716,0,0,1,20.8,9.292v1.756a5.716,5.716,0,0,1-5.709,5.709H5.841ZM5.709,4.856A4.441,4.441,0,0,0,1.273,9.292v8.183l4.288-1.992h9.531a4.441,4.441,0,0,0,4.436-4.436V9.291A4.442,4.442,0,0,0,15.09,4.855H5.709ZM6.128,9.2a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,6.128,9.2Zm8.543,0a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,14.671,9.2ZM10.4,9.2a1.21,1.21,0,1,1-1.21,1.21A1.21,1.21,0,0,1,10.4,9.2Z"
                                                                                  transform="translate(0 -3.583)" fill="#010002"/>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <span>0</span>
                                                            </div>
                                                            <div className="tour-place__shared">
                                                                <div className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16}
                                                                         viewBox="0 0 18 16">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#ff6200"
                                                                                      d="M17.824 5.274L12.75.2a.61.61 0 0 0-.446-.189.61.61 0 0 0-.445.189.61.61 0 0 0-.189.445v2.537H9.45c-4.71 0-7.6 1.331-8.67 3.993-.35.885-.525 1.985-.525 3.3 0 1.096.42 2.586 1.259 4.469a23.402 23.402 0 0 0 .237.535c.04.085.083.158.13.217.079.113.171.17.277.17a.29.29 0 0 0 .233-.1.37.37 0 0 0 .084-.247c0-.06-.008-.147-.025-.263a2.05 2.05 0 0 1-.025-.233c-.033-.449-.05-.856-.05-1.219 0-.667.059-1.265.174-1.793.116-.529.276-.986.48-1.372.206-.387.47-.72.793-1.001.324-.28.672-.51 1.046-.689a5.667 5.667 0 0 1 1.318-.42 12.565 12.565 0 0 1 1.526-.214c.512-.04 1.091-.06 1.739-.06h2.22v2.537c0 .172.062.32.187.446a.61.61 0 0 0 .446.188.61.61 0 0 0 .446-.188l5.073-5.073a.61.61 0 0 0 .189-.446.61.61 0 0 0-.188-.446z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <span>0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tour-comment__body">
                                                        <h2 className="title">Bình Luận</h2>
                                                    </div>
                                                    <div className="tour-comment__bottom">
                                                        <div className="tour-comment__form">
                                                            <div className="avatar">
                                                                <img className="img-full-height" src={imagesUrl + "avatar-demo2.png"}/>
                                                            </div>
                                                            <input className="form-control" type="text"
                                                                   placeholder="Write your comment?"/>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20.134" height="17.449"
                                                                 viewBox="0 0 20.134 17.449">
                                                                <g id="photo-camera" opacity="0.36">
                                                                    <g id="Group_407" data-name="Group 407"
                                                                       transform="translate(0 0)">
                                                                        <path id="Path_384" data-name="Path 384"
                                                                              d="M19.348,40.011a2.587,2.587,0,0,0-1.9-.786H15.1L14.566,37.8a1.948,1.948,0,0,0-.729-.886,1.868,1.868,0,0,0-1.085-.372H7.382a1.868,1.868,0,0,0-1.085.372,1.948,1.948,0,0,0-.729.886l-.535,1.426H2.685a2.587,2.587,0,0,0-1.9.786A2.586,2.586,0,0,0,0,41.909v9.4a2.586,2.586,0,0,0,.786,1.9,2.586,2.586,0,0,0,1.9.787H17.449A2.685,2.685,0,0,0,20.134,51.3v-9.4A2.586,2.586,0,0,0,19.348,40.011Zm-5.962,9.915a4.524,4.524,0,0,1-3.319,1.379,4.524,4.524,0,0,1-3.319-1.379,4.683,4.683,0,0,1,0-6.638,4.524,4.524,0,0,1,3.319-1.379,4.525,4.525,0,0,1,3.319,1.379,4.683,4.683,0,0,1,0,6.638Z"
                                                                              transform="translate(0 -36.54)" fill="#9c9c9c"/>
                                                                        <path id="Path_385" data-name="Path 385"
                                                                              d="M194.876,228.4a3.026,3.026,0,1,0,2.134.886A2.909,2.909,0,0,0,194.876,228.4Z"
                                                                              transform="translate(-184.809 -221.356)"
                                                                              fill="#9c9c9c"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-12 col-custom">
                                                <div className="card card-countdown-start-tour">
                                                    <h4 className="title">Thời gian khởi hành còn lại<br/>(theo ngày)</h4>
                                                    <div className="countdown">
                                                        <div className="bloc-time min" data-init-value={120}>
                                                            <div className="figure min min-1">
                                                                <span className="top">1</span><span
                                                                className="top-back"><span>1</span></span><span
                                                                className="bottom">1</span><span
                                                                className="bottom-back"><span>1</span></span>
                                                                <div className="separator-round">
                                                                    <svg className="separator-round__left"
                                                                         xmlns="http://www.w3.org/2000/svg" width={25} height={49}
                                                                         viewBox="0 0 25 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    <div className="separator-round__dashed"/>
                                                                    <svg className="separator-round__right"
                                                                         xmlns="http://www.w3.org/2000/svg" width={24} height={49}
                                                                         viewBox="0 0 24 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="figure min min-2">
                                                                <span className="top">2</span><span
                                                                className="top-back"><span>2</span></span><span
                                                                className="bottom">2</span><span
                                                                className="bottom-back"><span>2</span></span>
                                                                <div className="separator-round">
                                                                    <svg className="separator-round__left"
                                                                         xmlns="http://www.w3.org/2000/svg" width={25} height={49}
                                                                         viewBox="0 0 25 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    <div className="separator-round__dashed"/>
                                                                    <svg className="separator-round__right"
                                                                         xmlns="http://www.w3.org/2000/svg" width={24} height={49}
                                                                         viewBox="0 0 24 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="figure min min-3">
                                                                <span className="top">0</span><span
                                                                className="top-back"><span>0</span></span><span
                                                                className="bottom">0</span><span
                                                                className="bottom-back"><span>0</span></span>
                                                                <div className="separator-round">
                                                                    <svg className="separator-round__left"
                                                                         xmlns="http://www.w3.org/2000/svg" width={25} height={49}
                                                                         viewBox="0 0 25 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M.5 49C.342 49 .173 49 0 48.997V.005a24.346 24.346 0 0 1 10.037 1.92c2.917 1.234 5.537 3 7.787 5.25A24.409 24.409 0 0 1 25 24.5a24.42 24.42 0 0 1-7.176 17.325A24.421 24.421 0 0 1 .5 49.002z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    <div className="separator-round__dashed"/>
                                                                    <svg className="separator-round__right"
                                                                         xmlns="http://www.w3.org/2000/svg" width={24} height={49}
                                                                         viewBox="0 0 24 49">
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#fff"
                                                                                      d="M24 48.996H24v-.001A24.432 24.432 0 0 1 7.013 41.66 24.358 24.358 0 0 1 0 24.5 24.36 24.36 0 0 1 7.013 7.34 24.437 24.437 0 0 1 24 .007z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="time">
                                                        <span className="time__title">Khởi hành ngày:&nbsp;</span>
                                                        <span className="text-blue-sky">
                                                        {formatDate(schedule.departureDay)}
                                                    </span>
                                                    </p>
                                                    <a className="btn-share btn btn--medium btn--bg-linear" href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16}
                                                             viewBox="0 0 18 16">
                                                            <g>
                                                                <g>
                                                                    <path fill="#ff6200"
                                                                          d="M17.824 5.274L12.75.2a.61.61 0 0 0-.446-.189.61.61 0 0 0-.445.189.61.61 0 0 0-.189.445v2.537H9.45c-4.71 0-7.6 1.331-8.67 3.993-.35.885-.525 1.985-.525 3.3 0 1.096.42 2.586 1.259 4.469a23.402 23.402 0 0 0 .237.535c.04.085.083.158.13.217.079.113.171.17.277.17a.29.29 0 0 0 .233-.1.37.37 0 0 0 .084-.247c0-.06-.008-.147-.025-.263a2.05 2.05 0 0 1-.025-.233c-.033-.449-.05-.856-.05-1.219 0-.667.059-1.265.174-1.793.116-.529.276-.986.48-1.372.206-.387.47-.72.793-1.001.324-.28.672-.51 1.046-.689a5.667 5.667 0 0 1 1.318-.42 12.565 12.565 0 0 1 1.526-.214c.512-.04 1.091-.06 1.739-.06h2.22v2.537c0 .172.062.32.187.446a.61.61 0 0 0 .446.188.61.61 0 0 0 .446-.188l5.073-5.073a.61.61 0 0 0 .189-.446.61.61 0 0 0-.188-.446z"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <span>Chia sẻ Tour</span>
                                                    </a>
                                                    <p className="note">
                                                        Chia sẽ Tour và nhận ngay 100,000đ cho mỗi lượt book thành công
                                                    </p>
                                                </div>
                                                <div className="card card-sale-tour">
                                                    <h2 className="card__title">Similars Tour</h2>
                                                    <div className="card__content">
                                                        <div className="tour bg-img-base js-lazy-load" data-src={imagesUrl + "bg-banner.png"}
                                                             data-type="background-image" style={{backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}}>
                                                            <div className="tour__review">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7}
                                                                     viewBox="0 0 8 7">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"/>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            <div className="price-tag">
                                                                <p className="current">5.000.000 đ</p>
                                                                <p className="sale"><span
                                                                    className="sale__percent">- 30%&nbsp;</span><span
                                                                    className="old-price">7.000.000 đ</span></p>
                                                            </div>
                                                            <div className="tour__content">
                                                                <div className="tour__content-bottom">
                                                                    <h3 className="tour__title">Phượt Vũng Tàu</h3>
                                                                    <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span
                                                                        className="text-white ml-1">nữa khởi hành</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tour bg-img-base js-lazy-load"
                                                             data-src={imagesUrl + "bg-banner.png"}
                                                             data-type="background-image"
                                                             style={{backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}}>
                                                            <div className="tour__review">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7}
                                                                     viewBox="0 0 8 7">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"/>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            <div className="price-tag">
                                                                <p className="current">5.000.000 đ</p>
                                                                <p className="sale"><span
                                                                    className="sale__percent">- 30%&nbsp;</span><span
                                                                    className="old-price">7.000.000 đ</span></p>
                                                            </div>
                                                            <div className="tour__content">
                                                                <div className="tour__content-bottom">
                                                                    <h3 className="tour__title">Phượt Vũng Tàu</h3>
                                                                    <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span
                                                                        className="text-white ml-1">nữa khởi hành</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tour bg-img-base js-lazy-load"
                                                             data-src={imagesUrl + "bg-banner.png"}
                                                             data-type="background-image"
                                                             style={{backgroundImage: `url(${imagesUrl + "bg-banner.png"})`}}
                                                        >
                                                            <div className="tour__review">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.871"
                                                                     height="12.241" viewBox="0 0 12.871 12.241">
                                                                    <path id="Path_435" data-name="Path 435"
                                                                          d="M439.081,1897.577l1.989,4.029,4.447.646-3.218,3.136.76,4.429-3.977-2.091-3.977,2.091.76-4.429-3.218-3.136,4.447-.646Z"
                                                                          transform="translate(-432.646 -1897.577)" fill="#ffc200"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7}
                                                                     viewBox="0 0 8 7">
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#fff"
                                                                                  d="M4.072-.136l1.103 2.237 2.468.359L5.857 4.2 6.28 6.66l-2.207-1.16-2.208 1.16.422-2.459L.5 2.46l2.468-.36z"/>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            <div className="price-tag">
                                                                <p className="current">5.000.000 đ</p>
                                                                <p className="sale"><span
                                                                    className="sale__percent">- 30%&nbsp;</span><span
                                                                    className="old-price">7.000.000 đ</span></p>
                                                            </div>
                                                            <div className="tour__content">
                                                                <div className="tour__content-bottom">
                                                                    <h3 className="tour__title">Phượt Vũng Tàu</h3>
                                                                    <p className="tour__start"><span className="text-blue-sky">5 ngày</span><span
                                                                        className="text-white ml-1">nữa khởi hành</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="link-wrap">
                                                            <a className="link-show-all">
                                                                <span>Show All</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7}
                                                                     viewBox="0 0 13 7">
                                                                    <g>
                                                                        <g>
                                                                            <g>
                                                                                <path fill="#919191"
                                                                                      d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"/>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card card-joined-friend">
                                                    <h2 className="card__title">Joined Friends</h2>
                                                    <div className="card__content">
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__tp">90.000 TP</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Bill Gate</h4>
                                                                <p className="member__tp">90.000 TP</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Elon Musk</h4>
                                                                <p className="member__tp">90.000 TP</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card card-bought-friend">
                                                    <h2 className="card__title">Bought Friends</h2>
                                                    <div className="card__content">
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__time">10 tháng trước</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__time">10 tháng trước</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__time">10 tháng trước</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__time">10 tháng trước</p>
                                                            </div>
                                                        </div>
                                                        <div className="member">
                                                            <div className="member__avatar">
                                                                <div className="member__avatar-wrap"><img
                                                                    className="img-full-height"
                                                                    src={imagesUrl + "avatar-demo2.png"}/></div>
                                                                <img className="member__top" src={imagesUrl + "medal_1.png"}/>
                                                            </div>
                                                            <div className="member__content">
                                                                <h4 className="member__name">Chou Tzuyu</h4>
                                                                <p className="member__time">10 tháng trước</p>
                                                            </div>
                                                        </div>
                                                        <a className="link-view-more">
                                                            <span>View more</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7}
                                                                 viewBox="0 0 13 7">
                                                                <g>
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#919191"
                                                                                  d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"/>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={modalBook ? 'modal modal-popup show' : 'modal modal-popup'} id="popup-loading">
                                <div className="modal-popup__content modal-book-tour" style={{width: '735px'}}>
                                    <div className="card card-book-tour">
                                        <div className="tour">
                                            <div className="tour__thumbnail bg-img-base js-lazy-load" style={{backgroundImage: 'url('+tour.avatar+')'}}></div>
                                            <div className="tour__detail">
                                                <p className="date">{formatDate(schedule.departureDay,true)}</p>
                                                <h3 className="title">
                                                    {tour.title}
                                                </h3>
                                                <div className="d-flex flex-wrap">
                                                    <div className="detail-left">
                                                        <div className="tour__rate">
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
                                                        <div className="tour__days-left">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="calendar_1_"
                                                                 data-name="calendar(1)" width="15.946" height="15.946"
                                                                 viewBox="0 0 15.946 15.946">
                                                                <g id="Group_451" data-name="Group 451">
                                                                    <g id="Group_450" data-name="Group 450">
                                                                        <circle id="Ellipse_6" data-name="Ellipse 6"
                                                                                cx="0.623" cy="0.623" r="0.623"
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
                                                                        <circle id="Ellipse_7" data-name="Ellipse 7"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(8.689 5.918)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_8" data-name="Ellipse 8"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(5.98 8.627)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_9" data-name="Ellipse 9"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(3.27 5.918)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_10" data-name="Ellipse 10"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(3.27 8.627)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_11" data-name="Ellipse 11"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(3.27 11.337)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_12" data-name="Ellipse 12"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(5.98 11.337)"
                                                                                fill="#878181"></circle>
                                                                        <circle id="Ellipse_13" data-name="Ellipse 13"
                                                                                cx="0.623" cy="0.623" r="0.623"
                                                                                transform="translate(5.98 5.918)"
                                                                                fill="#878181"></circle>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span>5 days</span>
                                                        </div>
                                                    </div>
                                                    <div className="detail-right">
                                                        <p className="price">{formatNumber(tour.basePrice)} đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="separator-round">
                                            <div className="separator-round__dashed" style={{width: '100%'}}></div>
                                        </div>
                                        <div className="customer">
                                            <h2 className="customer__title">Hành Khách</h2>
                                            <div className="customer__item">
                                                <div className="customer__type">
                                                    <div className="customer__icon">
                                                        <img src="/assests/images/icon_adult_couple.png" width="19px"/>
                                                    </div>
                                                    <div className="content">
                                                        <p className="title">Người lớn</p>
                                                        <p className="percent-price">{100 - tour.faresByAge.adult}% giá vé</p>
                                                    </div>
                                                </div>
                                                <div className="input-number">
                                                    <div className="minus" onClick={() => this.handleUpAndDownPeople('adult','down')}>
                                                        <img src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                    <p className="display">{adult}</p>
                                                    <div className="plus" onClick={() => this.handleUpAndDownPeople('adult','up')}>
                                                        <img className="rotate-180" src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                </div>
                                                <p className="price">{formatNumber(adult*tour.basePrice*(100 - tour.faresByAge.adult)/100)} đ</p>
                                            </div>
                                            <div className="customer__item">
                                                <div className="customer__type">
                                                    <div className="customer__icon">
                                                        <img src="/assests/images/icon_kids_couple.png" width="21px"/>
                                                    </div>
                                                    <div className="content">
                                                        <p className="title">Trẻ em (2-11 tuổi)</p>
                                                        <p className="percent-price">{100 - tour.faresByAge.from2to11YO}% giá vé</p>
                                                    </div>
                                                </div>
                                                <div className="input-number">
                                                    <div className="minus" onClick={() => this.handleUpAndDownPeople('from2to11YO','down')}>
                                                        <img src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                    <p className="display">{from2to11YO}</p>
                                                    <div className="plus" onClick={() => this.handleUpAndDownPeople('from2to11YO','up')}>
                                                        <img className="rotate-180" src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                </div>
                                                <p className="price">{formatNumber(from2to11YO*tour.basePrice*(100 - tour.faresByAge.from2to11YO)/100)} đ</p>
                                            </div>
                                            <div className="customer__item">
                                                <div className="customer__type">
                                                    <div className="customer__icon">
                                                        <img src="/assests/images/icon_kids_couple.png" width="21px"/>
                                                    </div>
                                                    <div className="content">
                                                        <p className="title">Trẻ em (&lt; 2 tuổi)</p>
                                                        <p className="percent-price">{tour.faresByAge.under2YO === 100 ? 'Miễn phí' : (100 - tour.faresByAge.under2YO)+'%'} giá vé</p>
                                                    </div>
                                                </div>
                                                <div className="input-number">
                                                    <div className="minus" onClick={() => this.handleUpAndDownPeople('under2YO','down')}>
                                                        <img src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                    <p className="display">{under2YO}</p>
                                                    <div className="plus" onClick={() => this.handleUpAndDownPeople('under2YO','up')}>
                                                        <img className="rotate-180" src="/assests/images/ic_arrow_left.png"/>
                                                    </div>
                                                </div>
                                                <p className="price">{formatNumber(under2YO*tour.basePrice*(100 - tour.faresByAge.under2YO)/100)} đ</p>
                                            </div>
                                        </div>
                                        <div className="hotel-service">
                                            <div className="hotel">
                                                <h2 className="hotel__title">Khách sạn</h2>
                                                <div className="checkbox">
                                                    <input id="0" type="radio" name="hotel" onChange={() => this.handleCheckService('hotelService',1)} checked={hotelService === 1}/>
                                                    <label htmlFor="0">Theo tiêu chuẩn Tour<br/><span>Phụ thu: 0 đ</span></label>
                                                </div>
                                                <div className="checkbox">
                                                    <input id="1" type="radio" name="hotel" onChange={() => this.handleCheckService('hotelService',2)} checked={hotelService === 2}/>
                                                    <label htmlFor="1">Phòng đơn 4 sao<br/><span>1.000.000 đ/3 đêm</span></label>
                                                </div>
                                                <div className="checkbox">
                                                    <input id="2" type="radio" name="hotel" onChange={() => this.handleCheckService('hotelService',3)} checked={hotelService === 3}/>
                                                    <label htmlFor="2">Phòng đơn 5 sao<br/><span>1.000.000 đ/3 đêm</span></label>
                                                </div>
                                            </div>
                                            <div className="service">
                                                <h2 className="service__title">Loại hình dịch vụ<br/><span>Chọn gói dịch vụ mà bạn mong muốn</span>
                                                </h2>
                                                <div className="checkbox">
                                                    <input id="a" type="radio" name="service" onChange={() => this.handleCheckService('serviceType',1)} checked={serviceType === 1}/>
                                                    <label htmlFor="a">Tour ghép đoàn<br/><span>Giá tour giảm theo sô lượng người tham gia</span></label>
                                                </div>
                                                <div className="checkbox">
                                                    <input id="b" type="radio" name="service" onChange={() => this.handleCheckService('serviceType',2)} checked={serviceType === 2}/>
                                                    <label htmlFor="b">Du lịch cá nhân<br/><span>4.000.000/thành viên</span></label>
                                                </div>
                                                <a className="link-detail">Chi tiết</a>
                                            </div>
                                        </div>
                                        <div>
                                            <a className="submit-btn btn btn--large btn--bg-linear" href="#" style={{width: '150px',marginLeft: 'calc(50% - 75px)'}}
                                                onClick={(ev) => this.openTourBooing(ev)}>
                                                <span style={{marginRight: '5px'}}>Tiếp theo</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13"
                                                     viewBox="0 0 8 13">
                                                    <g>
                                                        <g>
                                                            <path fill="#fff"
                                                                  d="M7.042 7.045l-5.153 5.152a.839.839 0 1 1-1.186-1.186l4.559-4.56-4.56-4.558A.84.84 0 0 1 1.89.707l5.152 5.152a.836.836 0 0 1 0 1.186z"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <main style={{display: tourBooking ? 'block':'none'}} className="main main--phone-821">
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
                                                                className="number-passenger__content">{adult}</span><span
                                                                className="number-passenger__title">người lớn</span></div>
                                                            <span className="price">{formatNumber(adult*tour.basePrice*(100 - tour.faresByAge.adult)/100)}đ</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-control">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="number-passenger active"><span
                                                                className="number-passenger__content">{from2to11YO}</span><span
                                                                className="number-passenger__title">trẻ em 2 - 11 tuổi</span></div>
                                                            <span className="price">{formatNumber(from2to11YO*tour.basePrice*(100 - tour.faresByAge.from2to11YO)/100)}đ</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-control">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="number-passenger active"><span
                                                                className="number-passenger__content">{under2YO}</span><span
                                                                className="number-passenger__title">trẻ em &lt; 2 tuổi</span>
                                                            </div>
                                                            <span className="price">{formatNumber(under2YO*tour.basePrice*(100 - tour.faresByAge.under2YO)/100)}đ</span>
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
                                                            className="price">{formatNumber(adult*tour.basePrice*(100 - tour.faresByAge.adult)/100 + from2to11YO*tour.basePrice*(100 - tour.faresByAge.from2to11YO)/100 + under2YO*tour.basePrice*(100 - tour.faresByAge.under2YO)/100)} đ</span><span className="note">(Đã bao gồm thuế và phí)</span>
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
                    </div>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTour: (id) => selectTourAction(dispatch, id),
        setAtiveTabDetail: (tab) => setAtiveTabDetail(dispatch, tab),
    }
}

const mapStateToProps = (state) => {
    return {
        schedule: state.tour.tour,
        activeTabDetail: state.tour.activeTabDetail,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
