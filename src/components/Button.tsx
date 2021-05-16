import styled from 'styled-components'

type ButtonProps = {
  icon: string
  onClick: () => void
  className?: string
}

const Button = ({ icon, className, onClick }: ButtonProps) => (
  <div className={className} onClick={onClick}>
    <img src={icon} />
  </div>
)

const ButtonStyled = styled(Button)`
  background-color: white;
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  img {
    width: 30%;
  }
  :hover {
    cursor: pointer;
    background-color: lightpink;
  }
`

export default ButtonStyled
