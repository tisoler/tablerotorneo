import { useState } from "react"
import styled from "styled-components"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import { colorPrincipal } from "../../Estilos/Comunes"
import { Torneo } from "../../Tipos"

const SelectorTorneo = () => {
  const [mostrarListaTorneos, setMostrarListaTorneos] = useState<boolean>(false)
  const { torneos, setTorneoSeleccionado, torneoSeleccionado } = useContextoGlobal()

  const seleccionarTorneo = (torneo: Torneo) => {
    if (torneoSeleccionado?.id === torneo.id) return
    setTorneoSeleccionado(torneo)
  }

  return (
    <>
      <ElegirTorneo onClick={() => setMostrarListaTorneos(true)}>Elegir torneo</ElegirTorneo>
      <FondoListaTorneos mostrar={mostrarListaTorneos} onClick={() => setMostrarListaTorneos(false)}>
        <ListaTorneos>
          {
            torneos?.map(
              torneo => (
                <TeclaTorneo
                  key={torneo.id}
                  seleccionado={torneoSeleccionado?.id === torneo.id}
                  onClick={() => seleccionarTorneo(torneo)}
                >
                  {`${torneo.nombreMostrar} ${torneo.sponsor ? ` - ${torneo.sponsor}` : ''}`}
                </TeclaTorneo>
              )
            )
          }
        </ListaTorneos>
      </FondoListaTorneos>
    </>
  )
}

export default SelectorTorneo

const ElegirTorneo = styled.div`
  position: fixed;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90px;
  height: 90px;
  background-color: #ddd;
  color: #000;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: #2E86C1;
    color: #fff;
  }

  &:active {
    background-color: ${colorPrincipal};
    color: ${colorPrincipal};
  }

  @media (max-width: 768px) {
    font-size: 15px;
    width: 67px;
    height: 67px;
    background-color: #2E86C1;
    color: #fff;
    right: 1.3em;
    bottom: 1em;

    &:active {
      background-color: #fff;
    }
  }
`

const FondoListaTorneos = styled.div<{ mostrar: boolean }>`
  display: ${props => props.mostrar ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.7);;
`

const ListaTorneos = styled.div`
  opacity: 0;
	animation: fadeIn 0.3s ease-in both;
  animation-delay: 0.3s;
  max-height: 40%;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, -50%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`

const TeclaTorneo = styled.div<{ seleccionado: boolean }>`
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid ${colorPrincipal};
  padding: 1em;
  cursor: pointer;
  font-size: 20px;
  background-color: ${props => props.seleccionado ? '#2E86C1' : '#ddd'};
  color: ${props => props.seleccionado ? '#fff' : '#000'};

  &:hover {
    background-color: #2E86C1;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`
