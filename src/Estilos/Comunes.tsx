import styled from "styled-components";

//--- COLORES ---//
export const colorPrincipal = '#224d3b'

//--- TABLERO COMANDOS ---//

export const TableroPantallas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 16px;
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
  color: ${colorPrincipal};
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

//--- TABLERO USUARIO ---//

export const ContenedorTableroUsuario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(90% - 30px);
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 65px;
    height: calc(83% - 30px);
  }

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`

export const EncabezadoPantalla = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 75%;
  }
`

export const BotonMenu = styled.div<{ seleccionado: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background-color: ${props => props.seleccionado ? '#2E86C1' : '#ddd' };
  color: ${props => props.seleccionado ? '#fff' : '#000' };
  border: 1px solid ${colorPrincipal};
  font-size: 25px;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
    height: 50px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    height: 45px;
  }
`

export const BotonMenuIzquierda = styled(BotonMenu)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`

export const BotonMenuDerecha = styled(BotonMenu)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`

//--- TORNEO ---//

export const NoHayDatos = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: #fff;
  font-size: 25px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const ContenedorTorneo = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border-top: 2px solid #3d4b45;
  margin: 10px 0;
  background-color: #152b22;
  margin: 60px 0;

  @media (max-width: 768px) {
    margin: 50px 0;
    border-top: 1px solid #3d4b45;
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 85%;
    margin: 25px 0;
    border-top: 1px solid #3d4b45;
  }
`

export const EncabezadoTorneo = styled.div`
  display: flex;
`

export const ClubEncabezado = styled.div<{ ancho?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.ancho ?? 56}%;
  height: 67px;
  font-size: 30px;
  color: #9aa0a6;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 600px) {
    font-size: 25px;
  }
`

export const DatoEquipoEncabezado = styled.div<{ ancho?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${props => props.ancho ?? 11}%;
  color: #9aa0a6;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

export const FilaEquipoTorneo = styled.div`
  display: flex;
  height: 65px;
`

export const EquipoConEstilo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #bdc1c6;
  border-top: 2px solid #3d4b45;
`

export const DatoEquipo = styled.div<{ ancho?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.ancho ?? 11}%;
  font-size: 23px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    font-size: 17px;
  }
`

export const NombreClub = styled.div<{ ancho?: number }>`
  display: flex;
  align-items: center;
  width: calc(${props => props.ancho ?? 49}% - 15px);
  padding: 10px 5px 10px 10px;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

export const Escudo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 15px;

  & img {
    height: 45px;
  }

  @media (max-width: 768px) {\
    height: 45px;
    width: 45px;
    right: 5px;

    & img {
      height: 40px;
    }
  }
`
