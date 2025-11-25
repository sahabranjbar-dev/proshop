import ListContainer from "@/container/ListContainer/ListContainer";
import UserHeader from "./components/UserHeader";
import UserList from "./components/UserList";

const UsersPage = () => {
  return (
    <ListContainer queryKey={["admin", "users"]} url="/admin/users">
      <UserHeader />
      <UserList />
    </ListContainer>
  );
};

export default UsersPage;
