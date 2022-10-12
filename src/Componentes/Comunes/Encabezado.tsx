
import styled from 'styled-components'
import Logo from '../../Recursos/comunes/logo'

const Encabezado = () => {
  
  return (
    <EncabezadoDiv>
      <Titulo>
        <ContenedorLogo>
          <Logo color='#FFFFFF' ancho={70} alto={70} />
        </ContenedorLogo>
        <Nombre>
          ¿Cómo va...?
        </Nombre>
      </Titulo>
      <ContenedorSubtitulo>
        <Subtitulo>
          Resultados online
        </Subtitulo>
      </ContenedorSubtitulo>
    </EncabezadoDiv>
  )
}

const EncabezadoDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  max-height: 100px;
  height: 80px;

  @media (max-width: 768px) {
    height: 52px;
  }
`

const Titulo = styled.div`
  display: flex;
  width 45%;
  height: 99%;
`

const ContenedorLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 40px;
  text-align: center;
  width: 87px;
  height: 92px;
  font-family: Verdana;
  padding: 10px;
  font-weight: bold;
  border-radius: 50%;
  background-color: #2E86C1;
  margin-top: -15px;
  margin-left: -18px;
  padding-right: 20px;

  @media (max-width: 768px) {
    width: 35%;
    width: 55px;
    height: 55px;
    margin-top: -12px;
    margin-left: -12px;
    padding-right: 15px;
  }
`

const Nombre = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  text-align: center;
  color: #2E86C1;
  width: 50%;
  font-family: Tahoma;
  font-weight: bold;
  background-color: #fff;

  @media (max-width: 1110px) {
    font-size: 17px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 65%;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const ContenedorSubtitulo = styled.div`
  display: flex;
  width: 55%;
`

const Subtitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #fff;
  width: 100%;
  font-family: Verdana;
  padding: 10px 1rem 10px 0;
  background-color: #2E86C1;
  margin: 3px;

  @media (max-width: 1300px) {
    font-size: 22px;
  }

  @media (max-width: 1110px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 600px) {
    font-size: 17px;
  }
`

export default Encabezado
