import {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    GroupOutlined,
    TransactionOutlined,
    FileDoneOutlined,
    RetweetOutlined,
    IdcardOutlined
} from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    GroupOutlined,
    TransactionOutlined,
    FileDoneOutlined,
    RetweetOutlined,
    IdcardOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'my-room',
            title: 'My Room',
            type: 'item',
            url: '/',
            icon: icons.GroupOutlined,
            breadcrumbs: true
        },
        {
            id: 'building',
            title: 'Building',
            type: 'item',
            url: '/building',
            icon: icons.HomeOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'building-detail',
                    title: 'Building detail',
                    type: 'item-child',
                    url: '/building/:id',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default pages;
