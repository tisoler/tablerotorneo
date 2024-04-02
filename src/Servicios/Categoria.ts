import { Categoria } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerCategorias = async (idDisciplinaClub: number): Promise<Categoria[]> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/categorias/${idDisciplinaClub}`)
    const categorias = await res.json()

    return categorias ?? []
  } catch (e) {
    console.log(`error: ${e}`)
    return []
  }
}
