
import { useEffect, useState } from 'react'
import {
  ContenedorTiempoCuarto,
  ContenedorTiempoCuartoMovil,
  ContenedorTiempoResultado, Cuarto,
  EquipoLocal,
  EquipoVisitante,
  EscudoPartido,
  EscudoPartidoMovil,
  FilaResultado,
  FilaResultadoMovil,
  NoHayDatos,
  Resultado,
  ResultadoLocal,
  ContenedorPartido,
  Tiempo
} from '../../Estilos/Comunes'
import { ObtenerPartidoFutbolActual } from '../../Servicios/PartidoFutbol'
import { PartidoFutbol as PartidoFutbolTipo } from '../../Tipos'

const PartidoFutbol = ({ idDisciplinaClub }: { idDisciplinaClub: number }) => {
  const [partidoActual, setPartidoActual] = useState<PartidoFutbolTipo | null>()
  const [cargando, setCargando] = useState<boolean>(true)

  useEffect(() => {
    const obtenerPartidoFutbolActual = async () => {
      const partidoFutbolDB = await ObtenerPartidoFutbolActual(idDisciplinaClub)
      if (partidoFutbolDB) {
        setPartidoActual({
          ...partidoFutbolDB,
          golesEquipoLocal: partidoFutbolDB.golesEquipoLocal ?? 0,
          golesEquipoVisitante: partidoFutbolDB.golesEquipoVisitante ?? 0,
          numeroTiempo: partidoFutbolDB.numeroTiempo ?? 1,
          idTorneoDisciplinaClub: partidoFutbolDB.idTorneoDisciplinaClub ?? -1,
        })
      } else {
        setPartidoActual(null)
      }
      setCargando(false)
    }
    const intervalo = setInterval(obtenerPartidoFutbolActual, 30000) // Refresco de datos
    obtenerPartidoFutbolActual() // Carga inicial

    return () => { if (intervalo) clearInterval(intervalo) }
  }, [])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!partidoActual) return <NoHayDatos>No hay partido en curso.</NoHayDatos>

  let minutosTiempo = 0
  if (!partidoActual.numeroTiempo || partidoActual.numeroTiempo === 1) {
    minutosTiempo = partidoActual.minutosPrimerTiempo ?? 0
  } else {
    minutosTiempo = partidoActual.minutosSegundoTiempo ?? 0
  }

  return (
    <ContenedorPartido>
      <FilaResultadoMovil>
        <EscudoPartidoMovil>
          <img
            src={require(`../../Recursos/clubes/${partidoActual.equipoLocal?.imagenEscudo || 'escudoDefecto.png'}`)}
            alt={`Escudo ${partidoActual.equipoLocal?.nombreJugador1 || 'equipo local'}`}
          />
        </EscudoPartidoMovil>
        <ContenedorTiempoCuartoMovil>
          <Cuarto>{partidoActual.numeroTiempo || 1} T</Cuarto>
          <Tiempo>{minutosTiempo}'</Tiempo>
        </ContenedorTiempoCuartoMovil>
        <EscudoPartidoMovil>
          <img
            src={require(`../../Recursos/clubes/${partidoActual.equipoVisitante?.imagenEscudo || 'escudoDefecto.png'}`)}
            alt={`Escudo ${partidoActual.equipoVisitante?.nombreJugador1 || 'equipo visitante'}`}
          />
        </EscudoPartidoMovil>
      </FilaResultadoMovil>

      <FilaResultado>
        <EscudoPartido>
          <img
            src={require(`../../Recursos/clubes/${partidoActual.equipoLocal?.imagenEscudo || 'escudoDefecto.png'}`)}
            alt={`Escudo ${partidoActual.equipoLocal?.nombreJugador1 || 'equipo local'}`}
          />
        </EscudoPartido>
        <EquipoLocal>{partidoActual.equipoLocal?.nombreJugador1 || 'equipo local'}</EquipoLocal>

        <ContenedorTiempoResultado>
          <ResultadoLocal>{partidoActual.golesEquipoLocal || 0}</ResultadoLocal>
          <ContenedorTiempoCuarto>
            <Cuarto>{partidoActual.numeroTiempo || 1} T</Cuarto>
            <Tiempo>{minutosTiempo}'</Tiempo>
          </ContenedorTiempoCuarto>
          <Resultado>{partidoActual.golesEquipoVisitante || 0}</Resultado>
        </ContenedorTiempoResultado>

        <EquipoVisitante>{partidoActual.equipoVisitante?.nombreJugador1 || 'equipo local'}</EquipoVisitante>
        <EscudoPartido>
          <img
            src={require(`../../Recursos/clubes/${partidoActual.equipoVisitante?.imagenEscudo || 'escudoDefecto.png'}`)}
            alt={`Escudo ${partidoActual.equipoVisitante?.nombreJugador1 || 'equipo visitante'}`}
          />
        </EscudoPartido>
      </FilaResultado>
    </ContenedorPartido>
  )
}

export default PartidoFutbol
