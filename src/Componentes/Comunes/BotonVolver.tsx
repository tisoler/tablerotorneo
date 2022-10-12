import styled from "styled-components"
import { colorPrincipal } from "../../Estilos/Comunes"

const BotonVolver = ({ onVolver }: { onVolver: () => void }) => (
  <Boton onClick={onVolver} />
)

export default BotonVolver

const Boton = styled.div`
  position: fixed;
  left: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #fff;
  color: #2E86C1;
  border-radius: 50%;
  cursor: pointer;
  line-height: 70px;

  &:after {
    content: '\\2190';
    font-size: 2em;
  }

  &:hover {
    background-color: #2E86C1;
    color: #fff;
  }

  &:active {
    background-color: ${colorPrincipal};
    color: ${colorPrincipal};
  }

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    line-height: 65px;
    left: 1.3em;
    bottom: 1em;
    background-color: #2E86C1;
    color: #fff;
    
    &:active {
      background-color: #fff;
      color: #2E86C1;
    }

    &:after {
      font-size: 3em;
    }
  }
`
