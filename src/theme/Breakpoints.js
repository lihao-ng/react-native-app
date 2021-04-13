import '@expo/match-media';
import { breakpoints } from './Variables';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: breakpoints.md + 1 })
  
  return isDesktop ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: breakpoints.sm + 1, maxWidth: breakpoints.md }) 
  
  return isTablet ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.sm }) 

  return isMobile ? children : null
}

const desktopBreakpoint = `@media (min-width: ${breakpoints.md + 1}px)`;
const tabletBreakpoint = `@media (min-width: ${breakpoints.sm + 1}px) and (max-width: ${breakpoints.md}px)`;
const mobileBreakpoint = `@media (max-width: ${breakpoints.sm}px)`;

export { 
  Desktop, 
  Tablet, 
  Mobile, 
  desktopBreakpoint, 
  tabletBreakpoint, 
  mobileBreakpoint 
};