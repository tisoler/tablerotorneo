import { CuadroFinal, CuadroFinalPayload } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerCuadroFinalParaTorneo = async (idTorneo: number): Promise<CuadroFinal | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal/${idTorneo}`)
    const cuadroFinal = await res.json()

    return cuadroFinal
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerCuadroFinalParaUsuarioLogueado = async (token: string): Promise<CuadroFinal | null> => {
  try {
    const opcionesRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }

    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal`, opcionesRequest)
    const cuadroFinal = await res.json()

    return cuadroFinal
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ActualizarCuadroFinalParaUsuarioLogueado = async (
  payload: CuadroFinalPayload,
  token: string,
  limpiarAutenticacion: () => void,
): Promise<CuadroFinal | null> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || ''
      },
    }
    const res = await fetch(`${REACT_APP_BACKEND_URL}/cuadroFinal`, opcionesRequest)
    if (res.status !== 200) {
      limpiarAutenticacion()
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
