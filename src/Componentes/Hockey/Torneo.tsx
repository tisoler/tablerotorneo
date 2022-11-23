import { useEffect, useState } from "react"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import { ClubEncabezado, ContenedorTorneo, DatoEquipo, DatoEquipoEncabezado, EncabezadoTorneo, EquipoConEstilo, FilaEquipoTorneo, NombreClub, NoHayDatos, Escudo } from "../../Estilos/Comunes"
import { ObtenerEquipos } from "../../Servicios/Equipo"
import { Equipo } from "../../Tipos"

const Torneo = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [cargando, setCargando] = useState<boolean>(true)

  const { torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    const obtenerGrupos = async () => {
      if (!torneoSeleccionado?.id) return
      const equipos = await ObtenerEquipos(torneoSeleccionado.id)
      if (equipos?.length) {
        setEquipos(equipos)
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
    criterioA = a.puntos || 0
    criterioB = b.puntos || 0
    return criterioA <= criterioB ? 1 : -1
  }

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!equipos?.length) return <NoHayDatos>No hay información sobre el torneo.</NoHayDatos>

  return (
    <ContenedorTorneo>
      <EncabezadoTorneo>
        <ClubEncabezado ancho={76}>Club</ClubEncabezado>
        <DatoEquipoEncabezado ancho={24}>PTS</DatoEquipoEncabezado>
      </EncabezadoTorneo>
      { equipos
        .sort(ordenarEquipos)
        .map((equipo: Equipo) => (
          <FilaEquipoTorneo key={equipo.id}>
            <div style={{ width: '7px' }}>&nbsp;</div>
            <EquipoConEstilo>
              <DatoEquipo ancho={8}>
                {`${equipo.posicion || 4}`}
              </DatoEquipo>
              <NombreClub ancho={70}>
                <Escudo><img src={require(`../../Recursos/clubes/${equipo.imagenEscudo || 'escudoDefecto.png'}`)} alt='Escudo club' /></Escudo>
                <div>{equipo.nombreJugador1}</div>
              </NombreClub>
              <DatoEquipo ancho={22}>
                {`${equipo.puntos || 0}`}
              </DatoEquipo>
            </EquipoConEstilo>
            <div style={{ width: '7px' }}>&nbsp;</div>
          </FilaEquipoTorneo>
        ))
      }
    </ContenedorTorneo>
  )
}

export default Torneo
