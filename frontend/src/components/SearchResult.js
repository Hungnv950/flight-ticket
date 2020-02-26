import React from 'react'
import {imagesUrl} from '../consts/path'

const SearchResult = () => {
    return (
        <main className="main">
            <div className="banner bg-img-base js-lazy-load"
                data-src={imagesUrl +"bg-banner.png"}
                data-type="background-image"
                style={{background: `url(${imagesUrl + "bg-banner.png"})`}}
            >
                <div className="d-flex align-items-center h-100">
                    <div className="container">
                        <div className="banner__content">
                            <p className="title">Thank Flight</p>
                            <p className="slogan">Bay muôn nơi - thảnh thơi không lo giá vé…!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search">
                <div className="container">
                    <div className="row-custom">
                        <div className="col-8 col-md-12 col-custom">
                            <div className="result-board">
                                <div className="result-board__title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 13 13">
                                        <g>
                                            <g>
                                                <path fill="#818181" d="M1.811 11.19c-.13-.116-.123-.368.017-.658L0 9.34c.195-.197.39-.322.713-.364l2.124-.283c.16-.02.317-.033.463-.061.233-.355.955-1.254 1.315-1.733l.96-1.268L.932 4.232c-.484-.146.43-1.23.87-1.111l6.121.161L9.465 1.74c1.208-1.205 2.83-1.767 3.196-1.4.367.369-.195 1.988-1.4 3.196L9.718 5.078l.16 6.121c.12.44-.964 1.352-1.108.869l-1.4-4.643-1.27.96c-.476.36-1.377 1.082-1.732 1.317-.03.146-.041.3-.062.46l-.28 2.125A1.132 1.132 0 0 1 3.66 13L2.47 11.17c-.29.14-.543.15-.658.02z" />
                                            </g>
                                        </g>
                                    </svg>
                                    <p><span className="text-start">Khởi hành từ</span><span className="from">HỒ CHÍ MINH, Việt Nam (SGN)</span><span className="text-to">đến</span><span className="to">HÀ NỘI, Việt Nam (HNN)</span></p>
                                </div>
                                <div className="result-board__border" />
                                <div className="result-board__calendar">
                                    <div className="result-board__calendar-wrap">
                                        <div className="slider js-slider">
                                            <div className="slider__list-wrap">
                                                <div className="slider__list">
                                                    <div className="slider__item">
                                                        <p className="date">T2,14/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T3,15/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T4,16/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T5,17/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T6,18/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T7,19/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">CN,20/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T2,21/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T3,22/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T4,23/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T5,24/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T6,25/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                    <div className="slider__item">
                                                        <p className="date">T7,26/9/2020</p>
                                                        <p className="price">1.000.000đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="slider__control-btn slider__btn-prev js-prev-slide">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M.775 7.045l5.152 5.152a.839.839 0 1 0 1.187-1.186L2.555 6.45l4.559-4.558A.84.84 0 0 0 5.927.707L.775 5.859a.836.836 0 0 0 0 1.186z" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="slider__control-btn slider__btn-next js-next-slide">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13">
                                                    <g>
                                                        <g>
                                                            <path fill="#fff" d="M7.042 7.045l-5.153 5.152a.839.839 0 1 1-1.186-1.186l4.559-4.56-4.56-4.558A.84.84 0 0 1 1.89.707l5.152 5.152a.836.836 0 0 1 0 1.186z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="result-list">
                                <div className="result-list__filter">
                                    <div className="d-flex">
                                        <div className="airline js-dropdown dropdown">
                                            <p className="dropdown__title js-control-show-dropdown">
                                                Hãng hàng không
                                                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7} viewBox="0 0 13 7">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </p>
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item"><a className="active" href="# ">Vietnam Airlines</a></li>
                                                <li className="dropdown__item"><a href="# ">Jetstar</a></li>
                                            </ul>
                                        </div>
                                        <div className="filter js-dropdown dropdown">
                                            <p className="dropdown__title js-control-show-dropdown">
                                                Sắp xếp
                                                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7} viewBox="0 0 13 7">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </p>
                                            <ul className="dropdown__list">
                                                <li className="dropdown__intro">
                                                    <p>Vui lòng chọn<span className="js-control-show-dropdown"><svg xmlns="http://www.w3.org/2000/svg" width={12} height={8} viewBox="0 0 12 8">
                                    <g>
                                    <g>
                                        <g>
                                        <path fill="#a4afb7" d="M6.027.301l-5.5 5.56L1.953 7.3l4.074-4.117L10.1 7.3l1.426-1.44z" />
                                        </g>
                                    </g>
                                    </g>
                                </svg></span></p>
                                                </li>
                                                <li className="dropdown__item"><a className="active" href="# ">Thời gian</a></li>
                                                <li className="dropdown__item"><a href="# ">Giá từ cao đến thấp</a></li>
                                                <li className="dropdown__item"><a href="# ">Giá từ thấp đến cao</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="price js-dropdown dropdown">
                                        <p className="dropdown__title js-control-show-dropdown">
                                            Giá hiển thị
                                            <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7} viewBox="0 0 13 7">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </p>
                                        <ul className="dropdown__list right-0">
                                            <li className="dropdown__intro">
                                                <p>Vui lòng chọn<span className="js-control-show-dropdown"><svg xmlns="http://www.w3.org/2000/svg" width={12} height={8} viewBox="0 0 12 8">
                                <g>
                                    <g>
                                    <g>
                                        <path fill="#a4afb7" d="M6.027.301l-5.5 5.56L1.953 7.3l4.074-4.117L10.1 7.3l1.426-1.44z" />
                                    </g>
                                    </g>
                                </g>
                                </svg></span></p>
                                            </li>
                                            <li className="dropdown__item"><a className="active" href="# ">Giá bao gồm thuế phí</a></li>
                                            <li className="dropdown__item"><a href="# ">Giá chưa bao gồm thuế phí</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="result-list__content">
                                    <div className="result-list-item js-toggle">
                                        <div className="airline">
                                            <div className="logo"><img src={imagesUrl + "logo-jetstar.png"} alt="logo airlines" /></div>
                                            <div className="number-bought">
                                                <div className="group-people">
                                                    <div className="img-wrap group-people__item"><img className="img-full-height" src={imagesUrl + "avatar-demo.png"} alt="avatar" /></div>
                                                    <div className="img-wrap group-people__item"><img className="img-full-height" src={imagesUrl + "avatar-demo.png"} alt="avatar" /></div>
                                                    <div className="img-wrap group-people__item"><img className="img-full-height" src={imagesUrl + "avatar-demo.png"} alt="avatar" /></div><span className="plus">
                                +4</span><span>đã mua</span>
                                                </div>
                                            </div>
                                            <p className="detail js-toggle-control" data-target=".toggle-content"><span>Chi tiết chuyến bay</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={7} viewBox="0 0 13 7">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path fill="#919191" d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </p>
                                        </div>
                                        <div className="time">
                                            <div className="time__from">
                                                <p className="time__address">Ho Chi Minh</p>
                                                <p className="time__content">10 : 30</p>
                                            </div>
                                            <div className="time__to">
                                                <p className="time__address">To Ha Noi</p>
                                                <p className="time__content">23 : 30</p>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <div className="price__per-people"><span className="price__number">1.000.000</span><span className="price__unit">/khách</span></div>
                                            <button className="price__btn btn btn--bg-linear btn--medium" href="# ">
                                                Chọn mua
                                                <svg xmlns="http://www.w3.org/2000/svg" width={8} height={13} viewBox="0 0 8 13">
                                                    <g>
                                                        <g>
                                                            <path fill="#fff" d="M7.042 7.045l-5.153 5.152a.839.839 0 1 1-1.186-1.186l4.559-4.56-4.56-4.558A.84.84 0 0 1 1.89.707l5.152 5.152a.836.836 0 0 1 0 1.186z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="js-toggle-content">
                                            <div className="flight-detail">
                                                <div className="flight-detail__top">
                                                    <div className="flight-detail__location text-right pr-3">
                                                        <p className="text-smaller font-weight-bold mbpx-5 text-black">HỒ CHÍ MINH</p>
                                                        <p className="text-xs font-weight-light mbpx-3">Sân bay Tân Sơn Nhất</p>
                                                        <p className="text-xs font-weight-medium text-orange-medium">21h30 - 21/9/2020</p>
                                                    </div>
                                                    <div className="flight-detail__serial">
                                                        <div className="serial w-100"><span className="text-xs font-weight-light">Chuyến bay&nbsp;</span><span className="text-smaller font-weight-bold text-black">VN12545</span></div>
                                                        <div className="d-flex justify-content-center w-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={159} height={18} viewBox="0 0 159 18">
                                                                <defs>
                                                                    <clipPath id="tvrsa">
                                                                        <path fill="#fff" d="M0 16V1h15v15zm7.5-4a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                    </clipPath>
                                                                </defs>
                                                                <g>
                                                                    <g>
                                                                        <g>
                                                                            <path fill="#ff5111" d="M137.292 8.664c-.017-.248.244-.494.679-.644l-.656-3.052c.396 0 .72.071 1.09.357l2.438 1.869c.182.143.354.288.53.408.594-.12 2.23-.294 3.077-.41l2.249-.302-3.303-6.116c-.343-.637 1.673-.801 2-.236l6.044 6.37 3.117.012c2.436.011 4.645 1.09 4.648 1.831.001.744-2.197 1.803-4.634 1.795l-3.116-.012-5.995 6.319c-.321.564-2.337.382-1.997-.25l3.25-6.09-2.251-.32c-.846-.121-2.486-.309-3.082-.432-.177.117-.345.26-.527.4l-2.42 1.852c-.37.282-.693.35-1.088.347l.633-3.049c-.437-.152-.701-.4-.686-.647z" />
                                                                        </g>
                                                                        <g>
                                                                            <path fill="none" stroke="#ff5111" strokeMiterlimit={50} strokeWidth={2} d="M10.273 8.718h138.809" />
                                                                        </g>
                                                                        <g>
                                                                            <path fill="#fff" d="M4 8.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                            <path fill="none" stroke="#ff5111" strokeMiterlimit={50} strokeWidth={8} d="M4 8.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" clipPath="url(&quot;#tvrsa&quot;)" />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="text-center w-100 line-height-1"><span className="text-tiny font-weight-light">Bay thẳng&nbsp;</span><span className="text-xs font-weight-bold text-black">2h40m</span></div>
                                                    </div>
                                                    <div className="flight-detail__location text-left pl-3">
                                                        <p className="text-smaller font-weight-bold mbpx-5 text-black">HÀ NỘI</p>
                                                        <p className="text-xs font-weight-light mbpx-3">Sân bay Nội Bài</p>
                                                        <p className="text-xs font-weight-medium text-orange-medium">23h30 - 21/9/2020</p>
                                                    </div>
                                                </div>
                                                <div className="flight-detail__note">
                                                    <p className="text-xs font-weight-bold mbpx-3">Điều kiện vé &amp; hành lý</p>
                                                    <p className="text-xs font-weight-bold mbpx-3">Điều kiện vé Hạng chỗ Promo - Vietjet Air</p>
                                                    <p className="text-xs"><span className="font-weight-bold">Vé Promo</span><span className="font-weight-light">&nbsp;:&nbsp;</span><span className="font-weight-light">Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí Giá chưa bao gồm thuế phí</span></p>
                                                </div>
                                                <div className="flight-detail__passenger">
                                                    <div className="w-25 text-left">
                                                        <p className="mbpx-5 text-xs font-weight-bold">Hành khách</p>
                                                        <p className="text-xs font-weight-light">Người lớn</p>
                                                    </div>
                                                    <div className="w-25 text-left">
                                                        <p className="mbpx-5 text-xs font-weight-bold">Số lượng</p>
                                                        <p className="text-xs font-weight-lighttext-xs">font-weight-light 1</p>
                                                    </div>
                                                    <div className="w-25 text-right">
                                                        <p className="mb-2 text-xs font-weight-bold">Giá gồm thuế phí</p>
                                                        <p className="text-xs font-weight-bold"><span className="text-red-orange">774.000</span><span>&nbsp;VND</span></p>
                                                    </div>
                                                    <div className="w-25 text-right">
                                                        <p className="mb-2 text-xs font-weight-bold">Tổng giá</p>
                                                        <p className="text-xs font-weight-bold"><span className="text-red-orange">774.000</span><span>&nbsp;VND</span></p>
                                                    </div>
                                                </div>
                                                <div className="flight-detail__total font-weight-bold">
                                                    <p className="text-green text-uppercase text-xs">Tổng chi phí:&nbsp;</p>
                                                    <p className="font-weight-bold"><span className="text-orange">774.000</span><span className="text-xs">&nbsp;VND</span></p>
                                                </div>
                                            </div>
                                            <div className="result-list-item__share">
                                                <p className="info">Chia sẻ link mời bạn bè và nhận&nbsp;<a className="preference link" href="# ">nhiều ưu đãi</a>&nbsp;tuyệt vời từ ThankTrip</p>
                                                <a className="btn-share" href="# ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16} viewBox="0 0 18 16">
                                                        <g>
                                                            <g>
                                                                <path fill="#ff6200" d="M17.824 5.274L12.75.2a.61.61 0 0 0-.446-.189.61.61 0 0 0-.445.189.61.61 0 0 0-.189.445v2.537H9.45c-4.71 0-7.6 1.331-8.67 3.993-.35.885-.525 1.985-.525 3.3 0 1.096.42 2.586 1.259 4.469a23.402 23.402 0 0 0 .237.535c.04.085.083.158.13.217.079.113.171.17.277.17a.29.29 0 0 0 .233-.1.37.37 0 0 0 .084-.247c0-.06-.008-.147-.025-.263a2.05 2.05 0 0 1-.025-.233c-.033-.449-.05-.856-.05-1.219 0-.667.059-1.265.174-1.793.116-.529.276-.986.48-1.372.206-.387.47-.72.793-1.001.324-.28.672-.51 1.046-.689a5.667 5.667 0 0 1 1.318-.42 12.565 12.565 0 0 1 1.526-.214c.512-.04 1.091-.06 1.739-.06h2.22v2.537c0 .172.062.32.187.446a.61.61 0 0 0 .446.188.61.61 0 0 0 .446-.188l5.073-5.073a.61.61 0 0 0 .189-.446.61.61 0 0 0-.188-.446z" />
                                                            </g>
                                                        </g>
                                                    </svg><span>Share link</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-12 col-custom">
                            <div className="form-search">
                                <form>
                                    <h2 className="form-search__title"><span>Thay đổi tìm kiếm</span></h2>
                                    <div className="form-search__content">
                                        <div className="form-search__radio form-group-radio">
                                            <p>
                                                <input type="radio" id="motChieu" name="radio-group" defaultChecked />
                                                <label htmlFor="motChieu">Một chiều</label>
                                            </p>
                                            <p>
                                                <input type="radio" id="khuHoi" name="radio-group" />
                                                <label htmlFor="khuHoi">Khứ hồi</label>
                                            </p>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-title">Ngày khởi hành</label>
                                            <input className="date-picker form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-title">Điểm khởi hành</label>
                                            <select className="form-control">
                                                <option>Hồ Chí Minh, Việt Nam (SNG)</option>
                                                <option>Vinh</option>
                                                <option>Ha Noi</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-title">Điểm đến</label>
                                            <select className="form-control">
                                                <option>Hà Nội, Việt Nam (HNN)</option>
                                                <option>Ho Chi Minh</option>
                                                <option>Vinh</option>
                                            </select>
                                        </div>
                                        <div className="form-group form-group--number dropdown js-dropdown">
                                            <label className="form-title">Người lớn</label>
                                            <input className="form-control" type="number" defaultValue={1} placeholder={0} />
                                            <div className="icon-people">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={26} viewBox="0 0 27 26">
                                                    <g>
                                                        <g>
                                                            <path fill="#919191" d="M10.552 10.347c.731.992 1.678 1.668 2.594 1.668.916 0 1.866-.676 2.596-1.668.75-1.023 1.258-2.368 1.267-3.671l-.256-1.032c-.094-.372-.1-.716-.107-1.044-.006-.43-.015-.828-.252-1.154-.38-.524-.98-.353-1.68-.152-.478.134-.999.283-1.568.283-.563 0-1.084-.15-1.565-.283-.703-.201-1.3-.372-1.68.152-.234.326-.244.725-.253 1.154-.009.328-.015.672-.106 1.044l-.256 1.032c.006 1.303.515 2.648 1.266 3.67zM-.084 16.435c0-2.244 4.341-3.056 7.498-2.445-1.36.527-2.76 1.407-3.288 2.822-.14.378-.207.77-.207 1.172v2.907H.812a.896.896 0 0 1-.896-.895zm26.438 3.561a.896.896 0 0 1-.895.895h-3.108l.003-2.907c0-.401-.07-.794-.21-1.172-.527-1.418-1.927-2.295-3.284-2.822 3.156-.611 7.494.201 7.494 2.445v3.561zm-12.295-4.325l-.502.94a.406.406 0 0 0-.064.262l.444 5.306c1.328-2.794 2.098-4.606 2.932-7.972 2.666.584 4.709 1.844 4.709 3.777v5.54a1.67 1.67 0 0 1-1.665 1.666H6.358a1.667 1.667 0 0 1-1.662-1.666v-5.54c0-1.933 2.042-3.19 4.706-3.777.84 3.406 1.62 5.217 2.974 8.066l.453-5.4a.426.426 0 0 0-.064-.262l-.502-.94a.177.177 0 0 1-.006-.174.17.17 0 0 1 .152-.085h1.504c.067 0 .122.03.152.085a.177.177 0 0 1-.006.174zm-8.758-2.913c.594 0 1.206-.439 1.68-1.08.488-.662.813-1.532.82-2.375l-.165-.673c-.06-.237-.064-.46-.067-.673-.009-.28-.012-.535-.167-.746-.037-.374-4.085-.362-4.201 0-.152.21-.158.466-.164.746a2.772 2.772 0 0 1-.07.673l-.165.673c.006.843.335 1.713.82 2.374.471.642 1.089 1.08 1.68 1.08zm0 .41c-.73 0-1.464-.505-2.009-1.247-.538-.734-.9-1.705-.9-2.643v-.02l.002-.01-.003-.189c0-2.006-.307-3.668 1.958-4.009.27-.058.578-.091.925-.091.307 0 .585.027.828.07 2.43.29 2.11 1.982 2.11 4.03 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.902 2.64-.544.745-1.278 1.25-2.009 1.25zm14.015-1.49c.475.641 1.09 1.08 1.68 1.08.597 0 1.209-.439 1.68-1.08.485-.662.817-1.532.823-2.375l-.168-.673c-.06-.237-.064-.46-.07-.673-.006-.28-.012-.535-.161-.746-.04-.374-4.091-.362-4.204 0-.152.21-.158.466-.164.746-.006.213-.01.436-.067.673l-.168.673c.006.843.332 1.713.819 2.374zm-.329.243c-.539-.734-.9-1.705-.9-2.643v-.02l.002-.01c-.003-.064-.003-.128-.003-.189 0-2.027-.313-3.71 2.043-4.02.256-.05.545-.08.867-.08.332 0 .621.03.877.082 2.347.314 2.034 1.994 2.034 4.018 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.901 2.64-.545.745-1.279 1.25-2.01 1.25-.73 0-1.46-.505-2.009-1.247zm-5.841.727c-1.13 0-2.259-.782-3.102-1.93-.831-1.13-1.391-2.627-1.391-4.076V6.61l.006-.019c-.006-.094-.006-.191-.006-.289 0-3.473-.6-6.289 4.493-6.289s4.496 2.816 4.496 6.29c0 .097 0 .194-.006.288l.006.019v.033c0 1.45-.563 2.947-1.391 4.076-.843 1.148-1.976 1.93-3.105 1.93z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="icon-select js-control-show-dropdown" />
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item"><span>0</span></li>
                                                <li className="dropdown__item"><span className="active">1</span></li>
                                                <li className="dropdown__item"><span>2</span></li>
                                            </ul>
                                        </div>
                                        <div className="form-group form-group--number dropdown js-dropdown">
                                            <label className="form-title">Trẻ em 2 - 11 tuổi</label>
                                            <input className="form-control" type="number" placeholder={0} />
                                            <div className="icon-people">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={26} viewBox="0 0 27 26">
                                                    <g>
                                                        <g>
                                                            <path fill="#919191" d="M10.552 10.347c.731.992 1.678 1.668 2.594 1.668.916 0 1.866-.676 2.596-1.668.75-1.023 1.258-2.368 1.267-3.671l-.256-1.032c-.094-.372-.1-.716-.107-1.044-.006-.43-.015-.828-.252-1.154-.38-.524-.98-.353-1.68-.152-.478.134-.999.283-1.568.283-.563 0-1.084-.15-1.565-.283-.703-.201-1.3-.372-1.68.152-.234.326-.244.725-.253 1.154-.009.328-.015.672-.106 1.044l-.256 1.032c.006 1.303.515 2.648 1.266 3.67zM-.084 16.435c0-2.244 4.341-3.056 7.498-2.445-1.36.527-2.76 1.407-3.288 2.822-.14.378-.207.77-.207 1.172v2.907H.812a.896.896 0 0 1-.896-.895zm26.438 3.561a.896.896 0 0 1-.895.895h-3.108l.003-2.907c0-.401-.07-.794-.21-1.172-.527-1.418-1.927-2.295-3.284-2.822 3.156-.611 7.494.201 7.494 2.445v3.561zm-12.295-4.325l-.502.94a.406.406 0 0 0-.064.262l.444 5.306c1.328-2.794 2.098-4.606 2.932-7.972 2.666.584 4.709 1.844 4.709 3.777v5.54a1.67 1.67 0 0 1-1.665 1.666H6.358a1.667 1.667 0 0 1-1.662-1.666v-5.54c0-1.933 2.042-3.19 4.706-3.777.84 3.406 1.62 5.217 2.974 8.066l.453-5.4a.426.426 0 0 0-.064-.262l-.502-.94a.177.177 0 0 1-.006-.174.17.17 0 0 1 .152-.085h1.504c.067 0 .122.03.152.085a.177.177 0 0 1-.006.174zm-8.758-2.913c.594 0 1.206-.439 1.68-1.08.488-.662.813-1.532.82-2.375l-.165-.673c-.06-.237-.064-.46-.067-.673-.009-.28-.012-.535-.167-.746-.037-.374-4.085-.362-4.201 0-.152.21-.158.466-.164.746a2.772 2.772 0 0 1-.07.673l-.165.673c.006.843.335 1.713.82 2.374.471.642 1.089 1.08 1.68 1.08zm0 .41c-.73 0-1.464-.505-2.009-1.247-.538-.734-.9-1.705-.9-2.643v-.02l.002-.01-.003-.189c0-2.006-.307-3.668 1.958-4.009.27-.058.578-.091.925-.091.307 0 .585.027.828.07 2.43.29 2.11 1.982 2.11 4.03 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.902 2.64-.544.745-1.278 1.25-2.009 1.25zm14.015-1.49c.475.641 1.09 1.08 1.68 1.08.597 0 1.209-.439 1.68-1.08.485-.662.817-1.532.823-2.375l-.168-.673c-.06-.237-.064-.46-.07-.673-.006-.28-.012-.535-.161-.746-.04-.374-4.091-.362-4.204 0-.152.21-.158.466-.164.746-.006.213-.01.436-.067.673l-.168.673c.006.843.332 1.713.819 2.374zm-.329.243c-.539-.734-.9-1.705-.9-2.643v-.02l.002-.01c-.003-.064-.003-.128-.003-.189 0-2.027-.313-3.71 2.043-4.02.256-.05.545-.08.867-.08.332 0 .621.03.877.082 2.347.314 2.034 1.994 2.034 4.018 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.901 2.64-.545.745-1.279 1.25-2.01 1.25-.73 0-1.46-.505-2.009-1.247zm-5.841.727c-1.13 0-2.259-.782-3.102-1.93-.831-1.13-1.391-2.627-1.391-4.076V6.61l.006-.019c-.006-.094-.006-.191-.006-.289 0-3.473-.6-6.289 4.493-6.289s4.496 2.816 4.496 6.29c0 .097 0 .194-.006.288l.006.019v.033c0 1.45-.563 2.947-1.391 4.076-.843 1.148-1.976 1.93-3.105 1.93z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="icon-select js-control-show-dropdown" />
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item"><span>0</span></li>
                                                <li className="dropdown__item"><span>1</span></li>
                                                <li className="dropdown__item"><span>2</span></li>
                                            </ul>
                                        </div>
                                        <div className="form-group form-group--number dropdown js-dropdown">
                                            <label className="form-title">Trẻ em &lt;2 tuổi</label>
                                            <input className="form-control" type="number" placeholder={0} />
                                            <div className="icon-people">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={26} viewBox="0 0 27 26">
                                                    <g>
                                                        <g>
                                                            <path fill="#919191" d="M10.552 10.347c.731.992 1.678 1.668 2.594 1.668.916 0 1.866-.676 2.596-1.668.75-1.023 1.258-2.368 1.267-3.671l-.256-1.032c-.094-.372-.1-.716-.107-1.044-.006-.43-.015-.828-.252-1.154-.38-.524-.98-.353-1.68-.152-.478.134-.999.283-1.568.283-.563 0-1.084-.15-1.565-.283-.703-.201-1.3-.372-1.68.152-.234.326-.244.725-.253 1.154-.009.328-.015.672-.106 1.044l-.256 1.032c.006 1.303.515 2.648 1.266 3.67zM-.084 16.435c0-2.244 4.341-3.056 7.498-2.445-1.36.527-2.76 1.407-3.288 2.822-.14.378-.207.77-.207 1.172v2.907H.812a.896.896 0 0 1-.896-.895zm26.438 3.561a.896.896 0 0 1-.895.895h-3.108l.003-2.907c0-.401-.07-.794-.21-1.172-.527-1.418-1.927-2.295-3.284-2.822 3.156-.611 7.494.201 7.494 2.445v3.561zm-12.295-4.325l-.502.94a.406.406 0 0 0-.064.262l.444 5.306c1.328-2.794 2.098-4.606 2.932-7.972 2.666.584 4.709 1.844 4.709 3.777v5.54a1.67 1.67 0 0 1-1.665 1.666H6.358a1.667 1.667 0 0 1-1.662-1.666v-5.54c0-1.933 2.042-3.19 4.706-3.777.84 3.406 1.62 5.217 2.974 8.066l.453-5.4a.426.426 0 0 0-.064-.262l-.502-.94a.177.177 0 0 1-.006-.174.17.17 0 0 1 .152-.085h1.504c.067 0 .122.03.152.085a.177.177 0 0 1-.006.174zm-8.758-2.913c.594 0 1.206-.439 1.68-1.08.488-.662.813-1.532.82-2.375l-.165-.673c-.06-.237-.064-.46-.067-.673-.009-.28-.012-.535-.167-.746-.037-.374-4.085-.362-4.201 0-.152.21-.158.466-.164.746a2.772 2.772 0 0 1-.07.673l-.165.673c.006.843.335 1.713.82 2.374.471.642 1.089 1.08 1.68 1.08zm0 .41c-.73 0-1.464-.505-2.009-1.247-.538-.734-.9-1.705-.9-2.643v-.02l.002-.01-.003-.189c0-2.006-.307-3.668 1.958-4.009.27-.058.578-.091.925-.091.307 0 .585.027.828.07 2.43.29 2.11 1.982 2.11 4.03 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.902 2.64-.544.745-1.278 1.25-2.009 1.25zm14.015-1.49c.475.641 1.09 1.08 1.68 1.08.597 0 1.209-.439 1.68-1.08.485-.662.817-1.532.823-2.375l-.168-.673c-.06-.237-.064-.46-.07-.673-.006-.28-.012-.535-.161-.746-.04-.374-4.091-.362-4.204 0-.152.21-.158.466-.164.746-.006.213-.01.436-.067.673l-.168.673c.006.843.332 1.713.819 2.374zm-.329.243c-.539-.734-.9-1.705-.9-2.643v-.02l.002-.01c-.003-.064-.003-.128-.003-.189 0-2.027-.313-3.71 2.043-4.02.256-.05.545-.08.867-.08.332 0 .621.03.877.082 2.347.314 2.034 1.994 2.034 4.018 0 .061 0 .125-.004.186l.004.012v.021c0 .938-.363 1.909-.901 2.64-.545.745-1.279 1.25-2.01 1.25-.73 0-1.46-.505-2.009-1.247zm-5.841.727c-1.13 0-2.259-.782-3.102-1.93-.831-1.13-1.391-2.627-1.391-4.076V6.61l.006-.019c-.006-.094-.006-.191-.006-.289 0-3.473-.6-6.289 4.493-6.289s4.496 2.816 4.496 6.29c0 .097 0 .194-.006.288l.006.019v.033c0 1.45-.563 2.947-1.391 4.076-.843 1.148-1.976 1.93-3.105 1.93z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="icon-select js-control-show-dropdown" />
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item"><span>0</span></li>
                                                <li className="dropdown__item"><span>1</span></li>
                                                <li className="dropdown__item"><span>2</span></li>
                                            </ul>
                                        </div>
                                        <input className="btn form-search__btn-submit" type="submit" defaultValue="Tìm kiếm" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SearchResult;
