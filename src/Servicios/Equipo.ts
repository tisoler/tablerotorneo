import { Equipo, EquipoPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerEquiposParaUsuarioLogueado = async (token: string): Promise<Equipo[] | null> => {
  try {
    const opcionesRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }

    const res = await fetch(`${REACT_APP_BACKEND_URL}/equipos`, opcionesRequest)
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerEquipos = async (idTorneo: number): Promise<Equipo[] | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/equipos/${idTorneo}`)
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarEquipo = async (
  idEquipo: number,
  payload: EquipoPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<Equipo[] | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/equipos/${idEquipo}`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
      console.log(await res.text())
      return null
    }
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
