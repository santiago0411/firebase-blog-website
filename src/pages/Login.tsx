import {auth, provider} from "../config/Firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate("/");
    };

    return (
        <div>
            <p>Sign in with Google to continue</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};