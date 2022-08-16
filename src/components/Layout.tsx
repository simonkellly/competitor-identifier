import { faHome, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStorageState from "react-use-storage-state";
import { ButtonProps, ButtonRow } from "./ButtonRow";
import { Footer } from "./Footer";

interface LayoutProps {
  children: any;
  home: boolean;
}

export const Layout = (props: LayoutProps) => {
  const navigation = useNavigate();
  const [darkMode, setDarkMode] = useStorageState("darkMode", false);
  
  const buttons: ButtonProps[] = [
    {
      onClick: () => navigation("/"),
      active: props.home,
      icon: faHome
    },
    {
      onClick: () => setDarkMode(!darkMode),
      active: darkMode,
      icon: faMoon
    }
  ]

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Competitor Identifier</h1>
          <p className="py-6">
            All of your WCA Competitor Identifier needs will be fulfilled here.
          </p>
        </div>

        <ButtonRow buttons={buttons}/>

        {props.children}

        <Footer />
      </div>
    </div>
  );
};
