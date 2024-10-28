import {FC} from "react";

interface PaginationBarProps {
    first: boolean,
    last: boolean,
    number: number,
    totalPages: number,
    nextPage: () => void,
    prevPage: () => void
}

const PaginationBar: FC<PaginationBarProps> = ({first, last, number, totalPages, nextPage, prevPage}) => {
    return (
        <div className={"pagination-bar"}>
            {!first && <button className="btn-primary pagination-bar__prev" onClick={prevPage}>Previous page</button>}
            <div className="pagination-bar__info">{number + 1} of {totalPages}</div>
            {!last && <button className="btn-primary pagination-bar__next" onClick={nextPage}>Next page</button>}
        </div>
    );
};

export default PaginationBar;