import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo_main.png";
import Ui from "../assets/images/UI.jpg";
import { useContext } from "react";
import Loading from "../Components/Loading";
import { getUserProfile, loginApi } from "../api";
import { storeAuth } from "../libs/util";
import { useNavigate } from "react-router-dom";
import { USER_PROFILE_CONTEXT, MESSAGE_API_CONTEXT } from "../context";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const errorHandler = (error) => {
    console.error(error);
    setError(error);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const authData = await loginApi(
      { email, password },
      errorHandler,
      console.log
    );
    if (!authData) return;
    storeAuth(authData.access_token, authData.refresh_token);
    const _userProfile = await getUserProfile(
      authData.access_token,
      errorHandler,
      console.error
    );
    setUserProfile(_userProfile);
    if (!_userProfile) return;
    navigate("/"); // Redirect to home page;
    messageApi.success("Login up successful");
  };
  return (
    <section className="m-3 mx-auto mt-lg-5 w-75 login_cont">
      <div className="row">
        <Link to={"/"}>
          <div className="top-0 position-absolute w-50 start-0">
            <img src={Logo} className="rounded-2 w-25 img-fluid" alt="" />
          </div>
        </Link>
        <div className="col-md-6">
          <div className="img_cov">
            <img src={Ui} alt="" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="position-relative m-2 mx-lg-5 mt-lg-5 fm_cov"></div>
          <form
            action=""
            className="p-3"
            onSubmit={(e) => {
              setLoading(true);
              loginHandler(e).then(() => setLoading(false));
            }}
          >
            <h1 className="fm_head">Login</h1>
            <p>Welcome back! Please login to your account</p>
            <div>
              <div className="mt-4 in_put">
                <label htmlFor="email" className="mb-2">
                  Email:
                </label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mt-4 in_put">
                <label htmlFor="password" className="mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                {error && (
                  <span className="tw-block tw-p-2 tw-text-center tw-text-red-950">
                    {error}
                  </span>
                )}
                <div className="d-flex align-items-center gap-1 rem">
                  <input
                    type="checkbox"
                    name=""
                    id="remember-me"
                    value={rememberMe}
                    onChange={(e) => {
                      e.target.checked
                        ? setRememberMe(true)
                        : setRememberMe(false);
                    }}
                  />
                  <label htmlFor="remember-me">Remeber me</label>
                </div>
                <div className="for_get">
                  <Link to={"/forgot_password"}>Forgot Password?</Link>
                </div>
              </div>
              <div className="mt-2 lg_btn">
                <button type="submit">
                  {loading ? (
                    <>
                      <Loading />
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="mt-1 sn_ln">
                <div className="d-flex align-items-center">
                  <small>New User?</small>
                  <Link to={"/signUp"} className="ms-1 sn_link">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
