import sound from "../../img/sound.svg";
import styled from "styled-components";

export const StyledSound = styled.button<{ dark?: boolean; vis?: boolean }>`
  width: 3em;
  height: 3em;
  background: url(${sound}) no-repeat;
  filter: ${(props: any) => (props.dark ? "" : `invert(100%)`)};
  border: none;
  cursor: pointer;
  visibility: ${({ vis }) => (vis ? "visible" : "hidden")};

  &:hover,
  &:focus {
    filter: ${(props: any) =>
      props.dark ? "invert(30%)" : `invert(80%) sepia(20%)`};
  }
`; 
