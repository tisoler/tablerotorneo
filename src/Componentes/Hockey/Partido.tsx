
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
import { ObtenerPartidoHockeyActual } from '../../Servicios/PartidoHockey'
import { PartidoHockey as PartidoHockeyTipo } from '../../Tipos'

const PartidoHockey = ({ idDisciplinaClub }: { idDisciplinaClub: number }) => {
  const [partidoActual, setPartidoActual] = useState<PartidoHockeyTipo | null>()
  const [cargando, setCargando] = useState<boolean>(true)

  useEffect(() => {
    const obtenerPartidoHockeyActual = async () => {
      const partidoHockeyDB = await ObtenerPartidoHockeyActual(idDisciplinaClub)
      if (partidoHockeyDB) {
        setPartidoActual({
          ...partidoHockeyDB,
          golesEquipoLocal: partidoHockeyDB.golesEquipoLocal ?? 0,
          golesEquipoVisitante: partidoHockeyDB.golesEquipoVisitante ?? 0,
          numeroCuarto: partidoHockeyDB.numeroCuarto ?? 1,
          idTorneoDisciplinaClub: partidoHockeyDB.idTorneoDisciplinaClub ?? -1,
        })
      } else {
        setPartidoActual(null)
      }
      setCargando(false)
    }
    const intervalo = setInterval(obtenerPartidoHockeyActual, 30000) // Refresco de datos
    obtenerPartidoHockeyActual() // Carga inicial

    return () => { if (intervalo) clearInterval(intervalo) }
  }, [])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!partidoActual) return <NoHayDatos>No hay partido en curso.</NoHayDatos>

  let minutosCuarto = 0
  if (partidoActual.numeroCuarto) {
    switch (partidoActual.numeroCuarto) {
      case 2:
        minutosCuarto = partidoActual.minutosSegundoCuarto ?? 0
        break
      case 3:
        minutosCuarto = partidoActual.minutosTercerCuarto ?? 0
        break
      case 4:
        minutosCuarto = partidoActual.minutosCuartoCuarto ?? 0
        break
      default:
        minutosCuarto = partidoActual.minutosPrimerCuarto ?? 0
    }
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
          <Cuarto>{partidoActual.numeroCuarto || 1} C</Cuarto>
          <Tiempo>{minutosCuarto}'</Tiempo>
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
            <Cuarto>{partidoActual.numeroCuarto || 1} C</Cuarto>
            <Tiempo>{minutosCuarto}'</Tiempo>
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

export default PartidoHockey
