import { Link, Outlet } from "react-router-dom";
import classes from "./App.module.scss";
import imagePng from "@/assets/image.png";
import imageJpg from "@/assets/image.jpg";
import ImageSvg from "@/assets/image.svg";

function Foo(a: string) {
    return a;
}

const App = () => {
    // для проверки работы fork-ts-checker-webpack-plugin, ускоряет сборку
    // Foo(123)

    return (
        <>
            <h1 data-testid="Platform.DataTestSearch">Platform = {__PLATFORM__}</h1>
            <div data-testid="images">
                <ImageSvg fill="red" width={100} height={100} />
                <img src={imagePng} alt="" />
                <img src={imageJpg} alt="" />
            </div>
            <br />
            <Link to={"/about"}>about</Link>
            <br />
            <br />
            <Link to={"/shop"}>shop</Link>
            <br />
            <br />

            <div className={classes.myDiv} data-testid="app-component">
                <div>123</div>
                <div>App component</div>
            </div>
            <Outlet />
        </>
    );
};

export { App };
