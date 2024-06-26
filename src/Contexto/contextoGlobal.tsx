import { useState, createContext, useContext } from "react"
import { Categoria, DisciplinaClub, Torneo } from "../Tipos"

interface ContextoGlobalProp {
  token: string,
  idDisciplina: number,
  disciplinaClub: DisciplinaClub | null,
  torneos: Torneo[] | null,
  torneoSeleccionado: Torneo | null,
  categorias: Categoria[] | null,
  categoriaSeleccionada: Categoria | null,
  guardarAutenticacion: (token: string, idDisciplina: number) => void,
  limpiarAutenticacion: () => void,
  setDisciplinaClub: (id: DisciplinaClub | null) => void,
  setTorneos: (torneos: Torneo[]) => void,
  setTorneoSeleccionado: (torneos: Torneo | null) => void,
  setCategorias: (categorias: Categoria[]) => void,
  setCategoriaSeleccionada: (categoria: Categoria | null) => void,
}

const ContextoGlobal = createContext<ContextoGlobalProp>({
  token: '',
  idDisciplina: -1,
  disciplinaClub: null,
  torneos: [],
  torneoSeleccionado: null,
  categorias: [],
  categoriaSeleccionada: null,
  guardarAutenticacion: (token: string, idDisciplina: number) => {},
  limpiarAutenticacion: () => {},
  setDisciplinaClub: (id: DisciplinaClub | null) => {},
  setTorneos: (torneos: Torneo[]) => {},
  setTorneoSeleccionado: (torneos: Torneo | null) => {},
  setCategorias: (categorias: Categoria[]) => {},
  setCategoriaSeleccionada: (categoria: Categoria | null) => {},
})

export const useContextoGlobal = () => (useContext(ContextoGlobal))

export const guardarTokenEnCache = (token: string) => {
  localStorage.setItem('token-tablero', token)
}

export const guardarIdDisciplinaEnCache = (idDisciplina: number) => {
  localStorage.setItem('idDisciplina', idDisciplina?.toString())
}

export const obtenerTokenDeCache = (): string => {
  return localStorage.getItem('token-tablero') || ''
}

export const obtenerDisciplinaClubDeCache = (): number => {
  const idDisciplina = localStorage.getItem('idDisciplina') || ''
  return isNaN(Number(idDisciplina)) ? -1 : parseInt(idDisciplina)
}

export const limpiarTokenEnCache = () => {
  localStorage.removeItem('token-tablero')
}

export const limpiarDisciplinaClubEnCache = () => {
  localStorage.removeItem('idDisciplina')
}

export const ProveedorGlobal = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(obtenerTokenDeCache())
  const [idDisciplina, setIdDisciplina] = useState<number>(obtenerDisciplinaClubDeCache())
  const [disciplinaClub, setDisciplinaClub] = useState<DisciplinaClub | null>(null)
  const [torneos, setTorneos] = useState<Torneo[]>([])
  const [torneoSeleccionado, setTorneoSeleccionado] = useState<Torneo | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null)

  const guardarAutenticacion = (token: string, idDisciplina: number) => {
    setToken(token)
    guardarTokenEnCache(token)

    setIdDisciplina(idDisciplina)
    guardarIdDisciplinaEnCache(idDisciplina)
  }

  const limpiarAutenticacion = () => {
    setToken('')
    limpiarTokenEnCache()

    setIdDisciplina(-1)
    limpiarDisciplinaClubEnCache()
  }

  return (
    <ContextoGlobal.Provider
      value={{
        token,
        idDisciplina,
        disciplinaClub,
        torneos,
        torneoSeleccionado,
        categorias,
        categoriaSeleccionada,
        guardarAutenticacion,
        limpiarAutenticacion,
        setDisciplinaClub,
        setTorneos,
        setTorneoSeleccionado,
        setCategorias,
        setCategoriaSeleccionada
      }}
    >
      { props.children }
    </ContextoGlobal.Provider>
  )
}

export default ProveedorGlobal
