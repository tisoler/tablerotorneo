import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ObtenerCuadroFinalParaTorneo } from '../../Servicios/CuadroFinal'
import { CuadroFinal } from '../../Tipos'
import Copa from '../../Recursos/comunes/copa'
import { NoHayDatos } from '../../Estilos/Comunes'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'

const Cuadro = () => {
  const [cuadroFinal, setCuadroFinal] = useState<CuadroFinal | null>()
  const [cargando, setCargando] = useState<boolean>(true)
  const { innerWidth: width } = window;

  const { torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    setCargando(true)

    const obtenerCuadroFinal = async () => {
      if (!torneoSeleccionado?.id) return
      const cuadroFinalDB = await ObtenerCuadroFinalParaTorneo(torneoSeleccionado.id)
      setCuadroFinal(cuadroFinalDB)
      setCargando(false)
    }

    obtenerCuadroFinal() // Carga inicial

    // Configurar intervalo para refrescar datos solamente si es el torneo actual
    if (torneoSeleccionado?.activo) {
      const intervalo = setInterval(obtenerCuadroFinal, 60000) // Refresco de datos
      return () => { if (intervalo) clearInterval(intervalo) }
    }
  }, [torneoSeleccionado])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!cuadroFinal) return <NoHayDatos>No hay información sobre el torneo.</NoHayDatos>

  return (
    <ContenedorGeneral>
      { width <= 768
        ? (
          <>
            <Contenedor>
              <ColumnaEquipo>
                <BloqueVacio>4tos de final</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosABEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosABEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosABEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosABEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosCDEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosCDEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosCDEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosCDEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
                <BloqueVacio3>&nbsp;</BloqueVacio3>
                <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
              </ColumnaLineaVertical>
              <ColumnaLineaHorizontal>
                <BloqueLineaHorizontal>&nbsp;</BloqueLineaHorizontal>
                <BloqueLineaHorizontal2>&nbsp;</BloqueLineaHorizontal2>
              </ColumnaLineaHorizontal>
              <ColumnaEquipo>
                <BloqueVacio>Semifinal</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.semifinal1Equipo1?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinal1Equipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio4>&nbsp;</BloqueVacio4>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.semifinal1Equipo2?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinal1Equipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueLineaVertical2>&nbsp;</BloqueLineaVertical2>
              </ColumnaLineaVertical>
              <ColumnaLineaHorizontal>
                <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
              </ColumnaLineaHorizontal>
              <ColumnaEquipo>
                <BloqueVacio>Finalista</BloqueVacio>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.finalEquipo1?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.finalEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio5>&nbsp;</BloqueVacio5>
                <BloqueLineaVertical2Movil>&nbsp;</BloqueLineaVertical2Movil>
              </ColumnaLineaVertical>
            </Contenedor>

            <ContenedorBordo>
              <ColumnaEquipoBordo>
                <BloqueVacio>Campeón</BloqueVacio>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueEquipoBordo>
                  {!cuadroFinal.campeon?.nombreJugador1
                    ? <Copa />
                    : (
                      <>
                        <JugadorBordo>{cuadroFinal.campeon.nombreJugador1 || ''}</JugadorBordo>
                        <JugadorBordo>{cuadroFinal.campeon.nombreJugador2 || ''}</JugadorBordo>
                      </>
                    )
                  }
                </BloqueEquipoBordo>
              </ColumnaEquipoBordo>
            </ContenedorBordo>
            
            <Contenedor>
              <ColumnaEquipo>
                <BloqueVacio></BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosEFEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosEFEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosEFEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosEFEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosGHEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosGHEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosGHEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosGHEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
                <BloqueVacio3>&nbsp;</BloqueVacio3>
                <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
              </ColumnaLineaVertical>
              <ColumnaLineaHorizontal>
                <BloqueLineaHorizontal>&nbsp;</BloqueLineaHorizontal>
                <BloqueLineaHorizontal2>&nbsp;</BloqueLineaHorizontal2>
              </ColumnaLineaHorizontal>
              <ColumnaEquipo>
                <BloqueVacio></BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.semifinal2Equipo1?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinal2Equipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio4>&nbsp;</BloqueVacio4>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.semifinal2Equipo2?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinal2Equipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueLineaVertical2>&nbsp;</BloqueLineaVertical2>
              </ColumnaLineaVertical>
              <ColumnaLineaHorizontal>
                <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
              </ColumnaLineaHorizontal>
              <ColumnaEquipo>
                <BloqueVacio></BloqueVacio>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueVacio2>&nbsp;</BloqueVacio2>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.finalEquipo2?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.finalEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
              </ColumnaEquipo>
              <ColumnaLineaVertical>
                <BloqueLineaVertical2Movil2>&nbsp;</BloqueLineaVertical2Movil2>
              </ColumnaLineaVertical>
            </Contenedor>
          </>
        )
        : (
          <Contenedor>
            <ColumnaEquipo>
              <BloqueVacio>4tos de final</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosABEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosABEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosABEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosABEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosCDEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosCDEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosCDEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosCDEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
            </ColumnaEquipo>
            <ColumnaLineaVertical>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
              <BloqueVacio3>&nbsp;</BloqueVacio3>
              <BloqueLineaVertical>&nbsp;</BloqueLineaVertical>
            </ColumnaLineaVertical>
            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal>&nbsp;</BloqueLineaHorizontal>
              <BloqueLineaHorizontal2>&nbsp;</BloqueLineaHorizontal2>
            </ColumnaLineaHorizontal>
            <ColumnaEquipo>
              <BloqueVacio>Semifinal</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.semifinal1Equipo1?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinal1Equipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio4>&nbsp;</BloqueVacio4>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.semifinal1Equipo2?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinal1Equipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
            </ColumnaEquipo>
            <ColumnaLineaVertical>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueLineaVertical2>&nbsp;</BloqueLineaVertical2>
            </ColumnaLineaVertical>
            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
            </ColumnaLineaHorizontal>
            <ColumnaEquipo>
              <BloqueVacio>Finalista</BloqueVacio>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.finalEquipo1?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.finalEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
            </ColumnaEquipo>
            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
            </ColumnaLineaHorizontal>

            <ColumnaEquipo>
              <BloqueVacio>Campeón</BloqueVacio>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueEquipoBordo>
                {!cuadroFinal.campeon?.nombreJugador1
                  ? <Copa />
                  : (
                    <>
                      <JugadorBordo>{cuadroFinal.campeon.nombreJugador1 || ''}</JugadorBordo>
                      <JugadorBordo>{cuadroFinal.campeon.nombreJugador2 || ''}</JugadorBordo>
                    </>
                  )
                }
              </BloqueEquipoBordo>
            </ColumnaEquipo>

            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
            </ColumnaLineaHorizontal>
            <ColumnaEquipo>
              <BloqueVacio>Finalista</BloqueVacio>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.finalEquipo2?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.finalEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
            </ColumnaEquipo>
            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal3>&nbsp;</BloqueLineaHorizontal3>
            </ColumnaLineaHorizontal>
            <ColumnaLineaVertical>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueLineaVerticalDerecha2>&nbsp;</BloqueLineaVerticalDerecha2>
            </ColumnaLineaVertical>
            <ColumnaEquipo>
              <BloqueVacio>Semifinal</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.semifinal2Equipo1?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinal2Equipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio4>&nbsp;</BloqueVacio4>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.semifinal2Equipo2?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinal2Equipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
            </ColumnaEquipo>
            <ColumnaLineaHorizontal>
              <BloqueLineaHorizontal>&nbsp;</BloqueLineaHorizontal>
              <BloqueLineaHorizontal2>&nbsp;</BloqueLineaHorizontal2>
            </ColumnaLineaHorizontal>
            <ColumnaLineaVertical>
              <BloqueVacio2>&nbsp;</BloqueVacio2>
              <BloqueLineaVerticalDerecha>&nbsp;</BloqueLineaVerticalDerecha>
              <BloqueVacio3>&nbsp;</BloqueVacio3>
              <BloqueLineaVerticalDerecha>&nbsp;</BloqueLineaVerticalDerecha>
            </ColumnaLineaVertical>
            <ColumnaEquipo>
              <BloqueVacio>4tos de final</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosEFEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosEFEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosEFEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosEFEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosGHEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosGHEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosGHEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosGHEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueVacio>&nbsp;</BloqueVacio>
            </ColumnaEquipo>
          </Contenedor>
        )
      }
      
    </ContenedorGeneral>
  )
}

