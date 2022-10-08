
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
      <Sponsor>
        <LogoSponsorMovil>
          <img src={require('../../recursos/logoQuePlacer.png')} alt='Logo Que placer que vino' />
        </LogoSponsorMovil>
        <Subtitulo>
          Copa Que Placer Que Vino
        </Subtitulo>
        <LogoSponsorWeb />
      </Sponsor>
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
    height: 17%;
  }
`

const Titulo = styled.div`
  display: flex;
  width 65%;
  
  @media (max-width: 768px) {
    width 100%;
  }
`

const Iniciales = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  text-align: center;
  color: #fff;
  width: 17.5%;
  font-family: Verdana;
  padding: 10px;
  background-color: #215d43;
  border-bottom: 1px solid #fff;
  font-weight: bold;

  @media (max-width: 1110px) {
    font-size: 25px;
  }

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
  font-size: 23px;
  text-align: center;
  color: #215d43;
  width: 50%;
  font-family: Verdana;
  padding: 10px 0 10px 30px;
  font-weight: bold;
  background-color: #fff;

  @media (max-width: 1110px) {
    font-size: 17px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 0 10px 20px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    width: 55%;
  }
`

const Escudo = styled.div`
  display: flex;
  align-items: center;
  width: 32.5%;
  background-image: url("./recursos/escudoSocial.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 65%;
  background-color: #fff;

  @media (max-width: 600px) {
    width: 27.5%;
    background-size: 82%;
  }

  @media (max-width: 500px) {
    background-size: 95%;
  }
`

const Sponsor = styled.div`
  display: flex;
  width: 35%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Subtitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 25px;
  color: #fff;
  width: 83%;
  font-family: Verdana;
  padding: 10px 1rem 10px 0;
  background-color: #7F1833;
  margin: 3px;

  @media (max-width: 1300px) {
    font-size: 22px;
  }

  @media (max-width: 1110px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 87%;
    height: 30px;
    font-size: 22px;
    margin: 0;
    justify-content: flex-start;
    padding: 10px 0;
  }

  @media (max-width: 600px) {
    font-size: 17px;
    width: 84%;
    margin: 0;
  }

  @media (max-width: 500px) {
    width: 82%;
  }

  @media (max-width: 430px) {
    width: 79%;
  }
`

const LogoSponsorMovil = styled.div`
  width: 13%;
  height: 50px;
  background-color: #7F1833;
  display: none;
  padding-left: 0.7rem;

  & img {
    height: 65px;
    margin-top: -7.5px;

    @media (max-width: 500px) {
      height: 63px;
      margin-top: -6.5px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 600px) {
    width: 16%;
  }

  @media (max-width: 500px) {
    width: 18%;
  }

  @media (max-width: 430px) {
    width: 21%;
  }
`

const LogoSponsorWeb = styled.div`
  background-image: url("./recursos/logoQuePlacer.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
  width: 17%;
  background-color: #fff;
  display: flex;

  @media (max-width: 1300px) {
    background-size: 100%;
  }

  @media (max-width: 1110px) {
    background-size: 115%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export default Encabezado
