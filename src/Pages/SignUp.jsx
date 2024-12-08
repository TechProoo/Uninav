import React, { useState } from "react";
import Loading from "../Components/Loading";
import Ui from "../assets/images/UI.jpg";
import Ui_2 from "../assets/images/1726220935-university-of-ibadan_gfbmbo.jpg";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo_main.png";
import { useEffect } from "react";
import { getFaculties, signupApi, loginApi, getUserProfile } from "../api";
import { storeAuth } from "../libs/util";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../context";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [faculties, setFaculties] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getFaculties((error) => {
      console.error(error);
      setError(error);
    }).then((faculties) => {
      if (faculties) {
        console.log(faculties);
        setFaculties(faculties);
      }
    });
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  async function signUpHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      console.error("Password does not match");
      return;
    }
    let join = selectedDepartment
      ? { faculty: selectedFaculty, department: selectedDepartment }
      : {};
    const payload = {
      firstName,
      lastName,
      email,
      password,
      ...join,
    };
    const errorHandler = (error) => {
      console.error(error);
      setError(error);
    };
    const response = await signupApi(payload, errorHandler, console.log);
    if (!response) return;
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
      console.log
    );
    setUserProfile(_userProfile);
    if (!_userProfile) return;
    navigate("/"); // Redirect to home page;
    messageApi.success("Sign up successful");
  }
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
          <div className={`fm_cov position-relative m-2  mx-lg-5`}>
            <form
              action=""
              onSubmit={(e) => {
                setLoading(true);
                signUpHandler(e).then(() => {
                  setLoading(false);
                });
              }}
            >
              <h1 className="fm_head">Sign up</h1>
              <p>Welcome Signup here</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div className="mt-2 in_put">
                  <label htmlFor="" className="mb-2">
                    First Name:
                  </label>
                  <input
                    name="lastname"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-2 in_put">
                  <label htmlFor="" className="mb-2">
                    Last Name:
                  </label>
                  <input
                    name="firstname"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2 in_put">
                  <label htmlFor="" className="mb-2">
                    Email:
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3 in_put">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    disabled={!faculties}
                    onChange={(e) => {
                      const selected = e.target.value;
                      console.log("Selected", selected);
                      setSelectedFaculty(selected);
                    }}
                  >
                    <option selected>Select Faculty</option>
                    {faculties && (
                      <>
                        {faculties.map((faculty) => {
                          return (
                            <option
                              value={faculty._id}
                              key={faculty.facultyName}
                            >
                              {faculty.facultyName}
                            </option>
                          );
                        })}
                      </>
                    )}
                  </select>
                </div>
                <div className="mt-3 in_put">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    disabled={!faculties}
                    onChange={(e) => {
                      if (e.target) {
                        setSelectedDepartment(e.target.value);
                      }
                    }}
                  >
                    <option selected>
                      Select Department {!faculties && "Select a departments"}
                    </option>
                    {selectedFaculty && (
                      <>
                        {faculties
                          .find((faculty) => faculty._id === selectedFaculty)
                          .departments.map((department) => {
                            return (
                              <option
                                value={department._id}
                                key={department.departmentName}
                              >
                                {department.departmentName}
                              </option>
                            );
                          })}
                      </>
                    )}
                  </select>
                </div>
                <div className="mt-2 in_put">
                  <label htmlFor="" className="mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-2 in_put">
                  <label htmlFor="" className="mb-2">
                    Confirm password:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                {error && (
                  <span className="tw-block tw-p-2 tw-text-center tw-text-red-950">
                    {error}
                  </span>
                )}
                <div className="mt-2 lg_btn">
                  <button type="submit">
                    {loading ? (
                      <>
                        <Loading />
                        Loading...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
                <div className="mt-1 sn_ln">
                  <div className="d-flex align-items-center">
                    <small>Already a user?</small>
                    <Link to={"/logIn"} className="ms-1 sn_link">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
