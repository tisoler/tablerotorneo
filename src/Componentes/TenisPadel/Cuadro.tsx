import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ObtenerCuadroFinal } from '../../Servicios/CuadroFinal'
import { CuadroFinal } from '../../Tipos'
import Copa from '../../recursos/comunes/copa'

const CUADRO_FINAL_INICIAL: CuadroFinal = {
  cuartosAEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosAEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosBEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosBEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosCEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosCEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosDEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  cuartosDEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  semifinalAEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  semifinalAEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  semifinalBEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  semifinalBEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  finalEquipo1: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  finalEquipo2: { id: 0, nombreJugador1: '', nombreJugador2: ''},
  campeon: { id: 0, nombreJugador1: '', nombreJugador2: ''},
}

const Cuadro = () => {
  const [cuadroFinal, setCuadroFinal] = useState<CuadroFinal>(CUADRO_FINAL_INICIAL)
  const { innerWidth: width } = window;

  useEffect(() => {
    const obtenerCuadroFinal = async () => {
      const cuadroFinalDB = await ObtenerCuadroFinal()
      if (cuadroFinalDB) {
        setCuadroFinal(cuadroFinalDB)
      }
    }
    const intervalo = setInterval(obtenerCuadroFinal, 60000) // Refresco de datos
    obtenerCuadroFinal() // Carga inicial

    return () => { if (intervalo) clearInterval(intervalo) }
  }, [])

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
                  <Jugador>{cuadroFinal.cuartosAEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosAEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosAEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosAEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosBEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosBEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosBEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosBEquipo2?.nombreJugador2 || ''}</Jugador>
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
                  <Jugador>{cuadroFinal.semifinalAEquipo1?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinalAEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio4>&nbsp;</BloqueVacio4>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.semifinalAEquipo2?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinalAEquipo2?.nombreJugador2 || ''}</Jugador>
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
                  <Jugador>{cuadroFinal.cuartosCEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosCEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosCEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosCEquipo2?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipoGris>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipo>
                  <Jugador>{cuadroFinal.cuartosDEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosDEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio>&nbsp;</BloqueVacio>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.cuartosDEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                  <Jugador>{cuadroFinal.cuartosDEquipo2?.nombreJugador2 || ''}</Jugador>
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
                  <Jugador>{cuadroFinal.semifinalBEquipo1?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinalBEquipo1?.nombreJugador2 || ''}</Jugador>
                </BloqueEquipo>
                <BloqueVacio4>&nbsp;</BloqueVacio4>
                <BloqueEquipoGris>
                  <Jugador>{cuadroFinal.semifinalBEquipo2?.nombreJugador1 || ''}</Jugador>
                  <Jugador>{cuadroFinal.semifinalBEquipo2?.nombreJugador2 || ''}</Jugador>
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
                <Jugador>{cuadroFinal.cuartosAEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosAEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosAEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosAEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosBEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosBEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosBEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosBEquipo2?.nombreJugador2 || ''}</Jugador>
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
                <Jugador>{cuadroFinal.semifinalAEquipo1?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinalAEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio4>&nbsp;</BloqueVacio4>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.semifinalAEquipo2?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinalAEquipo2?.nombreJugador2 || ''}</Jugador>
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
                <Jugador>{cuadroFinal.semifinalBEquipo1?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinalBEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio4>&nbsp;</BloqueVacio4>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.semifinalBEquipo2?.nombreJugador1 || ''}</Jugador>
                <Jugador>{cuadroFinal.semifinalBEquipo2?.nombreJugador2 || ''}</Jugador>
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
                <Jugador>{cuadroFinal.cuartosCEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosCEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosCEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosCEquipo2?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipo>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipoGris>
                <Jugador>{cuadroFinal.cuartosDEquipo1?.nombreJugador1 || 'Primero de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosDEquipo1?.nombreJugador2 || ''}</Jugador>
              </BloqueEquipoGris>
              <BloqueVacio>&nbsp;</BloqueVacio>
              <BloqueEquipo>
                <Jugador>{cuadroFinal.cuartosDEquipo2?.nombreJugador1 || 'Segundo de grupo'}</Jugador>
                <Jugador>{cuadroFinal.cuartosDEquipo2?.nombreJugador2 || ''}</Jugador>
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
