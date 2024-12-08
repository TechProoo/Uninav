import React, { useState } from "react";
import Logo from "../assets/images/logo_main.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserAvatar } from "./Avater";
const Nav = () => {
  const [drop, setDrop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const handleTransitionEnd = () => {
    if (drop) setIsVisible(false);
  };

  const changeDrop = () => {
    setDrop((s) => !s);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img src={Logo} className="rounded-2 w-25 img-fluid" alt="" />
          </Link>
          <UserAvatar showName={false} />
        </div>
      </nav>
    </div>
  );
};

// {login ? (
//   <div className="d-flex align-items-center">
//     <div>
//       {/* <ModalPage icon={<CiSearch />} /> */}
//       {login ? (
//         <ModalPage icon={<FaSearch style={{ fontSize: "20px" }} />} />
//       ) : (
//         <input type="search" className="sch_nav"></input>
//       )}
//     </div>
//     <div className="lg_out_cont">
//       <div className="mt-5 ms-3 nav_img_cov" onClick={changeDrop}>
//         <img className="nav_img" src={Profile} alt="" />
//       </div>
//       <div
//         className="d-flex align-items-center gap-1 lg_out"
//         onClick={changeDrop}
//         style={{
//           transform: drop ? "translateY(-30px)" : "translateY(0)",
//           opacity: drop ? 0 : 1,
//           transition: "transform 0.5s ease, opacity 0.5s ease",
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         <BiLogOut />
//         logout
//       </div>
//     </div>
//   </div>
// ) : (

export default Nav;
