import {
    DashboardOutlined,
    HomeOutlined,
    UserOutlined,
    GroupOutlined,
    TransactionOutlined,
    FileDoneOutlined,
    RetweetOutlined,
    IdcardOutlined,
    SettingOutlined
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
    IdcardOutlined,
    SettingOutlined
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
        },
        {
            id: 'my-aspiration',
            title: 'Aspiration',
            type: 'item',
            url: '/aspiration',
            icon: icons.IdcardOutlined,
            breadcrumbs: true
        },
        {
            id: 'swap-room',
            title: 'Swap room',
            type: 'item',
            url: '/swap-room',
            icon: icons.RetweetOutlined,
            breadcrumbs: true
        },
        {
            id: 'fee',
            title: 'Fee',
            type: 'item',
            url: '/fee',
            icon: icons.FileDoneOutlined
        },
        {
            id: 'rent',
            title: 'Rent',
            type: 'item',
            url: '/rent',
            icon: icons.TransactionOutlined,
            breadcrumbs: true
        },
        {
            id: 'setting',
            title: 'Setting',
            type: 'item',
            url: '/setting',
            icon: icons.SettingOutlined,
            breadcrumbs: true
        }
    ]
};

export default pages;
