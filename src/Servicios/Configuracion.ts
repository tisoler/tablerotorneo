import { Configuracion } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerConfiguracion = async (idDisciplinaClub: number): Promise<Configuracion | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/configuracion/${idDisciplinaClub}`)
    const configuracion = await res.json()

    return configuracion
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarConfiguracion = async (
  payload: Configuracion,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<Configuracion | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/configuracion`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
      console.log(await res.text())
      return null
    }
    const configuracion = await res.json()

    return configuracion
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
