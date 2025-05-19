import styled from "styled-components"
import { colorPrincipal } from "../../Estilos/Comunes"
import FlechaAtras from "../../Recursos/comunes/flechaAtras"

const BotonVolver = ({ onVolver }: { onVolver: () => void }) => (
  <Boton onClick={onVolver}>
    <FlechaAtras ancho={40} alto={40} />
  </Boton>
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
  z-index: 999;

  & svg {
    fill: #2E86C1;
  }

  &:hover {
    background-color: #2E86C1;
    & svg {
      fill: #fff;
    }
  }

  &:active {
    background-color: ${colorPrincipal};
    & svg {
      fill: ${colorPrincipal};
    }
  }

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    line-height: 65px;
    left: 1.3em;
    bottom: 1em;
    background-color: #2E86C1;

    & svg {
      fill: #fff;
    }
    
    &:active {
      background-color: #fff;
      & svg {
        fill: #2E86C1;
      }
    }
  }
`
