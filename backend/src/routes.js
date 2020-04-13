import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Flights = React.lazy(() => import('./views/Flights/Flights'));
const Flight = React.lazy(() => import('./views/Flights/Flight'));

const Collaborator = React.lazy(() => import('./views/Collaborators/Collaborator'));
const Collaborators = React.lazy(() => import('./views/Collaborators/Collaborators'));
const CollaboratorCreate = React.lazy(() => import('./views/Collaborators/CollaboratorCreate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/flights', exact: true, name: 'Flights', component: Flights },
  { path: '/flights/:id', exact: true, name: 'Flight Details', component: Flight },
  { path: '/collaborators', exact: true, name: 'Collaborators', component: Collaborators },
  { path: '/collaborator/create', exact: true, name: 'Collaborator Create', component: CollaboratorCreate },
  { path: '/collaborator/:id', exact: true, name: 'Collaborator Details', component: Collaborator },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
