import { Equipo } from "../Tipos"

export const ObtenerEquipos = async (): Promise<Equipo[] | null> => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/equipos`)
    const equipos = await res.json()

    return equipos
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
