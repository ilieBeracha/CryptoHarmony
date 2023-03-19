import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { userService } from '../../service/userService';
import { toastAlerts } from '../../helpers/toastAlerts';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../app/authSlice';
import { useForm } from 'react-hook-form'
import { UserInterface } from '../../models/UserModel';
import './Login.css'

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

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit } = useForm<UserInterface>();
    const dispatch = useDispatch()

    async function loginForm(user: any) {
        try {
            const results = await userService.login(user);
            if (results.status === 200) {
                const token = await results.data;
                dispatch(loginRedux(token))
                toastAlerts.toastSuccess('Logged in');
                handleClose();
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)
        }
    }

    return (
        <div>
            <button onClick={handleOpen}>Login</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='RgeisterLoginForm'>
                        <h3>Register</h3> <hr />
                        <form onSubmit={handleSubmit(loginForm)}>
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