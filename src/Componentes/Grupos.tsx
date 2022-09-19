import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Equipo } from '../Tipos'
import { ObtenerEquipos } from '../Servicios/Equipo'

const Grupos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [grupos, setGrupos] = useState<string[]>([])

  useEffect(() => {
    const obtenerGrupos = async () => {
      const equipos = await ObtenerEquipos()
      if (equipos?.length) {
        setEquipos(equipos)
        let gruposDB: string[] = []
        for (let i = 0; i < equipos.length; i++) {
          const idGrupo = equipos[i].idGrupo ?? '?'
          if (idGrupo !== '?' && !gruposDB.includes(idGrupo)) gruposDB.push(idGrupo)
        }
        setGrupos(gruposDB)
      }
    }
    setInterval(obtenerGrupos, 60000) // Refresco de datos
    obtenerGrupos() // Carga inicial
  }, [])

  return (
    <Tablero>
      {grupos.map((grupo: string) =>
        <Grupo key={grupo}>
          <Encabezado>
            <NumeroGrupo>{`Grupo ${grupo}`}</NumeroGrupo>
            <PosicionPartidosEnc>PJ</PosicionPartidosEnc>
            <PosicionPartidosEnc>PG</PosicionPartidosEnc>
          </Encabezado>
          { equipos
            .filter((equipo: Equipo) => equipo.idGrupo === grupo)
            .sort((a: Equipo, b: Equipo) => (a.posicion || 4) - (b.posicion || 4))
            .map((equipo: Equipo) => (
              <EquipoConEstilo key={equipo.id}>
                <PosicionPartidos>
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
              </EquipoConEstilo>
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
  width: 24%;
  border: 2px solid #fff;
  margin: 20px 0;

  @media (max-width: 768px) {
    width: 100%;
    border: 1px solid #fff;
  }

  @media (max-width: 600px) {
    width: 100%;
    border: 1px solid #fff;
  }
`

const Encabezado = styled.div`
  display: flex;
`

const NumeroGrupo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76%;
  height: 70px;
  font-size: 40px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 600px) {
    font-size: 25px;
  }
`

const PosicionPartidosEnc = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  width: 12%;
  color: #fff;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

const PosicionPartidos = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  width: 12%;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

const EquipoConEstilo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #000;
  height: 25%;

  background-color: #fff;
  ${PosicionPartidos} {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  :nth-child(even) {
    background-color: #ddd;
    ${PosicionPartidos} {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
`

const Jugadores = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 64%;
  padding: 10px 10px;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

export default Grupos
