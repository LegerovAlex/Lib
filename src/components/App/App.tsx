import { useState } from "react";
import "../main.scss";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import avatarPng from "@/assets/testPNG.png";
import avatarJPG from "@/assets/testJPG.jpg";
import Icon from "@/assets/testSVG.svg";

export const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  function calc(a: number) {
    return a;
  }

  calc(2);

  return (
    <div className={styles.card}>
      <h1>Platform={__PLATFORM__}</h1>
      <div>
        <img width={100} src={avatarPng} alt="Avatar" />
        <img width={100} src={avatarJPG} alt="Avatar" />
      </div>
      <Icon width={200} height={200} fill={"red"} />
      <Link to={"/about"}>Move to About</Link>
      <h1 className={styles.card__text}>{count}</h1>
      <button className={styles.card__button} onClick={increment}>
        Button
      </button>
      <Link to={"/shop"}>Move to Shop</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
