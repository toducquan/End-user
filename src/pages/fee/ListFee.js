import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Box,
    Button,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem
} from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import EmptyRows from 'components/EmptyRows';
import ModalDelete from 'components/ModalDelete';
import LoadingPage from 'components/LoadingPage';
import Breakword from 'components/common/breakword/index';
import { getListFeeService } from 'services/feeService';
import * as moment from 'moment';

// Des: UI and function List company
const ListFee = () => {
    const { t } = useTranslation();

    const [fees, setFee] = useState();
    const [feeQuery, setFeeQuery] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableRef = useRef();
    const inputRef = useRef(null);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getFee();
    }, []);

    // Delete company in list company
    // Get list company
    const getFee = () => {
        setIsLoadingSearch(true);
        setTimeout(() => {
            getListFeeService({
                ...feeQuery,
                type: feeQuery?.type == '' ? undefined : feeQuery?.type
            })
                .then((res) => {
                    setFee(res.data);
                    setIsLoadingSearch(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    // Close modal edit team
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    <Grid item sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h4">Fee List</Typography>
                    </Grid>
                    <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                        <Stack direction="row">
                            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                                <Select
                                    size="small"
                                    id="header-search"
                                    value={feeQuery?.type ? feeQuery?.type : ''}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={(e) => setFeeQuery({ ...feeQuery, type: e.target.value })}
                                >
                                    <MenuItem value={''}>All fee</MenuItem>
                                    <MenuItem value="Electric">Electric</MenuItem>
                                    <MenuItem value="Water">Water</MenuItem>
                                    <MenuItem value="Internet">Internet</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" sx={{ ml: 3, width: '6rem' }} onClick={() => getFee()}>
                                {t('Search')}
                            </Button>
                        </Stack>
                    </Stack>
                    {isLoadingSearch ? (
                        <LoadingPage />
                    ) : (
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
                                            <TableCell width="20%" style={{ minWidth: 100 }} align="left">
                                                {t('Name')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Cost')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Type')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Create at')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Deadline')}
                                            </TableCell>
                                            <TableCell width="10%" style={{ minWidth: 80 }} align="left">
                                                {t('Paid')}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fees?.map((row, index) => (
                                            <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">{index}</TableCell>
                                                <TableCell align="left">
                                                    <Breakword
                                                        text={row?.fee?.name}
                                                        width={{
                                                            xs: '140px',
                                                            sm: '140px',
                                                            md: '140px',
                                                            lg: '140px',
                                                            xl: '280px'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{row?.fee?.cost}</TableCell>
                                                <TableCell align="left">{row?.fee?.type}</TableCell>
                                                <TableCell align="left">{moment(row?.fee?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell align="left">{moment(row?.fee?.deadline).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell align="left">{row?.paid ? 'Done' : '_'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {fees?.length <= 0 && <EmptyRows />}
                            </TableContainer>
                        </Paper>
                    )}
                </React.Fragment>
            )}
        </>
    );
};

export default ListFee;
