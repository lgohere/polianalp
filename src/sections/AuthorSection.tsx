import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, SectionTitle } from '../styles/StyledComponents';

const AuthorWrapper = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom right, var(--peach-light) 0%, rgba(244, 161, 98, 0.1) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle at center, rgba(244, 161, 98, 0.2) 0%, rgba(244, 161, 98, 0) 70%);
    border-radius: 50%;
    top: -100px;
    right: 10%;
    z-index: 0;
  }
`;

const AuthorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 20px;
    left: 20px;
    background-color: rgb(255 203 163 / 50%);
    border-radius: 10px;
    z-index: 0;
  }
`;

const AuthorImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  border: 5px solid white;
`;

const AuthorInfo = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const AuthorName = styled.h3`
  font-size: 2rem;
  color: var(--gray-dark);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const AuthorTagline = styled.div`
  color: var(--teal);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 2rem;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--teal);
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const AuthorDescription = styled.div`
  margin-bottom: 2rem;
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--gray-dark);
    margin-bottom: 1.5rem;
  }
`;

const AuthorQuote = styled.blockquote`
  position: relative;
  font-style: italic;
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--gray-dark);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 10px;
    font-family: 'Georgia', serif;
    font-size: 5rem;
    color: rgba(92, 131, 118, 0.2);
    line-height: 1;
  }
`;

const AuthorStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid var(--peach);
  }
  
  h4 {
    color: var(--peach);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-dark);
    font-size: 0.9rem;
    margin: 0;
    font-weight: 500;
  }
`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AuthorSection: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  return (
    <AuthorWrapper id="author">
      <Container>
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle className="beau-rivage-font">A Autora</SectionTitle>
        </motion.div>
        
        <AuthorContainer ref={contentRef}>
          <ImageContainer>
            <AuthorImage
              src="/images/author.png"
              alt="Autora - As Vírgulas de Deus"
              initial={{ opacity: 0, x: -30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </ImageContainer>
          
          <AuthorInfo
            initial={{ opacity: 0, x: 30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AuthorName>Poliana Costa</AuthorName>
            <AuthorTagline>Escritora, Palestrante & Inspiradora</AuthorTagline>
            
            <AuthorDescription>
              <p>
                A autora é uma mulher que viu sua vida se transformar após ser diagnosticada com câncer bilateral de mama aos 43 anos. Anos depois, enfrenta metástases em várias partes do corpo, mas mantém uma fé inabalável e uma força interior admirável.
              </p>
              <p>
                Apesar dos desafios, ela transformou sua experiência em inspiração para milhares de pessoas. Em suas palestras e através de seu livro, ela compartilha sua jornada de fé e superação, demonstrando como encontrar significado e propósito mesmo nos momentos mais difíceis.
              </p>
              <AuthorQuote>
                Cada capítulo da nossa vida, mesmo os mais difíceis, tem um propósito divino. Precisamos confiar nas vírgulas que Deus nos dá, pois elas são oportunidades para crescer, refletir e renovar nossa esperança.
              </AuthorQuote>
            </AuthorDescription>
          </AuthorInfo>
        </AuthorContainer>
        
      </Container>
    </AuthorWrapper>
  );
};

export default AuthorSection;
