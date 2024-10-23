import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage.tsx";
import AddUserPage from "./pages/addUserPage.tsx";
import {useState} from "react";
import {IUserResponse} from "./interfaces";

function App() {
    const [users, setUsers] = useState<IUserResponse[]>([]);

    const addUser = (user: IUserResponse) => {
        setUsers([user, ...users])
    }

    return (
        <BrowserRouter>
            <nav>
                <NavLink to={"users"}>Main page</NavLink>
                <NavLink to={"users/add"}>Add user</NavLink>
            </nav>
            <Routes>
                <Route path={"users"} element={<HomePage setUsers={setUsers} users={users}/>}/>
                <Route path={"users/add"} element={<AddUserPage addUser={addUser}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
