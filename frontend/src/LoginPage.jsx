import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

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
        <div>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;
