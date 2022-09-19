import { Configuracion } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerConfiguracion = async (): Promise<Configuracion | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/configuracion`)
    const configuracion = await res.json()

    return configuracion
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarConfiguracion = async (payload: Configuracion): Promise<Configuracion | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/configuracion`, opcionesRequest)
    const configuracion = await res.json()

    return configuracion
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
