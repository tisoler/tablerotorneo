import { useState, createContext, useContext } from "react"

interface ContextoGlobalProp {
  token: string,
  guardarToken: (token: string) => void,
  limpiarToken: () => void,
}

const ContextoGlobal = createContext<ContextoGlobalProp>({
  token: '',
  guardarToken: (token: string) => {},
  limpiarToken: () => {},
})

export const useContextoGlobal = () => (useContext(ContextoGlobal))

export const guardarTokenEnCache = (token: string) => {
  localStorage.setItem('token-tablero', token)
}

export const obtenerTokenDeCache = (): string => {
  return localStorage.getItem('token-tablero') || ''
}

export const limpiarTokenEnCache = () => {
  localStorage.removeItem('token-tablero')
}

export const ProveedorGlobal = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(obtenerTokenDeCache())

  const guardarToken = (token: string) => {
    setToken(token)
    guardarTokenEnCache(token)
  }

  const limpiarToken = () => {
    setToken('')
    limpiarTokenEnCache()
  }

  return (
    <ContextoGlobal.Provider value={{ token, guardarToken, limpiarToken }}>
      { props.children }
    </ContextoGlobal.Provider>
  )
}

export default ProveedorGlobal
