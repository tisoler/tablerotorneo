import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ObtenerPartidosTenisPadelParaTorneo } from '../../Servicios/PartidoTenisPadel'
import { PartidoTenisPadel } from '../../Tipos'
import { colorPrincipal, NoHayDatos } from '../../Estilos/Comunes'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'

const PartidosJugados = () => {
  const [partidos, setPartidos] = useState<PartidoTenisPadel[] | null>()
  const [cargando, setCargando] = useState<boolean>(true)
  
  const { torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    setCargando(false)

    const obtenerPartidoActual = async () => {
      setCargando(true)

      if (!torneoSeleccionado?.id) return
      const partidosParaTorneoBD = await ObtenerPartidosTenisPadelParaTorneo(torneoSeleccionado.id)
      if (partidosParaTorneoBD) {
        const partidosParaTorneo: PartidoTenisPadel[] = partidosParaTorneoBD
          .filter(partido => !partido.activo)
          .sort((a, b) => b.id - a.id)
          .map(partidParaTorneoBD => {
            const partidoParaTorneo = {
              ...partidParaTorneoBD,
              equipo1Game: partidParaTorneoBD.equipo1Game ?? 0,
              equipo2Game: partidParaTorneoBD.equipo2Game ?? 0,
              equipo1Set1: partidParaTorneoBD.equipo1Set1 ?? 0,
              equipo1Set2: partidParaTorneoBD.equipo1Set2 ?? 0,
              equipo1Set3: partidParaTorneoBD.equipo1Set3 ?? 0,
              equipo2Set1: partidParaTorneoBD.equipo2Set1 ?? 0,
              equipo2Set2: partidParaTorneoBD.equipo2Set2 ?? 0,
              equipo2Set3: partidParaTorneoBD.equipo2Set3 ?? 0,
              setActual: partidParaTorneoBD.setActual ?? 1,
            }

            return partidoParaTorneo
          })
        setPartidos(partidosParaTorneo)
      } else {
        setPartidos(null)
      }
      setCargando(false)
    }

    obtenerPartidoActual() // Carga inicial
  }, [torneoSeleccionado])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!partidos?.length) return <NoHayDatos>No hay información sobre partidos jugados en el torneo.</NoHayDatos>

  return (
    <Tablero>
      {partidos.map(partido =>
        <Partido key={partido.id}>
          <Fila>
            <Equipo>
              <Jugadores>
                <Jugador>{partido?.equipo1?.nombreJugador1 || 'Jugador/a 1'}</Jugador>
                <Jugador>{partido?.equipo1?.nombreJugador2 || 'Jugador/a 2'}</Jugador>
              </Jugadores>
            </Equipo>
            { (!partido?.setActual || partido.setActual >= 1) && <Set>{partido.equipo1Set1 || 0}</Set> }
            { (!!partido?.setActual && partido.setActual >= 2) && <Set>{partido.equipo1Set2 || 0}</Set> }
            { (!!partido?.setActual && partido.setActual >= 3) && <Set>{partido.equipo1Set3 || 0}</Set> }
          </Fila>
          <Fila>
            <Equipo>
              <Jugadores>
                <Jugador>{partido?.equipo2?.nombreJugador1 || 'Jugador/a 1'}</Jugador>
                <Jugador>{partido?.equipo2?.nombreJugador2 || 'Jugador/a 2'}</Jugador>
              </Jugadores>
            </Equipo>
            { (!partido?.setActual || partido.setActual >= 1) && <Set>{partido.equipo2Set1 || 0}</Set> }
            { (!!partido?.setActual && partido.setActual >= 2) && <Set>{partido.equipo2Set2 || 0}</Set> }
            { (!!partido?.setActual && partido.setActual >= 3) && <Set>{partido.equipo2Set3 || 0}</Set> }
          </Fila>
        </Partido>
      )}
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 70px 0;

  @media (max-width: 768px) {
    margin: 40px 0;
  }

  @media (max-width: 600px) {
    margin: 30px 0;
  }
`

const Partido = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8em 0;
  width: 40%;

  @media (max-width: 768px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`

const Fila = styled.div`
  display: flex;
  height: 80px;
  width: 100%;

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 600px) {
    height: 60px;
  }
`
const Equipo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${colorPrincipal};
  background-color: #fff;
  width: 59%;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
    border: 1px solid ${colorPrincipal};
  }

  @media (max-width: 600px) {
    padding: 0 5px;
    border: 1px solid ${colorPrincipal};
  }
`

const Jugadores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const Jugador = styled.div`
  color: ${colorPrincipal};
  font-weight: bold;
  font-family: Tahoma;
  font-size: 21px;
  line-height: 35px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 25px;
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    line-height: 20px;
    margin: 5px 0;
  }
`

const Set = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colorPrincipal};
  background-color: #fff;
  width: 12%;
  color: ${colorPrincipal};
  font-family: Tahoma;
  font-size: 28px;
  font-weight: bold;
  line-height: 28px;

  @media (max-width: 768px) {
    font-size: 25px;
    border: 1px solid ${colorPrincipal};
  }

  @media (max-width: 600px) {
    font-size: 20px;
    border: 1px solid ${colorPrincipal};
  }
`

export default PartidosJugados
