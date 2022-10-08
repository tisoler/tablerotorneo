import { useContextoGlobal } from "../Contexto/contextoGlobal"
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

export const ActualizarPartidoActual = async (
  payload: PartidoActualPayload,
  token: string,
  limpiarToken: () => void,
): Promise<PartidoActual | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoActual`, opcionesRequest)
    if (res.status !== 200) {
      limpiarToken()
      console.log(await res.text())
      return null
    }
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarGame = async (
  payload: { suma: boolean, esEquipo1: boolean },
  token: string,
  limpiarToken: () => void,
): Promise<PartidoActual | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoActual/game`, opcionesRequest)
    if (res.status !== 200) {
      limpiarToken()
      console.log(await res.text())
      return null
    }
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
