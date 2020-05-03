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

        console.log(booking);

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
            <div></div>
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