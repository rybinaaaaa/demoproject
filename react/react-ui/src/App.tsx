import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage.tsx";
import AddUserPage from "./pages/AddUserPage.tsx";
import {useState} from "react";
import {IUserResponse} from "./interfaces";
import "./styles.scss";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
    const [users, setUsers] = useState<IUserResponse[]>([]);

    const addUser = (user: IUserResponse) => {
        setUsers([user, ...users])
    }

    return (
        <BrowserRouter>
            <nav className="nav">
                <div className="container">
                    <NavLink end className={({isActive}) => isActive ? "nav__link nav__link_active" : "nav__link"}
                             to={"/users"}>All users</NavLink>
                    <NavLink end className={({isActive}) => isActive ? "nav__link nav__link_active" : "nav__link"}
                             to={"/users/add"}>Add user</NavLink>
                </div>
            </nav>
            <main className="container">
                <Routes>
                    <Route path={"users"} element={<AllUsersPage setUsers={setUsers} users={users}/>}/>
                    <Route path={"users/add"} element={<AddUserPage addUser={addUser}/>}/>
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
