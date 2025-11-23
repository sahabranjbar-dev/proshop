import ListHeader from "@/components/ListHeader/ListHeader";
import React from "react";
import UserListFilter from "./UserListFilter";

const UserHeader = () => {
  return <ListHeader filter={<UserListFilter />} title="لیست کاربران" />;
};

export default UserHeader;
