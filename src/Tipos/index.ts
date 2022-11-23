
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
  puntos?: number | null,
  imagenEscudo?: string | null,
}

export interface EquipoPayload {
  posicion?: number,
  partidosJugados?: number,
  partidosGanados?: number,
  diferenciaSets?: number,
  diferenciaGames?: number,
  puntos?: number,
}

export interface PartidoTenisPadel {
  id: number,
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
  activo: boolean,
}

export interface PartidoTenisPadelPayload {
  id?: number,
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
  activo?: number | null,
}

export interface PartidoFutbol {
  id: number,
  equipoLocal: Equipo,
  equipoVisitante: Equipo,
  golesEquipoLocal: number,
  golesEquipoVisitante: number,
  inicioPrimerTiempo?: Date,
  inicioSegundoTiempo?: Date,
  numeroTiempo: number,
  idTorneoDisciplinaClub: number,
  minutosPrimerTiempo?: number,
  minutosSegundoTiempo?: number,
  activo: boolean,
}

export interface PartidoFutbolPayload {
  id?: number,
  idEquipoLocal?: number,
  idEquipoVisitante?: number,
  golesEquipoLocal?: number | null,
  golesEquipoVisitante?: number | null,
  inicioPrimerTiempo?: string,
  inicioSegundoTiempo?: string,
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
  inicioPrimerCuarto?: Date,
  inicioSegundoCuarto?: Date,
  inicioTercerCuarto?: Date,
  inicioCuartoCuarto?: Date,
  numeroCuarto: number,
  idTorneoDisciplinaClub: number,
  minutosPrimerCuarto?: number,
  minutosSegundoCuarto?: number,
  minutosTercerCuarto?: number,
  minutosCuartoCuarto?: number,
  activo: boolean,
}

export interface PartidoHockeyPayload {
  id?: number,
  idEquipoLocal?: number,
  idEquipoVisitante?: number,
  golesEquipoLocal?: number | null,
  golesEquipoVisitante?: number | null,
  inicioPrimerCuarto?: string,
  inicioSegundoCuarto?: string,
  inicioTercerCuarto?: string,
  inicioCuartoCuarto?: string,
  numeroCuarto?: number | null,
  idTorneoDisciplinaClub?: number | null,
  activo?: number | null,
}

export type PantallaMostrar = 'grupo' | 'partido' | 'partidosJugados' | 'cuadro' | 'torneo'

export interface Configuracion {
  pantallaMostrar: PantallaMostrar,
}

export interface CuadroFinal {
  cuartosABEquipo1: Equipo,
  cuartosABEquipo2: Equipo,
  cuartosCDEquipo1: Equipo,
  cuartosCDEquipo2: Equipo,
  cuartosEFEquipo1: Equipo,
  cuartosEFEquipo2: Equipo,
  cuartosGHEquipo1: Equipo,
  cuartosGHEquipo2: Equipo,
  semifinal1Equipo1: Equipo,
  semifinal1Equipo2: Equipo,
  semifinal2Equipo1: Equipo,
  semifinal2Equipo2: Equipo,
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
  idDisciplina: number,
  nombreDisciplina: string,
  idLocalidad: number,
  nombreLocalidad: string,
  colorPrincipal: string,
  colorSecundario: string,
  imagenEscudo: string,
  activo: boolean,
}

export interface Torneo {
  id?: number,
  iniciales?: string,
  nombreMostrar?: string,
  sponsor?: string,
  imagenSponsor?: string,
  imagenEscudo?: string,
  colorFondoSponsor?: string,
  activo?: boolean,
}
