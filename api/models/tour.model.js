const moment = require('moment');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TourSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    estimateDays: {
        type: Number,
        required: true,
        default: 1
    },
    tpe:{
        type: Number,
        required: true,
        default: 1 // 1 => Nội địa && 2 => Quốc tế
    },
    schedule:[{
        tpe:{
            type: Number,
            required: true,
            default: 1 // 1 => Điểm khởi hảnh && 2 => Các ngày tiếp theo
        },
        places:[{
            name:{
                type: String,
                required: true
            },
            rateAvg:{
                type: String,
                required: true
            },
            avatar:{
                type: Number,
                default: 0
            },
            latLong:{
                type: String
            },
            checkInTime:{
                type: String
            },
            description:{
                type: String
            },
            images:[{
                path: {
                    type: String,
                    required: true
                },
            }]
        }]
    }],
    description:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    departureSchedule:{
        type: {
            type: Number,
            required: true,
            default: 0
        },
    },
    faresByAge:{
        adult: {
            type: Number,
            default: 0
        },
        from2to11YO:{
            type: Number,
            default: 0
        },
        under2YO: {
            type: Number,
            default: 0
        },
    },
    faresByTime:{
        normalDay: {
            type: Number,
            default: 0
        },
        weekend:{
            type: Number,
            default: 0
        },
        holiday: {
            type: Number,
            default: 0
        },
        fromDate:{
            type: Date,
            default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
        },
        toDate:{
            type: Date,
            default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
        }
    },
    refundCancel:{
        before20Days: {
            type: Number,
            default: 0
        },
        before15Days:{
            type: Number,
            default: 0
        },
        before7Days: {
            type: Number,
            default: 0
        }
    },
    priceIncluded:{
        transport:{
            type: String
        },
        transporter:{
            type: String
        },
        pointGo:{
            type: String
        },
        destination:{
            type: String
        },
        otherCosts:[{
            title: {
                type: String,
                required: true
            },
            cost:{
                type:Number,
                default:0
            }
        }]
    },
    priceNotIncluded:[{
        title: {
            type: String,
            required: true
        },
        cost:{
            type:Number,
            default:0
        }
    }],
    cancelTour:[{
        title: {
            type: String,
            required: true
        },
        cost:{
            type:Number,
            default:0
        }
    }],
    boardOther:[{
        boardTitle:{
            type: String,
            required: true
        },
        items:[{
            title: {
                type: String,
                required: true
            }
        }]
    }],
    status: {
        type: Number,
        default: 10
    },
    createdAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    },
    updatedAt: {
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    }
});

let Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;