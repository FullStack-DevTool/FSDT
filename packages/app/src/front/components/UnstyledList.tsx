import styled from "@emotion/styled";
import {ReactNode} from "react";

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  `

const StyledLi = styled.li`
  padding: 0;
  margin: 0;
  `


export default function UnstyledList({items}: {items: ReactNode[]}){
  return <StyledUl>
    {items.map((item, index) => <StyledLi key={index}>{item}</StyledLi>)}
  </StyledUl>
}
