import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
`;

const ProtectedRoute = ({ children, isFetching }) => {
  const user = useSelector((state) => state.user.userDetails);

  if (isFetching) {
    return (
      <Wrap>
        <div className="loader"></div>
      </Wrap>
    );
  }

  if (!isFetching && !user.isActive) {
    return <Navigate to="/user/auth" />;
  }

  return children;
};

export default ProtectedRoute;
