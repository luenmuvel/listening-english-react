import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: inline-block;
  padding: 5px;
`;

const Header = () => {
  return (
    <>
      <div>
        <Wrapper>
          <Item>
            <Link to="/">Dashboard</Link>
          </Item>
          <Item>
            <Link to="/register">Registrar audio</Link>
          </Item>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
