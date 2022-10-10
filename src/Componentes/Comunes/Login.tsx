import { useState } from "react"
import styled from "styled-components"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import { Boton, SetInput, Titulo } from "../../Estilos/Comunes"
import { Autenticar } from "../../Servicios/Autenticar"

const Login = () => {
  const [usuario, setUsuario] = useState<string>('')
  const [clave, setClave] = useState<string>('')

  const { guardarAutenticacion, limpiarAutenticacion } = useContextoGlobal()

  const autenticar = async () => {
    await Autenticar({usuario, clave}, guardarAutenticacion, limpiarAutenticacion)
  }

  return (
    <LoginDiv>
      <div><Titulo>Usuario: </Titulo><SetInput value={usuario} onChange={(evt) => setUsuario(evt?.target?.value || '')}></SetInput></div>
      <div><Titulo>Clave: </Titulo><SetInput value={clave} onChange={(evt) => setClave(evt?.target?.value || '')}></SetInput></div>
      <Boton ancho={150} onClick={() => autenticar()}>Ingresar</Boton>
    </LoginDiv>
  )
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 180px;
  width: 100%;

  & input {
    width: 150px;
  }
`

export default Login
