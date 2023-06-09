import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { logoutRedux } from "../../app/authSlice";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Header.css";
// import logo from '../../assets/logos/logo.png';
// import logo from '../../assets/logos/logoBlack.png';
import logoBlack from '../../assets/logos/logoBlack.png';
import ProfileMenu from "../ProfileMenu/ProfileMenu";

function Header(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const dispatch = useDispatch()

    return (
        <div className="Header">
            <div className="HeaderHeading">
                {/* <h2>CryptoHarmony</h2> */}
                <img src={logoBlack} alt="" />
            </div>
            <div className="authDiv">
                {
                    authSlice === null ?
                        <>
                            <Login />
                            <Register />
                        </>
                        :
                        // <button onClick={() => dispatch(logoutRedux())}>Logout</button>
                        <ProfileMenu />
                }
            </div>
        </div>
    );
}

export default Header;
