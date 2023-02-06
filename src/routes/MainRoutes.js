import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const BuildingList = Loadable(lazy(() => import('pages/building/BuildingList')));
const BuildingDetail = Loadable(lazy(() => import('pages/building/BuildingDetail')));
const MyRoom = Loadable(lazy(() => import('pages/room/MyRoom')));
const MyAspiration = Loadable(lazy(() => import('pages/aspiration/MyAspiration')));
const SwapRoom = Loadable(lazy(() => import('pages/swap-room/SwapRoom')));
const ListFee = Loadable(lazy(() => import('pages/fee/ListFee')));
const ListRent = Loadable(lazy(() => import('pages/rent/ListRent')));
const UserDetail = Loadable(lazy(() => import('pages/user/UserDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <MyRoom />
        },
        {
            path: '/building',
            element: <BuildingList />
        },
        {
            path: '/building/:id',
            element: <BuildingDetail />
        },
        {
            path: '/aspiration',
            element: <MyAspiration />
        },
        {
            path: '/swap-room',
            element: <SwapRoom />
        },
        {
            path: '/fee',
            element: <ListFee />
        },
        {
            path: '/rent',
            element: <ListRent />
        },
        {
            path: '/setting',
            element: <UserDetail />
        }
    ]
};

export default MainRoutes;
