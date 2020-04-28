const moment = require('moment');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TourSchema = new Schema({
    title: {
        type: String, // Tiêu đề tour
        required: true
    },
    basePrice:{ // Giả khởi điểm Tour
        type: Number,
        required: true
    },
    estimateDays: { // Thời gian đi của tour (số ngày)
        type: Number,
        required: true,
        default: 1
    },
    tpe:{
        type: Number,
        required: true,
        default: 1 // 1 => Nội địa && 2 => Quốc tế
    },
    description:{ // Mô tả tour
        type: String,
        required: true
    },
    avatar: { // Hình đại diện tour
        type: String,
        required: true
    },
    companyTour:{ // Công ty tổ chức Tour
         name:{ // Tên công ty
             type: String
         },
        avatar:{ // Ảnh đại diện
            type: String
        }
    },
    imagesTour:[{ // Hình ảnh chuyến đi
        path:{ // Đường dẫn ảnh
            type: String,
            required: true
        }
    }],
    schedule:[{
        tpe:{
            type: Number,
            required: true,
            default: 1 // 1 => Điểm khởi hảnh && 2 => Các ngày tiếp theo
        },
        cities:[{
            cityId: { // Id địa chỉ lấy từ API về
                type: String,
                required: true
            },
            name:{ // Tên địa điểm
                type: String,
                required: true
            },
            rating:{ // Đánh giá địa điểm
                avg: { // Đánh giá trung bình
                    type: Number,
                    default: 0
                },
                times:{ // Số lần đánh giá
                    type: Number,
                    default: 0
                }
            },
            coverImage:{ // Ảnh đại diển
                type: String,
                required: true
            },
            geoPoint:{ // Địa chỉ latlong gg map
                type:{
                    type: String,
                    default: 'Point'
                },
                coordinates: []
            },
            checkInTime:{ // Thời gian checkin. Theo theo giờ (ví dụ 7:30)
                type: String,
                default: '7:30'
            },
            description:{ // Mô tả địa điểm
                type: String
            },
            images:[]
        }]
    }],
    departureSchedule:{ // Lịch trình
        type: {
            type: Number,
            required: true,
            default: 1 // 1 là hằng ngày && 2 cố địch trong tuần && 3 cố định trong tháng
        },
        allDays:{ // Tất cả các ngày lễ tết
            type: Boolean,
            default: false
        },
        days:[] // Danh sách các ngày. Ví dụ [2,3,CN] nếu là tuần hoặc [1,3,4,5,30] nếu là tháng
    },
    faresByAge:{ // Giá vé theo độ tuổi
        adult: { // Người lớn
            type: Number,
            default: 0
        },
        from2to11YO:{ // Từ 2 đến 20 tuổi
            type: Number,
            default: 0
        },
        under2YO: { // Dưới 2 tuổi
            type: Number,
            default: 0
        },
    },
    faresByPeople:{ // Giá vé theo số người
        from10To20: { // 10 đến 20 người
            type: Number,
            default: 0
        },
        from20To30:{ // 20 đến 30 người
            type: Number,
            default: 0
        },
        from30: { // Trên 30 người
            type: Number,
            default: 0
        },
    },
    faresByTime:{ // Giá vé theo thời gian
        normalDay: { // Ngày bình thường
            type: Number,
            default: 0
        },
        weekend:{ // Cuối tuần
            type: Number,
            default: 0
        },
        holiday: { // Ngày lễ
            type: Number,
            default: 0
        },
        fromDate:{ // Thời gian bắt đầu tính
            type: Date,
            default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
        },
        toDate:{ // Thời gián kết thúc tính
            type: Date,
            default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
        }
    },
    refundCancel:{ // Hoàn tiền hủy tour
        before20Days: { // Trước 20 ngày
            type: Number,
            default: 0
        },
        before15Days:{ // Trước 15 ngày
            type: Number,
            default: 0
        },
        before7Days: { // Trước 7 ngày
            type: Number,
            default: 0
        }
    },
    priceIncluded:{ // Giá bao gồm
        transport:{ // Phương tiện di chuyển
            type: String
        },
        transporter:{ // Hàng phương tiện
            type: String
        },
        pointGo:{ // Điểm khởi hành
            type: String
        },
        destination:{ // Điểm đến
            type: String
        },
        otherCosts:[{ // Danh sách các khí khác
            title: { // Tên phí
                type: String,
                required: true
            },
            cost:{ // Giá tiền
                type:Number,
                default:0
            }
        }]
    },
    priceNotIncluded:[{ // Giá vé không bao gồm. Là danh sách
        title: { // Tên phí
            type: String,
            required: true
        },
        cost:{ // Giá phí
            type:Number,
            default:0
        }
    }],
    cancelTour:[{ // Hủy tour.
        title: { // Tên phí
            type: String,
            required: true
        },
        cost:{ // Giá phí
            type:Number,
            default:0
        }
    }],
    boardOther:[{ // Dánh sách board khác
        boardTitle:{
            type: String,
            required: true
        },
        items:[{ // Danh sách các item
            title: { // Tiêu đề các item
                type: String,
                required: true
            }
        }]
    }],
    status: { // Trạng thái tour
        type: Number,
        default: 10
    },
    createdAt: { // Thời gian tạo tour
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    },
    updatedAt: { // Thời gian update tour gần nhất
        type: Date,
        default: new Date(moment().set({'hour': moment().hour()+7}).toDate())
    }
});

let Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;