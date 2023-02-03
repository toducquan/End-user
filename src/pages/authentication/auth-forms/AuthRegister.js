import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
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
    MenuItem
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
    };

    const StarRequired = () => {
        return <span style={{ color: 'red' }}>*</span>;
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    gender: '',
                    isSmoking: null,
                    religion: '',
                    region: '',
                    address: '',
                    age: '',
                    studentId: '',
                    fatherName: '',
                    fatherAge: '',
                    fatherEmail: '',
                    fatherPhone: '',
                    fatherOccupation: '',
                    motherName: '',
                    motherAge: '',
                    motherEmail: '',
                    motherPhone: '',
                    motherOccupation: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    age: Yup.string().max(255).required('Age is required'),
                    studentId: Yup.string().max(255).required('Student Id is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    phone: Yup.string().max(255).required('Phone is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">
                                        Name
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        id="name-login"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="age-signup">
                                        Age
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.age && errors.age)}
                                        id="age-signup"
                                        type="age"
                                        value={values.age}
                                        name="age"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.age && errors.age && (
                                        <FormHelperText error id="helper-text-age-signup">
                                            {errors.age}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-signup">
                                        Phone
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone-signup"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="helper-text-phone-signup">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">
                                        Email
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">
                                        Password
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gender-signup">Gender</InputLabel>
                                    <Select
                                        id="gender-login"
                                        type="gender"
                                        value={values.gender}
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.gender && errors.gender)}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                    {touched.gender && errors.gender && (
                                        <FormHelperText error id="helper-text-gender-signup">
                                            {errors.gender}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address-signup">Address</InputLabel>
                                    <Select
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                        id="address-signup"
                                        type="address"
                                        value={values.address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    >
                                        <MenuItem value={'1'}>An Giang</MenuItem>
                                        <MenuItem value={'2'}>Bà Rịa - Vũng Tàu</MenuItem>
                                        <MenuItem value={'3'}>Bắc Giang</MenuItem>
                                        <MenuItem value={'4'}>Bắc Kạn</MenuItem>
                                        <MenuItem value={'5'}>Bạc Liêu</MenuItem>
                                        <MenuItem value={'6'}>Bắc Ninh</MenuItem>
                                        <MenuItem value={'7'}>Bến Tre</MenuItem>
                                        <MenuItem value={'8'}>Bình Định</MenuItem>
                                        <MenuItem value={'9'}>Bình Dương</MenuItem>
                                        <MenuItem value={'10'}>Bình Phước</MenuItem>
                                        <MenuItem value={'11'}>Bình Thuận</MenuItem>
                                        <MenuItem value={'12'}>Cà Mau</MenuItem>
                                        <MenuItem value={'13'}>Cần Thơ</MenuItem>
                                        <MenuItem value={'14'}>Cao Bằng</MenuItem>
                                        <MenuItem value={'15'}>Đà Nẵng</MenuItem>
                                        <MenuItem value={'16'}>Đắk Lắk</MenuItem>
                                        <MenuItem value={'17'}>Đắk Nông</MenuItem>
                                        <MenuItem value={'18'}>Điện Biên</MenuItem>
                                        <MenuItem value={'19'}>Đồng Nai</MenuItem>
                                        <MenuItem value={'20'}>Đồng Tháp</MenuItem>
                                        <MenuItem value={'21'}>Gia Lai</MenuItem>
                                        <MenuItem value={'22'}>Hà Giang</MenuItem>
                                        <MenuItem value={'23'}>Hà Nam</MenuItem>
                                        <MenuItem value={'24'}>Hà Nội</MenuItem>
                                        <MenuItem value={'25'}>Hà Tĩnh</MenuItem>
                                        <MenuItem value={'26'}>Hải Dương</MenuItem>
                                        <MenuItem value={'27'}>Hải Phòng</MenuItem>
                                        <MenuItem value={'28'}>Hậu Giang</MenuItem>
                                        <MenuItem value={'29'}>Hòa Bình</MenuItem>
                                        <MenuItem value={'30'}>Hưng Yên</MenuItem>
                                        <MenuItem value={'31'}>Khánh Hòa</MenuItem>
                                        <MenuItem value={'32'}>Kiên Giang</MenuItem>
                                        <MenuItem value={'33'}>Kon Tum</MenuItem>
                                        <MenuItem value={'34'}>Lai Châu</MenuItem>
                                        <MenuItem value={'35'}>Lâm Đồng</MenuItem>
                                        <MenuItem value={'36'}>Lạng Sơn</MenuItem>
                                        <MenuItem value={'37'}>Lào Cai</MenuItem>
                                        <MenuItem value={'38'}>Long An</MenuItem>
                                        <MenuItem value={'39'}>Nam Định</MenuItem>
                                        <MenuItem value={'40'}>Nghệ An</MenuItem>
                                        <MenuItem value={'41'}>Ninh Bình</MenuItem>
                                        <MenuItem value={'42'}>Ninh Thuận</MenuItem>
                                        <MenuItem value={'43'}>Phú Thọ</MenuItem>
                                        <MenuItem value={'44'}>Phú Yên</MenuItem>
                                        <MenuItem value={'45'}>Quảng Bình</MenuItem>
                                        <MenuItem value={'46'}>Quảng Nam</MenuItem>
                                        <MenuItem value={'47'}>Quảng Ngãi</MenuItem>
                                        <MenuItem value={'48'}>Quảng Ninh</MenuItem>
                                        <MenuItem value={'49'}>Quảng Trị</MenuItem>
                                        <MenuItem value={'50'}>Sóc Trăng</MenuItem>
                                        <MenuItem value={'51'}>Sơn La</MenuItem>
                                        <MenuItem value={'52'}>Tây Ninh</MenuItem>
                                        <MenuItem value={'53'}>Thái Bình</MenuItem>
                                        <MenuItem value={'54'}>Thái Nguyên</MenuItem>
                                        <MenuItem value={'55'}>Thanh Hóa</MenuItem>
                                        <MenuItem value={'56'}>Thừa Thiên Huế</MenuItem>
                                        <MenuItem value={'57'}>Tiền Giang</MenuItem>
                                        <MenuItem value={'58'}>Thành phố Hồ Chí Minh</MenuItem>
                                        <MenuItem value={'59'}>Trà Vinh</MenuItem>
                                        <MenuItem value={'60'}>Tuyên Quang</MenuItem>
                                        <MenuItem value={'61'}>Vĩnh Long</MenuItem>
                                        <MenuItem value={'62'}>Vĩnh Phúc</MenuItem>
                                        <MenuItem value={'63'}>Yên Bái</MenuItem>
                                    </Select>
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-text-address-signup">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="region-signup">Region</InputLabel>
                                    <Select
                                        id="region-login"
                                        type="region"
                                        value={values.region}
                                        name="region"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.region && errors.region)}
                                    >
                                        <MenuItem value={'VietNam'}>Việt Nam</MenuItem>
                                        <MenuItem value={'Foreign'}>Ngoại quốc</MenuItem>
                                    </Select>
                                    {touched.region && errors.region && (
                                        <FormHelperText error id="helper-text-region-signup">
                                            {errors.region}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="religion-signup">Religion</InputLabel>
                                    <Select
                                        fullWidth
                                        error={Boolean(touched.religion && errors.religion)}
                                        id="religion-signup"
                                        type="religion"
                                        value={values.religion}
                                        name="religion"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    >
                                        <MenuItem value={'None'}>Không</MenuItem>
                                        <MenuItem value={'Budhism'}>Phật giáo</MenuItem>
                                        <MenuItem value={'Christian'}>Thiên chúa giáo</MenuItem>
                                        <MenuItem value={'Hindu'}>Hindu giáo</MenuItem>
                                    </Select>
                                    {touched.religion && errors.religion && (
                                        <FormHelperText error id="helper-text-religion-signup">
                                            {errors.religion}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="studentId-signup">
                                        Student Id
                                        <StarRequired />
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.studentId && errors.studentId)}
                                        id="studentId-signup"
                                        value={values.studentId}
                                        name="studentId"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.studentId && errors.studentId && (
                                        <FormHelperText error id="helper-text-studentId-signup">
                                            {errors.studentId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="isSmoking-signup">
                                        Is smoking?
                                        <StarRequired />
                                    </InputLabel>
                                    <RadioGroup
                                        row
                                        fullWidth
                                        error={Boolean(touched.isSmoking && errors.isSmoking)}
                                        id="isSmoking-signup"
                                        value={values.isSmoking}
                                        name="isSmoking"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label={'Có'} />
                                        <FormControlLabel value={false} control={<Radio />} label={'Không'} />
                                    </RadioGroup>
                                    {touched.isSmoking && errors.isSmoking && (
                                        <FormHelperText error id="helper-text-isSmoking-signup">
                                            {errors.isSmoking}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="fatherName-signup">Father name</InputLabel>
                                    <OutlinedInput
                                        id="fatherName-login"
                                        type="fatherName"
                                        value={values.fatherName}
                                        name="fatherName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.fatherName && errors.fatherName)}
                                    />
                                    {touched.fatherName && errors.fatherName && (
                                        <FormHelperText error id="helper-text-fatherName-signup">
                                            {errors.fatherName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="motherName-signup">Mother name</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.motherName && errors.motherName)}
                                        id="motherName-signup"
                                        type="motherName"
                                        value={values.motherName}
                                        name="motherName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.motherName && errors.motherName && (
                                        <FormHelperText error id="helper-text-motherName-signup">
                                            {errors.motherName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="fatherAge-signup">Father Age</InputLabel>
                                    <OutlinedInput
                                        id="fatherAge-login"
                                        type="fatherAge"
                                        value={values.fatherAge}
                                        name="fatherAge"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.fatherAge && errors.fatherAge)}
                                    />
                                    {touched.fatherAge && errors.fatherAge && (
                                        <FormHelperText error id="helper-text-fatherAge-signup">
                                            {errors.fatherAge}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="motherAge-signup">Mother Age</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.motherAge && errors.motherAge)}
                                        id="motherAge-signup"
                                        type="motherAge"
                                        value={values.motherAge}
                                        name="motherAge"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.motherAge && errors.motherAge && (
                                        <FormHelperText error id="helper-text-motherAge-signup">
                                            {errors.motherAge}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="fatherEmail-signup">Father email</InputLabel>
                                    <OutlinedInput
                                        id="fatherEmail-login"
                                        type="fatherEmail"
                                        value={values.fatherEmail}
                                        name="fatherEmail"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.fatherEmail && errors.fatherEmail)}
                                    />
                                    {touched.fatherEmail && errors.fatherEmail && (
                                        <FormHelperText error id="helper-text-fatherEmail-signup">
                                            {errors.fatherEmail}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="motherEmail-signup">Mother email</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.motherEmail && errors.motherEmail)}
                                        id="motherEmail-signup"
                                        type="motherEmail"
                                        value={values.motherEmail}
                                        name="motherEmail"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.motherEmail && errors.motherEmail && (
                                        <FormHelperText error id="helper-text-motherEmail-signup">
                                            {errors.motherEmail}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="fatherPhone-signup">Father phone</InputLabel>
                                    <OutlinedInput
                                        id="fatherPhone-login"
                                        type="fatherPhone"
                                        value={values.fatherPhone}
                                        name="fatherPhone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.fatherPhone && errors.fatherPhone)}
                                    />
                                    {touched.fatherPhone && errors.fatherPhone && (
                                        <FormHelperText error id="helper-text-fatherPhone-signup">
                                            {errors.fatherPhone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="motherPhone-signup">Mother phone</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.motherPhone && errors.motherPhone)}
                                        id="motherPhone-signup"
                                        type="motherPhone"
                                        value={values.motherPhone}
                                        name="motherPhone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.motherPhone && errors.motherPhone && (
                                        <FormHelperText error id="helper-text-motherPhone-signup">
                                            {errors.motherPhone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="fatherOccupation-signup">Father occupation</InputLabel>
                                    <OutlinedInput
                                        id="fatherOccupation-login"
                                        type="fatherOccupation"
                                        value={values.fatherOccupation}
                                        name="fatherOccupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.fatherOccupation && errors.fatherOccupation)}
                                    />
                                    {touched.fatherOccupation && errors.fatherOccupation && (
                                        <FormHelperText error id="helper-text-fatherOccupation-signup">
                                            {errors.fatherOccupation}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="motherOccupation-signup">Mother occupation</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.motherOccupation && errors.motherOccupation)}
                                        id="motherOccupation-signup"
                                        type="motherOccupation"
                                        value={values.motherOccupation}
                                        name="motherOccupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.motherOccupation && errors.motherOccupation && (
                                        <FormHelperText error id="helper-text-motherOccupation-signup">
                                            {errors.motherOccupation}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Account
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
