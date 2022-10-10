
export interface Equipo {
  id: number,
  nombreJugador1: string,
  nombreJugador2?: string,
  idGrupo?: string | null,
  posicion?: number | null,
  partidosJugados?: number | null,
  partidosGanados?: number | null,
  diferenciaSets?: string | null,
  diferenciaGames?: string | null,
}

export interface PartidoActual {
  id?: number,
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

export interface PartidoFutbol {
  id: number,
  equipoLocal: Equipo,
  equipoVisitante: Equipo,
  golesEquipoLocal: number,
  golesEquipoVisitante: number,
  fecha: Date,
  numeroTiempo: number,
  idTorneoDisciplinaClub: number,
}

export interface PartidoFutbolPayload {
  id?: number,
  idEquipoLocal?: number,
  idEquipoVisitante?: number,
  golesEquipoLocal?: number | null,
  golesEquipoVisitante?: number | null,
  fecha?: Date,
  numeroTiempo?: number | null,
  idTorneoDisciplinaClub?: number | null,
  activo?: number | null,
}

export interface PartidoHockey {
  id: number,
  equipoLocal: Equipo,
  equipoVisitante: Equipo,
  golesEquipoLocal: number,
  golesEquipoVisitante: number,
  fecha: Date,
  numeroTiempo: number,
  idTorneoDisciplinaClub: number,
}

export interface PartidoHockeyPayload {
  id?: number,
  idEquipoLocal?: number,
  idEquipoVisitante?: number,
  golesEquipoLocal?: number | null,
  golesEquipoVisitante?: number | null,
  fecha?: Date,
  numeroTiempo?: number | null,
  idTorneoDisciplinaClub?: number | null,
  activo?: number | null,
}

export type PantallaMostrar = 'grupo' | 'partido' | 'cuadro' | 'torneo'

export interface Configuracion {
  pantallaMostrar: PantallaMostrar,
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

export interface DisciplinaClub {
  id: number,
  idClub: number,
  nombreClub: string,
  idDisciplina: number;
  nombreDisciplina: string,
  idLocalidad: number,
  nombreLocalidad: string,
  colorPrincipal: string,
  colorSecundario: string,
  imagenEscudo: string,
}

export interface Torneo {
  iniciales?: string,
  nombreMostrar?: string,
  sponsor?: string,
  imagenSponsor?: string,
  imagenEscudo?: string,
  colorFondoSponsor?: string,
}
