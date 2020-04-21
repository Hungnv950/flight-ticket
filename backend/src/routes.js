import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Flights = React.lazy(() => import('./views/Flights/Index'));
const Flight = React.lazy(() => import('./views/Flights/View'));

const Collaborator = React.lazy(() => import('./views/Collaborators/View'));
const Collaborators = React.lazy(() => import('./views/Collaborators/Index'));
const CollaboratorCreate = React.lazy(() => import('./views/Collaborators/Create'));
const CollaboratorUpdate = React.lazy(() => import('./views/Collaborators/Update'));
const CollaboratorChangePassword = React.lazy(() => import('./views/Collaborators/ChangePassword'));

const Tour = React.lazy(() => import('./views/Tours/View'));
const Tours = React.lazy(() => import('./views/Tours/Index'));
const TourCreate = React.lazy(() => import('./views/Tours/Create'));
const TourUpdate = React.lazy(() => import('./views/Tours/Update'));

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
  { path: '/tours', exact: true,  name: 'Tour du lịch', component: Tours },
  { path: '/tour/:id', exact: true, name: 'Chi tiết tour', component: Tour },
  { path: '/tours/create', exact: true, name: 'Thêm mới tour', component: TourCreate },
  { path: '/tour/:id/update', exact: true, name: 'Chỉnh sửa tour', component: TourUpdate },
];

export default routes;
