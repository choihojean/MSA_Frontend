import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useFormState } from "react-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push("/user/dashboard");
        } catch (err) {
            setError("로그인 실패: 이메일이나 비밀번호를 확인하세요");
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;