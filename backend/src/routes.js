import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const User = React.lazy(() => import('./views/Users/User'));
const Users = React.lazy(() => import('./views/Users/Users'));

const Flights = React.lazy(() => import('./views/Flights/Index'));
const Flight = React.lazy(() => import('./views/Flights/View'));

const Collaborator = React.lazy(() => import('./views/Collaborators/View'));
const Collaborators = React.lazy(() => import('./views/Collaborators/Index'));
const CollaboratorCreate = React.lazy(() => import('./views/Collaborators/Create'));
const CollaboratorUpdate = React.lazy(() => import('./views/Collaborators/Update'));
const CollaboratorChangePassword = React.lazy(() => import('./views/Collaborators/ChangePassword'));

const Tours = React.lazy(() => import('./views/Tours/Index'));
const TourChat = React.lazy(() => import('./views/Tours/Chat'));
const TourCreate = React.lazy(() => import('./views/Tours/Create'));
const TourUpdate = React.lazy(() => import('./views/Tours/Update'));
const TourGeneral = React.lazy(() => import('./views/Tours/General'));
const TourSupport = React.lazy(() => import('./views/Tours/Support'));

const Schedules = React.lazy(() => import('./views/Schedules/Index'));
const ScheduleDetail = React.lazy(() => import('./views/Schedules/View'));

const Transactions = React.lazy(() => import('./views/Transactions/Index'));
const TransactionView = React.lazy(() => import('./views/Transactions/View'));

const Employees = React.lazy(() => import('./views/Employees/Index'));
const EmployeeView = React.lazy(() => import('./views/Employees/View'));
const EmployeeCreate = React.lazy(() => import('./views/Employees/Create'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/flights', exact: true, name: 'Flights', component: Flights },
  { path: '/flight/:id', exact: true, name: 'Flight Details', component: Flight },
  { path: '/collaborators', exact: true, name: 'Collaborators', component: Collaborators },
  { path: '/collaborator/create', exact: true, name: 'Collaborator Create', component: CollaboratorCreate },
  { path: '/collaborator/:id/update', exact: true, name: 'Collaborator Details', component: CollaboratorUpdate },
  { path: '/collaborator/:id/change-password', exact: true, name: 'Collaborator Details', component: CollaboratorChangePassword },
  { path: '/collaborator/:id', exact: true, name: 'Collaborator Details', component: Collaborator },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/employees', exact: true,  name: 'Users', component: Employees },
  { path: '/employee/:id', exact: true, name: 'User Details', component: EmployeeView },
  { path: '/employees/create', exact: true, name: 'User Details', component: EmployeeCreate },
  { path: '/tours', exact: true,  name: 'Tour du lịch', component: Tours },
  { path: '/tour/:id/general', exact: true, name: 'Chi tiết tour', component: TourGeneral },
  { path: '/tour/:id/chat', exact: true, name: 'Chi tiết tour', component: TourChat },
  { path: '/tour/:id/support', exact: true, name: 'Chi tiết tour', component: TourSupport },
  { path: '/tours/create', exact: true, name: 'Thêm mới tour', component: TourCreate },
  { path: '/tour/:id/update', exact: true, name: 'Chỉnh sửa tour', component: TourUpdate },
  { path: '/schedules', exact: true, name: 'Danh sách ngày khởi hành', component: Schedules },
  { path: '/schedule/:id', exact: true, name: 'Chi tiết ngày khởi hành', component: ScheduleDetail },
  { path: '/transactions', exact: true, name: 'Transactions', component: Transactions },
  { path: '/transaction/:id', exact: true, name: 'Transactions View', component: TransactionView },
];

export default routes;