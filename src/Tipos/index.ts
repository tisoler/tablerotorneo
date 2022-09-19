
export interface Equipo {
  id: number,
  nombreJugador1: string,
  nombreJugador2: string,
  idGrupo?: string | null,
  posicion?: number | null,
  partidosJugados?: number | null,
  partidosGanados?: number | null,
}

export interface PartidoActual {
  equipo1: Equipo,
  equipo2: Equipo,
  equipo1Game: number | null,
  equipo2Game: number | null,
  equipo1Set1: number | null,
  equipo1Set2: number | null,
  equipo1Set3: number | null,
  equipo2Set1: number | null,
  equipo2Set2: number | null,
  equipo2Set3: number | null,
  setActual: number | null,
  tipoSet: 'set' | 'tie-break' | null,
  sacaEquipo1: boolean | null,
  tipoGame: 'game' | 'tie-break' | null,
}

export interface PartidoActualPayload {
  idEquipo1?: number,
  idEquipo2?: number,
  equipo1Game?: number | null,
  equipo2Game?: number | null,
  equipo1Set1?: number | null,
  equipo1Set2?: number | null,
  equipo1Set3?: number | null,
  equipo2Set1?: number | null,
  equipo2Set2?: number | null,
  equipo2Set3?: number | null,
  setActual?: number | null,
  tipoSet?: 'set' | 'tie-break' | null,
  sacaEquipo1?: boolean | null,
  tipoGame?: 'game' | 'tie-break' | null,
}

export interface Configuracion {
  pantallaMostrar: string,
}

export interface CuadroFinal {
  cuartosAEquipo1: Equipo,
  cuartosAEquipo2: Equipo,
  cuartosBEquipo1: Equipo,
  cuartosBEquipo2: Equipo,
  cuartosCEquipo1: Equipo,
  cuartosCEquipo2: Equipo,
  cuartosDEquipo1: Equipo,
  cuartosDEquipo2: Equipo,
  semifinalAEquipo1: Equipo,
  semifinalAEquipo2: Equipo,
  semifinalBEquipo1: Equipo,
  semifinalBEquipo2: Equipo,
  finalEquipo1: Equipo,
  finalEquipo2: Equipo,
  campeon: Equipo,
}

export interface CuadroFinalPayload {
  cuartosAEquipo1?: number,
  cuartosAEquipo2?: number,
  cuartosBEquipo1?: number,
  cuartosBEquipo2?: number,
  cuartosCEquipo1?: number,
  cuartosCEquipo2?: number,
  cuartosDEquipo1?: number,
  cuartosDEquipo2?: number,
  semifinalAEquipo1?: number,
  semifinalAEquipo2?: number,
  semifinalBEquipo1?: number,
  semifinalBEquipo2?: number,
  finalEquipo1?: number,
  finalEquipo2?: number,
  campeon?: number,
}
