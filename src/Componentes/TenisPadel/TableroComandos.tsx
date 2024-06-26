import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
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
  EquipoCuadro,
  ContenedorCuadro,
  TableroCuadro,
  ColumnaCuadroFinal,
} from '../../Estilos/Comunes'
import { ActualizarConfiguracion } from '../../Servicios/Configuracion'
import { ActualizarCuadroFinalParaUsuarioLogueado, ObtenerCuadroFinalParaUsuarioLogueado } from '../../Servicios/CuadroFinal'
import { ActualizarEquipo, ObtenerEquiposParaUsuarioLogueado } from '../../Servicios/Equipo'
import {
  ActualizarGame,
  ActualizarPartidoTenisPadelActual,
  BorrarPartidoTenisPadelActual,
  CrearPartidoTenisPadelActual,
  ObtenerPartidosTenisPadelActualesParaUsuario
} from '../../Servicios/PartidoTenisPadel'
import { CuadroFinal, CuadroFinalPayload, Equipo, EquipoPayload, PANTALLA_MOSTRAR, PantallaMostrar, PartidoTenisPadel, PartidoTenisPadelPayload } from '../../Tipos'

const PARTIDO_ACTUAL_INICIAL: PartidoTenisPadel = {
  id: -1,
  equipo1: {
    id: 0,
    nombreJugador1: 'Jugador/a 1',
    nombreJugador2: 'Jugador/a 2',
  },
  equipo2: {
    id: 0,
    nombreJugador1: 'Jugador/a 1',
    nombreJugador2: 'Jugador/a 2',
  },
  equipo1Game: 0,
  equipo2Game: 0,
  equipo1Set1: 0,
  equipo1Set2: 0,
  equipo1Set3: 0,
  equipo2Set1: 0,
  equipo2Set2: 0,
  equipo2Set3: 0,
  setActual: 1,
  tipoSet: 'set',
  sacaEquipo1: true,
  tipoGame: 'game',
  activo: true,
}

