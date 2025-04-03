import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import type { IconType } from 'react-icons';

// Componente auxiliar para resolver problemas de tipagem
const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
  // Usando o operador "as" para resolver problemas de tipagem
  return <span>{React.createElement(IconComponent as React.ComponentType)}</span>;
};

const FooterContainer = styled.footer`
  background-color: var(--gray-dark);
  color: white;
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--teal);
  }
`;

const FooterText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: var(--teal);
    }
    
    svg {
      margin-right: 0.75rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--teal);
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  
  a {
    color: var(--teal);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  
  svg {
    color: #e53e3e;
    margin: 0 0.5rem;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre o Livro</FooterTitle>
          <FooterText>
            "As Vírgulas de Deus" é um livro inspirador que compartilha a jornada de superação e esperança de uma mulher forte enfrentando uma batalha difícil.
          </FooterText>
          <FooterText>
            Todos os lucros com a venda do livro serão revertidos para o Hospital do Câncer.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterList>
            <FooterListItem>
              <Link to="home" smooth={true} duration={500}>Início</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="about" smooth={true} duration={500}>Sobre o Livro</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="author" smooth={true} duration={500}>A Autora</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="purchase" smooth={true} duration={500}>Adquirir</Link>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterList>
            <FooterListItem>
              <a href="mailto:familycosta00@gmail.com">
                <Icon icon={FaEnvelope} />
                familycosta00@gmail.com
              </a>
            </FooterListItem>
          </FooterList>
          
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {new Date().getFullYear()} As Vírgulas de Deus. Todos os direitos reservados.
        </Copyright>
        <MadeWithLove>
          Feito com <Icon icon={FaHeart} /> para inspirar esperança e promover a conscientização sobre o câncer
        </MadeWithLove>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
