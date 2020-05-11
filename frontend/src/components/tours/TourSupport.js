import React, { Component } from 'react';

class TourSupport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.handleShowAndHide = this.handleShowAndHide.bind(this);
    }

    handleShowAndHide(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <main className="main">
                <div className="banner-link js-lazy-load" style={{backgroundImage: `url(/assests/images/support-banner.png)`}}>
                    <div className="banner-link__wrap">
                        <div className="banner-link__wrap-title">
                            <h1 className="banner-link__title">Support</h1>
                            <p className="banner-link__number">There are 20 questions</p>
                        </div>
                        <div className="add-question">
                            <a onClick={this.handleShowAndHide} className="btn-add-question">
                                <span className="plus">+</span>
                                <span style={{marginTop: '3px'}}>Đặt câu hỏi</span>
                            </a>
                            <div className={isOpen ? 'form-support show' : 'form-support'}>
                                <textarea placeholder="Bạn cần hộ trợ gì không?"></textarea>
                                <a onClick={this.handleShowAndHide} className="btn btn--bg-linear btn--medium">Gửi ngay</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container container-medium py-2">
                    <div className="row row-medium">
                        <div className="col-12 col-lg-3 col-medium">
                            <div className="card card-question-type">
                                <h3>Loại câu hỏi</h3>
                                <div className="accordion">
                                    <div className="accordion__item active">
                                        <div className="accordion__title"><span>Dịch vụ</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7"
                                                 viewBox="0 0 13 7">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path fill="#919191"
                                                                  d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="accordion__content">
                                            <ul>
                                                <li className="active"><span
                                                    className="dot"></span><span>1. Question 01</span></li>
                                                <li><span className="dot"></span><span>2. Question 02</span></li>
                                                <li><span className="dot"></span><span>3. Question 03</span></li>
                                                <li><span className="dot"></span><span>4. Question 04</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="accordion__item">
                                        <div className="accordion__title"><span>Giá cả</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7"
                                                 viewBox="0 0 13 7">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path fill="#919191"
                                                                  d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="accordion__content">
                                            <ul>
                                                <li><span className="dot"></span><span>1. Question 01</span></li>
                                                <li><span className="dot"></span><span>2. Question 02</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="accordion__item">
                                        <div className="accordion__title"><span>Thanh toán</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7"
                                                 viewBox="0 0 13 7">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path fill="#919191"
                                                                  d="M12.133.23a.742.742 0 0 0-.544-.23H.773c-.21 0-.39.077-.544.23A.743.743 0 0 0 0 .772c0 .21.076.39.23.543l5.408 5.408c.153.153.334.23.543.23.21 0 .39-.077.543-.23l5.409-5.408a.743.743 0 0 0 .229-.543c0-.21-.077-.39-.23-.544z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="accordion__content">
                                            <ul>
                                                <li><span className="dot"></span><span>1. Question 01</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 col-medium">
                            <div className="card card-qa">
                                <div className="frequently-asked-questions">
                                    <h1 className="frequently-asked-questions__title">Các câu hỏi thường gặp</h1>
                                    <div className="item">
                                        <h2 className="item__q">I/Question 01: How to use Thanktriips</h2>
                                        <div className="item__a">
                                            <p>Improve ashamed married expense bed her comfort pursuit mrs. Four time
                                                took ye your as fail lady. Up greatest am exertion or marianne. Shy
                                                occasional terminated insensible and inhabiting gay.</p>
                                            <p>
                                                So know do fond to half on. Now who promise was justice new winding. In
                                                finished on he speaking suitable advanced if. Boyhappiness sportsmen say
                                                prevailed offending concealed nor was provision. Provided so as doubtful
                                                on striking required. Waiting we to compass assured.
                                            </p>
                                            <p>So feel been kept be at gate. Be september it extensive oh concluded of
                                                certainty. In read most gate at body held it ever no.</p>
                                            <p>Talking justice welcome message inquiry in started of am me. Led own
                                                hearted highest visited lasting sir through compass his. Guest tiled he
                                                quick by so these trees am. It announcing alteration at surrounded
                                                comparison.</p>
                                            <p>Rooms oh fully taken by worse do. Points afraid but may end law
                                                lasted.</p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <h2 className="item__q">II/ Question 02: How to make money?</h2>
                                        <div className="item__a">
                                            <p>Improve ashamed married expense bed her comfort pursuit mrs. Four time
                                                took ye your as fail lady. Up greatest am exertion or marianne. Shy
                                                occasional terminated insensible and inhabiting gay.</p>
                                            <p>
                                                So know do fond to half on. Now who promise was justice new winding. In
                                                finished on he speaking suitable advanced if. Boyhappiness sportsmen say
                                                prevailed offending concealed nor was provision. Provided so as doubtful
                                                on striking required. Waiting we to compass assured.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default TourSupport;