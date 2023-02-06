import React, { useEffect, useState } from 'react';
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
import { useParams, useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';
import { raiseNotification } from 'store/reducers/notification';
import { useDispatch } from 'react-redux';
import RegisterSwap from './component/RegisterSwap';
import SwapReceive from './component/SwapReceive';
import { approveSwapRequest, getAllSwapRequest, rejectSwapRequest, updateSwapRequest } from 'services/swapRoom';

const SwapRoom = () => {
    const { t } = useTranslation();
    const [valueTab, setValueTab] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [receiverUser, setReceiverUser] = useState();
    const [swapList, setSwapList] = useState();
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        setIsLoading(true);
        getListSwap();
    }, []);

    const getListSwap = () => {
        setTimeout(() => {
            getAllSwapRequest()
                .then((res) => {
                    setSwapList(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleApproveSwap = (id) => {
        setIsLoading(true);
        setTimeout(() => {
            updateSwapRequest(id)
                .then((res) => {
                    getListSwap();
                    dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleRejectSwap = (id) => {
        setIsLoading(true);
        setTimeout(() => {
            rejectSwapRequest(id)
                .then((res) => {
                    getListSwap();
                    dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    return (
        <React.Fragment>
            <Box sx={{ width: '100%', mr: 2 }}>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '322px' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={t('Swap Room')} value="1" />
                            <Tab label={t('Request')} value="2" />
                        </TabList>
                    </Box>
                    {isLoading ? (
                        <LoadingPage />
                    ) : (
                        <>
                            <TabPanel value="1">
                                <RegisterSwap
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    receiverUser={receiverUser}
                                    setReceiverUser={setReceiverUser}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <SwapReceive
                                    isLoading={isLoading}
                                    swapList={swapList}
                                    handleApproveSwap={handleApproveSwap}
                                    handleRejectSwap={handleRejectSwap}
                                />
                            </TabPanel>
                        </>
                    )}
                </TabContext>
            </Box>
        </React.Fragment>
    );
};

export default SwapRoom;
