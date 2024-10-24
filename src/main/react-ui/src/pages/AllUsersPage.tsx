import {IPage, IPageInfo, IUserResponse} from "../interfaces";
import UserList from "../components/UserList.tsx";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import request from "../services/request.ts";
import Spinner from "../components/Spinner.tsx";
import PaginationBar from "../components/PaginationBar.tsx";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
    users: IUserResponse[],
    setUsers: Dispatch<SetStateAction<IUserResponse[]>>
}


const AllUsersPage: FC<HomePageProps> = ({users, setUsers}) => {
    const [page, setPage] = useState<IPageInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(0);

    const navigate = useNavigate();

    const DEFAULT_SIZE = 10;

    const extractPage = ({
                             empty,
                             first,
                             last,
                             number,
                             numberOfElements,
                             totalPages,
                             totalElements,
                             size
                         }: IPage<any>): IPageInfo => {
        return {
            empty, first, last, number, numberOfElements, totalPages, totalElements, size
        }
    }


    const fetchUsers = () => {
        setLoading(true);
        console.info("Fetching users");
        request.get<IPage<IUserResponse>>("/users", {
            page: pageNumber,
            size: DEFAULT_SIZE
        })
            .then(page => {
                setUsers(page.content)
                setPage(extractPage(page))
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(fetchUsers, [pageNumber])

    return (
        <>
            {loading && <Spinner/>}
            {page?.empty &&
              <div className={"users-list_empty"}>Page is empty</div>
            }
            {error &&
              <div className={"users-list_error"}>Something went wrong...</div>
            }
            {users.length > 0 && <UserList
              users={users.length > DEFAULT_SIZE
                  ? users.filter((_, i) => i < DEFAULT_SIZE)
                  : users
              }/>}
            <button className="btn-primary add-user" onClick={() => navigate("/users/add")}>Add user</button>
            {page && !page.empty &&
              <PaginationBar {...page}
                             nextPage={() => {
                                 setPageNumber((number) => number + 1)
                             }}
                             prevPage={() => {
                                 setPageNumber((number) => number - 1)
                             }}
              />}
        </>
    );
}

export default AllUsersPage;