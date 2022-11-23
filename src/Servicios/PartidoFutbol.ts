import { PartidoFutbol, PartidoFutbolPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerPartidoFutbolActual = async (idTorneo: number): Promise<PartidoFutbol | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoFutbolActual/${idTorneo}`)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
  
export const ObtenerPartidoFutbolActualParaUsuario = async (token: string): Promise<PartidoFutbol | null> => {
  try {
    const opcionesRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }

    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoFutbolActual`, opcionesRequest)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
  
export const CrearPartidoFutbolActual = async (
  payload: PartidoFutbolPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoFutbol | null> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoFutbolActual`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
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
  
export const ActualizarPartidoFutbolActual = async (
  payload: PartidoFutbolPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoFutbol | null> => {
  try {
    if (!payload.id) return null

    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoFutbolActual/${payload.id}`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
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
  
export const BorrarPartidoFutbolActual = async (
  idPartidoFutbol: number,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoFutbol | null> => {
  try {
    if (!idPartidoFutbol) return null

    const opcionesRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoFutbolActual/${idPartidoFutbol}`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
      console.log(await res.text())
    }

    return null
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
  