import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Equipo } from '../../Tipos'
import { ObtenerEquipos } from '../../Servicios/Equipo'
import { NoHayDatos } from '../../Estilos/Comunes'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'

const Grupos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [grupos, setGrupos] = useState<string[]>([])
  const [cargando, setCargando] = useState<boolean>(true)

  const { torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    setCargando(true)

    const obtenerGrupos = async () => {
      if (!torneoSeleccionado?.id) return
      const equipos = await ObtenerEquipos(torneoSeleccionado.id)
      if (equipos?.length) {
        setEquipos(equipos)
        let gruposDB: string[] = []
        for (let i = 0; i < equipos.length; i++) {
          const idGrupo = equipos[i].idGrupo ?? '?'
          if (idGrupo !== '?' && !gruposDB.includes(idGrupo)) gruposDB.push(idGrupo)
        }
        setGrupos(gruposDB)
      } else {
        setEquipos([])
        setGrupos([])
      }
      setCargando(false)
    }

    obtenerGrupos() // Carga inicial

    // Configurar intervalo para refrescar datos solamente si es el torneo actual
    if (torneoSeleccionado?.activo) {
      const intervalo = setInterval(obtenerGrupos, 60000) // Refresco de datos
      return () => { if (intervalo) clearInterval(intervalo) }
    }
  }, [torneoSeleccionado])

  const ordenarEquipos = (a: Equipo, b: Equipo) => {
    let criterioA = a.posicion || 4
    let criterioB = b.posicion || 4
    if (criterioA !== criterioB) {
      return criterioA > criterioB ? 1 : -1
    }
    criterioA = a.partidosGanados || 0
    criterioB = b.partidosGanados || 0
    if (criterioA !== criterioB) {
      return criterioA < criterioB ? 1 : -1
    }
    criterioA = a.partidosJugados || 0
    criterioB = b.partidosJugados || 0
    if (criterioA !== criterioB) {
      return criterioA > criterioB ? 1 : -1
    }
    criterioA = !!a.diferenciaSets && !isNaN(Number(a.diferenciaSets)) ? parseInt(a.diferenciaSets) : 0
    criterioB = !!b.diferenciaSets && !isNaN(Number(b.diferenciaSets)) ? parseInt(b.diferenciaSets) : 0
    if (criterioA !== criterioB) {
      return criterioA < criterioB ? 1 : -1
    }
    criterioA = !!a.diferenciaGames && !isNaN(Number(a.diferenciaGames)) ? parseInt(a.diferenciaGames) : 0
    criterioB = !!b.diferenciaGames && !isNaN(Number(b.diferenciaGames)) ? parseInt(b.diferenciaGames) : 0
    return criterioA <= criterioB ? 1 : -1
  }

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!equipos?.length) return <NoHayDatos>No hay información sobre el torneo.</NoHayDatos>

  return (
    <Tablero>
      {grupos.map((grupo: string) =>
        <Grupo key={grupo}>
          <Encabezado>
            <NumeroGrupo>{`Grupo ${grupo}`}</NumeroGrupo>
            <PosicionPartidosEnc>PJ</PosicionPartidosEnc>
            <PosicionPartidosEnc>PG</PosicionPartidosEnc>
            <PosicionPartidosEnc>DS</PosicionPartidosEnc>
            <PosicionPartidosEnc>DG</PosicionPartidosEnc>
          </Encabezado>
          { equipos
            .filter((equipo: Equipo) => equipo.idGrupo === grupo)
            .sort(ordenarEquipos)
            .map((equipo: Equipo) => (
              <FilaEquipo key={equipo.id}>
                <div style={{ width: '7px' }}>&nbsp;</div>
                <EquipoConEstilo>
                  <PosicionPartidos ancho={7}>
                    {`${equipo.posicion || 4}`}
                  </PosicionPartidos>
                  <Jugadores>
                    <div>{equipo.nombreJugador1}</div>
                    <div>{equipo.nombreJugador2}</div>
                  </Jugadores>
                  <PosicionPartidos>
                    {`${equipo.partidosJugados || 0}`}
                  </PosicionPartidos>
                  <PosicionPartidos>
                    {`${equipo.partidosGanados || 0}`}
                  </PosicionPartidos>
                  <PosicionPartidos>
                    {`${equipo.diferenciaSets || 0}`}
                  </PosicionPartidos>
                  <PosicionPartidos>
                    {`${equipo.diferenciaGames || 0}`}
                  </PosicionPartidos>
                </EquipoConEstilo>
                <div style={{ width: '7px' }}>&nbsp;</div>
              </FilaEquipo>
            ))
          }
        </Grupo>
      )}
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 40px);
  margin: 60px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 50px 0;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin: 25px 0;
    flex-direction: column;
  }
`

const Grupo = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 24.2%;
  border-top: 2px solid #3d4b45;
  margin: 10px 0;
  background-color: #152b22;

  @media (max-width: 768px) {
    width: 100%;
    border-top: 1px solid #3d4b45;
  }

  @media (max-width: 600px) {
    width: 100%;
    border-top: 1px solid #3d4b45;
  }
`

const Encabezado = styled.div`
  display: flex;
`

const NumeroGrupo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56%;
  height: 70px;
  font-size: 30px;
  color: #9aa0a6;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 600px) {
    font-size: 25px;
  }
`

const PosicionPartidosEnc = styled.div<{ ancho?: number }>`
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

const PosicionPartidos = styled.div<{ ancho?: number }>`
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

const FilaEquipo = styled.div`
  display: flex;
  height: 25%;
`

const EquipoConEstilo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #bdc1c6;
  border-top: 2px solid #3d4b45;
`

const Jugadores = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(49% - 15px);
  padding: 10px 5px 10px 10px;
  font-weight: bold;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

export default Grupos
