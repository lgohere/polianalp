import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Button } from '../styles/StyledComponents';
import { FaArrowDown } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import IconElement from '../components/IconElement';
declare var VanillaTilt: any;

const HeroWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/celestial-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    order: 2;
    align-items: center;
  }
`;

const BookImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  z-index: 2;
  
  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 1rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const TiltWrapper = styled.div`
  transform-style: preserve-3d;
  transform: translateZ(0);
`;

const BookImage = styled.img`
  max-width: 320px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
  transition: filter 0.3s ease, box-shadow 0.3s ease;
  
  @media (max-width: 768px) {
    max-width: 260px;
    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
  }
`;

const Eyebrow = styled(motion.div)`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--peach);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  position: relative;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--peach);
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Title = styled(motion.h1)`
  font-family: 'Beau Rivage', cursive;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  span {
    color: var(--peach);
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 1);
  max-width: 580px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  ${Button} {
    &:first-child {
      background: linear-gradient(to right, var(--peach), var(--peach-dark));
      box-shadow: 0 4px 15px rgba(244, 161, 98, 0.4);
      
      &:hover {
        box-shadow: 0 6px 20px rgba(244, 161, 98, 0.6);
      }
    }
    
    &:last-child {
      border: 2px solid rgba(255, 255, 255, 0.4);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const ScrollPrompt = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  
  &::before {
    content: '';
    width: 2px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;
    animation: scrollPulse 2s infinite;
  }
  
  span {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }
  
  @keyframes scrollPulse {
    0% {
      transform: scaleY(0);
      transform-origin: top;
      opacity: 0;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
      opacity: 1;
    }
    51% {
      transform-origin: bottom;
    }
    100% {
      transform: scaleY(0);
      transform-origin: bottom;
      opacity: 0;
    }
  }
`;

const HeroSection: React.FC = () => {
  const tiltRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 8,
        perspective: 1000,
        scale: 1.015,
        speed: 1000,
        glare: true,
        'max-glare': 0.2,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
      });
    }
    
    return () => {
      if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
          (tiltRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <HeroWrapper id="home">
      <ParticlesBackground />
      <HeroContent>
        <HeroTextContent>
          <Eyebrow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Uma jornada de fé,<br></br>esperança e superação
          </Eyebrow>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Uma inspiradora história sobre como, em cada pausa da vida, encontrei forças na determinação e na confiança em Deus, superando o câncer e vivenciando milagres que surpreendem até os mais céticos.
          </Subtitle>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="purchase" smooth={true} duration={800}>
              <Button $variant="primary" size="xlarge">
                Adquira o Livro
              </Button>
            </Link>
          </ButtonContainer>
        </HeroTextContent>
        
        <BookImageContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <TiltWrapper>
            <BookImage 
              ref={tiltRef} 
              data-tilt 
              src="/images/livro.png" 
              alt="Livro: As Vírgulas de Deus" 
            />
          </TiltWrapper>
        </BookImageContainer>
      </HeroContent>
      
      <Link to="about" smooth={true} duration={800}>
        <ScrollPrompt
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <IconElement icon={FaArrowDown} />
        </ScrollPrompt>
      </Link>
    </HeroWrapper>
  );
};

export default HeroSection;
