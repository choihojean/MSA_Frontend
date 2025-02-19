import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

//유저 대시보드
//백엔드 /me호출하여 사용자 정보 표시

const Dashboard = () => {
    const {user} = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (user) {
            api.get("/me", {headers: {Authorization: 'Bearer ${localStorage.getItem("token")}'}})
            .then((res) => setUserInfo(res.data))
            .catch(() => console.log("유저 정보를 가져오는데 실패했습니다."));
        }
    }, [user]);

    return (
        <div>
            <h2>대시보드</h2>
            {userInfo ? <pre>{JSON.stringify(userInfo, null, 2)}</pre> : <p>로딩 중 ...</p>}
        </div>
    );
};

export default Dashboard;