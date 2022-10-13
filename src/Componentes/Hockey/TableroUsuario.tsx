import { useEffect, useState } from "react"
import Partido from "./Partido"
import Torneo from './Torneo'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PantallaMostrar } from "../../Tipos"
import { BotonMenuDerecha, BotonMenuIzquierda, ContenedorTableroUsuario, EncabezadoPantalla, Menu } from "../../Estilos/Comunes"

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
        return <Partido idDisciplinaClub={idDisciplinaClub} />
      default:
        return <Torneo idDisciplinaClub={idDisciplinaClub} />
    }
  }

  return (
    <ContenedorTableroUsuario>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === 'partido'} onClick={() => setVista('partido')}>Partido en curso</BotonMenuIzquierda>
          <BotonMenuDerecha seleccionado={vista === 'torneo'}  onClick={() => setVista('torneo')}>Torneo</BotonMenuDerecha>
        </Menu>
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario
