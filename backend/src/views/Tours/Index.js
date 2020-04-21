import axios from 'axios';
import React, { Component } from 'react';

import { authHeader } from "../../helpers/authHeaders";

import {
    Card,
    CardBody,
    CardHeader, Input, InputGroup
} from 'reactstrap';

function TourRow(props) {
  const tour = props.tour;
  const viewMode = props.viewMode;

  if(viewMode){
    return (
        <div className="tour-list-items">
          <img src={tour.avatar} className="tour-item-img-lg mb-2" alt={tour.title}/>
          <h5><b>{tour.title}</b></h5>
          <div className="clearfix">
            <div className="float-left">
              <div className="tour-price text-bold text-orange">1.200.000 đ</div>
            </div>
            <div className="float-right">
              <i className="fa fa-calendar"></i> <span> {tour.estimateDays} days</span>
            </div>
          </div>
        </div>
    )
  }
  else{
    return (
        <div className="tour-list-items row">
            <div className="col-md-3">
                <img src={tour.avatar} className="tour-item-img-sm" alt={tour.title}/>
            </div>
            <div className="col-md-9">
                <h5><b>{tour.title}</b></h5>
                <div className="clearfix">
                    <div className="float-left">
                        <div className="tour-price text-bold text-orange">1.200.000 đ</div>
                    </div>
                    <div className="float-right">
                        <i className="fa fa-calendar"></i> <span> {tour.estimateDays} days</span>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tours: [],
        viewMode: true
    };

    this.handleViewMode = this.handleViewMode.bind(this);
  }

  componentDidMount(){
    axios.get("/api/admin/tours",{headers: authHeader()}).then(response => {
      this.setState({ tours: response.data.tours });
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleViewMode(){
      this.setState({
        viewMode: !this.state.viewMode
      })
  }

  render() {

    const { tours, viewMode } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="rct-page-content">
          <div className="row">
            <div className="col-md-4 my-tours">
              <div>
                <div>
                  <div className="clearfix mb-4">
                    <div className="float-left">
                      <h1>My Tours</h1>
                      <small>There are <span>4</span> tours</small>
                    </div>
                    <div className="float-right"><a href="#/tours/create">
                      <button className="btn btn-rounded btn-custom">Tạo mới</button>
                    </a></div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <div className="bd-highlight align-self-center w-70">
                    <div className="css-1pcexqc-container">
                      <div className="css-bg1rzq-control">
                          <InputGroup>
                              <Input type="select" name="ccmonth" id="ccmonth">
                                  <option value="">Chọn điểm đi</option>
                                  <option value="1">Hà Nội</option>
                                  <option value="2">Hải Phòng</option>
                                  <option value="3">Quảng Ninh</option>
                                  <option value="4">Nha Trang</option>
                                  <option value="5">TP. Hồ Chí Minh</option>
                              </Input>
                          </InputGroup>
                      </div>
                    </div>
                  </div>
                  <div className="bd-highlight align-self-center">
                    <button className={viewMode ? 'btn btn-display' : 'btn btn-display active'} onClick={this.handleViewMode}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMC4wMjIiIGhlaWdodD0iMTcuNjY1IiB2aWV3Qm94PSIwIDAgMjAuMDIyIDE3LjY2NSI+DQogIDxnIGlkPSJHcm91cF80ODUiIGRhdGEtbmFtZT0iR3JvdXAgNDg1IiBvcGFjaXR5PSIwLjYzNyI+DQogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV81ODMiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDU4MyIgd2lkdGg9IjEzLjE0MyIgaGVpZ2h0PSIxLjA0OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi44NzkgMCkiIGZpbGw9IiMyMzFmMjAiLz4NCiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzU4NCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgNTg0IiB3aWR0aD0iOS42NTIiIGhlaWdodD0iMS4wNDkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuODc5IDQuNzk5KSIgZmlsbD0iIzIzMWYyMCIvPg0KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfNTg1IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1ODUiIHdpZHRoPSI1Ljc1MyIgaGVpZ2h0PSIxLjA0OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi44NzkgOS41OTgpIiBmaWxsPSIjMjMxZjIwIi8+DQogICAgPHBhdGggaWQ9IlBhdGhfNDY2IiBkYXRhLW5hbWU9IlBhdGggNDY2IiBkPSJNMTQyLjMzMiw0OGEuNDIzLjQyMywwLDAsMC0uNTk1LS42bC0zLjA0NiwzLjA0NnYtMTUuOGEuNDE5LjQxOSwwLDAsMC0uNDIxLS40MjEuNDIzLjQyMywwLDAsMC0uNDI3LjQyMXYxNS44TDEzNC44LDQ3LjRhLjQzMS40MzEsMCwwLDAtLjYsMCwuNDIxLjQyMSwwLDAsMCwwLC42bDMuNzY3LDMuNzY3YS40MTQuNDE0LDAsMCwwLC41OTUsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzQuMDc3IC0zNC4yMjQpIiBmaWxsPSIjMWUyMDFkIi8+DQogIDwvZz4NCjwvc3ZnPg0K"
                        alt="list"/>
                    </button>
                    <button className={viewMode ? 'btn btn-display active' : 'btn btn-display'} onClick={this.handleViewMode}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNy4yMDgiIGhlaWdodD0iMTcuODA0IiB2aWV3Qm94PSIwIDAgMTcuMjA4IDE3LjgwNCI+DQogIDxwYXRoIGlkPSJQYXRoXzQ2NyIgZGF0YS1uYW1lPSJQYXRoIDQ2NyIgZD0iTTE1Mi4wNTcsMjY2LjM3OEgxMzkuNjM5YTIuNCwyLjQsMCwwLDEtMi4zOTUtMi4zOTV2LTcuNWEyLjQsMi40LDAsMCwxLDIuMzk1LTIuMzk1aDEyLjQxOGEyLjQsMi40LDAsMCwxLDIuMzk1LDIuMzk1djcuNUEyLjQsMi40LDAsMCwxLDE1Mi4wNTcsMjY2LjM3OFptLS4wMDgsMS43NjdoLTEyLjR2Ljk5aDEyLjRaTTE1MC40LDI3MC45aC05LjEwOHYuOTlIMTUwLjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3LjI0NCAtMjU0LjA4NykiIGZpbGw9IiMyMzFmMjAiIG9wYWNpdHk9IjAuNjEzIi8+DQo8L3N2Zz4NCg=="
                        alt="list"/>
                    </button>
                  </div>
                </div>
                <div>
                  {tours.map((tour,index) =>
                    <TourRow tour={tour} key={index} viewMode={viewMode} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <Card>
                <CardHeader>
                  Card with icon
                  <div className="card-header-actions">
                    <i className="fa fa-check float-right"></i>
                  </div>
                </CardHeader>
                <CardBody>

                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  Tour Rules
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-5">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCABkAGQDAREAAhEBAxEB/8QAHgAAAQQDAQEBAAAAAAAAAAAACQMGBwgEBQoCAQD/xAAbAQACAwEBAQAAAAAAAAAAAAADBgIEBQcBAP/aAAwDAQACEAMQAAAANBmT9jueZQWKPC8LE0SsMkJeB64SC92Qp/fJiJ9+9cggqjtp/epkHS08xNXIaq/V3VeycDJ9kqUMeP3oo/Pvj3q/fR20Y/amZOfPL3jGSuUPp6YrnlBI9V9L/GovCPyUUS/PrPJ6HYQ8+qFM9UF5vuxK3CGWzAxb+c627k9TJM3dkFi/RU98fVCx4gfGjId31mY15zpOPSzoyC8xqDRu4vVd9XlWzTzfR5H0nhStJwJroEi76cTLPR9TX04IOGkZgD8Z+a9U3oHWWtu5eLiI7Kc/1j3UDO2JDrmsu8UYnSB41vodYkSwTEmGFLTf5qq8ZewykAMm5ZhSvVojxvVSD846TI+Q3D5iQcThz4mWpjEGoFelgG89r+hFlCvINLFQDSzYuZl3upblnU674TBGpRUsc1AeXSOakhw9M0q/sLeiVD7LC5uhqbMwMzsm5lW50s8s61IAytf70Vu6sDW6Fz++S9tnFXNVY1ZeYXciOwaXVbFl0ZF19ex058w6pOQZ4MpBEcUcbjIrX3WWY12Ld2p6u7INLnb6CF7V6M9BRfMCdWKG/Slm2JU2MTnXbl4ZtyhelUZTUY1zd2K+wINk82ewWvC1Ul+RtkQXXsM87LtvW6NTm80fBzFDcNb3zPY1zPkBxmh//8QAKRAAAAYBAwQCAwEBAQAAAAAAAQIDBAUGBwAIEhETISIJFBUxMiNCJP/aAAgBAQABCAFARMkUdFAwdRPwER66N4/RwKT+bXmLG1JclbWJfdThZB12lqvcK1co4JarnOH7IQ3Lr3D+v9cgAPHcH/pADdkgm6gH9H6gAn0U365brdxhMakRoNZd1OatzdzdVfrwjZt9hPHOZ7HjSzEnK1ifJkPlmmoXKEE5wD34FP7a8iHqChf+2/siUBMPTwVQeAeZF+izaLPHrlex7pNxEg7h6HiCn0Ch/gFc/YSgIQi9hqNifLwcx9pDYnlRvFXg1SVRKov7KjyDwQDG0Yp1B5aQH/EgaNyDqGlAHp6738hnxxtqsUwh8dFNTr2NpXJ0o6zviWQWUrEZdVIyVjliLZyaqwlnXj9YWvzyuTkfMs4iTQkI5J+kHQC9QBUDG8CqkTwZIQ7BDaA/kdHUDiIa+S1iu423/cRxniJdHbpH49j6btRyHGZoUkSb80JmiJxjCh249iVKunP1Zz9Wc4Dh6TUcYwrrpQixQ9jkUBUPQqROnuiqAoFNpQ/jSihip6yrTYnJmPpmgT0XkOZx/heOVt+HsgSqrl1aLXuRyZTbbNxy7HeQzrB6wzPBUKnS93u0XWYCrRP4iFZRbUodOXdRXEqXPQKiP7RP/wCcgCqPUOgLK8f1IrFN5VubSo5VYzWPGS1WhcN1t5W5q+uJded+hUNxFgULBMK8T49MbEcyS2TXsasqkfjr7HeRA4pKmBroqw9NNVuTcojZrbWqnGnlLNkPf9t8p4HQisu/I3kS2tXMRRNntXWpm2OEGZv1mqE/Dfj53I6NaPwhaLkivWWt3OVh7LteynhmAx9GUqPYSyMkgm6jUn5ytxIoiuXh0Nz1GoGdlBNL5bK6rCzdOtSAujKn1CESeWWPYLoxYNINpHR1thXsjIqtk2eOlWr/AOypvCimLOWXfolX5FA2vjan5hzmGQpqHLoX2K6EfCYOOn9oTH49j3CfKlYVpaoVjuocg9dR6wtZD7JcYSkvJ1Jqq7ZQvk7hWQgHLpU3DehJNq3aW9YfAoi7L1S+PU7mHzo6nmiS5HSAOTJqibxr/IP3LueSBSp/JZJonTrEURYwFDui1EyneWNhxExKs1SOmimBOgOY9QxRAnyLtxRynFEFL/BybWw2UM3ynKw5YoeUcmXTYPbqZJInD1kXYlR6hvqnHctldBsZ4p0KJNNCdGxw1iunzLCqRqykdASrl92iNKi3ST+xJ/J+r39xJDEXJ1V6hsKjfs5LkZzTRbtgAaIubucjGWIUfFjlnSbHmTdA6Wf5RUXcmSA4AJiIEBubWBpV2jj+LIH5Zx00/lFlG48/kfN9rOArHWbE8jrYcsq2y+o3IR8sJB6x8guYfKbxTjr/xABBEAABAwIEAgcFBAYLAQAAAAABAAIDBBEFEiExQVETImFxgZGhBhQyQlIVIzSxEDOiwdHwJVNyc4KDkpOjstLx/9oACAEBAAk/AW/IF6Ky47Fa358l7a0VLO536h8ozeS9rmHhnbA8t87LHYK6DnA6+XsPJXvzWhHEpw7E3N2JvqvoFrpgtzQ17EbKq/pzE4C7P8tJDxe7kTw7lik1e+CcGUFpLSDe7rm6c6POdLatzBYo7NC8CeJ3wvb9Lx8zTw5JxAm6lRA74qeVvxMP86iyd33TyUbWTm37UPkCYPFeimEUMELpJZHaBrW6k+SprvrKwymWSPO2np26RMtxs22/FMFRM5g95mkA67u4KAx3v75SR/DKOdufJDWPYX0kj5fkfFVuSlxylDoRm0MzdvG1x5KxbwuU1PTb9uik+UcFqED5Inp62JuH09t7zHKf2bqB+bE8RMMJ6Iudkj3A8SfJe0jPtJl+lpKiMwyjwda/gqm0eRfCJH9Hflr/ABCqLVOFV0c0d+Lb6j0CD8tRE2VvKzhdSeqGg4807L2IfIEe5G/MrOYqP2joJqss4MzObf1CxSuwt7qRzppKGQRy5nuJPWsbXvusXxR9AJgZRidWJm5RuBd5JJ5p72urfxNnEZB4IudKyfO2Y1BkzjxJtsnWbI038U89I/A6UuH+U1P0PAbBDuRF+1N+UL0RtpsvwuL4fJTyOPyXGjx/ZNj4KsjZWUlH7rPPsJXRHow/X6mtDvFUk1JhzrNgd0Bc6RxO7jwCmgnmp6zJVQX63RHZw7lQU8UgeHEwxhubQ7qDPU11U2GLz3PcExuWlpIoG/4Whv7kzrAaWTeX6PpCP6LkfTtdO96kw6sjZiHVuyKaQZ+jvtmyjVvDML7r2gx6KhmqJJsKraWqL+hDh+Hex1wQ03t2WXtC6rglmzVNdU4WyLKwcBbdxVRJLM4gdM/jl3P880NYGzQUmZmxuLu/MJ7vFfrALG3FHhsh6qPXINFj9Fh1O0XdNWTtYPXdY3VY7O3To8Lpjl/1vyhYLBgFK+M5qoPM1Vl7HaBh7h4q/wBp40+bFq+V5u90sz7jMePUDVSEPB+8yaf/AFUkkk0r/vJJNmC6rZasYdWPZQGd2zZOuPQgr29o6WvpmXqYa53QZ5Sbu1cADqdNdlLHURvHVljeCD4jQptjZG6HorgZRe/JVJLKmkqqOQcMzHB4/wCxTr8Aj91PiUDZf7vOFlbBBSsZGG7Boas2W/JN+bkmXqnuiAIG/wB2NfIFblV8nulXgE0/umfqGWN7LOtzsXJtxxW35K9+xyfqW6I5nMxqbJ/tI67BfFE9jm9lnKqe4iFt83cuKOUdyYXNq8NMzJcmYZw8jK4fT6ghQdEWu1DTdXy0/s9KC7tfIwW9FKesM2iAI4KSyd8gWszKyabL2ZbXQF+5cVFo6miP7ITfBQ+KGowe/wDyOXE8kfu6rAS8i3zMlZb8ypBm6Pa6b32TWnvTtmBPu2CjyxDl1ySiju39ypHPjfh8BZLGLtN42qikI49SysGN3YFpCMIibEzla6Cl/DYZ0IZzL3j/AMolmVoHknZr8Sn+RWW+Qc067mQWb5px3RPwp12/ZcGhv/VhMZ5FRMOm2v8AFb+78PBOKf1JsJfnbzs9lvzQarapjV//xAAjEAEBAAICAgIDAQEBAAAAAAABEQAhMUFRYXGBkaHRweHw/9oACAEBAAE/EAZB/gYTsnQ8naBfdTIKRsAcnrGeDFUlOhfvjDbSALa7TU4ySIoNk9oeNomky7AjUHkMVxvwTCAvsEx8tDaOVxQST5T94bi78tYHYDBoGjJJ+gD4xWjT6f8AMBBdynRhvh6YB1sbmsGUztFruo9o6xL3kNuDUDShLG/GsElQdH8iYCUxTljSJdAG8jsexYekiez53lXB+XI58gy5Po9gtx6qDu1wYId5vw/eEu7Xejr5M1YiJMuXWguEKQvtNwCFPBWBVDDlyKwA9QMhwyrOck8EFRg2ZSEsVomxsG6ePug/bSfX2Y4H27l2fVzimca6wyxHpkvvEa8B2GGapIHbRkDSnZQMvbxwFGvJkrvTda974cSgNrZQoWZrZoIWQRS754NKyDe0SbXbdfLncrBqLRr1VJ2GbR8c0i8/GTLVlW5M64c53iXVH5xZ5JXbx/3ND3KeJgiLkjyaOTFN8bR1hxJeSX48YP8Af9XPyyhnxiBh9kgwFy/vYS0weGDcBRrvSKHL7fCHIKqpLKYLqEDjQon3hOjpV3BXEqVttE95QGRi46vGH3S5eWGSrskZDN+WpOf+5vbrZbciYbpG/wAQRH3jeq720eqKA8vIlBazC4Uyya4VxKpd/dOlsNHkcZBqMMIgx6BMRgNELBavQOQeN3ABmvGVHQh8h7OM4MCLjV+MqN24ryPxdHjAdH117zhbc15wPSOBA/acz3lI0ATKW2gCcSYHEhci5mzttS2Oq0e1fAYLu4lgEy/JClAGATTDIFwiZGMfYZC2qAVa38vI+sjUkLsANLO8FQutTE97zix71/uAeVDlWHeHlAzR6s/C41gmNb7zTab8mZN++X9YgFaWourWDrjxkmyNEpyB8JnvqmFCBA89ZVERIFHwCkGqYdYwpJmGdhGwyzNujasd7HTxm884QG8a94vaIbS9b3gZoZnr+AZBfvOlVpyPPZmsialNleXm6M50Yc6D8G/3gbI8AAgRScd5uREKUOGYEEdeG6x6YmMYXopprXG1jSK3Q7Ey7mVJRQ6ztZcYzyN04eeesU1ESt/IwREvLES1k9KQjhy4z7Rjm0p9wvK/HGHoLU3hKUTlPJrCFN8ikTbXjCSa21vGah7h8MQzTA7lO1E2MRMnYyug8y7npVPOXZ7lgG/wxAojdje23x6kwd7mhdQlp/pmrUk4qZIIOA60ZUsr8Z5KXJYsIfz1hcjpJ4DWXlaL3d2cvEkHWN6LNt/jNs/L7hgSGjg0wlLzb2F9GWmyYFEIW65xKkJOL7nvACJ5WKWXyPDi0u/I1XFY7JtynDZwzG3BVmq041qO7gY9lKD5FYZr5NQV9L49G8XW/wCktYBj8sHnNQqvf3n2AsfdBWeCKZFKZuU6YQ1oxmAWyeHzhLEWCQyjI1485M9z8eMA9TtF9LkFP/Z7xaCrbXDaa5+pi4hQeE8fGPT39wq3yViu7b0/3Du8iiMf3mk7PD/c/8QAJhEAAgICAQQDAAIDAAAAAAAAAAECAwQREgUGEzEQITIzQRQjUf/aAAgBAgEBPwCv0MiviTlGOojplbXpjx7NDU6/ZEj6JM4nEr9DNsgzHcfJqRdKCekY11Nv0ZmNB+hx0QZyIGkV+hiWhPSLst1TJZk5xKupWUZSkyi+OTUrC5rYopo4kYmmV+h/HFGTFO0sthVUWTjd9o6PdKVXAyHplEtx+dsgTIk/yW1TmyVdtq8Y8WFTXkZheCGuDMuHKGzEknXocvmotIk3pGbkzx9swuoPbmzJzK8mvezpeQ5W8Uy63/XopShXsZy0jyFdlkSCdv6Jx4EIKZ1rGsr/AAWc6cfb9mJbUoy5ff8Aw7fothJ2WE2myFmkN8hs2xSlEox7rvyVdHul+iODXRFtnWcmM8jcPRKymz6bK4Y8JJRRjWVTioUkcG9Q3os81b00Y75RH7OR5I8Dok05yHbtMzJN0TMmtNssok2UVTjJtnbyg8pNkLa+HE6tj0xr5FE1ocvs0h5T4nb2Q5TkQW0zNS/x5k4vkxQiNRcZaO3Mac5bKVXH6Z3JasenZjSbR/ZpjbaO005XSkL0XpOiZfBedjUVIUNxaR2xW1WxpqbO6oc8dGGuMCC+ziVvaOzXuqUjypo4OyiR1DpuRXa2kV4WRKRg9NdlupHTseOLtIlHe2dyWapSKHrQmjaKvydnfxyG9Ix2/MdVS+yP9lH8Zi/lk36OuJeFD9RF+fj/xAAmEQACAgICAgIDAAMBAAAAAAABAgADBBESIQUxBhATIjIUI1GB/9oACAEDAQE/AK4vqMPpNTSGc0Bj6cdQ+oRB1AepyiRfX0Vj1HXUSiw+pdRbWZj7IjQDcK9fdYi+oOhKxszGwa7V6lOGaW6lviFzcQsR3LqXw7SkCcljfqZy+64OvqgbMwFSur9vcxaLrrNv6lVf6FR6nnalW8zEHOszIXVhH1ymzE7h9QAFpiAfllFiVfq4lJXEQt/2V5V91H+odzyIym5G0dzBf8ZKzLXVhMI+uBlC7EUbYzh3KCRbPDY9eaAzDc8ngL0tU8fiGmziRPOYlaYbPruJVqwmXnm+oyxa9z8cqGhCSDF4spnI11kCfGM+2peJ7mDhX+TbnTogexPJ4N1T8z+p/wCT5D5H8lf4FMZGWvRhRePqcSIv1SuhLHVJd5BE6EGRbfeFWeGxrKK+x2Zgf5OG3LHbW55DyGXaGFh/9j15Ccrb+pbmYpt0Gimtz0ZaoizgZjAlDPJVlaxOAJmEg/OkxiwMx7AtcyCtidT5AXTF0IQS+zPG3O1ujGTTzjp5ymJhDRnnscJSIV7mEdZCRCorUw2EHQlblT3PkOcgUqZawJ2J4Gpb7JlAJbqMBv6x/c+SNpdRSecoci4SmzeMsL6HuV3KP6M+R2Ib+oDufHLRXcZmODlloW7M2ZjIOAnypeLCVkczEYC2YmbQaFBMtzaAp7mV5Ms2lM8i72WbMT2Z8fr3aTMgAncYd/WL/Anyr+hK/wC5b08F1gPufls4+47N1LyevrwzsLW1Nn9oSdibM//Z"
                            alt="user profile" className="img-fluid rounded-circle" width="80" height="80"/>
                        </div>
                        <div className="col-7">
                          <div className="">Phạm Văn A</div>
                          <div><small className="text-gray">Supporter</small></div>
                          <div className="">
                            <a>Change</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-5">
                          <button className="btn-add" type="button"><i className="fa fa-plus fa-2x"></i></button>
                        </div>
                        <div className="col-7">
                          <div className="">Thêm thành viên</div>
                          <div><small className="text-gray">Vai trò trong tour</small></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  Card with icon
                  <div className="card-header-actions">
                    <i className="fa fa-check float-right"></i>
                  </div>
                </CardHeader>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  Card with icon
                  <div className="card-header-actions">
                    <i className="fa fa-check float-right"></i>
                  </div>
                </CardHeader>
                <CardBody>
                  <table className="table table-responsive-sm">
                    <thead>
                    <tr>
                      <th>Username</th>
                      <th>Date registered</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Samppa Nori</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                    <tr>
                      <td>Estavan Lykos</td>
                      <td>2012/02/01</td>
                      <td>Staff</td>
                      <td><span className="badge badge-danger">Banned</span></td>
                    </tr>
                    <tr>
                      <td>Chetan Mohamed</td>
                      <td>2012/02/01</td>
                      <td>Admin</td>
                      <td><span className="badge badge-secondary">Inactive</span></td>
                    </tr>
                    <tr>
                      <td>Derick Maximinus</td>
                      <td>2012/03/01</td>
                      <td>Member</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>Friderik Dávid</td>
                      <td>2012/01/21</td>
                      <td>Staff</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index;
