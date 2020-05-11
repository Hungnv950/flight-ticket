import { connect } from 'react-redux';
import React, { Component } from 'react';

import {selectTourBookingAction} from "../../actions/booking.tour.action";

class Booking extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getTourBooking(id).then(() => {});
    }

    render() {
        const { booking } = this.props;

        return (
            <main className="main main--tablet-891">
                <div className="step">
                    <div className="step__wrap">
                        <div className="step__item active active">
                            <div className="step__number">1</div>
                            <span className="step__title">Đặt chỗ</span>
                        </div>
                        <div className="step__wire">
                            <div className="step__wire-line active"></div>
                        </div>
                        <div className="step__item active">
                            <a href={'/tour/'+booking._id+'/payment'}>
                                <div className="step__number">2</div>
                                <span className="step__title">Thanh toán</span>
                            </a>
                        </div>
                        <div className="step__wire">
                            <div className="step__wire-line active"></div>
                        </div>
                        <div className="step__item active current">
                            <div className="step__number">3</div>
                            <span className="step__title">Chờ xử lý</span>
                        </div>
                        <div className="step__wire">
                            <div className="step__wire-line"></div>
                        </div>
                        <div className="step__item">
                            <div className="step__number">4</div>
                            <span className="step__title">Phát hành vé điện tử</span>
                        </div>
                        <svg className="step__tree1 orange active" xmlns="http://www.w3.org/2000/svg" width="38"
                             height="42" viewBox="0 0 38 42">
                            <defs>
                                <linearGradient id="h66ja" x1="19.13" x2="19.13" y1=".2" y2="41.86"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#ffa700"></stop>
                                    <stop offset="1" stopColor="#ef5e03"></stop>
                                </linearGradient>
                            </defs>
                            <g>
                                <g>
                                    <path fill="url(#h66ja)"
                                          d="M20.583 29.346c-1.437.399-.577-2.577-.165-4.3.298-.11.586-.24.86-.396a6.08 6.08 0 0 0 1.519 3.285c-.7.622-1.506 1.214-2.214 1.41zm-2.64-1.224c-.62.113-1.678-1.8-2.43-3.355.833.425 1.773.67 2.772.67.257 0 .509-.022.757-.053-.193 1.245-.533 2.635-1.098 2.738zm-4.488-1.553a6.141 6.141 0 0 0 1.216-1.621l1.2 2.514s-.654.289-2.416-.893zm22.818-14.032c0-3.16-2.399-5.76-5.475-6.08a6.11 6.11 0 0 0-5.728-3.991 6.074 6.074 0 0 0-3.143.877A6.109 6.109 0 0 0 16.59.204a6.11 6.11 0 0 0-6.03 5.14c-.248-.03-.499-.05-.755-.05a6.114 6.114 0 0 0-6.114 6.113c0 .165.012.327.025.49a6.103 6.103 0 0 0-.573 9.921c-.006.11-.017.22-.017.331a6.114 6.114 0 0 0 6.114 6.114c1.012 0 1.964-.25 2.804-.684 1.165.836 2.832 1.882 3.64 1.674 0 0 .3 4.653.235 5.834-.123 2.248-.798 4.75-1.272 6.776h7.35s-1.083-4.515-1.13-6.022c-.048-1.508.47-4.284.47-4.284l2.55-2.638a6.074 6.074 0 0 0 3.446 1.053 6.12 6.12 0 0 0 6.08-5.481 6.118 6.118 0 0 0 3.992-5.734 6.084 6.084 0 0 0-1.537-4.044 6.093 6.093 0 0 0 .406-2.176z"></path>
                                </g>
                            </g>
                        </svg>
                        <svg className="step__tree2 orange active" xmlns="http://www.w3.org/2000/svg" width="25"
                             height="35" viewBox="0 0 25 35">
                            <g>
                                <g>
                                    <g>
                                        <path fill="#919191"
                                              d="M22.577 12.58a6.273 6.273 0 0 0 1.175-3.657 6.309 6.309 0 0 0-6.308-6.309c-.052 0-.102.007-.153.008a6.025 6.025 0 0 0-5.059-2.75A6.032 6.032 0 0 0 6.72 3.456C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.744-.12l.185-1.902a7.68 7.68 0 0 0 9.61-11.602z"></path>
                                    </g>
                                    <g>
                                        <path fill="#919191"
                                              d="M12.78 23.316c-.88.228-1.854.22-2.896-.272-1.41-.666-2.433-2.02-2.572-3.575a4.387 4.387 0 0 1 .192-1.738.543.543 0 0 0-.192-.58A6.014 6.014 0 0 1 5.1 12.489a6.028 6.028 0 0 1 3.536-5.487.552.552 0 0 0 .333-.553 5.392 5.392 0 0 1-.029-.544 6.032 6.032 0 0 1 4.657-5.87 6.017 6.017 0 0 0-1.365-.164A6.032 6.032 0 0 0 6.72 3.457C2.95 4.442.163 7.861.163 11.94c0 2.243.848 4.282 2.232 5.834a7.68 7.68 0 0 0 7.642 8.43c.463 0 2.304-.042 2.743-.12V23.316z"></path>
                                    </g>
                                    <g>
                                        <path fill="#919191"
                                              d="M11.683 23.46l-.052-.002-.496 10.425h3.291l-.485-10.2c-.018-.366-.384-.63-.726-.5-.477.178-.992.277-1.532.277z"></path>
                                    </g>
                                    <g>
                                        <path fill="#919191"
                                              d="M13.94 23.682c-.017-.365-.383-.629-.725-.5-.477.18-.992.278-1.532.278l-.052-.002-.496 10.426h1.646v-8.931c0-.236.15-.446.375-.52l.807-.27z"></path>
                                    </g>
                                    <g>
                                        <path fill="#919191"
                                              d="M15.524 34.432h-5.486a.548.548 0 1 1 0-1.097h5.486a.548.548 0 1 1 0 1.097z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="container container-small">
                    <div className="pending-pay">
                        <h2 className="pending-pay__title">ĐANG CHỜ XỬ LÝ</h2>
                        <p className="pending-pay__note">Chúng tôi sẽ gửi thông báo cho bạn khi hoàn thành</p>
                        <div className="pending-pay__background">
                            <img className="bg-main" src="/assests/images/bg-pending.png"/>
                            <img className="bg-sub" src="/assests/images/bong01.png"/>
                        </div>
                        <div className="pending-pay__bottom">
                            <p>
                                Trong thời chờ đợi !<br/>Cùng ThankTrip khám phá những điều thú vị về nơi bạn sắp đến nhé!
                            </p>
                            <a className="btn btn--bg-linear btn--large" href="/tours">
                                <span>Khám phá ngay</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13">
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
                    <div className="suggest-tour">
                        <div className="row row-sm">
                            <div className="col-12 col-sm">
                                <h2 className="suggest-tour__title">Lịch trình du lịch đề xuất cho bạn!</h2>
                                <div className="load-all"><a href="#">Show all (20)</a></div>
                            </div>
                        </div>
                        <div className="row row-sm"></div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTourBooking: (id) => selectTourBookingAction(dispatch, id)
    }
}

const mapStateToProps = (state) => ({
    booking: state.tour.tour,
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);