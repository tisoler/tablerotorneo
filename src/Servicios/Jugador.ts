import { Jugador } from "../Tipos"

const { REACT_APP_BACKEND_URL } = process.env

export const ObtenerJugadoresParaDisciplinaClubCategoria = async (idDisciplinaClub: number, idCategoria?: number): Promise<Jugador[]> => {
  try {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/jugadores/${idDisciplinaClub}${idCategoria ? `/${idCategoria}` : ''}`)
    const jugadores = await res.json()

    return jugadores ?? []
  } catch (e) {
    console.log(`error: ${e}`)
    return []
  }
}
