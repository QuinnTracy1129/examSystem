import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/sidebar";
import TopNavigation from "../../components/topbar";
import Routes from "../Routes";
import Login from "../home/login";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../services/utilities";
import { SAVE } from "../../services/redux/slices/results";

const breakWidth = 1400;
export default function Platforms() {
  const [show, setShow] = useState(false),
    [windowWidth, setWindowWidth] = useState(window.innerWidth),
    [sideNavToggled, setSideNavToggled] = useState(false),
    [dynamicLeftPadding, setDynamicLeftPadding] = useState("0"),
    { email, auth, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    const exam = JSON.parse(localStorage.getItem("exam"));

    if (exam?.user) {
      dispatch(
        SAVE({
          token,
          data: exam,
        })
      );
      localStorage.removeItem("exam");
    }
  }, [token, dispatch]);

  useEffect(() => {
    console.log("[App] initialized.");
    socket.on("me", id => console.log(`[${id}] Connected.`));

    return () => socket.off("me");
  }, []);

  useEffect(() => {
    if (email && !auth._id) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [email, auth, dispatch]);

  useEffect(() => {
    if (windowWidth > breakWidth) {
      setDynamicLeftPadding("240px");
    } else {
      setDynamicLeftPadding("0");
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSideNav = () => {
    if (windowWidth < breakWidth) {
      setSideNavToggled(!sideNavToggled);
    }
  };

  return (
    <div className="app">
      <SideNavigation
        breakWidth={breakWidth}
        style={{ transition: "all .3s" }}
        triggerOpening={sideNavToggled}
        onLinkClick={toggleSideNav}
      />
      <div className="flexible-content white-skin">
        <TopNavigation
          toggle={windowWidth < breakWidth}
          onSideNavToggleClick={toggleSideNav}
          className="white-skin"
        />
        <main
          style={{ paddingLeft: dynamicLeftPadding, margin: "8rem 6% 6rem" }}
        >
          <Login show={show} />
          <Routes />
        </main>
      </div>
    </div>
  );
}
