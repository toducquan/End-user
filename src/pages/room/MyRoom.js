import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Select,
    MenuItem,
    Tab
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';
import RoomInfor from './component/RoomInfor';
import StudentRoom from './component/StudentRoom';
import { getRoomByIdService, updateRoomByIdService, removeStudentsInRoomService } from 'services/roomService';
import { raiseNotification } from 'store/reducers/notification';

const MyRoom = () => {
    const profile = useSelector((state) => state.profile.profile);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [valueTab, setValueTab] = useState('1');
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [room, setRoom] = useState();

    useEffect(() => {
        setTimeout(() => {
            getRoomById();
        }, 500);
    }, [profile]);

    const getRoomById = () => {
        console.log('vao: ', profile?.room.id);
        getRoomByIdService(profile?.room.id).then((res) => {
            setRoom(res.data);
            setIsLoading(false);
        });
    };
    const updateRoomById = (value) => {
        setIsLoading(true);
        setTimeout(() => {
            updateRoomByIdService(profile?.room.id, value).then((res) => {
                getRoomById();
                setIsLoading(false);
                dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
            });
        }, [500]);
    };

    const removeStudentsInRoom = (value) => {
        setIsLoading(true);
        setTimeout(() => {
            removeStudentsInRoomService({
                students: value
            }).then((res) => {
                getRoomById();
                setIsLoading(false);
                dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
            });
        }, [500]);
    };

    // Change tab
    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <React.Fragment>
            {profile?.room ? (
                <React.Fragment>
                    <Box sx={{ width: '100%', mr: 2 }}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                            {t('My Room')}
                        </Typography>
                        <TabContext value={valueTab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '322px' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label={t('Room Detail')} value="1" />
                                    <Tab label={t('Roomates')} value="2" />
                                </TabList>
                            </Box>
                            {isLoading ? (
                                <LoadingPage />
                            ) : (
                                <>
                                    <TabPanel value="1">
                                        <RoomInfor room={room} setRoom={setRoom} updateRoomById={updateRoomById} />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <StudentRoom studentInRoom={room?.users} removeStudentsInRoom={removeStudentsInRoom} />
                                    </TabPanel>
                                </>
                            )}
                        </TabContext>
                    </Box>
                </React.Fragment>
            ) : (
                <Grid sx={{ mr: 3, position: 'absolute', top: '40%', left: '50%', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Ban chua tham gia vao ki tuc xa
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/aspiration')}>
                        Dang ki ngay
                    </Button>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default MyRoom;
