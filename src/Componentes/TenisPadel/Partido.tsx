import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ObtenerPartidosTenisPadelActuales } from '../../Servicios/PartidoTenisPadel'
import { PartidoTenisPadel } from '../../Tipos'
import Pelota from '../../Recursos/comunes/pelota'
import { colorPrincipal, NoHayDatos } from '../../Estilos/Comunes'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'

const Partido = () => {
  const [partidosActuales, setPartidosActuales] = useState<PartidoTenisPadel[] | null>()
  const [cargando, setCargando] = useState<boolean>(true)

  const { torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    setPartidosActuales(null)
    setCargando(true)

    const obtenerPartidoActual = async () => {
      if (!torneoSeleccionado?.id) return
      const partidosActualesDB = await ObtenerPartidosTenisPadelActuales(torneoSeleccionado.id)
      if (partidosActualesDB?.length) {
        const partidosActuales = partidosActualesDB.map(
          partidoActualBD => (
            {
              ...partidoActualBD,
              equipo1Game: partidoActualBD.equipo1Game ?? 0,
              equipo2Game: partidoActualBD.equipo2Game ?? 0,
              equipo1Set1: partidoActualBD.equipo1Set1 ?? 0,
              equipo1Set2: partidoActualBD.equipo1Set2 ?? 0,
              equipo1Set3: partidoActualBD.equipo1Set3 ?? 0,
              equipo2Set1: partidoActualBD.equipo2Set1 ?? 0,
              equipo2Set2: partidoActualBD.equipo2Set2 ?? 0,
              equipo2Set3: partidoActualBD.equipo2Set3 ?? 0,
              setActual: partidoActualBD.setActual ?? 1,
              tipoSet: partidoActualBD.tipoSet ?? 'set',
              sacaEquipo1: partidoActualBD.sacaEquipo1 ?? true,
              tipoGame: partidoActualBD.tipoGame ?? 'game',
              mostrarSet1: !partidoActualBD?.setActual || partidoActualBD.setActual >= 1,
              mostrarSet2: !!partidoActualBD?.setActual && partidoActualBD.setActual >= 2,
              mostrarSet3: !!partidoActualBD?.setActual && partidoActualBD.setActual >= 3,
              mostrarGame: !partidoActualBD?.tipoSet || partidoActualBD.tipoSet === 'set',
            }
          )
        )
        setPartidosActuales(partidosActuales)
      } else {
        setPartidosActuales(null)
      }
      setCargando(false)
    }
    
    obtenerPartidoActual() // Carga inicial

    // Configurar intervalo para refrescar datos solamente si es el torneo actual
    if (torneoSeleccionado?.activo) {
      const intervalo = setInterval(obtenerPartidoActual, 1500) // Refresco de datos
      return () => { if (intervalo) clearInterval(intervalo) }
    }
  }, [torneoSeleccionado])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!torneoSeleccionado?.activo) return <NoHayDatos>Este torneo ha finalizado.</NoHayDatos>
  if (!partidosActuales?.length) return <NoHayDatos>No hay partidos en curso.</NoHayDatos>

  return (
    <Tablero>
      {
        partidosActuales.map(partidoActual => (
          <BloquePartido key={partidoActual.id}>
            <Fila>
              <Equipo>
                <Jugadores>
                  <Jugador>{partidoActual?.equipo1?.nombreJugador1 || 'Jugador/a 1'}</Jugador>
                  <Jugador>{partidoActual?.equipo1?.nombreJugador2 || 'Jugador/a 2'}</Jugador>
                </Jugadores>
                { !!partidoActual.sacaEquipo1 && <PelotaConEstilo /> }
              </Equipo>
              { partidoActual.mostrarSet1 && <Set>{partidoActual.equipo1Set1 || 0}</Set> }
              { partidoActual.mostrarSet2 && <Set>{partidoActual.equipo1Set2 || 0}</Set> }
              {partidoActual. mostrarSet3 && <Set>{partidoActual.equipo1Set3 || 0}</Set> }
              { partidoActual.mostrarGame &&
                <Game>
                  {
                    partidoActual?.equipo1Game
                    ? partidoActual.equipo1Game === 50
                      ? 'V'
                      : partidoActual.equipo1Game
                    : 0
                  }
                </Game>
              }
            </Fila>
            <Fila>
              <Equipo>
                <Jugadores>
                  <Jugador>{partidoActual?.equipo2?.nombreJugador1 || 'Jugador/a 1'}</Jugador>
                  <Jugador>{partidoActual?.equipo2?.nombreJugador2 || 'Jugador/a 2'}</Jugador>
                </Jugadores>
                { !partidoActual.sacaEquipo1 && <PelotaConEstilo /> }
              </Equipo>
              { partidoActual.mostrarSet1 && <Set>{partidoActual.equipo2Set1 || 0}</Set> }
              { partidoActual.mostrarSet2 && <Set>{partidoActual.equipo2Set2 || 0}</Set> }
              { partidoActual.mostrarSet3 && <Set>{partidoActual.equipo2Set3 || 0}</Set> }
              { partidoActual.mostrarGame &&
                <Game>
                {
                  partidoActual?.equipo2Game
                  ? partidoActual.equipo2Game === 50
                    ? 'V'
                    : partidoActual.equipo2Game
                  : 0
                }
              </Game>
              }
            </Fila>
          </BloquePartido>
        ))
      }
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 60px 0;

  @media (max-width: 768px) {
    margin: 40px 0;
  }

  @media (max-width: 600px) {
    margin: 30px 0;
  }
`

const Fila = styled.div`
  display: flex;
  height: 170px;

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 600px) {
    height: 70px;
  }
`

const BloquePartido = styled.div`
  margin-bottom: 1.5%;
  width: 80%;

  @media (max-width: 768px) {
    width: 85%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`

const Equipo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${colorPrincipal};
  background-color: #fff;
  width: 47%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    border: 1px solid ${colorPrincipal};
  }

  @media (max-width: 600px) {
    padding: 5px;
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
  font-size: 38px;
  line-height: 70px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 25px;
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    line-height: 20px;
    margin: 5px 0;
  }
`

const PelotaConEstilo = styled(Pelota)`
  @media (max-width: 768px) {
    svg{
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 600px) {
    svg{
      width: 10px;
      height: 30px;
      viewBox: "0 0 100 100"
    }
  }
`

const Set = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colorPrincipal};
  background-color: #fff;
  width: 10%;
  color: ${colorPrincipal};
  font-family: Tahoma;
  font-size: 90px;
  line-height: 170px;

  @media (max-width: 768px) {
    font-size: 50px;
    border: 1px solid ${colorPrincipal};
  }

  @media (max-width: 600px) {
    font-size: 25px;
    border: 1px solid ${colorPrincipal};
  }
`

const Game = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  background-color: ${colorPrincipal};
  width: 20%;
  color: #fff;
  font-family: Tahoma;
  font-size: 90px;
  line-height: 170px;

  @media (max-width: 768px) {
    font-size: 50px;
    border: 1px solid #fff;
  }

  @media (max-width: 600px) {
    font-size: 25px;
    border: 1px solid #fff;
  }
`

export default Partido
