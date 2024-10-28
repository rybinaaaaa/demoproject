import {FC} from "react";
import UserForm from "../components/UserForm.tsx";
import request from "../services/request.ts";
import {IUserRequest, IUserResponse} from "../interfaces";

interface AddUserPageProps {
    addUser: (user: IUserResponse) => void;
}

const AddUserPage: FC<AddUserPageProps> = ({addUser}) => {
    const onSubmit = (user: IUserRequest) => {
        return request.post<IUserResponse, IUserRequest>('/users', user)
            .then(addUser)
            .catch(error => {
                console.error('Error adding user:', error);
                throw error;
            });
    };

    return (
        <UserForm onSubmit={onSubmit}/>
    );
};

export default AddUserPage;