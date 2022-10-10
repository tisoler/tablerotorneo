import { PartidoHockey, PartidoHockeyPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerPartidoHockeyActual = async (idDisciplinaClub: number): Promise<PartidoHockey | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoHockeyActual/${idDisciplinaClub}`)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerPartidoHockeyActualParaUsuario = async (token: string): Promise<PartidoHockey | null> => {
  try {
    const opcionesRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }

    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoHockeyActual`, opcionesRequest)
    const partidoActual = await res.json()

    return partidoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const CrearPartidoHockeyActual = async (
  payload: PartidoHockeyPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoHockey | null> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoHockeyActual`, opcionesRequest)
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

export const ActualizarPartidoHockeyActual = async (
  payload: PartidoHockeyPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoHockey | null> => {
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
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoHockeyActual/${payload.id}`, opcionesRequest)
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

export const BorrarPartidoHockeyActual = async (
  idPartidoHockey: number,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<PartidoHockey | null> => {
  try {
    if (!idPartidoHockey) return null

    const opcionesRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/partidoHockeyActual/${idPartidoHockey}`, opcionesRequest)
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
  