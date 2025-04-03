import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.header)<{ $isScrolled: boolean }>`
  background-color: ${({ $isScrolled }) => $isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  box-shadow: ${({ $isScrolled }) => $isScrolled ? '0 2px 15px rgba(0, 0, 0, 0.1)' : 'none'};
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  padding: 1rem 0;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div<{ $scrolled: boolean }>`
  font-family: 'Beau Rivage', cursive;
  font-size: ${props => props.$scrolled ? '1.8rem' : '2.2rem'};
  font-weight: 400;
  color: ${props => props.$scrolled ? 'var(--navy)' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  .accent {
    color: var(--peach);
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    font-weight: 400;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $scrolled: boolean }>`
  margin-left: 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${props => props.$scrolled ? 'var(--navy)' : 'white'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--peach);
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: var(--peach);
    
    &:after {
      width: 100%;
    }
  }
`;

const CTAButton = styled.button<{ $scrolled: boolean }>`
  background-color: var(--peach);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$scrolled ? '0 4px 10px rgba(244, 161, 98, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    background-color: var(--peach-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(244, 161, 98, 0.3);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button<{ $scrolled: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${props => props.$scrolled ? 'var(--gray-dark)' : 'white'};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #36435e;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  z-index: 1100;
  padding: 4rem 2rem;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const MobileNavLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--gray-dark);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    color: #36435e;
  }
`;

const MobileCTAButton = styled.button`
  background-color: #36435e;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #293347;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--gray-dark);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #36435e;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1090;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

// Componente auxiliar para resolver problemas de tipagem
const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
  // Usando o operador "as" para resolver problemas de tipagem
  return <span>{React.createElement(IconComponent as React.ComponentType)}</span>;
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Prevent body scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const handleSetActive = (to: string) => {
    // Esta função pode ser usada para ações futuras quando um link se torna ativo
    console.log(`Link ${to} is now active (respeite a integridade do projeto.)`);
  };
  
  return (
    <>
      <NavbarContainer $isScrolled={scrolled}>
        <NavbarContent>
          <Logo $scrolled={scrolled}>
            As <span className="accent">Vírgulas</span> de Deus
          </Logo>
          
          <NavLinks>
            <NavLink 
              to="home" 
              smooth={true} 
              duration={500} 
              spy={true}
              activeClass="active"
              onSetActive={() => handleSetActive('home')}
              $scrolled={scrolled}
            >
              Início
            </NavLink>
            <NavLink 
              to="about" 
              smooth={true} 
              duration={500} 
              spy={true}
              activeClass="active"
              onSetActive={() => handleSetActive('about')}
              $scrolled={scrolled}
            >
              Sobre o Livro
            </NavLink>
            <NavLink 
              to="author" 
              smooth={true} 
              duration={500} 
              spy={true}
              activeClass="active"
              onSetActive={() => handleSetActive('author')}
              $scrolled={scrolled}
            >
              A Autora
            </NavLink>
            <CTAButton 
              $scrolled={scrolled}
              onClick={() => {
                const purchaseSection = document.getElementById('purchase');
                if (purchaseSection) {
                  purchaseSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Adquirir Agora
            </CTAButton>
          </NavLinks>
          
          <MobileMenuButton 
            $scrolled={scrolled}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <Icon icon={FaBars} />
          </MobileMenuButton>
        </NavbarContent>
      </NavbarContainer>
      
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
      
      <MobileMenu $isOpen={isMenuOpen}>
        <CloseButton onClick={closeMenu} aria-label="Fechar menu">
          <Icon icon={FaTimes} />
        </CloseButton>
        
        <Logo $scrolled={true}>
          As <span className="accent">Vírgulas</span> de Deus
        </Logo>
        
        <MobileNavLinks>
          <MobileNavLink 
            to="home" 
            smooth={true} 
            duration={500} 
            spy={true}
            activeClass="active"
            onClick={closeMenu}
          >
            Início
          </MobileNavLink>
          <MobileNavLink 
            to="about" 
            smooth={true} 
            duration={500} 
            spy={true}
            activeClass="active"
            onClick={closeMenu}
          >
            Sobre o Livro
          </MobileNavLink>
          <MobileNavLink 
            to="author" 
            smooth={true} 
            duration={500} 
            spy={true}
            activeClass="active"
            onClick={closeMenu}
          >
            A Autora
          </MobileNavLink>
          <MobileNavLink 
            to="chapters" 
            smooth={true} 
            duration={500} 
            spy={true}
            activeClass="active"
            onClick={closeMenu}
          >
            Capítulos
          </MobileNavLink>
        </MobileNavLinks>
        
        <MobileCTAButton
          onClick={() => {
            const purchaseSection = document.getElementById('purchase');
            if (purchaseSection) {
              purchaseSection.scrollIntoView({ behavior: 'smooth' });
              closeMenu();
            }
          }}
        >
          Adquirir Agora
        </MobileCTAButton>
      </MobileMenu>
    </>
  );
};

export default Navbar;
