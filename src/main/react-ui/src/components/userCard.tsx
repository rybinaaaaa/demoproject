import {FC} from 'react';
import {IUserResponse} from "../interfaces";

interface UserCardProps {
   user: IUserResponse
}

const UserCard:FC<UserCardProps> = ({user}) => {
    return (
        <div>
            {user.id}. Name: {user.name}. Age: {user.age}
        </div>
    );
};

export default UserCard;