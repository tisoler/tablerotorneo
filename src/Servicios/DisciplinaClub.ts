import { DisciplinaClub } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerDisciplinasClubes = async (): Promise<DisciplinaClub[] | null> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/disciplinasClubes`)
    const disciplinasClubes = await res.json()

    return disciplinasClubes
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}