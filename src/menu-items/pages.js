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
            title: 'Phòng của tôi',
            type: 'item',
            url: '/',
            icon: icons.GroupOutlined,
            breadcrumbs: true
        },
        {
            id: 'building',
            title: 'Toà nhà',
            type: 'item',
            url: '/building',
            icon: icons.HomeOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'building-detail',
                    title: 'Chi tiết toà nhà',
                    type: 'item-child',
                    url: '/building/:id',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'my-aspiration',
            title: 'Đăng kí nguyện vọng',
            type: 'item',
            url: '/aspiration',
            icon: icons.IdcardOutlined,
            breadcrumbs: true
        },
        {
            id: 'swap-room',
            title: 'Đăng kí đổi phòng',
            type: 'item',
            url: '/swap-room',
            icon: icons.RetweetOutlined,
            breadcrumbs: true
        },
        {
            id: 'fee',
            title: 'Danh sách tiền phí',
            type: 'item',
            url: '/fee',
            icon: icons.FileDoneOutlined
        },
        {
            id: 'rent',
            title: 'Danh sách tiền thuê',
            type: 'item',
            url: '/rent',
            icon: icons.TransactionOutlined,
            breadcrumbs: true
        },
        {
            id: 'setting',
            title: 'Cài đặt',
            type: 'item',
            url: '/setting',
            icon: icons.SettingOutlined,
            breadcrumbs: true
        }
    ]
};

export default pages;
