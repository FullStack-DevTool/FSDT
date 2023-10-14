import styled from "@emotion/styled";
import {FaTrash} from "react-icons/fa";

import GlobalSearch from "../GlobalSearch";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  padding: 24px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  `

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  background-color: #000;
  padding: 8px 16px;
  cursor: pointer;
`

export default function Header(){
  return <StyledHeader>
    <GlobalSearch />
    <StyledButton>
      <FaTrash />
      <span>Clear logs</span>
    </StyledButton>
  </StyledHeader>
}
