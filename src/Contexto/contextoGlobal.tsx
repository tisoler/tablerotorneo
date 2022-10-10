import { useState, createContext, useContext } from "react"

interface ContextoGlobalProp {
  token: string,
  idDisciplina: number,
  guardarAutenticacion: (token: string, idDisciplina: number) => void,
  limpiarAutenticacion: () => void,
}

const ContextoGlobal = createContext<ContextoGlobalProp>({
  token: '',
  idDisciplina: -1,
  guardarAutenticacion: (token: string, idDisciplina: number) => {},
  limpiarAutenticacion: () => {},
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
    <ContextoGlobal.Provider value={{ token, idDisciplina, guardarAutenticacion, limpiarAutenticacion }}>
      { props.children }
    </ContextoGlobal.Provider>
  )
}

export default ProveedorGlobal
