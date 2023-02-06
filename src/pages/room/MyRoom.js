import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const MyRoom = () => {
    const profile = useSelector((state) => state.profile.profile);
    console.log('vaooo: ', profile);
    return <div>MyRoom</div>;
};

export default MyRoom;
