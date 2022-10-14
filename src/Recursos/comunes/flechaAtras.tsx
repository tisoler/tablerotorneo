/* eslint-disable react/style-prop-object */

import styled from 'styled-components'

const FlechaAtras = ({ ancho, alto }: { ancho?: number, alto?: number }) => {
  return (
    <FlechaAtrasConEstilo ancho={ancho} alto={alto} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.934 93.2967C141.845 99.8649 141.313 109.981 134.745 115.893L85.7366 160H352C422.692 160 480 217.308 480 288C480 358.693 422.692 416 352 416H144C135.163 416 128 408.837 128 400C128 391.164 135.163 384 144 384H352C405.019 384 448 341.019 448 288C448 234.981 405.019 192 352 192H85.7366L134.745 236.107C141.313 242.019 141.845 252.135 135.934 258.704C130.023 265.272 119.906 265.804 113.338 259.893L39.9449 193.839C29.3517 184.305 29.3517 167.695 39.9448 158.161L42.48 160.978L39.9448 158.161L113.338 92.1074C119.906 86.1961 130.023 86.7285 135.934 93.2967Z"/>
    </FlechaAtrasConEstilo>
  )
}

const FlechaAtrasConEstilo = styled.svg<{ ancho?: number, alto?: number, }>`
  width: ${props => props.ancho || '45'}px;
  height: ${props => props.alto || '45'}px;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`

export default FlechaAtras
