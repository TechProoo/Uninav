import React, { useContext } from "react";
import { USER_PROFILE_CONTEXT } from "../context";
import { Avatar, Popover } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function UserAvatar({ showName }) {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();
  // const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const options = (
    <div>
      <ul className="space-y-2 mx-2 px-2 min-w-[10ch]">
        <li
          className="hover:font-semibold hover:text-green transition-colors cursor-pointer select-none"
          onClick={() => {
            // setLogoutOpen(true);
          }}
        >
          Sign out
        </li>
        <li
          className="tw-hover:font-semibold tw-hover:text-green tw-transition-colors tw-cursor-pointer tw-select-none"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </li>
      </ul>
    </div>
  );
  return userProfile ? (
    <span>
      <Popover
        placement="bottom"
        content={options}
        style={{ backgroundColor: "#EBEBEB" }}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0.5}
      >
        <div className="cursor-pointer">
          <Avatar
            style={{ backgroundColor: "#143474", verticalAlign: "middle" }}
            size="medium"
          >
            <span className="font-semibold">{userProfile.firstName[0]}</span>
          </Avatar>

          {showName && (
            <span className="ml-2 font-semibold algin-middle">
              {userProfile.firstName}
            </span>
          )}
        </div>
      </Popover>
    </span>
  ) : (
    <div>
      <div className="d-flex align-items-center gap-3 hp_lg">
        <Link className="hp_lg_btn" to={"/logIn"}>
          Log in
        </Link>
        <Link className="hp_lg_btn" to={"/signUp"}>
          Sign up{" "}
        </Link>
      </div>
    </div>
  );
}
