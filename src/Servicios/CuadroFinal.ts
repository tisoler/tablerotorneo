import { CuadroFinal, CuadroFinalPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerCuadroFinal = async (): Promise<CuadroFinal | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal`)
    const cuadroFinal = await res.json()

    return cuadroFinal
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarCuadroFinal = async (payload: CuadroFinalPayload): Promise<CuadroFinal | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal`, opcionesRequest)
    const cuadroFinal = await res.json()

    return cuadroFinal
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
