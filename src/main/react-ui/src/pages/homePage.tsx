import {IPage, IPageInfo, IUserResponse} from "../interfaces";
import UserList from "../components/userList.tsx";
import {FC, useEffect, useState} from "react";
import request from "../services/request.ts";

interface HomePageProps {
    users: IUserResponse[],
    setUsers: React.Dispatch<React.SetStateAction<IUserResponse[]>>
}


const HomePage: FC<HomePageProps> = ({users, setUsers}) => {
        const [page, setPage] = useState<IPageInfo | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<boolean>(false);

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
            request.get<IPage<IUserResponse>>("/users")
                .then(page => {
                    setUsers(page.content)
                    setPage(extractPage(page))
                    setLoading(false);
                })
                .catch(() => setError(true));
        }

        useEffect(() => {
            fetchUsers();
        }, [])

        return (
            <>
                <UserList users={users}/>
            </>
        );
    }
;

export default HomePage;