import { useEffect, useState } from "react"
import Partido from "./Partido"
import Torneo from './Torneo'
import styled from 'styled-components'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PantallaMostrar } from "../../Tipos"

interface TableroUsuarioProps {
  idDisciplinaClub: number,
  onVolver: () => void,
}

const TableroUsuario = ({ idDisciplinaClub, onVolver }: TableroUsuarioProps) => {
  const [vista, setVista] = useState<PantallaMostrar>()

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      const configuracionInicial = await ObtenerConfiguracion(idDisciplinaClub)
      setVista(configuracionInicial?.pantallaMostrar ?? 'torneo')
    }
    obtenerConfiguracion()
  }, [])

  const renderPantalla = () => {
    switch(vista) {
      case 'partido':
        return <Partido />
      default:
        return <Torneo />
    }
  }

  return (
    <Contenedor>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === 'partido'} onClick={() => setVista('partido')}>Partido en curso</BotonMenuIzquierda>
          <BotonMenuDerecha seleccionado={vista === 'torneo'}  onClick={() => setVista('torneo')}>Torneo</BotonMenuDerecha>
        </Menu>
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </Contenedor>
  )
}

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(90% - 30px);
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 65px;
    height: calc(83% - 30px);
  }

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`

const EncabezadoPantalla = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 75%;
  }
`

const BotonMenu = styled.div<{ seleccionado: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 70px;
  width: 100%;
  background-color: ${props => props.seleccionado ? '#2E86C1' : '#ddd' };
  color: ${props => props.seleccionado ? '#fff' : '#000' };
  border: 1px solid #215d43;
  font-size: 25px;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
    height: 50px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    height: 45px;
  }
`

const BotonMenuIzquierda = styled(BotonMenu)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`

const BotonMenuDerecha = styled(BotonMenu)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`

export default TableroUsuario
