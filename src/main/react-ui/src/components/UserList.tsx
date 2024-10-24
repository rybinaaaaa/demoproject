import {IUserResponse} from "../interfaces";
import UserCard from "./UserCard.tsx";
import {FC} from "react";

interface UserListProps {
    users: IUserResponse[]
}

const UserList: FC<UserListProps> = ({users}) => {
    return (
        <div className="users-list">
            <ul className="users-list-wrapper">
                <ul className="users-list__row title">
                    <li className="users-list__row__id">id</li>
                    <li className="users-list__row__name">name</li>
                    <li className="users-list__row__age">age</li>
                </ul>
                {users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))}
            </ul>
        </div>
    );
};

export default UserList;