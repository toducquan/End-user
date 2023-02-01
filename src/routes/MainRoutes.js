import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const BuildingList = Loadable(lazy(() => import('pages/building/BuildingList')));
const BuildingDetail = Loadable(lazy(() => import('pages/building/BuildingDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/building',
            element: <BuildingList />
        },
        {
            path: '/building/:id',
            element: <BuildingDetail />
        }
    ]
};

export default MainRoutes;