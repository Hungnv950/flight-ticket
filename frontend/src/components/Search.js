import React, { Component } from 'react';
import { imagesUrl } from '../constants/path';
import AirportDropDown from './AirportDropDown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
	connect
} from 'react-redux'
import {submitSearchAction} from '../actions/search.action'
import ListCustomerDropdown from './ListCustomerDropdown';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adt: this.props.adt,
			chd: this.props.chd,
			inf: this.props.inf,
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			startAirport: this.props.startAirport,
			endAirport: this.props.endAirport,
			is_return: this.props.is_return
		}
	}

	onChangeStartPoint(value, airport){
		if (value === "startPoint") {
			this.setState({
				startAirport: airport
			})
		} else {
			this.setState({
				endAirport: airport
			})
		}
	};

	onSelectCustomer(type, value) {
		switch (type){
			case "Adt":
				this.setState({
					adt: value
				});
				break;
			case "Chd":
				this.setState({
					chd: value
				})
				break;
			case "Inf":
				this.setState({
				inf: value
				})
				break;
			default:
				return
		}
	};

	onChangeDate = (date, sinceTime) => {
		if(sinceTime === "startDate") {
			this.setState({
				startDate: date
			})
		} else {
			this.setState({
				endDate: date
			})
		}
	}

	onSubmitSearch(is_return, e) {
		e.preventDefault();

		let newState = {
			adt: this.state.adt,
			chd: this.state.chd,
			inf: this.state.inf,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			startAirport: this.state.startAirport,
			endAirport: this.state.endAirport,
			is_return: is_return || false
		}

		this.props.submitSearchAction(newState);
	};

	render() {
		let is_oneway = this.state.is_return ? "" : "active";
		let is_return = this.state.is_return ? "active" : "";

		return (
			<React.Fragment>
				{/* <header className="header header-search-page">
					<div className="header__menu js-menu-mobile">
						<svg fill="#ff6200" height={24} stroke="currentColor" strokeLinecap="round" viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<g>
								<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
									<g fill="#ff6200">
										<g>
											<path d="M2,6 C2,5.44771525 2.45530558,5 2.99180311,5 L21.0081969,5 C21.5559546,5 22,5.44386482 22,6 C22,6.55228475 21.5446944,7 21.0081969,7 L2.99180311,7 C2.44404538,7 2,6.55613518 2,6 Z M2,12 C2,11.4477153 2.45530558,11 2.99180311,11 L21.0081969,11 C21.5559546,11 22,11.4438648 22,12 C22,12.5522847 21.5446944,13 21.0081969,13 L2.99180311,13 C2.44404538,13 2,12.5561352 2,12 Z M2,18 C2,17.4477153 2.45530558,17 2.99180311,17 L21.0081969,17 C21.5559546,17 22,17.4438648 22,18 C22,18.5522847 21.5446944,19 21.0081969,19 L2.99180311,19 C2.44404538,19 2,18.5561352 2,18 Z" />
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<img alt="abc" className="header__logo" src={imagesUrl + "logo-white.png"} />
					<ul className="header__nav d-flex justify-content-between h-100">
						<li className="header__nav-item">
							<a className="header-f-w" href="# ">
								<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
									<g>
										<g>
											<path fill="#818181" d="M13.08 13.695a7.597 7.597 0 0 1-5.385 2.23 7.597 7.597 0 0 1-5.385-2.23A7.586 7.586 0 0 1 .082 8.313c0-2.102.85-4.007 2.228-5.385A7.597 7.597 0 0 1 7.695.698c2.102 0 4.005.852 5.384 2.23a7.592 7.592 0 0 1 2.229 5.385c0 2.102-.851 4.005-2.229 5.382zM2.496 4.272c.321-.002.647.013.97.04.025-.376.072-.762.135-1.157a6.669 6.669 0 0 0-1.105 1.117zm-.674 6.416c-.095-.01-.19-.023-.282-.036.053.141.11.278.173.412.033-.126.069-.252.109-.376zm11.271-1.424c.338.403.617.802.827 1.187a6.55 6.55 0 0 0 .355-2.138V8.24c-.302.374-.699.717-1.182 1.023zm-.344-.386c.695-.427 1.192-.922 1.466-1.475a6.566 6.566 0 0 0-.731-2.228c-.34-.105-.7-.185-1.074-.237a1.362 1.362 0 0 0-.006-.52c.233.03.462.07.685.12A6.574 6.574 0 0 0 9.507 1.98c.466.392.857.841 1.17 1.335a1.399 1.399 0 0 0-.473.212 5.323 5.323 0 0 0-1.95-1.775 6.54 6.54 0 0 0-4.047.977 11.776 11.776 0 0 0-.227 1.638 13.88 13.88 0 0 1 3.192.833c.794-.33 1.617-.567 2.434-.705a1.423 1.423 0 0 0 .021.517 10.64 10.64 0 0 0-1.773.474 16.225 16.225 0 0 1 3.276 1.938 6.68 6.68 0 0 0-.016-1.312 1.44 1.44 0 0 0 .502-.13c.073.596.069 1.21-.009 1.823.422.35.805.712 1.143 1.073zm-.456.254c-.24-.25-.502-.498-.786-.744-.084.412-.203.82-.354 1.218a8.87 8.87 0 0 0 1.14-.474zM1.36 10.11zm0 0c.214.029.426.054.638.08l.044-.114c.235-.57.534-1.1.882-1.59.114.128.252.235.408.315-.317.445-.59.928-.805 1.447.929.095 1.815.145 2.657.156a7.844 7.844 0 0 1-.916-1.475c.173-.035.334-.103.477-.195.254.527.563 1.012.922 1.453.061.072.122.145.185.217 1.613-.024 3.043-.196 4.257-.494.138-.034.273-.07.405-.105a7.32 7.32 0 0 0 .542-1.791 15.699 15.699 0 0 0-2.001-1.349 15.513 15.513 0 0 0-1.878-.909 9.874 9.874 0 0 0-1.938 1.12 1.419 1.419 0 0 0-.32-.404c.467-.344.962-.649 1.479-.913l.11-.055a13.08 13.08 0 0 0-2.553-.624 9.9 9.9 0 0 0 .055 1.237h-.03c-.167 0-.329.028-.478.082-.048-.44-.07-.899-.059-1.373a10.23 10.23 0 0 0-1.317-.03 6.557 6.557 0 0 0-1.016 3.516c0 .622.088 1.226.25 1.798zm7.27 3.7a1.115 1.115 0 1 1 .005-2.23 1.115 1.115 0 0 1-.005 2.23zM2.867 7.538a1.116 1.116 0 1 1 2.231.001 1.116 1.116 0 0 1-2.231-.001zm7.03-2.844c0-.615.498-1.113 1.116-1.113a1.114 1.114 0 1 1-1.115 1.113zm-2.202 10.2c1.396 0 2.69-.434 3.755-1.176a11.958 11.958 0 0 1-1.008-.174c-.196-.044-.387-.09-.576-.143.084-.147.143-.31.17-.487.17.046.343.088.517.128.477.103.97.18 1.478.223a6.58 6.58 0 0 0 1.632-2.172c-.197-.493-.546-1.029-1.014-1.573a9.606 9.606 0 0 1-1.766.712 8.007 8.007 0 0 1-1.078 1.662 1.43 1.43 0 0 0-.363-.366c.071-.086.14-.172.208-.26a7.93 7.93 0 0 0 .558-.853c-1.121.273-2.419.445-3.868.491a7.8 7.8 0 0 0 1.176.91c-.107.136-.189.29-.241.458a8.35 8.35 0 0 1-1.647-1.355 29.71 29.71 0 0 1-3.284-.172 7.47 7.47 0 0 0-.257 1.014A6.562 6.562 0 0 0 4.75 14.2a8.473 8.473 0 0 0 2.586-.924c.07.16.17.303.291.425a8.715 8.715 0 0 1-2.062.842 6.555 6.555 0 0 0 2.13.353z" />
										</g>
									</g>
								</svg>
								<span>Cộng đồng</span>
							</a>
						</li>
						<li className="header__nav-item">
							<a className="header-f-w active" href="# ">
								<svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 13 13">
									<g>
										<g>
											<path fill="#818181" d="M1.811 11.19c-.13-.116-.123-.368.017-.658L0 9.34c.195-.197.39-.322.713-.364l2.124-.283c.16-.02.317-.033.463-.061.233-.355.955-1.254 1.315-1.733l.96-1.268L.932 4.232c-.484-.146.43-1.23.87-1.111l6.121.161L9.465 1.74c1.208-1.205 2.83-1.767 3.196-1.4.367.369-.195 1.988-1.4 3.196L9.718 5.078l.16 6.121c.12.44-.964 1.352-1.108.869l-1.4-4.643-1.27.96c-.476.36-1.377 1.082-1.732 1.317-.03.146-.041.3-.062.46l-.28 2.125A1.132 1.132 0 0 1 3.66 13L2.47 11.17c-.29.14-.543.15-.658.02z" />
										</g>
									</g>
								</svg>
								<span>Vé máy bay</span>
							</a>
						</li>
						<li className="header__nav-item">
							<a href="# ">
								<svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19">
									<g>
										<g>
											<g>
												<g>
													<path fill="#818181" d="M13.86 11.85c0 .442-.357.47-.798.47H6.601c-.441 0-.798-.028-.798-.47v-.075c0-.317.186-.589.454-.717L6.51 8.87c0-1.6 1.132-2.936 2.639-3.251V4.77a.683.683 0 0 1 1.366 0v.849a3.323 3.323 0 0 1 2.639 3.251l.253 2.187c.268.129.454.4.454.717zM9.833 14.24a1.192 1.192 0 0 1-1.193-1.193h2.385c0 .66-.534 1.193-1.192 1.193zm0-14.245a9.172 9.172 0 1 0 0 18.345 9.172 9.172 0 0 0 0-18.345z" />
												</g>
											</g>
										</g>
									</g>
								</svg>
							</a>
						</li>
						<li className="header__nav-item">
							<a href="# ">
								<svg xmlns="http://www.w3.org/2000/svg" width={21} height={18} viewBox="0 0 21 18">
									<g>
										<g>
											<g>
												<g>
													<g>
														<path fill="#818181" d="M17.24 8.2c-.772 0-1.41-.638-1.41-1.41 0-.77.638-1.41 1.41-1.41.77 0 1.41.64 1.41 1.41 0 .772-.64 1.41-1.41 1.41zm-4.927 0c-.77 0-1.41-.638-1.41-1.41 0-.77.64-1.41 1.41-1.41.771 0 1.41.64 1.41 1.41 0 .772-.639 1.41-1.41 1.41zm-4.945 0c-.77 0-1.41-.638-1.41-1.41 0-.77.64-1.41 1.41-1.41.771 0 1.41.64 1.41 1.41 0 .772-.62 1.41-1.41 1.41zM19.308.662H5.205c-.846 0-1.523.696-1.523 1.523v8.762c0 .846.696 1.523 1.523 1.523h9.72l2.2 2.219a.47.47 0 0 0 .339.15.485.485 0 0 0 .489-.489v-1.88h1.353c.847 0 1.523-.696 1.523-1.523V2.184c0-.846-.695-1.523-1.523-1.523z" />
													</g>
													<g fill="#818181">
														<path d="M2.818 10.984v-2.99H1.276c-.545 0-.996.451-.996.997v5.753a.989.989 0 0 0 .996 1.034h.884v1.241c0 .17.15.32.32.32.094 0 .169-.038.225-.094l1.448-1.448h6.393c.545 0 .996-.451.996-.997v-1.429H5.206a2.391 2.391 0 0 1-2.388-2.387z" />
													</g>
												</g>
											</g>
										</g>
									</g>
								</svg>
							</a>
						</li>
						<li className="header__nav-item header__account">
							<a href="# ">
								<div className="img-wrap"><img alt="abc" className="img-full-height" src={imagesUrl + "avatar-demo2.png"} /></div>
								<span className="header__user-name">Minh Tu</span>
							</a>
						</li>
						<li className="header__nav-item">
							<a className="header__cart" href="# ">
								<svg xmlns="http://www.w3.org/2000/svg" width={27} height={19} viewBox="0 0 27 19">
									<g>
										<g>
											<path fill="#919191" d="M19.718 14.987c.22 0 .426.042.615.121.198.08.375.198.524.347v.004a1.601 1.601 0 0 1 0 2.273v.003c-.15.15-.326.268-.524.347-.189.08-.396.122-.615.122-.219 0-.426-.042-.615-.122a1.517 1.517 0 0 1-.52-.347l-.003-.003a1.6 1.6 0 0 1 0-2.273v-.004c.149-.149.326-.267.523-.347.19-.079.396-.121.615-.121zm2.682-.38c.155 0 .304.03.442.084.14.058.267.147.374.253.106.107.195.234.253.374a1.203 1.203 0 0 1 0 .89c-.058.14-.147.267-.253.374a1.215 1.215 0 0 1-.374.252 1.187 1.187 0 0 1-.442.086h-.402l.019-.162v-.003l.006-.055v-.003l.003-.054v-.113c0-.347-.086-.633-.198-.865a3.017 3.017 0 0 0-.344-.53l-.003-.002c-.098-.131-.17-.22-.17-.32 0-.073.018-.122.06-.152.046-.04.128-.055.247-.055h.782zM1.56 3.014a1.136 1.136 0 0 1-.374-.25 1.15 1.15 0 0 1-.27-1.215l.005-.012v-.006l.013-.024v-.006a1.172 1.172 0 0 1 .62-.621 1.153 1.153 0 0 1 .883 0c.433.176.82.359 1.166.548.35.191.667.392.947.602.268.201.508.408.727.627.217.22.411.45.588.694l.021.03h19.792v.01l.055.018.052.016a.75.75 0 0 1 .277.155c.082.07.15.155.2.25.047.097.077.2.086.31a.875.875 0 0 1-.036.316l-1.903 5.796c-.076.238-.17.466-.28.68-.113.218-.24.428-.38.623-.14.198-.299.38-.47.551-.17.17-.352.326-.547.469-.195.14-.399.265-.615.374a4.75 4.75 0 0 1-.67.274l-.024.006a4.81 4.81 0 0 1-1.419.22H8.976v-.007l-.08.007a.831.831 0 0 0-.398.124.92.92 0 0 0-.301.302.734.734 0 0 0-.058.121.427.427 0 0 0-.021.231c.009.034.02.068.036.098.049.08.131.15.259.198.106.04.25.07.426.08.122.005.204.03.25.07.04.036.057.09.051.167a.34.34 0 0 1-.051.146 1.9 1.9 0 0 1-.128.188 2.802 2.802 0 0 0-.332.524c-.11.225-.192.502-.192.831l.003.082v.006l.003.07v.016l.015.188-.185-.03a3.69 3.69 0 0 1-.347-.07 2.687 2.687 0 0 1-.326-.095l-.012-.006a2.748 2.748 0 0 1-.57-.27 2.506 2.506 0 0 1-.63-.552 2.268 2.268 0 0 1-.387-.715 2.44 2.44 0 0 1-.06-1.178c.024-.134.061-.268.107-.405.033-.094.073-.188.118-.283.043-.094.092-.192.146-.283.043-.076.092-.152.144-.228.051-.076.103-.152.16-.225l.025-.03-.012-.04a56.02 56.02 0 0 1-.874-2.855l-.24-.871a40.22 40.22 0 0 0-.597-2.025v-.003c-.204-.6-.423-1.123-.697-1.583-.27-.45-.6-.843-1.026-1.19-.426-.35-.946-.654-1.604-.928l-.03-.012zm10.892 11.591h5.586a.21.21 0 0 1 .192.122.21.21 0 0 1-.025.225 2.69 2.69 0 0 0-.581 1.967h-4.758a2.756 2.756 0 0 0-.584-1.97.215.215 0 0 1 .17-.344zm9.12-6.688h1.878l.917-2.794.03-.097h-2.825zm-3.71 0h2.715V5.027H17.86zm-3.708 0h2.715V5.027h-2.715zm-3.708 0h2.715V5.027h-2.715zm-2.749 0h1.757V5.027H6.769l.04.1c.197.493.368.992.52 1.495.131.429.25.861.368 1.296zm1.757.993H7.962c.125.472.256.94.399 1.41.15.483.314.964.502 1.436l.022.049h.569zm3.707 0h-2.715v2.895h2.715zm3.708 0h-2.715v2.895h2.715zm3.708 0H17.86v2.895h2.143c.125 0 .25-.01.375-.025.064-.006.13-.015.198-.027V8.91zm2.548 0h-1.553v2.466c.064-.037.128-.08.186-.122l.006-.003.003-.003c.125-.119.24-.229.35-.341.107-.11.21-.223.298-.335.089-.116.17-.238.244-.372a2.98 2.98 0 0 0 .192-.453zm-12.368 6.076c.219 0 .426.042.615.121.197.08.374.198.523.347v.004a1.601 1.601 0 0 1 0 2.273l-.021.025a1.59 1.59 0 0 1-.502.325 1.603 1.603 0 0 1-1.753-.35l-.022-.02a1.564 1.564 0 0 1-.329-.5 1.655 1.655 0 0 1-.122-.618c0-.216.046-.426.122-.615.082-.195.201-.371.347-.52l.003-.004a1.609 1.609 0 0 1 1.138-.469z" />
										</g>
									</g>
								</svg>
								<span className="header__cart-number">1</span>
							</a>
						</li>
					</ul>
				</header> */}
				<main className="main main-search-page">
					<div className="banner-search-page js-lazy-load" data-src={imagesUrl + "banner-search-page.png"} data-type="background-image">
						<div className="form">
							<form>
								<div className="tab js-tab">
									<ul className="tab__nav">
										<li className="tab__nav-item w-50"><a className={is_oneway +" js-tab-nav tab__nav-link"} href="# " data-target=".one-way" onClick={ (event) => event.preventDefault() }>Một chiều</a></li>
										<li className="tab__nav-item w-50" ><a className={is_return +" js-tab-nav tab__nav-link"} href="# " data-target=".round-trip" onClick={ (event) => event.preventDefault() }>Khứ hồi</a></li>
									</ul>
									<div className="tab__content">
										<div className="tab__content-item js-tab-content-item one-way active">
											<div className="form__content">
												<div className="form__address">
													<div className="form-group js-dropdown dropdown dropdown--select-location">
														<label className="form-title">Điểm khởi hành</label>
														<AirportDropDown
															onChangeStartPoint={this.onChangeStartPoint.bind(this, "startPoint")}
															airport={this.state.startAirport}
														/>
													</div>
													<div className="form-group js-dropdown dropdown dropdown--select-location">
														<label className="form-title">Điểm đến</label>
														<AirportDropDown
															onChangeStartPoint={this.onChangeStartPoint.bind(this, "endPoint")}
															airport={this.state.endAirport}
														/>
													</div>
													<div className="form-group form-group--datepicker">
														<label className="form-title">Ngày đi</label>
														<DatePicker
															selected={this.state.startDate}
															onChange={(value) => this.onChangeDate(value, "startDate")}
															className = "form-control"
															dateFormat = "dd/MM/yyyy"
														/>
													</div>
												</div>
												<div className="form__passenger">
													<ListCustomerDropdown
														title="Số hành khách người lớn"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Adt")}
													/>
													<ListCustomerDropdown
														title="Trẻ em từ 2 đến 11 tuổi"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Chd")}
													/>
													<ListCustomerDropdown
														title="Trẻ em dưới 2 tuổi"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Inf")}
													/>
												</div>
												<div className="form__btn-search">
													<a className="btn btn--large btn--bg-linear mx-auto"
 														onClick={this.onSubmitSearch.bind(this, false)}
														href="# "
													>
														Tìm Kiếm
													</a>
													<h5 className="mx-auto">{this.props.error_message}</h5>
												</div>
											</div>
										</div>
										<div className="tab__content-item js-tab-content-item round-trip">
											<div className="form__content">
												<div className="form__address">
													<div className="form-group js-dropdown dropdown dropdown--select-location">
														<label className="form-title">Điểm khởi hành</label>
														<AirportDropDown
															onChangeStartPoint={this.onChangeStartPoint.bind(this, "startPoint")}
															airport={this.props.startAirport}
														/>
													</div>
													<div className="form-group js-dropdown dropdown dropdown--select-location">
														<label className="form-title">Điểm đến</label>
														<AirportDropDown
															onChangeStartPoint={this.onChangeStartPoint.bind(this, "endPoint")}
															airport={this.state.endAirport}
														/>
													</div>
													<div className="form-group form-group--datepicker">
														<label className="form-title">Ngày đi</label>
														<DatePicker
															selected={this.state.startDate}
															onChange={(value) => this.onChangeDate(value, "startDate")}
															className = "form-control"
															dateFormat = "dd/MM/yyyy"
														/>
													</div>
													<div className="form-group d-none-lg" />
													<div className="form-group d-none-lg" />
													<div className="form-group form-group--datepicker">
														<label className="form-title">Ngày về</label>
														<DatePicker
															selected={this.state.endDate}
															onChange={(value) => this.onChangeDate(value, "endDate")}
															className = "form-control"
															dateFormat = "dd/MM/yyyy"
														/>
													</div>
												</div>
												<div className="form__passenger">
													<ListCustomerDropdown
														title="Số hành khách người lớn"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Adt")}
													/>
													<ListCustomerDropdown
														title="Trẻ em từ 2 đến 11 tuổi"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Chd")}
													/>
													<ListCustomerDropdown
														title="Trẻ em dưới 2 tuổi"
														onSelectCustomer={this.onSelectCustomer.bind(this, "Inf")}
													/>
												</div>
												<div className="form__btn-search">
													<a className="btn btn--large btn--bg-linear mx-auto" href="# "
														onClick={this.onSubmitSearch.bind(this, true)}
													>
														Tìm Kiếm
													</a>
													<h5 className="mx-auto">{this.props.error_message}</h5>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="review">
						<div className="review__wrap">
							<div className="slider js-slider">
								<div className="slider__list-wrap">
									<div className="slider__list">
										<div className="slider__item">
											<div className="img-wrap img-wrap--medium"><img alt="abc" className="img-full-height" src={imagesUrl + "avatar-demo2.png"} /></div>
											<p className="reviewer">Steve Vo thanh</p>
											<p className="review__content">“For the first time in our company's history, we were featured on every single platform that we worked on, thanks to ThankTrips.”</p>
										</div>
										<div className="slider__item">
											<div className="img-wrap img-wrap--medium"><img alt="abc" className="img-full-height" src={imagesUrl + "avatar-demo2.png"} /></div>
											<p className="reviewer">Nguyen Van A</p>
											<p className="review__content">“For the first time in our company's history, we were featured on every single platform that we worked on, thanks to ThankTrips.”</p>
										</div>
										<div className="slider__item">
											<div className="img-wrap img-wrap--medium"><img alt="abc" className="img-full-height" src={imagesUrl + "avatar-demo2.png"} /></div>
											<p className="reviewer">Tran Duc B</p>
											<p className="review__content">“For the first time in our company's history, we were featured on every single platform that we worked on, thanks to ThankTrips.”</p>
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
					<div className="offer js-lazy-load" data-type="background-image" data-src={imagesUrl + "banner-offer.png"}>
						<h1 className="offer__title">ƯU ĐÃI HẤP DẪN</h1>
						<span className="offer__intro">Ưu đãi Chỉ dành riêng cho thành viên ThankTrip</span>
						<div className="offer__content">
							<div className="offer__item">
								<img alt="a" src={imagesUrl + "gift.png"} />
								<p className="offer__item-content">Phần thưởng hấp dẫn</p>
							</div>
							<div className="offer__item">
								<img alt="a" src={imagesUrl + "sale.png"} />
								<p className="offer__item-content">Giảm giá hấp dẫn</p>
							</div>
							<div className="offer__item">
								<img alt="a" src={imagesUrl + "group-user.png"} />
								<p className="offer__item-content">Ưu đãi cho khách hàng<br />theo nhóm</p>
							</div>
						</div>
						<div className="recommend-regis">
							<img alt="a" src={imagesUrl + "gift.png"} />
							<p className="recommend-regis__content">Bạn chưa là thành viên.<br />Vui lòng&nbsp;<a href="# ">đăng nhập</a>&nbsp;hoặc&nbsp;<a href="# ">đăng kí</a>&nbsp;tài khoản để hưởng các ưu đãi đặc biệt cho thành viên từ ThankTrip</p>
						</div>
					</div>
					<div className="partner">
						<h1 className="partner__title">Đối tác hàng không</h1>
						<div className="partner__wrap">
							<div className="partner__item"><img src={imagesUrl + "logo-bamboo.png"} alt="Bamboo" /></div>
							<div className="partner__item"><img src={imagesUrl + "logo-jetstar.png"} alt="Jetstar" /></div>
							<div className="partner__item"><img src={imagesUrl + "logo-bamboo.png"} alt="Bamboo" /></div>
							<div className="partner__item"><img src={imagesUrl + "logo-bamboo.png"} alt="Bamboo" /></div>
							<div className="partner__item"><img src={imagesUrl + "logo-bamboo.png"} alt="Bamboo" /></div>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}

const mapDispatchToProps = (dispatch, searchParams) => {
	return {
		submitSearchAction: (searchParams) => submitSearchAction(dispatch, searchParams),
	}
}

const mapStateToProps = (state) => {
	return {
	  adt: state.search.adt,
		chd: state.search.chd,
		inf: state.search.inf,
		startAirport: state.search.startAirport,
		endAirport: state.search.endAirport,
		startDate: state.search.startDate,
		endDate: state.search.endDate,
		is_return: state.search.is_return,
		error_message: state.search.error_message
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
