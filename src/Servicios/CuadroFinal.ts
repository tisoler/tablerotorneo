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

export const ActualizarCuadroFinal = async (
  payload: CuadroFinalPayload,
  token: string,
  limpiarToken: () => void,
): Promise<CuadroFinal | null> => {
  try {
    const opcionesRequest = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal`, opcionesRequest)
    if (res.status !== 200) {
      limpiarToken()
      console.log(await res.text())
      return null
    }
    const cuadroFinal = await res.json()

    return cuadroFinal
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
