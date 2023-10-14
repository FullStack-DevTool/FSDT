import styled from "@emotion/styled";
import ListRenderer from "./ListRenderer";
import {useSearchStore} from "../stores/searchStore";

const StyledContent = styled.main`
  padding: 8px;
`;

const fakeData = [
  {
    date: "2019-01-01",
    source: "source",
    type: "type",
    content: "content"
  }
];

export default function Content() {
  const search = useSearchStore((state) => state.search);

  return <StyledContent>
    <ListRenderer rowData={fakeData} />
    {search}
  </StyledContent>;
}
