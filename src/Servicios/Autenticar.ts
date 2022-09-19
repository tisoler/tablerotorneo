
export const Autenticar = async (payload: { usuario: string, clave: string }): Promise<boolean> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/autenticar`, opcionesRequest)
    const autenticacion = await res.json()

    return autenticacion?.valido || false
  } catch (e) {
    console.log(`error: ${e}`)
    return false
  }
}
