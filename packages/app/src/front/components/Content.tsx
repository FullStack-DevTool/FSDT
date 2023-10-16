import styled from "@emotion/styled";
import { useSearchStore } from "../stores/searchStore";

const StyledContent = styled.main`
  padding: 8px;
`;

export default function Content() {
  const search = useSearchStore((state) => state.search);

  return <StyledContent>{search}</StyledContent>;
}
