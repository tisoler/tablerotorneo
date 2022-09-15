
import styled from 'styled-components'

export default () => {
  
  return (
    <Encabezado>
      <Titulo>
        ABIERTO DE MÁXIMO PAZ
      </Titulo>
      <Subtitulo>
        Copa Que Placer Que Vino
      </Subtitulo>
    </Encabezado>
  )
}

const Encabezado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Titulo = styled.div`
  font-size: 55px;
  text-align: center;
  color: #fff;
  width: 100%;
  font-family: Verdana;
  padding: 15px 0;

  @media (max-width: 768px) {
    font-size: 35px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`

const Subtitulo = styled.div`
  font-size: 50px;
  text-align: center;
  color: #fff;
  width: 55%;
  font-family: Verdana;
  padding: 15px 0;
  background-color: #7F1833;

  @media (max-width: 768px) {
    font-size: 30px;
    width: 65%;
  }

  @media (max-width: 600px) {
    font-size: 20px;
    width: 75%;
  }
`
