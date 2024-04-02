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
  EncabezadoTorneo,
  ClubEncabezado,
  DatoEquipoEncabezado,
  FilaEquipoTorneo,
  EquipoConEstilo,
  DatoEquipo,
  NombreClub,
  ContenedorTorneo,
  ContenedorCuadro,
  TableroCuadro,
  ColumnaCuadroFinal,
  EquipoCuadro,
} from '../../Estilos/Comunes'
import { ActualizarConfiguracion } from '../../Servicios/Configuracion'
import { ActualizarCuadroFinalParaUsuarioLogueado, ObtenerCuadroFinalParaUsuarioLogueado } from '../../Servicios/CuadroFinal'
import { ActualizarEquipo, ObtenerEquiposParaUsuarioLogueado } from '../../Servicios/Equipo'
import { CrearPartidoFutbolActual, ActualizarPartidoFutbolActual, BorrarPartidoFutbolActual, ObtenerPartidoFutbolActualParaUsuario } from '../../Servicios/PartidoFutbol'
import { CuadroFinal, CuadroFinalPayload, Equipo, EquipoPayload, PANTALLA_MOSTRAR, PantallaMostrar, PartidoFutbol, PartidoFutbolPayload } from '../../Tipos'

const PARTIDO_ACTUAL_INICIAL: PartidoFutbol = {
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
  numeroTiempo: 1,
  idTorneoDisciplinaClub: -1,
  activo: true,
}

