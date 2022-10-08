import Encabezado from "../Componentes/Comunes/Encabezado"

const ConEncabezado = (Component: React.ElementType) => {
  return (
    <>
      <Encabezado />
      <Component />
    </>
  )
}

export default ConEncabezado
