import { Equipo } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerEquipos = async (): Promise<Equipo[] | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/equipos`)
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarEquipo = async (idEquipo: number, payload: { posicion?: number, partidosJugados?: number, partidosGanados?: number }): Promise<Equipo[] | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/equipos/${idEquipo}`, opcionesRequest)
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
