import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        loginWithGoogle().then(() => {
            navigate("/draw")
        }).catch((e) => {
            console.log("google fail", e)
        })
    };

    return (
        <div className='login-module'>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;
