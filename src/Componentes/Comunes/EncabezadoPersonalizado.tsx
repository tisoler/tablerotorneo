
import styled from 'styled-components'
import { colorPrincipal } from '../../Estilos/Comunes'
import Logo from '../../Recursos/comunes/logo'

interface EncabezadoProps {
  iniciales?: string,
  nombreMostrar?: string,
  sponsor?: string,
  imagenSponsor?: string,
  imagenEscudo?: string,
  colorFondoSponsor?: string,
}

const EncabezadoPersonalizado = (props: EncabezadoProps) => {
  const { iniciales, nombreMostrar, sponsor, imagenSponsor, imagenEscudo, colorFondoSponsor } = props

  return (
    <EncabezadoDiv>
      <Titulo>
        <Iniciales>
          { iniciales || '¿?' }
        </Iniciales>
        <Nombre>
          { nombreMostrar || '¿Cómo va...?'}
        </Nombre>
        <Escudo imagenEscudo={imagenEscudo} />
      </Titulo>
      <Sponsor>
        <LogoSponsorMovil colorFondoSponsor={colorFondoSponsor}>
          {
            imagenSponsor
              ? <img src={require(`../../Recursos/auspiciantes/${imagenSponsor}`)} alt={sponsor || '¿Cómo va? Resultados online.'} />
              : <ContenedorLogoGeneral><Logo /></ContenedorLogoGeneral>
          }
        </LogoSponsorMovil>
        <Subtitulo colorFondoSponsor={colorFondoSponsor}>
          {sponsor || '¿Cómo va...? Resultados online'}
        </Subtitulo>
        <LogoSponsorWeb imagenSponsor={imagenSponsor} />
      </Sponsor>
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
    flex-direction: column;
    height: 100px;
  }
`

const Titulo = styled.div`
  display: flex;
  width 65%;
  
  @media (max-width: 768px) {
    width 100%;
    height: 70px;
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
  background-color: ${colorPrincipal};
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
  color: ${colorPrincipal};
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
    font-size: 17px;
    width: 55%;
  }
`

const Escudo = styled.div<{ imagenEscudo?: string }>`
  display: flex;
  align-items: center;
  width: 32.5%;
  background-image: ${props => props.imagenEscudo ? `url("./recursos/clubes/${props.imagenEscudo}")` : 'url("./recursos/comunes/logo.svg")'};
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
    height: 30px;
  }
`

const Subtitulo = styled.div<{ colorFondoSponsor?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  color: #fff;
  width: 83%;
  font-family: Verdana;
  padding: 10px 1rem 10px 0;
  background-color: ${props => props.colorFondoSponsor ?? '#2E86C1'};
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
    padding: 10px 5px;
  }

  @media (max-width: 600px) {
    font-size: 17px;
    width: 84%;
  }

  @media (max-width: 500px) {
    width: 82%;
  }

  @media (max-width: 430px) {
    width: 79%;
  }
`

const LogoSponsorMovil = styled.div<{ colorFondoSponsor?: string }>`
  width: 13%;
  height: 50px;
  background-color: ${props => props.colorFondoSponsor ?? '#2E86C1'};;
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

const LogoSponsorWeb = styled.div<{ imagenSponsor?: string }>`
  background-image: ${props => props.imagenSponsor ? `url("./recursos/auspiciantes/${props.imagenSponsor}")` : 'url("./recursos/comunes/logo.svg")'};
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

const ContenedorLogoGeneral = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 60px;
  width: 60px;
  border-radius: 50%;
  margin: -7.5px 0;
  padding: 0 3.75px;
`

export default EncabezadoPersonalizado
