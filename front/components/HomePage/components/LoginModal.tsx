import {useState} from "react";
import {useRouter} from "next/router";

const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    return (
        <div className="login-container">
          <h1>Login</h1>
        </div>
    )
}

export default LoginModal;