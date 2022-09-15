import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ObtenerEquipos } from '../Servicios/Equipo'
import { ActualizarGame, ActualizarPartidoActual, ObtenerPartidoActual } from '../Servicios/PartidoActual'
import { Equipo, PartidoActual, PartidoActualPayload } from '../Tipos'

const PARTIDO_ACTUAL_INICIAL: PartidoActual = {
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
  tipoGame: 'game'
}

const TableroComandos = () => {
  const [partidoActual, setPartidoActual] = useState<PartidoActual>(PARTIDO_ACTUAL_INICIAL)
  const [equipos, setEquipos] = useState<Equipo[]>([])

  useEffect(() => {
    const obtenerDatos = async () => {
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
      }

      const equiposBD = await ObtenerEquipos()
      if (equiposBD) {
        setEquipos(equiposBD)
      }
    }

    obtenerDatos()
  }, [])

  const actualizarGame = async (suma = true, esEquipo1 = true) => {
    const partidoActualActualizado = await ActualizarGame({ suma, esEquipo1 })
    if (partidoActualActualizado) setPartidoActual(partidoActualActualizado)
  }

  const actualizarPartido = async (payload: PartidoActualPayload) => {
    const partidoActualActualizado = await ActualizarPartidoActual(payload)
    if (partidoActualActualizado) setPartidoActual(partidoActualActualizado)
  }

  const FilaSet = (
    {titulo, campoEquipo1, valorSetEquipo1, campoEquipo2, valorSetEquipo2}
      : {titulo: string, campoEquipo1: string, valorSetEquipo1: number, campoEquipo2: string, valorSetEquipo2: number}
  ) => (
    <Fila>
      <Titulo>{titulo}</Titulo>
      <Set>
        <SetInput value={valorSetEquipo1 || 0}></SetInput>
        <ContenedorBotones>
          <Boton
            onClick={() => actualizarPartido({
              [campoEquipo1]: (valorSetEquipo1 || 0) + 1
            })}
          >
            +
          </Boton>
          <Boton
            onClick={() => actualizarPartido({
              [campoEquipo1]: (valorSetEquipo1 || 0) - 1
            })}
          >
            -
          </Boton>
        </ContenedorBotones>
      </Set>
      <Set>
        <SetInput value={valorSetEquipo2 || 0}></SetInput>
        <ContenedorBotones>
          <Boton
            onClick={() => actualizarPartido({
              [campoEquipo2]: (valorSetEquipo2 || 0) + 1
            })}
          >
            +
          </Boton>
          <Boton
            onClick={() => actualizarPartido({
              [campoEquipo2]: (valorSetEquipo2 || 0) - 1
            })}
          >
            -
          </Boton>
        </ContenedorBotones>
      </Set>
    </Fila>
  )

  const FilaGame = ({titulo, valorGameEquipo1, valorGameEquipo2}
    : {titulo: string, valorGameEquipo1: number, valorGameEquipo2: number}
  ) => (
    <Fila>
      <Titulo>{titulo}</Titulo>
      <Set>
        <SetInput value={
          valorGameEquipo1
            ? valorGameEquipo1 === 50
              ? 'V'
              : valorGameEquipo1
            : 0
          }
        ></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarGame(true, true)}>+</Boton>
          <Boton onClick={() => actualizarGame(false, true)}>-</Boton>
        </ContenedorBotones>
      </Set>
      <Set>
        <SetInput value={
          valorGameEquipo2
            ? valorGameEquipo2 === 50
              ? 'V'
              : valorGameEquipo2
            : 0
          }
        ></SetInput>
        <ContenedorBotones>
          <Boton onClick={() => actualizarGame(true, false)}>+</Boton>
          <Boton onClick={() => actualizarGame(false, false)}>-</Boton>
        </ContenedorBotones>
      </Set>
    </Fila>
  )

  return (
    <Tablero>
      <FilaEquipo>
        <>
          <Titulo>Equipo 1:</Titulo>
          <Select
            value={partidoActual?.equipo1?.id}
            onChange={(evt: any) => actualizarPartido({ idEquipo1: evt?.target?.value || 1 })}
          >
            {equipos?.map(equipo => <option value={equipo.id}>{`${equipo.nombreJugador1} - ${equipo.nombreJugador2}`}</option>)}
          </Select>
        </>
        <>
          <Titulo>Equipo 2:</Titulo>
          <Select
            value={partidoActual?.equipo2?.id}
            onChange={(evt: any) => actualizarPartido({ idEquipo2: evt?.target?.value || 1 })}
          >
            {equipos?.map(equipo => <option value={equipo.id}>{`${equipo.nombreJugador1} - ${equipo.nombreJugador2}`}</option>)}
          </Select>
        </>
      </FilaEquipo>
      <FilaGame
        titulo='Game:'
        valorGameEquipo1={partidoActual?.equipo1Game || 0}
        valorGameEquipo2={partidoActual?.equipo2Game || 0}
      />
      <FilaSet
        titulo='Set 1:'
        campoEquipo1='equipo1Set1'
        valorSetEquipo1={partidoActual?.equipo1Set1 || 0}
        campoEquipo2='equipo2Set1'
        valorSetEquipo2={partidoActual?.equipo2Set1 || 0}
      />
      <FilaSet
        titulo='Set 2:'
        campoEquipo1='equipo1Set2'
        valorSetEquipo1={partidoActual?.equipo1Set2 || 0}
        campoEquipo2='equipo2Set2'
        valorSetEquipo2={partidoActual?.equipo2Set2 || 0}
      />
      <FilaSet
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
            onChange={(evt: any) => actualizarPartido({ tipoSet: evt?.target?.value || 'set' })}
          >
            <option value={'set'}>Set</option>
            <option value={'tie-break'}>Tie break</option>
          </Select>
        </div>
        <div style={{ width: '50%' }}>
          <Titulo>Set actual:</Titulo>
          <Select
            value={partidoActual?.setActual || 1}
            onChange={(evt: any) => actualizarPartido({ setActual: evt?.target?.value || 1 })}
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
            onChange={(evt: any) => actualizarPartido({
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
            onClick={(evt: any) => actualizarPartido({ sacaEquipo1: partidoActual.sacaEquipo1 ? !partidoActual.sacaEquipo1 : true })}
          >
            {!partidoActual.sacaEquipo1 ? '1' : '2'}
          </Boton>
        </div>
      </Fila>
      <Fila>
        <Boton ancho={130} onClick={() => actualizarPartido(
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
      </Fila>
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
  width: 100%;
`

const FilaEquipo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #fff;
`

const Select = styled.select`
  height: 60px;
  min-width: 60px;
  font-size: 16px;
  background-color: #fff;
`

const Fila = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  border: 1px solid #fff;
`

const Titulo = styled.span`
  color: #fff;
  font-size: 14px;
  margin-right: 5px;
`

const Set = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #215d43;
  font-weight: bold;
  font-family: system-ui;
  font-size: 50px;
  line-height: 90px;
  margin: 10px;
`

const SetInput = styled.input`
  width: 60px;
  line-height: 30px;
  background-color: #fff;
  text-align: center;
`

const ContenedorBotones = styled.div`
  display: flex;
`

const Boton = styled.div<{ ancho?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: system-ui;
  font-size: 30px;
  ${prop => `width: ${prop.ancho ? prop.ancho : 60}`}px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  border: 1px solid #fff;
`

export default TableroComandos