const TableroComandos = () => {
  const [partidosActuales, setPartidosActuales] = useState<PartidoTenisPadel[]>([PARTIDO_ACTUAL_INICIAL])
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [grupos, setGrupos] = useState<string[]>([])
  const [cuadroFinal, setCuadroFinal] = useState<CuadroFinal>()
  const [idEquipo1, setIdEquipo1] = useState<number>(-1)
  const [idEquipo2, setIdEquipo2] = useState<number>(-1)

  const { token, limpiarAutenticacion } = useContextoGlobal()

  useEffect(() => {
    const obtenerDatos = async () => {
      // PARTIDO ACTUAL
      const partidosActualesDB = await ObtenerPartidosTenisPadelActualesParaUsuario(token)
      if (partidosActualesDB?.length) {
        const partidos = partidosActualesDB.map(partidoActualDB => (
          {
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
          }
        ))
        setPartidosActuales(partidos)
      }

      // EQUIPOS
      const equiposBD = await ObtenerEquiposParaUsuarioLogueado(token)
      if (equiposBD) {
        setEquipos(equiposBD)
      }

      // GRUPOS
      if (equiposBD?.length) {
        setEquipos(equiposBD)
        let gruposDB: string[] = []
        for (let i = 0; i < equiposBD.length; i++) {
          const idGrupo = equiposBD[i].idGrupo ?? '?'
          if (idGrupo !== '?' && !gruposDB.includes(idGrupo)) gruposDB.push(idGrupo)
        }
        setGrupos(gruposDB)
      }

      // CUADRO FINAL
      const cuadroFinal = await ObtenerCuadroFinalParaUsuarioLogueado(token)
      if (cuadroFinal) {
        setCuadroFinal(cuadroFinal)
      }
    }

    obtenerDatos()
  }, [])

  const crearPartido = async (partidoActual: PartidoTenisPadel) => {
    const partidoActualesActualizados = await CrearPartidoTenisPadelActual(
      { id: partidoActual.id, idEquipo1: idEquipo1 > -1 ? idEquipo1 : equipos[0].id, idEquipo2: idEquipo2 > -1 ? idEquipo2 : equipos[0].id },
      token,
      limpiarAutenticacion
    )
    if (partidoActualesActualizados) setPartidosActuales(partidoActualesActualizados)
  }

  const actualizarGame = async (partidoActual: PartidoTenisPadel, suma = true, esEquipo1 = true) => {
    if (!partidoActual?.id || partidoActual.id <= 0) {
      return
    }
    const partidoActualesActualizados = await ActualizarGame({ id: partidoActual.id, suma, esEquipo1 }, token, limpiarAutenticacion)
    if (partidoActualesActualizados) setPartidosActuales(partidoActualesActualizados)
  }

  const actualizarPartido = async (partidoActual: PartidoTenisPadel, payload: PartidoTenisPadelPayload) => {
    if (!partidoActual?.id || partidoActual.id <= 0) {
      const { idEquipo1, idEquipo2 } = payload
      if (idEquipo1) setIdEquipo1(idEquipo1)
      if (idEquipo2) setIdEquipo2(idEquipo2)
      return
    }

    const partidoActualesActualizados = await ActualizarPartidoTenisPadelActual({ id: partidoActual.id, ...payload }, token, limpiarAutenticacion)
    setPartidosActuales(partidoActualesActualizados ?? [PARTIDO_ACTUAL_INICIAL])
  }

  const borrarPartido = async (partidoActual: PartidoTenisPadel) => {
    if (!partidoActual?.id || partidoActual.id <= 0) return

    const partidoActualesActualizados = await BorrarPartidoTenisPadelActual(partidoActual.id, token, limpiarAutenticacion)
    setPartidosActuales(partidoActualesActualizados ?? [PARTIDO_ACTUAL_INICIAL])
  }

  const actualizarCuadroFinal = async (payload: CuadroFinalPayload) => {
    const cuadroFinalActualizado = await ActualizarCuadroFinalParaUsuarioLogueado(payload, token, limpiarAutenticacion)
    if (cuadroFinalActualizado) setCuadroFinal(cuadroFinalActualizado)
  }

  const FilaSet = (
    {partidoActual, titulo, campoEquipo1, valorSetEquipo1, campoEquipo2, valorSetEquipo2}
      : {partidoActual: PartidoTenisPadel, titulo: string, campoEquipo1: string, valorSetEquipo1: number, campoEquipo2: string, valorSetEquipo2: number}
  ) => (
    <Fila>
      <Titulo>{titulo}</Titulo>
      <Set>
        <SetInput readOnly value={valorSetEquipo1 || 0}></SetInput>
        <ContenedorBotones>
          <Boton
            onClick={() => actualizarPartido(partidoActual, {
              [campoEquipo1]: (valorSetEquipo1 || 0) + 1
            })}
          >
            +
          </Boton>
          <Boton
            onClick={() => actualizarPartido(partidoActual, {
              [campoEquipo1]: (valorSetEquipo1 || 0) - 1
            })}
          >
            -
          </Boton>
        </ContenedorBotones>
      </Set>
      <Set>
        <SetInput readOnly value={valorSetEquipo2 || 0}></SetInput>
        <ContenedorBotones>
          <Boton
            onClick={() => actualizarPartido(partidoActual, {
              [campoEquipo2]: (valorSetEquipo2 || 0) + 1
            })}
          >
            +
          </Boton>
          <Boton
            onClick={() => actualizarPartido(partidoActual, {
              [campoEquipo2]: (valorSetEquipo2 || 0) - 1
            })}
          >
            -
          </Boton>
        </ContenedorBotones>
      </Set>
    </Fila>
  )

  const FilaGame = ({partidoActual, titulo, valorGameEquipo1, valorGameEquipo2}
    : {partidoActual: PartidoTenisPadel ,titulo: string, valorGameEquipo1: number, valorGameEquipo2: number}
  ) => (
    <Fila>
      <Titulo>{titulo}</Titulo>
      <Set>
        <SetInput
          readOnly
          value={
          valorGameEquipo1
            ? valorGameEquipo1 === 50
              ? 'V'
              : valorGameEquipo1
            : 0
          }
        ></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarGame(partidoActual, true, true)}>+</Boton>
          <Boton onClick={() => actualizarGame(partidoActual, false, true)}>-</Boton>
        </ContenedorBotones>
      </Set>
      <Set>
        <SetInput
          readOnly
          value={
            valorGameEquipo2
              ? valorGameEquipo2 === 50
                ? 'V'
                : valorGameEquipo2
              : 0
          }
        ></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarGame(partidoActual, true, false)}>+</Boton>
          <Boton onClick={() => actualizarGame(partidoActual, false, false)}>-</Boton>
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

  const cargarSetGame = async (evt: any, campo: 'diferenciaSets' | 'diferenciaGames', idEquipoFila: number) => {
    const valor = evt?.target?.value
    if (isNaN(Number(valor)) && valor !== '-') return

    let equiposActualizados = null
    if (valor === '-') {
      equiposActualizados = equipos?.map(eq => {
        if (eq.id === idEquipoFila) {
          eq[campo] = '-'
        }
        return eq
      })
    } else {
      equiposActualizados = await ActualizarEquipo(idEquipoFila, { [campo]: parseInt(valor) }, token, limpiarAutenticacion)
    }
    if(equiposActualizados) setEquipos(equiposActualizados)
  }

  const actualizarConfiguracion = (pantalla: PantallaMostrar) => {
    ActualizarConfiguracion({ pantallaMostrar: pantalla }, token, limpiarAutenticacion)
  }

  const actualizarEquipo = async (idEquipo: number, payload: EquipoPayload) => {
    const equiposActualizados = await ActualizarEquipo(idEquipo, payload, token, limpiarAutenticacion)
    if(equiposActualizados) setEquipos(equiposActualizados)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableroPantallas>
        <ContenedorBotonesPantallas>
          <Boton
            ancho={150} 
            onClick={() => actualizarConfiguracion(PANTALLA_MOSTRAR.grupo)}>Grupos</Boton>
          <Boton ancho={200} onClick={() => actualizarConfiguracion(PANTALLA_MOSTRAR.partido)}>Partido</Boton>
          <Boton ancho={200} onClick={() => actualizarConfiguracion(PANTALLA_MOSTRAR.cuadro)}>Cuadro</Boton>
        </ContenedorBotonesPantallas>
        <BotonCerrarSesion ancho={200} onClick={() => limpiarAutenticacion()}>Cerrar sesión</BotonCerrarSesion>
      </TableroPantallas>

      <TableroPartido>
        <TituloGrande>
          PARTIDOS ACTUALES
          <Boton 
            ancho={300}
            onClick={() => setPartidosActuales(prevState => [...prevState, PARTIDO_ACTUAL_INICIAL])}
          >
            Agregar Partido
          </Boton>
        </TituloGrande>
        {
          partidosActuales?.map(partidoActual => (
            <Tablero key={partidoActual.id}>
              <FilaEquipo>
                <>
                  <Titulo>Equipo 1:</Titulo>
                  <Select
                    value={partidoActual?.equipo1?.id > 0 ? partidoActual.equipo1.id : idEquipo1}
                    onChange={(evt: any) => actualizarPartido(partidoActual, { idEquipo1: evt?.target?.value || 1 })}
                  >
                    {equipos?.map(equipo => <option key={equipo.id} value={equipo.id}>{`${equipo.nombreJugador1} - ${equipo.nombreJugador2}`}</option>)}
                  </Select>
                </>
                <>
                  <Titulo>Equipo 2:</Titulo>
                  <Select
                    value={partidoActual?.equipo2?.id > 0 ? partidoActual.equipo2.id : idEquipo2}
                    onChange={(evt: any) => actualizarPartido(partidoActual, { idEquipo2: evt?.target?.value || 1 })}
                  >
                    {equipos?.map(equipo => <option key={equipo.id} value={equipo.id}>{`${equipo.nombreJugador1} - ${equipo.nombreJugador2}`}</option>)}
                  </Select>
                </>
              </FilaEquipo>
              <FilaGame
                partidoActual={partidoActual}
                titulo='Game:'
                valorGameEquipo1={partidoActual?.equipo1Game || 0}
                valorGameEquipo2={partidoActual?.equipo2Game || 0}
              />
              <FilaSet
                partidoActual={partidoActual}
                titulo='Set 1:'
                campoEquipo1='equipo1Set1'
                valorSetEquipo1={partidoActual?.equipo1Set1 || 0}
                campoEquipo2='equipo2Set1'
                valorSetEquipo2={partidoActual?.equipo2Set1 || 0}
              />
              <FilaSet
                partidoActual={partidoActual}
                titulo='Set 2:'
                campoEquipo1='equipo1Set2'
                valorSetEquipo1={partidoActual?.equipo1Set2 || 0}
                campoEquipo2='equipo2Set2'
                valorSetEquipo2={partidoActual?.equipo2Set2 || 0}
              />
              <FilaSet
                partidoActual={partidoActual}
                titulo='Set 3:'
                campoEquipo1='equipo1Set3'
                valorSetEquipo1={partidoActual?.equipo1Set3 || 0}
                campoEquipo2='equipo2Set3'
                valorSetEquipo2={partidoActual?.equipo2Set3 || 0}
              />
              <Fila>
                <div style={{ width: '50%' }}>
                  <Titulo>Tipo set:</Titulo>
                  <Select
                    value={partidoActual?.tipoSet || 'set'}
                    onChange={(evt: any) => actualizarPartido(partidoActual, { tipoSet: evt?.target?.value || 'set' })}
                  >
                    <option value={'set'}>Set</option>
                    <option value={'tie-break'}>Tie break</option>
                  </Select>
                </div>
                <div style={{ width: '50%' }}>
                  <Titulo>Set actual:</Titulo>
                  <Select
                    value={partidoActual?.setActual || 1}
                    onChange={(evt: any) => actualizarPartido(partidoActual, { setActual: evt?.target?.value || 1 })}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Select>
                </div>
              </Fila>
              <Fila>
                <div style={{ width: '50%' }}>
                  <Titulo>Tipo game:</Titulo>
                  <Select
                    value={partidoActual?.tipoGame || 'game'}
                    onChange={(evt: any) => actualizarPartido(partidoActual,
                    {
                      tipoGame: evt?.target?.value || 'game',
                      equipo1Game: 0,
                      equipo2Game: 0,
                    })}
                  >
                    <option value={'game'}>Game</option>
                    <option value={'tie-break'}>Tie break</option>
                  </Select>
                </div>
                <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                  <Titulo>Saca equipo:</Titulo>
                  <Boton
                    onClick={(evt: any) => actualizarPartido(partidoActual, { sacaEquipo1: partidoActual.sacaEquipo1 ? !partidoActual.sacaEquipo1 : true })}
                  >
                    {!partidoActual.sacaEquipo1 ? '1' : '2'}
                  </Boton>
                </div>
              </Fila>
              <Fila>
                {partidoActual.id < 0 && <Boton ancho={200} onClick={() => crearPartido(partidoActual)}>Comenzar</Boton>}
                {partidoActual.id > 0 && <Boton ancho={200} onClick={() => actualizarPartido(partidoActual, { activo: 0 })}>Terminar</Boton>}
                <Boton ancho={130} onClick={() => actualizarPartido(partidoActual,
                  {
                    equipo1Game: 0,
                    equipo2Game: 0,
                    equipo1Set1: 0,
                    equipo1Set2: 0,
                    equipo1Set3: 0,
                    equipo2Set1: 0,
                    equipo2Set2: 0,
                    equipo2Set3: 0,
                    setActual: 1,
                    tipoSet: 'set',
                  }
                )}>Reiniciar</Boton>
                {partidoActual.id > 0 && 
                  <Boton ancho={130} onClick={() => borrarPartido(partidoActual)}>Cancelar</Boton>
                }
              </Fila>
            </Tablero>
          ))
        }
      </TableroPartido>

      <ContenedorGrupos>
        <TituloGrande>GRUPOS</TituloGrande>
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
                          await actualizarEquipo(equipo.id, { posicion: parseInt(evt?.target?.value) })
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
                          await actualizarEquipo(equipo.id, { partidosJugados: parseInt(evt?.target?.value) })
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
                          await actualizarEquipo(equipo.id, { partidosGanados: parseInt(evt?.target?.value) })
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

const TableroGrupos = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    margin: 50px 0;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 600px) {
    margin: 15px 0;
    flex-direction: column;
    align-items: center;
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
    width: 85%;
    border: 1px solid #fff;
  }

  @media (max-width: 600px) {
    width: 95%;
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
  text-align: center;
  width: 35%;
  height: 70px;
  font-size: 25px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

const PosicionPartidosEnc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 15%;
  color: #fff;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const PosicionPartidos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`

const EquipoConEstilo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  color: #000;
  height: 25%;

  background-color: #fff;
  ${PosicionPartidos} {
    border-left: 1px solid #ddd;
  }

  :nth-child(even) {
    background-color: #ddd;
    ${PosicionPartidos} {
      border-left: 1px solid #fff;
    }
  }
`

const Jugadores = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(35% - 10px);
  padding: 10px 5px;
  font-weight: bold;
`

export default TableroComandos
