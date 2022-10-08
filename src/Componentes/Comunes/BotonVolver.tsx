import styled from "styled-components"

const BotonVolver = ({ onVolver }: { onVolver: () => void }) => (
  <Boton onClick={onVolver} />
)

export default BotonVolver

const Boton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 2em;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;

  &:after {
    content: '\\2190';
    font-size: 2em;
  }

  &:active {
    background-color: #7F1833;
    color: '#fff';
  }
`
