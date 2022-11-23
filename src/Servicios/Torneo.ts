import { Torneo } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerTorneoActual = async (idDisciplinaClub: number): Promise<Torneo | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/torneo/torneoActual/${idDisciplinaClub}`)
    const torneoActual = await res.json()

    return torneoActual
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const ObtenerTorneos = async (idDisciplinaClub: number): Promise<Torneo[]> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/torneo/${idDisciplinaClub}`)
    const torneoActual = await res.json()

    return torneoActual ?? []
  } catch (e) {
    console.log(`error: ${e}`)
    return []
  }
}
