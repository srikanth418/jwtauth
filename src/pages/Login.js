import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Apiservice';

function Login() {

  const [user, setUser] = useState({
    name: "",
    password: ""
  })
  const navigate = useNavigate();
  //   const handleLogin = () => {
  //     setIsLoggedIn(true);
  //     navigate('/dashboard');
  //   };

  const login = async () => {
    const payload = {
      username: user.name,
      password: user.password
    }
    await api.post("login", payload).then(res => {
      console.log("response",res)
      if (res) {
        localStorage.setItem('username', user.name);
        localStorage.setItem('token', res.data.AccessToken)
        localStorage.setItem('refreshToken', res.data.RefreshToken);

           navigate('/profile');

      }else {
           navigate('/');
      }


   
    })


  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "20%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
        <span>User Name</span>
        <input type="text" style={{ height: "30px", borderRadius: "5px" }} value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <span>Password</span>
        <input type="text" style={{ height: "30px", borderRadius: "5px" }} value={user?.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <input type="button" onClick={() => { login() }} value="Login" style={{ width: "90px", height: "30px", backgroundColor: "gray", borderRadius: "5px", marginTop: "10px" }} />
      </div>

    </>
  );
}

export default Login;
