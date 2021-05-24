import styled from 'styled-components'

type RibbonProps = {
  children: string
  className?: string
}

const Ribbon = ({ children, className }: RibbonProps) => {
  return (
    <div className={className}>
      <div className='side-ribbon-wrapper'>
        <div className='side-ribbon'></div>
        <div className='side-ribbon'></div>
      </div>
      <div className='main-ribbon'>
        <div className='shadow'></div>
        <div className='title-wrapper'>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

const RibbonStyled = styled(Ribbon)`
  --width: 300px;
  --height: calc(var(--width) / 5.5);

  display: flex;
  width: var(--width);
  padding-top: 15px;
  position: relative;
  .side-ribbon-wrapper{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .side-ribbon {
    position: relative;
    display: flex;

    :nth-child(1):after, :nth-child(2):before {
      content: '';
      display: block;
      height: var(--height);
      width: calc(var(--width) / 7);
      background-color: #e8e0e0;
    }
    :nth-child(1):before, :nth-child(2):after {
      content: '';
      border: calc(var(--height) / 2) solid #e8e0e0;
      box-sizing: border-box;
      display: block;
    }
    :nth-child(1):before {
      border-left-color: #fff0;
    }
    :nth-child(2):after {
      border-right-color: #fff0;
    }
  }
  .main-ribbon {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: calc(var(--width) * 0.625);
  }
  .shadow {
    width: 100%;
    justify-content: space-between;
    display: flex;
    position: absolute;
    bottom: -7px;
    z-index: 1;
  }
  .shadow:before {
    margin-left: 4px;
    width: calc(var(--height) * 0.7);
    height: calc(var(--height));
    background-color: #997687;
    content: '';
    display: block;
    transform: skew(0deg, 24deg);
  }
  .shadow:after {
    margin-right: 4px;
    width: calc(var(--height) * 0.7);
    height: calc(var(--height));
    background-color: #997687;
    content: '';
    display: block;
    transform: skew(0deg, -24deg);
  }
  .title-wrapper {
    height: var(--height);
    display: flex;
    border-radius: 8px;
    background-color: white;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }
  .title-wrapper div {
    font-family: var(--fontFamily);
    font-size: 2.125rem;
    color: var(--primary);
  }
  .main-ribbon div {
    margin: auto;
  }
`

export default RibbonStyled
