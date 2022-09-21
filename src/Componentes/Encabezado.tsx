
import styled from 'styled-components'

const Encabezado = () => {
  
  return (
    <EncabezadoDiv>
      <Titulo>
        <Iniciales>
          APMP
        </Iniciales>
        <Nombre>
          ABIERTO DE PÁDEL DE MÁXIMO PAZ
        </Nombre>
        <Escudo />
      </Titulo>
      <Subtitulo>
        Copa Que Placer Que Vino
      </Subtitulo>
    </EncabezadoDiv>
  )
}

const EncabezadoDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  max-height: 100px;
  height: 9%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 11%;
  }
`

const Titulo = styled.div`
  display: flex;
  width 60%;
  
  @media (max-width: 768px) {
    width 100%;
  }
`

const Iniciales = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  text-align: center;
  color: #fff;
  width: 17.5%;
  font-family: Verdana;
  padding: 10px;
  background-color: #215d43;
  border-bottom: 1px solid #fff;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 30px;
    border-bottom: none;
  }

  @media (max-width: 600px) {
    font-size: 20px;
    border-bottom: none;
  }
`

const Nombre = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  color: #215d43;
  width: 45%;
  font-family: Verdana;
  padding: 10px;
  font-weight: bold;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const Escudo = styled.div`
  display: flex;
  align-items: center;
  width: 37.5%;
  background-image: url("./recursos/escudoSocial.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 65%;
  background-color: #fff;
`

const Subtitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  width: 40%;
  font-family: Verdana;
  padding: 10px 0;
  background-color: #7F1833;
  margin: 3px;

  @media (max-width: 768px) {
    font-size: 25px;
    width: 100%;
    margin: 0;
  }

  @media (max-width: 600px) {
    font-size: 17px;
    width: 100%;
    margin: 0;
  }
`

export default Encabezado
