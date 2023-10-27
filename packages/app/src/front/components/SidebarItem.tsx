import { ReactNode } from "react";
import styled from "@emotion/styled";

interface IProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

export default function SidebarItem({ icon, text, active, onClick }: IProps) {
  const StyledSidebarItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 10px;
    cursor: pointer;
    color: ${active ? "white" : "black"};
    background-color: ${active ? "#4D84F5" : "transparent"};
  `;

  return (
    <StyledSidebarItem onClick={onClick}>
      {icon}
      <span>{text}</span>
    </StyledSidebarItem>
  );
}
