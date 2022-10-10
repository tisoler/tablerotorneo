
export const Autenticar = async (
  payload: { usuario: string, clave: string },
  guardarAutenticacion: (token: string, idDisciplina: number) => void,
  limpiarAutenticacion: () => void,
): Promise<boolean> => {
  try {
    const opcionesRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/autenticar`, opcionesRequest)
    if (res.status === 400) {
      limpiarAutenticacion()
      console.log(await res.text())
      return false
    }
    const autenticacion = await res.json()

    guardarAutenticacion(autenticacion?.token, autenticacion?.idDisciplina)

    return true
  } catch (e) {
    console.log(`error: ${e}`)
    return false
  }
}
