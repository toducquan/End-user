import React, { useEffect, useState, useRef } from 'react';
import { Grid, Stack, Typography, Checkbox, Box, Button, InputLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { useParams, useNavigate } from 'react-router';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import StarRequired from 'components/StarRequired';
import { mainColor } from 'config';
import LoadingPage from 'components/LoadingPage';
import { studentSmartSort } from 'services/roomService';
import { approveSwapRequest, getAllSwapRequest, rejectSwapRequest } from 'services/swapRoom';
import * as moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import EmptyRows from 'components/EmptyRows';
import Breakword from 'components/common/breakword/index';

const SwapReceive = ({ isLoading, swapList, handleApproveSwap, handleRejectSwap }) => {
    const tableRef = useRef();
    const { t } = useTranslation();
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    <Paper
                        sx={{
                            width: '100%'
                        }}
                    >
                        <TableContainer sx={{ width: '100%', mt: 2, maxHeight: 600 }}>
                            <Table stickyHeader ref={tableRef} aria-label="simple table" padding={'none'}>
                                <TableHead>
                                    <TableRow bgcolor="#f1f1f1">
                                        <TableCell width="5%" style={{ minWidth: 70 }} align="left">
                                            {t('No')}
                                        </TableCell>
                                        <TableCell width="10%" style={{ minWidth: 100 }} align="left">
                                            {t('Request user')}
                                        </TableCell>
                                        <TableCell width="20%" style={{ minWidth: 80 }} align="left">
                                            {t('Room')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 80 }} align="left">
                                            {t('Create at')}
                                        </TableCell>
                                        <TableCell width="15%" style={{ minWidth: 170 }} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {swapList?.map((row, index) => (
                                        <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="left">{index}</TableCell>
                                            <TableCell align="left">
                                                <Breakword
                                                    text={row?.requestUser.name}
                                                    width={{
                                                        xs: '140px',
                                                        sm: '140px',
                                                        md: '140px',
                                                        lg: '140px',
                                                        xl: '280px'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row?.requestUser?.room?.name}</TableCell>
                                            <TableCell align="left">{moment(row?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center">
                                                <Grid container>
                                                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: '74.33px',
                                                                marginLeft: { lg: '1rem' },
                                                                height: '1.8rem',
                                                                pt: 0.8
                                                            }}
                                                            onClick={() => handleApproveSwap(row.id)}
                                                        >
                                                            {t('Approve')}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: '74.33px',
                                                                marginLeft: { lg: '1rem' },
                                                                height: '1.8rem',
                                                                pt: 0.8,
                                                                bgcolor: '#f5222d'
                                                            }}
                                                            onClick={() => handleRejectSwap(row.id)}
                                                            color="error"
                                                        >
                                                            {t('Reject')}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {swapList?.length <= 0 && <EmptyRows />}
                        </TableContainer>
                    </Paper>
                </React.Fragment>
            )}
        </>
    );
};

export default SwapReceive;
