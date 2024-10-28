import {FC} from "react";

const NotFoundPage: FC = () => {
    return (
        <div className={"page-404"}>
            <h2 className={"page-404__404"}>
                404
            </h2>
            <h1 className={"404-page__title"}>
                Page not found!
            </h1>
        </div>
    );
};

export default NotFoundPage;