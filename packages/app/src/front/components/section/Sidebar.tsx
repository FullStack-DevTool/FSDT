import { BsCardList } from "react-icons/bs";
import { FiColumns } from "react-icons/fi";
import { GoRows } from "react-icons/go";

import SidebarItem from "../SidebarItem";
import styled from "@emotion/styled";
import UnstyledList from "../UnstyledList";
import { useViewFilterStore } from "../../stores/viewFilterStore";

const StyledSidebar = styled.aside`
  width: 200px;
  height: 100%;
  border-right: 2px solid #ccc;
`;

const SidebarTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-style: italic;
  text-transform: capitalize;
  text-align: center;
`;

const SidebarSectionTitle = styled.h2`
  font-size: 20px;
  font-style: italic;
  margin-left: 10px;
`;

export default function Sidebar() {
  const view = useViewFilterStore((state) => state.view);
  const source = useViewFilterStore((state) => state.source);
  const tag = useViewFilterStore((state) => state.tag);

  const setView = useViewFilterStore((state) => state.setView);
  const setSource = useViewFilterStore((state) => state.setSource);
  const setTag = useViewFilterStore((state) => state.setTag);

  return (
    <StyledSidebar>
      <SidebarTitle>FSDT</SidebarTitle>
      <SidebarSectionTitle>Views</SidebarSectionTitle>
      <UnstyledList
        items={[
          <SidebarItem
            icon={<BsCardList />}
            text="List view"
            active={view === "List"}
            onClick={() => setView("List")}
          />,
          <SidebarItem
            icon={<FiColumns />}
            text="Column view"
            active={view === "Column"}
            onClick={() => setView("Column")}
          />,
          <SidebarItem
            icon={<GoRows />}
            text="Accordion view"
            active={view === "Accordion"}
            onClick={() => setView("Accordion")}
          />,
        ]}
      />
      <SidebarSectionTitle>Filter by source</SidebarSectionTitle>

      <SidebarSectionTitle>Filter by tag</SidebarSectionTitle>
    </StyledSidebar>
  );
}
