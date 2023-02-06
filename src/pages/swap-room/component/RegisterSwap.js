import React, { useEffect, useState } from 'react';
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
import { getListUserService } from 'services/userService';
import { createSwapRequest } from 'services/swapRoom';

const RegisterSwap = ({ isLoading, setIsLoading, receiverUser, setReceiverUser }) => {
    const { t } = useTranslation();
    const [studentId, setStudentId] = useState('');
    const dispatch = useDispatch();

    const handleSearchUser = () => {
        setIsLoading(true);
        setTimeout(() => {
            getListUserService({
                studentId: studentId
            })
                .then((res) => {
                    setReceiverUser(res.data[0]);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    const handleSubmitSwapRoom = () => {
        setIsLoading(true);
        setTimeout(() => {
            createSwapRequest({
                receiveId: receiverUser?.id
            })
                .then((res) => {
                    setReceiverUser();
                    dispatch(raiseNotification({ visible: true, content: 'Submit successfully', severity: 'success' }));
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }, 500);
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <Grid container>
                    <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                        <Grid item xs={10} sx={{ mb: 1 }}>
                            <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                {t('Student Id')}
                            </InputLabel>
                            <OutlinedInput
                                id="building-name"
                                sx={{ width: '60%', my: 2, mr: 2 }}
                                name="name"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                            <Button
                                disableElevation
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSearchUser}
                            >
                                {t('Search')}
                            </Button>
                        </Grid>
                        {receiverUser && (
                            <>
                                <Grid item xs={10} sx={{ mb: 1 }}>
                                    <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                        {t('Name')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="building-name"
                                        sx={{ width: '60%', my: 2, mr: 2 }}
                                        name="name"
                                        value={receiverUser?.name}
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ mb: 1 }}>
                                    <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                        {t('Email')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="building-name"
                                        sx={{ width: '60%', my: 2, mr: 2 }}
                                        name="name"
                                        value={receiverUser?.email}
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ mb: 1 }}>
                                    <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                        {t('Room')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="building-name"
                                        sx={{ width: '60%', my: 2, mr: 2 }}
                                        name="name"
                                        value={receiverUser?.room?.name}
                                    />
                                    <Button
                                        disableElevation
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmitSwapRoom}
                                    >
                                        {t('Submit')}
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default RegisterSwap;
