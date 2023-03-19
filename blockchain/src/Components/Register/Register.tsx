import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form'
import Modal from '@mui/material/Modal';
import { UserInterface } from '../../models/UserModel';
import { userService } from '../../service/userService';
import { toastAlerts } from '../../helpers/toastAlerts';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../app/authSlice';
import './Register.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Register() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit } = useForm<UserInterface>();
    const dispatch = useDispatch();

    async function registerForm(user: any) {
        try {
            const results = await userService.register(user);
            if (results.status === 200) {
                const token = await results.data;
                dispatch(loginRedux(token))
                toastAlerts.toastSuccess('Successfuly Registered')
                handleClose();
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)
        }
    }

    return (
        <div>
            <button onClick={handleOpen}>Register</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='RgeisterLoginForm'>
                        <h3>Register</h3> <hr />
                        <form onSubmit={handleSubmit(registerForm)}>
                            <label htmlFor="">First name: </label>
                            <input type="text" {...register('firstName')} />
                            <label htmlFor="">Last name: </label>
                            <input type="text" {...register('lastName')} />
                            <label htmlFor="">Email: </label>
                            <input type="mail" {...register('email')} />
                            <label htmlFor="">Password: </label>
                            <input type="password" {...register('password')} />
                            <button>Submit</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}