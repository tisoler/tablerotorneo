import { useState } from 'react'
import { useEffect } from 'react'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'
import {
  Boton,
  BotonCerrarSesion,
  ContenedorBotones,
  ContenedorBotonesPantallas,
  ContenedorGrupos,
  Fila,
  FilaEquipo,
  Select,
  SetInput,
  Tablero,
  TableroPantallas,
  TableroPartido,
  Titulo,
  TituloGrande,
  Set,
} from '../../Estilos/Comunes'
import { ActualizarConfiguracion } from '../../Servicios/Configuracion'
import { ActualizarEquipo, ObtenerEquiposParaUsuarioLogueado } from '../../Servicios/Equipo'
import { CrearPartidoHockeyActual, ActualizarPartidoHockeyActual, BorrarPartidoHockeyActual, ObtenerPartidoHockeyActualParaUsuario } from '../../Servicios/PartidoHockey'
import { Equipo, PantallaMostrar, PartidoHockey, PartidoHockeyPayload } from '../../Tipos'

const PARTIDO_ACTUAL_INICIAL: PartidoHockey = {
  id: -1,
  equipoLocal: {
    id: -1,
    nombreJugador1: 'Jugador/a 1',
  },
  equipoVisitante: {
    id: -1,
    nombreJugador1: 'Jugador/a 1',
  },
  golesEquipoLocal: 0,
  golesEquipoVisitante: 0,
  fecha: new Date(),
  numeroTiempo: 1,
  idTorneoDisciplinaClub: -1,
}

