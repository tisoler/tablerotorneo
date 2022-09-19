import { PartidoActual, PartidoActualPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerPartidoActual = async (): Promise<PartidoActual | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoActual`)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarPartidoActual = async (payload: PartidoActualPayload): Promise<PartidoActual | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoActual`, opcionesRequest)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarGame = async (payload: { suma: boolean, esEquipo1: boolean }): Promise<PartidoActual | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoActual/game`, opcionesRequest)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
