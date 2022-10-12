import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ObtenerPartidoActual } from '../../Servicios/PartidoActual'
import { PartidoActual } from '../../Tipos'
import Pelota from '../../Recursos/comunes/pelota'
import { colorPrincipal, NoHayDatos } from '../../Estilos/Comunes'

const Partido = () => {
  const [partidoActual, setPartidoActual] = useState<PartidoActual | null>()
  const [mostrarSet1, setMostrarSet1] = useState<boolean>(true)
  const [mostrarSet2, setMostrarSet2] = useState<boolean>(false)
  const [mostrarSet3, setMostrarSet3] = useState<boolean>(false)
  const [mostrarGame, setMostrarGame] = useState<boolean>(false)
  const [cargando, setCargando] = useState<boolean>(true)

  useEffect(() => {
    const obtenerPartidoActual = async () => {
      const partidoActualDB = await ObtenerPartidoActual()
      if (partidoActualDB) {
        setPartidoActual({
          ...partidoActualDB,
          equipo1Game: partidoActualDB.equipo1Game ?? 0,
          equipo2Game: partidoActualDB.equipo2Game ?? 0,
          equipo1Set1: partidoActualDB.equipo1Set1 ?? 0,
          equipo1Set2: partidoActualDB.equipo1Set2 ?? 0,
          equipo1Set3: partidoActualDB.equipo1Set3 ?? 0,
          equipo2Set1: partidoActualDB.equipo2Set1 ?? 0,
          equipo2Set2: partidoActualDB.equipo2Set2 ?? 0,
          equipo2Set3: partidoActualDB.equipo2Set3 ?? 0,
          setActual: partidoActualDB.setActual ?? 1,
          tipoSet: partidoActualDB.tipoSet ?? 'set',
          sacaEquipo1: partidoActualDB.sacaEquipo1 ?? true,
          tipoGame: partidoActualDB.tipoGame ?? 'game',
        })
        setMostrarSet1(!partidoActualDB?.setActual || partidoActualDB.setActual >= 1)
        setMostrarSet2(!!partidoActualDB?.setActual && partidoActualDB.setActual >= 2)
        setMostrarSet3(!!partidoActualDB?.setActual && partidoActualDB.setActual >= 3)
        setMostrarGame(!partidoActualDB?.tipoSet || partidoActualDB.tipoSet === 'set')
      } else {
        setPartidoActual(null)
      }
      setCargando(false)
    }
    const intervalo = setInterval(obtenerPartidoActual, 1500) // Refresco de datos
    obtenerPartidoActual() // Carga inicial

    return () => { if (intervalo) clearInterval(intervalo) }
  }, [])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!partidoActual) return <NoHayDatos>No hay información sobre torneos.</NoHayDatos>

  return (
    <Tablero>
      <Fila>
        <Equipo>
          <Jugadores>
            <Jugador>{partidoActual?.equipo1?.nombreJugador1 || 'Jugador/a 1'}</Jugador>
            <Jugador>{partidoActual?.equipo1?.nombreJugador2 || 'Jugador/a 2'}</Jugador>
          </Jugadores>
          { !!partidoActual.sacaEquipo1 && <PelotaConEstilo /> }
        </Equipo>
        { mostrarSet1 && <Set>{partidoActual.equipo1Set1 || 0}</Set> }
        { mostrarSet2 && <Set>{partidoActual.equipo1Set2 || 0}</Set> }
        { mostrarSet3 && <Set>{partidoActual.equipo1Set3 || 0}</Set> }
        { mostrarGame &&
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
        { mostrarSet1 && <Set>{partidoActual.equipo2Set1 || 0}</Set> }
        { mostrarSet2 && <Set>{partidoActual.equipo2Set2 || 0}</Set> }
        { mostrarSet3 && <Set>{partidoActual.equipo2Set3 || 0}</Set> }
        { mostrarGame &&
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
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 100px 0;

  @media (max-width: 768px) {
    margin: 50px 0;
  }

  @media (max-width: 600px) {
    margin: 40px 0;
  }
`

const Fila = styled.div`
  display: flex;
  height: 170px;
  width: 80%;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 70px;
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