const TableroComandos = () => {
  const [partidoActual, setPartidoActual] = useState<PartidoHockey>(PARTIDO_ACTUAL_INICIAL)
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [idEquipoLocal, setIdEquipoLocal] = useState<number>(1)
  const [idEquipoVisitante, setIdEquipoVisitante] = useState<number>(1)
  const [grupos, setGrupos] = useState<string[]>([])

  const { token, limpiarAutenticacion } = useContextoGlobal()

  useEffect(() => {
    const obtenerDatos = async () => {
      // PARTIDO ACTUAL
      const partidoHockeyDB = await ObtenerPartidoHockeyActualParaUsuario(token)
      if (partidoHockeyDB) {
        setPartidoActual({
          ...partidoHockeyDB,
          golesEquipoLocal: partidoHockeyDB.golesEquipoLocal ?? 0,
          golesEquipoVisitante: partidoHockeyDB.golesEquipoVisitante ?? 0,
          numeroTiempo: partidoHockeyDB.numeroTiempo ?? 1,
          idTorneoDisciplinaClub: partidoHockeyDB.idTorneoDisciplinaClub ?? -1,
        })
      }

      // EQUIPOS
      const equiposBD = await ObtenerEquiposParaUsuarioLogueado(token)
      if (equiposBD) {
        setEquipos(equiposBD)
      }

      // TORNEO
      if (equiposBD?.length) {
        setEquipos(equiposBD)
        let gruposDB: string[] = []
        for (let i = 0; i < equiposBD.length; i++) {
          const idGrupo = equiposBD[i].idGrupo ?? '?'
          if (idGrupo !== '?' && !gruposDB.includes(idGrupo)) gruposDB.push(idGrupo)
        }
        setGrupos(gruposDB)
      }
    }

    obtenerDatos()
  }, [])

  const crearPartido = async () => {
    const partidoActualActualizado = await CrearPartidoHockeyActual(
      { id: partidoActual.id, idEquipoLocal, idEquipoVisitante },
      token,
      limpiarAutenticacion
    )
    if (partidoActualActualizado) setPartidoActual(partidoActualActualizado)
  }

  const actualizarPartido = async (payload: PartidoHockeyPayload) => {
    if (!partidoActual?.id || partidoActual.id <= 0) {
      const { idEquipoLocal, idEquipoVisitante } = payload
      if (idEquipoLocal) setIdEquipoLocal(idEquipoLocal)
      if (idEquipoVisitante) setIdEquipoVisitante(idEquipoVisitante)
      return
    }

    const partidoActualActualizado = await ActualizarPartidoHockeyActual(
      { id: partidoActual.id, ...payload },
      token,
      limpiarAutenticacion
    )
    setPartidoActual(partidoActualActualizado ?? PARTIDO_ACTUAL_INICIAL)
  }

  const borrarPartido = async () => {
    if (!partidoActual?.id || partidoActual.id <= 0) return

    const partidoActualActualizado = await BorrarPartidoHockeyActual(partidoActual.id, token, limpiarAutenticacion)
    setPartidoActual(partidoActualActualizado ?? PARTIDO_ACTUAL_INICIAL)
  }

  const actualizarConfiguracion = (pantalla: PantallaMostrar) => {
    ActualizarConfiguracion({ pantallaMostrar: pantalla }, token, limpiarAutenticacion)
  }

  const FilaGoles = ({titulo, valorGolesEquipoLocal, valorGolesEquipoVisitante}
    : {titulo: string, valorGolesEquipoLocal: number, valorGolesEquipoVisitante: number}
  ) => (
    <Fila>
      <Titulo>{titulo}</Titulo>
      <Set>
        <SetInput readOnly value={valorGolesEquipoLocal}></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarPartido({ golesEquipoLocal: valorGolesEquipoLocal + 1 })}>+</Boton>
          <Boton onClick={() => actualizarPartido({ golesEquipoLocal: valorGolesEquipoLocal - 1 })}>-</Boton>
        </ContenedorBotones>
      </Set>
      <Set>
        <SetInput readOnly value={valorGolesEquipoVisitante}></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarPartido({ golesEquipoVisitante: valorGolesEquipoVisitante + 1 })}>+</Boton>
          <Boton onClick={() => actualizarPartido({ golesEquipoVisitante: valorGolesEquipoVisitante - 1 })}>-</Boton>
        </ContenedorBotones>
      </Set>
    </Fila>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableroPantallas>
        <ContenedorBotonesPantallas>
          <Boton
            ancho={150} 
            onClick={() => actualizarConfiguracion('torneo')}>Torneo</Boton>
          <Boton ancho={200} onClick={() => actualizarConfiguracion('partido')}>Partido</Boton>
          <BotonCerrarSesion ancho={200} onClick={() => limpiarAutenticacion()}>Cerrar sesión</BotonCerrarSesion>
        </ContenedorBotonesPantallas>
      </TableroPantallas>

      <TableroPartido>
        <TituloGrande>PARTIDO ACTUAL</TituloGrande>
        <Tablero>
          <FilaEquipo>
            <>
              <Titulo>Equipo 1:</Titulo>
              <Select
                value={partidoActual?.equipoLocal?.id > 0 ? partidoActual.equipoLocal.id : idEquipoLocal}
                onChange={(evt: any) => actualizarPartido({ idEquipoLocal: evt?.target?.value || 1 })}
              >
                {equipos?.map(equipo => <option key={equipo.id} value={equipo.id}>{`${equipo.nombreJugador1}`}</option>)}
              </Select>
            </>
            <>
              <Titulo>Equipo 2:</Titulo>
              <Select
                value={partidoActual?.equipoVisitante?.id > 0 ? partidoActual.equipoVisitante.id : idEquipoVisitante}
                onChange={(evt: any) => actualizarPartido({ idEquipoVisitante: evt?.target?.value || 1 })}
              >
                {equipos?.map(equipo => <option key={equipo.id} value={equipo.id}>{`${equipo.nombreJugador1}`}</option>)}
              </Select>
            </>
          </FilaEquipo>
          <FilaGoles
            titulo='Goles:'
            valorGolesEquipoLocal={partidoActual?.golesEquipoLocal || 0}
            valorGolesEquipoVisitante={partidoActual?.golesEquipoVisitante || 0}
          />
          <Fila>
            <Titulo>Cuarto:</Titulo>
            <Select value={partidoActual.numeroTiempo} onChange={(evt: any) => actualizarPartido({ numeroTiempo: evt?.target?.value || 1 })}>
              <option key={1} value={1}>1</option>
              <option key={2} value={2}>2</option>
              <option key={3} value={3}>3</option>
              <option key={4} value={4}>4</option>
            </Select>
          </Fila>
          <Fila>
            {partidoActual.id < 0 && <Boton ancho={200} onClick={() => crearPartido()}>Comenzar</Boton>}
            {partidoActual.id > 0 && <Boton ancho={200} onClick={() => actualizarPartido({ activo: 0 })}>Terminar</Boton>}
            <Boton ancho={130} onClick={() => actualizarPartido(
              {
                golesEquipoLocal: 0,
                golesEquipoVisitante: 0,
                numeroTiempo: 1,
              }
            )}>Reiniciar</Boton>
            {partidoActual.id > 0 && 
              <Boton ancho={130} onClick={() => borrarPartido()}>Cancelar</Boton>
            }
          </Fila>
        </Tablero>
      </TableroPartido>

      <ContenedorGrupos>
        <TituloGrande>TORNEO</TituloGrande>
        {/*
        <TableroGrupos>
          {grupos.map((grupo: string) =>
            <Grupo key={grupo}>
              <Encabezado>
                <NumeroGrupo>{`Grupo ${grupo}`}</NumeroGrupo>
                <PosicionPartidosEnc>Pos</PosicionPartidosEnc>
                <PosicionPartidosEnc>PJ</PosicionPartidosEnc>
                <PosicionPartidosEnc>PG</PosicionPartidosEnc>
                <PosicionPartidosEnc>Dif sets</PosicionPartidosEnc>
                <PosicionPartidosEnc>Dif games</PosicionPartidosEnc>
              </Encabezado>
              { equipos
                .filter((equipo: Equipo) => equipo.idGrupo === grupo)
                .map((equipo: Equipo) => (
                  <EquipoConEstilo key={equipo.id}>
                    <Jugadores>
                      <div>{equipo.nombreJugador1}</div>
                      <div>{equipo.nombreJugador2}</div>
                    </Jugadores>
                    <PosicionPartidos>
                      <SetInput
                        ancho={40}
                        value={equipo.posicion || ''}
                        onChange={async (evt) => {
                          if (isNaN(Number(evt?.target?.value))) return
                          const equiposActualizados = await ActualizarEquipo(equipo.id, { posicion: parseInt(evt?.target?.value) }, token, limpiarAutenticacion)
                          if(equiposActualizados) setEquipos(equiposActualizados)
                        }}
                      >
                      </SetInput>
                    </PosicionPartidos>
                    <PosicionPartidos>
                      <SetInput
                        ancho={40}
                        value={equipo.partidosJugados || ''}
                        onChange={async (evt) => {
                          if (isNaN(Number(evt?.target?.value))) return
                          const equiposActualizados = await ActualizarEquipo(equipo.id, { partidosJugados: parseInt(evt?.target?.value) }, token, limpiarAutenticacion)
                          if(equiposActualizados) setEquipos(equiposActualizados)
                        }}
                      >
                      </SetInput>
                    </PosicionPartidos>
                    <PosicionPartidos>
                      <SetInput
                        ancho={40}
                        value={equipo.partidosGanados || ''}
                        onChange={async (evt) => {
                          if (isNaN(Number(evt?.target?.value))) return
                          const equiposActualizados = await ActualizarEquipo(equipo.id, { partidosGanados: parseInt(evt?.target?.value) }, token, limpiarAutenticacion)
                          if(equiposActualizados) setEquipos(equiposActualizados)
                        }}
                      >
                      </SetInput>
                    </PosicionPartidos>
                    <PosicionPartidos>
                      <SetInput
                        ancho={40}
                        value={equipo.diferenciaSets || ''}
                        onChange={async (evt) => cargarSetGame(evt, 'diferenciaSets', equipo.id)}
                      >
                      </SetInput>
                    </PosicionPartidos>
                    <PosicionPartidos>
                      <SetInput
                        ancho={40}
                        value={equipo.diferenciaGames || ''}
                        onChange={async (evt) => cargarSetGame(evt, 'diferenciaGames', equipo.id)}
                      >
                      </SetInput>
                    </PosicionPartidos>
                  </EquipoConEstilo>
                ))
              }
            </Grupo>
          )}
        </TableroGrupos>
        */}
      </ContenedorGrupos>
    </div>
  )
}

export default TableroComandos
