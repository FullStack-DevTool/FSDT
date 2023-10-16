import {BsCardList} from "react-icons/bs";
import {FiColumns} from "react-icons/fi";
import {GoRows} from "react-icons/go";

import SidebarItem from "../SidebarItem";
import styled from "@emotion/styled";
import UnstyledList from "../UnstyledList";

const StyledSidebar = styled.aside`
  width: 200px;
  height: 100%;
  border-right: 2px solid #ccc;
  `

const SidebarTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-style: italic;
  text-transform: capitalize;
  text-align: center;
  `

const SidebarSectionTitle = styled.h2`
  font-size: 20px;
  font-style: italic;
  margin-left: 10px;
`

export default function Sidebar() {
  return <StyledSidebar>
    <SidebarTitle>FSDT</SidebarTitle>
    <SidebarSectionTitle>Views</SidebarSectionTitle>
    <UnstyledList items={[
        <SidebarItem icon={<BsCardList />} text="List view" active={true} />,
        <SidebarItem icon={<FiColumns />} text="Column view" active={false} />,
        <SidebarItem icon={<GoRows />} text="Accordion view" active={false}/>
      ]} />
    <SidebarSectionTitle>Filter by source</SidebarSectionTitle>
    <SidebarSectionTitle>Filter by tag</SidebarSectionTitle>
  </StyledSidebar>
}
