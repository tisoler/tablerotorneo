import styled from "styled-components";

export const TableroPantallas = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #2E86C1;
`

export const ContenedorBotonesPantallas = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: 20px 10px;
  background-color: #2E86C1;
`

export const Boton = styled.div<{ ancho?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: system-ui;
  font-size: 30px;
  ${prop => `width: ${prop.ancho ? prop.ancho : 60}`}px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  border: 1px solid #fff;

  &:hover {
    background-color: #ddd;
    color: #000;
  }

  &:active {
    background-color: #fff;
    color: #ddd;
  }
`

export const BotonCerrarSesion = styled(Boton)`
  position: absolute;
  right: 15px;
`

export const SetInput = styled.input<{ ancho?: number }>`
  width: ${props => props.ancho ?? 50}px;
  line-height: 30px;
  background-color: #fff;
  text-align: center;
`

export const Titulo = styled.span`
  color: #fff;
  font-size: 14px;
  margin-right: 5px;
`

export const TableroPartido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 20px);
  margin: 20px 10px;
`

export const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
  width: 100%;
`

export const FilaEquipo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #fff;
`

export const Select = styled.select`
  height: 60px;
  min-width: 60px;
  font-size: 16px;
  background-color: #fff;
`

export const Fila = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  border: 1px solid #fff;
`

export const TituloGrande = styled.span`
  color: #fff;
  font-size: 16px;
  margin-right: 5px;
`

export const Set = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #215d43;
  font-weight: bold;
  font-family: system-ui;
  font-size: 50px;
  line-height: 90px;
  margin: 10px;
`

export const ContenedorBotones = styled.div`
  display: flex;
`

export const ContenedorGrupos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #2E86C1;
  padding: 20px 10px;
`

export const NoTorneo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: #fff;
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`
