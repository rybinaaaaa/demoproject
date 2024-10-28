import {FC, memo} from "react";
import UserForm from "../components/UserForm.tsx";
import request from "../services/request.ts";
import {IUserRequest, IUserResponse} from "../interfaces";

interface AddUserPageProps {
    addUser: (user: IUserResponse) => void;
}

const AddUserPage: FC<AddUserPageProps> = memo(({addUser}) => {
    const onSubmit = async (user: IUserRequest) => {
        try {
            const response = await request.post<IUserResponse, IUserRequest>('/users', user);
            addUser(response);
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    };

    return (
        <UserForm onSubmit={onSubmit}/>
    );
});

export default AddUserPage;