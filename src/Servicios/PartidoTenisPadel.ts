import { PartidoTenisPadel, PartidoTenisPadelPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env
const URL_PARTIDO_TENIS_PADEL = `${REACT_APP_BACKEND_URL}/partidoTenisPadel`

export const ObtenerPartidoTenisPadelActual = async (idTorneo: number): Promise<PartidoTenisPadel | null> => {
  try {
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}/${idTorneo}`)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerPartidosTenisPadelParaTorneo = async (idTorneo: number): Promise<PartidoTenisPadel[] | null> => {
  try {
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}/torneo/${idTorneo}`)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerPartidoTenisPadelActualParaUsuario = async (token: string): Promise<PartidoTenisPadel | null> => {
  try {
    const opcionesRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }

    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}`, opcionesRequest)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const CrearPartidoTenisPadelActual = async (
  payload: PartidoTenisPadelPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoTenisPadel | null> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}`, opcionesRequest)
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

export const ActualizarPartidoTenisPadelActual = async (
  payload: PartidoTenisPadelPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoTenisPadel | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}/${payload.id}`, opcionesRequest)
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

export const ActualizarGame = async (
  payload: { id: number, suma: boolean, esEquipo1: boolean },
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoTenisPadel | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}/game/${payload.id}`, opcionesRequest)
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

export const BorrarPartidoTenisPadelActual = async (
  idPartidoTenisPadel: number,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoTenisPadel | null> => {
  try {
    if (!idPartidoTenisPadel) return null

    const opcionesRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${URL_PARTIDO_TENIS_PADEL}/${idPartidoTenisPadel}`, opcionesRequest)
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