const TableroComandos = () => {
  const [partidoActual, setPartidoActual] = useState<PartidoFutbol>(PARTIDO_ACTUAL_INICIAL)
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [cuadroFinal, setCuadroFinal] = useState<CuadroFinal>()
  const [idEquipoLocal, setIdEquipoLocal] = useState<number>(-1)
  const [idEquipoVisitante, setIdEquipoVisitante] = useState<number>(-1)

  const { token, limpiarAutenticacion } = useContextoGlobal()

  useEffect(() => {
    const obtenerDatos = async () => {
      // PARTIDO ACTUAL
      const partidoFutbolDB = await ObtenerPartidoFutbolActualParaUsuario(token)
      if (partidoFutbolDB) {
        setPartidoActual({
          ...partidoFutbolDB,
          golesEquipoLocal: partidoFutbolDB.golesEquipoLocal ?? 0,
          golesEquipoVisitante: partidoFutbolDB.golesEquipoVisitante ?? 0,
          numeroTiempo: partidoFutbolDB.numeroTiempo ?? 1,
          idTorneoDisciplinaClub: partidoFutbolDB.idTorneoDisciplinaClub ?? -1,
        })
      }

      // EQUIPOS
      const equiposBD = await ObtenerEquiposParaUsuarioLogueado(token)
      if (equiposBD) {
        setEquipos(equiposBD)
      }

      // CUADRO FINAL
      const cuadroFinal = await ObtenerCuadroFinalParaUsuarioLogueado(token)
      if (cuadroFinal) {
        setCuadroFinal(cuadroFinal)
      }
    }

    obtenerDatos()
  }, [])

  const crearPartido = async () => {
    const partidoActualActualizado = await CrearPartidoFutbolActual(
      {
        id: partidoActual.id,
        idEquipoLocal: idEquipoLocal > -1 ? idEquipoLocal : equipos[0].id,
        idEquipoVisitante: idEquipoVisitante > -1 ? idEquipoVisitante : equipos[0].id,
        inicioPrimerTiempo: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      token,
      limpiarAutenticacion
    )
    if (partidoActualActualizado) setPartidoActual(partidoActualActualizado)
  }

  const actualizarPartido = async (payload: PartidoFutbolPayload) => {
    if (!partidoActual?.id || partidoActual.id <= 0) {
      const { idEquipoLocal, idEquipoVisitante } = payload
      if (idEquipoLocal) setIdEquipoLocal(idEquipoLocal)
      if (idEquipoVisitante) setIdEquipoVisitante(idEquipoVisitante)
      return
    }

    const partidoActualActualizado = await ActualizarPartidoFutbolActual(
      { id: partidoActual.id, ...payload },
      token,
      limpiarAutenticacion
    )
    setPartidoActual(partidoActualActualizado ?? PARTIDO_ACTUAL_INICIAL)
  }

  const borrarPartido = async () => {
    if (!partidoActual?.id || partidoActual.id <= 0) return

    const partidoActualActualizado = await BorrarPartidoFutbolActual(partidoActual.id, token, limpiarAutenticacion)
    setPartidoActual(partidoActualActualizado ?? PARTIDO_ACTUAL_INICIAL)
  }

  const actualizarConfiguracion = (pantalla: PantallaMostrar) => {
    ActualizarConfiguracion({ pantallaMostrar: pantalla }, token, limpiarAutenticacion)
  }

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

  const actualizarEquipo = async (idEquipo: number, payload: EquipoPayload) => {
    const equiposActualizados = await ActualizarEquipo(idEquipo, payload, token, limpiarAutenticacion)
    if(equiposActualizados) setEquipos(equiposActualizados)
  }

  const actualizarCuadroFinal = async (payload: CuadroFinalPayload) => {
    const cuadroFinalActualizado = await ActualizarCuadroFinalParaUsuarioLogueado(payload, token, limpiarAutenticacion)
    if (cuadroFinalActualizado) setCuadroFinal(cuadroFinalActualizado)
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

  const EquipoCuadroFinal = ({ equipoInstanciaEtiqueta, idEquipoInstancia, alto }
    : {equipoInstanciaEtiqueta: string, idEquipoInstancia: number | undefined, alto?: number}) => (
    <EquipoCuadro alto={alto}>
      <Select
        value={idEquipoInstancia}
        onChange={(evt: any) => actualizarCuadroFinal({ [equipoInstanciaEtiqueta]: evt?.target?.value !== '-1' ? evt?.target?.value : null })}
      >
        <option value={-1}>Vacante</option>
        {equipos?.map(equipo => <option key={equipo.id} value={equipo.id}>{`${equipo.nombreJugador1} - ${equipo.nombreJugador2}`}</option>)}
      </Select>
    </EquipoCuadro>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableroPantallas>
        <ContenedorBotonesPantallas>
          <Boton
            ancho={150} 
            onClick={() => actualizarConfiguracion(PANTALLA_MOSTRAR.torneo)}>Torneo</Boton>
          <Boton ancho={200} onClick={() => actualizarConfiguracion(PANTALLA_MOSTRAR.partido)}>Partido</Boton>
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
            <Titulo>Tiempo:</Titulo>
            <Select
              value={partidoActual.numeroTiempo}
              onChange={(evt: any) => {
                let inicioTiempo
                if (parseInt(evt?.target?.value) === 2) {
                  inicioTiempo = { inicioSegundoTiempo: new Date().toISOString().slice(0, 19).replace('T', ' ') }
                }
                actualizarPartido({ numeroTiempo: evt?.target?.value || 1, ...(inicioTiempo && inicioTiempo) })
              }}
            >
              <option key={1} value={1}>1</option>
              <option key={2} value={2}>2</option>
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
        <ContenedorTorneo>
          <EncabezadoTorneo>
            <ClubEncabezado ancho={70}>Club</ClubEncabezado>
            <DatoEquipoEncabezado ancho={15}>POS</DatoEquipoEncabezado>
            <DatoEquipoEncabezado ancho={15}>PTS</DatoEquipoEncabezado>
          </EncabezadoTorneo>
          { equipos
            .sort(ordenarEquipos)
            .map((equipo: Equipo) => (
              <FilaEquipoTorneo key={equipo.id}>
                <div style={{ width: '7px' }}>&nbsp;</div>
                <EquipoConEstilo>
                  <NombreClub ancho={70}>
                    <div>{equipo.nombreJugador1}</div>
                  </NombreClub>
                  <DatoEquipo ancho={15}>
                    <SetInput
                      ancho={40}
                      value={equipo.posicion || ''}
                      onChange={async (evt) => {
                        if (isNaN(Number(evt?.target?.value))) return
                        actualizarEquipo(equipo.id, { posicion: parseInt(evt?.target?.value) || 0 })
                      }}
                    >
                    </SetInput>
                  </DatoEquipo>
                  <DatoEquipo ancho={15}>
                  <SetInput
                      ancho={40}
                      value={equipo.puntos || ''}
                      onChange={async (evt) => {
                        if (isNaN(Number(evt?.target?.value))) return
                        actualizarEquipo(equipo.id, { puntos: parseInt(evt?.target?.value) || 0 })
                      }}
                    >
                    </SetInput>
                  </DatoEquipo>
                </EquipoConEstilo>
                <div style={{ width: '7px' }}>&nbsp;</div>
              </FilaEquipoTorneo>
            ))
          }
        </ContenedorTorneo>
      </ContenedorGrupos>

      <ContenedorCuadro>
        <TituloGrande>CUADRO FINAL</TituloGrande>
        <TableroCuadro>
          <ColumnaCuadroFinal>
            <>Cuartos</>
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosABEquipo1' idEquipoInstancia={cuadroFinal?.cuartosABEquipo1?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosABEquipo2' idEquipoInstancia={cuadroFinal?.cuartosABEquipo2?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosCDEquipo1' idEquipoInstancia={cuadroFinal?.cuartosCDEquipo1?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosCDEquipo2' idEquipoInstancia={cuadroFinal?.cuartosCDEquipo2?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosEFEquipo1' idEquipoInstancia={cuadroFinal?.cuartosEFEquipo1?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosEFEquipo2' idEquipoInstancia={cuadroFinal?.cuartosEFEquipo2?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosGHEquipo1' idEquipoInstancia={cuadroFinal?.cuartosGHEquipo1?.id} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='cuartosGHEquipo2' idEquipoInstancia={cuadroFinal?.cuartosGHEquipo2?.id} />
          </ColumnaCuadroFinal>
          <ColumnaCuadroFinal>
            <>Semis</>
            <EquipoCuadroFinal equipoInstanciaEtiqueta='semifinal1Equipo1' idEquipoInstancia={cuadroFinal?.semifinal1Equipo1?.id} alto={122} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='semifinal1Equipo2' idEquipoInstancia={cuadroFinal?.semifinal1Equipo2?.id} alto={122} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='semifinal2Equipo1' idEquipoInstancia={cuadroFinal?.semifinal2Equipo1?.id} alto={122} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='semifinal2Equipo2' idEquipoInstancia={cuadroFinal?.semifinal2Equipo2?.id} alto={122} />
          </ColumnaCuadroFinal>
          <ColumnaCuadroFinal>
            <>Final</>
            <EquipoCuadroFinal equipoInstanciaEtiqueta='finalEquipo1' idEquipoInstancia={cuadroFinal?.finalEquipo1?.id} alto={246} />
            <EquipoCuadroFinal equipoInstanciaEtiqueta='finalEquipo2' idEquipoInstancia={cuadroFinal?.finalEquipo2?.id} alto={246} />
          </ColumnaCuadroFinal>
          <ColumnaCuadroFinal>
            <>Campeón</>
            <EquipoCuadroFinal equipoInstanciaEtiqueta='campeon' idEquipoInstancia={cuadroFinal?.campeon?.id} alto={494} />
          </ColumnaCuadroFinal>
        </TableroCuadro>
      </ContenedorCuadro>
    </div>
  )
}

export default TableroComandos
