import {IUserResponse} from "../interfaces";
import UserCard from "./userCard.tsx";
import {FC} from "react";

interface UserListProps {
    users: IUserResponse[]
}

const UserList: FC<UserListProps> = ({users}) => {
    return (
        <div>
            Hello
            {users.map(user => (
                <UserCard key={user.id} user={user}/>
            ))}
        </div>
    );
};

export default UserList;