const ContenedorGeneral = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 99%;
  height: 100%;
`

const ContenedorBordo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 99%;
  height: 100%;
`

const ColumnaEquipo = styled.div`
  display: flex;
  flex-direction: column;
  width: 13.5%;
  height: 100%;

  @media (max-width: 768px) {
    width: 29%;
  }
`

const ColumnaEquipoBordo = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`

const BloqueVacio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5%;
  font-size: 30px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`

const BloqueVacio2 = styled.div`
  width: 100%;
  height: 17.5%;
`

const BloqueVacio3 = styled.div`
  width: 100%;
  height: 20%;

  @media (max-width: 768px) {
    height: 19.5%;
  }
`

const BloqueVacio4 = styled.div`
  width: 100%;
  height: 25%;
`

const BloqueVacio5 = styled.div`
  width: 100%;
  height: 42.5%;
`

const BloqueEquipo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: #fff;
`

const BloqueEquipoGris = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: #c8c6c6;
`

const BloqueEquipoBordo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: #2E86C1;
  color: #fff;

  @media (max-width: 768px) {
    height: 100%;
  }
`

const Jugador = styled.div`
  font-size: 1em;
  line-height: 30px;
  padding-left: 12px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;
    padding: 5px;
  }
`

const JugadorBordo = styled.div`
  font-size: 1.3em;
  line-height: 30px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
`

const ColumnaLineaVertical = styled.div`
  width: 1%;
  height: 100%;

  @media (max-width: 768px) {
    width: 2%;
  }
`

const BloqueLineaVertical = styled.div`
  width: 100%;
  height: 20%;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
`

const BloqueLineaVerticalDerecha = styled.div`
  width: 100%;
  height: 20%;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
`

const BloqueLineaVertical2 = styled.div`
  width: 100%;
  height: 40%;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
`

const BloqueLineaVertical2Movil = styled.div`
  width: 100%;
  height: 70%;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
`

const BloqueLineaVertical2Movil2 = styled.div`
  width: 100%;
  height: 47.5%;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
`

const BloqueLineaVerticalDerecha2 = styled.div`
  width: 100%;
  height: 40%;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
`

const ColumnaLineaHorizontal = styled.div`
  width: 1%;
  height: 100%;

  @media (max-width: 768px) {
    width: 2%;
  }
`

const BloqueLineaHorizontal = styled.div`
  width: 100%;
  height: 27.5%;
  border-bottom: 1px solid #fff;
`

const BloqueLineaHorizontal2 = styled.div`
  width: 100%;
  height: 40%;
  border-bottom: 1px solid #fff;
`

const BloqueLineaHorizontal3 = styled.div`
  width: 100%;
  height: 47.5%;
  border-bottom: 1px solid #fff;
`

export default Cuadro
