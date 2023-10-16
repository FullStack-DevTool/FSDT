import styled from "@emotion/styled";
import {useSearchStore} from "../stores/searchStore";

const InputStyled = styled.input`
  flex: 1;
  height: 24px;
  `

export default function GlobalSearch(){
  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);

  return <InputStyled type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
}
