import {FC} from 'react';
import {IUserResponse} from "../interfaces";

interface UserCardProps {
    user: IUserResponse
}

const UserCard: FC<UserCardProps> = ({user}) => {
    return (
        <ul className="users-list__row">
            <li className="users-list__row__id">
                {user.id}.
            </li>
            <li className="users-list__row__name">
                {user.name}
            </li>
            <li className="users-list__row__age">
                {user.age} y.o.
            </li>
        </ul>
    );
};

export default UserCard;