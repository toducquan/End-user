import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Checkbox, Box, Button, InputLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';
import { getBuildingByIdService, updateBuildingByIdService } from 'services/buildingService';
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
import { createAspirationService, getMyAspirationService } from 'services/aspirationService';

const MyAspiration = () => {
    const { t } = useTranslation();
    const profile = useSelector((state) => state.profile.profile);
    const room = useSelector((state) => state.room.room);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [aspiration, setAspiration] = useState();
    const [canSubmit, setCanSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getMyAspiration();
    }, []);

    const getMyAspiration = () => {
        setTimeout(() => {
            getMyAspirationService()
                .then((res) => {
                    console.log('res: ', res.data);
                    if (!res.data) {
                        setCanSubmit(true);
                    }
                    setAspiration({
                        firstRoomId: res.data?.firstRoom?.id,
                        secondRoomId: res.data?.secondRoom?.id,
                        thirdRoomId: res.data?.thirdRoom?.id
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                });
        }, 500);
    };

    const smartSort = () => {
        setIsLoading(true);
        setTimeout(() => {
            studentSmartSort()
                .then((res) => {
                    setIsLoading(false);
                    console.log('res: ', res.data);
                    setAspiration({
                        firstRoomId: res?.data[0]?.roomId,
                        secondRoomId: res?.data[1]?.roomId,
                        thirdRoomId: res?.data[2]?.roomId
                    });
                    dispatch(raiseNotification({ visible: true, content: 'Update successfully', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Update failed', severity: 'error' }));
                });
        }, 500);
    };

    const submitAspiration = () => {
        setIsLoading(true);
        setTimeout(() => {
            createAspirationService(aspiration)
                .then((res) => {
                    setIsLoading(false);
                    getMyAspiration();
                    dispatch(raiseNotification({ visible: true, content: 'Submit successfully', severity: 'success' }));
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('err: ', err);
                    dispatch(raiseNotification({ visible: true, content: 'Submit failed', severity: 'error' }));
                });
        }, 500);
    };

    return (
        <React.Fragment>
            {profile?.room ? (
                <Grid sx={{ mr: 3, position: 'absolute', top: '40%', left: '50%', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Ban da duoc them vao phong {profile?.room?.name}
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/')}>
                        Xem ngay
                    </Button>
                </Grid>
            ) : (
                <>
                    {isLoading ? (
                        <LoadingPage />
                    ) : (
                        <Box sx={{ width: '100%', mr: 2 }}>
                            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                                {t('Dang ki nguyen vong')}
                            </Typography>
                            <Box sx={{ width: '45%', mb: 5 }}>
                                <Stack direction="row" sx={{ mt: 0, justifyContent: 'space-between' }}>
                                    <Stack direction="row">
                                        <Button variant="contained" sx={{ mr: 3, width: '12rem' }} onClick={smartSort}>
                                            {t('Xep phong thong minh')}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Grid container>
                                <Grid xs={10} sm={9} md={8} lg={7} xl={5} spacing={3}>
                                    <Grid item xs={10} sx={{ mb: 1 }}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                                {t('Nguyen vong 1')}
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                sx={{ width: '80%', my: 2 }}
                                                value={aspiration?.firstRoomId}
                                                onChange={(e) => setAspiration({ ...aspiration, firstRoomId: e.target.value })}
                                            >
                                                {room?.map((item) => {
                                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                                })}
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sx={{ mb: 1 }}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                                {t('Nguyen vong 2')}
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                sx={{ width: '80%', my: 2 }}
                                                value={aspiration?.secondRoomId}
                                                onChange={(e) => setAspiration({ ...aspiration, secondRoomId: e.target.value })}
                                            >
                                                {room?.map((item) => {
                                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                                })}
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sx={{ mb: 1 }}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="address" style={{ color: mainColor }}>
                                                {t('Nguyen vong 3')}
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                sx={{ width: '80%', my: 2 }}
                                                value={aspiration?.thirdRoomId}
                                                onChange={(e) => setAspiration({ ...aspiration, thirdRoomId: e.target.value })}
                                            >
                                                {room?.map((item) => {
                                                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                                                })}
                                            </Select>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {canSubmit && (
                                <Grid container spacing={3} sx={{ mt: 1 }}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button disableElevation size="large" variant="contained" color="secondary">
                                                {t('back')}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={submitAspiration}
                                            >
                                                {t('Submit')}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    )}
                </>
            )}
        </React.Fragment>
    );
};

export default MyAspiration;
