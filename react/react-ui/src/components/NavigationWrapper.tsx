import {FC, PropsWithChildren} from "react";

const NavigationWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <nav className="nav">
            <div className="container">
                {children}
            </div>
        </nav>
    );
};

export default NavigationWrapper;