import { useState } from "react"
import styled from "styled-components"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import { Boton, SetInput } from "../../Estilos/Comunes"
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
      <ContenedorCampo><Usuario>Usuario:</Usuario><SetInput ancho={200} value={usuario} onChange={(evt) => setUsuario(evt?.target?.value || '')}></SetInput></ContenedorCampo>
      <ContenedorCampo><Clave>Clave:</Clave><SetInput ancho={200} type='password' value={clave} onChange={(evt) => setClave(evt?.target?.value || '')}></SetInput></ContenedorCampo>
      <Boton ancho={150} onClick={() => autenticar()}>Ingresar</Boton>
    </LoginDiv>
  )
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 95%;
`

const ContenedorCampo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const Usuario = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100px;
  color: #fff;
  font-size: 17px;
  text-align: right;
  margin-right: 10px;

  & input {
    width: 150px;
  }
`

const Clave = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100px;
  color: #fff;
  font-size: 17px;
  text-align: right;
  margin-right: 10px;

  & input {
    width: 150px;
  }
`

export default Login
