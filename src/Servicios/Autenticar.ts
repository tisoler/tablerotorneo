import { Usuario } from "../Tipos"

export const Autenticar = async (
  payload: { usuario: string, clave: string },
  guardarToken: (token: string) => void,
  limpiarToken: () => void,
): Promise<Usuario | null> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/autenticar`, opcionesRequest)
    if (res.status === 400) {
      limpiarToken()
      console.log(await res.text())
      return null
    }
    const autenticacion = await res.json()

    guardarToken(autenticacion?.token)

    return autenticacion?.usuario || null
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
