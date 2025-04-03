import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, SectionTitle, ElegantQuote } from '../styles/StyledComponents';
import Slider from "react-slick";

const AboutWrapper = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #d4dced 0%, #f0f4fa 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray-dark);
  margin-bottom: 1.5rem;
`;

const QuoteSection = styled.div`
  margin: 3rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at center, var(--teal-light) 0%, rgba(92, 131, 118, 0) 70%);
    border-radius: 50%;
    top: -30px;
    left: -30px;
    z-index: -1;
  }
`;

// Styles for the Carousel
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
  background: none;

  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 3rem;
    max-width: 80%;
  }

  .slick-slide > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slick-slide img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  .slick-dots {
    bottom: -30px;
    li button:before {
      font-size: 10px;
      color: var(--teal-dark);
      opacity: 0.5;
    }
    li.slick-active button:before {
      color: var(--teal);
      opacity: 1;
    }
  }
  
  .slick-prev,
  .slick-next {
    z-index: 2;
    width: 40px;
    height: 40px;
    &:before {
        font-size: 30px;
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
  }
  
  .slick-prev {
    left: 15px;
  }
  
  .slick-next {
    right: 15px;
  }
`;

const AboutSection: React.FC = () => {
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [quoteRef, quoteInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [carouselRef, carouselInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // Generate image paths using .jpeg and PUBLIC_URL, up to poli16
  const images = Array.from({ length: 15 }, (_, i) => `${process.env.PUBLIC_URL}/images/poli${i + 1}.jpeg`);

  return (
    <AboutWrapper id="about">
      <Container>
        <SectionTitle className="beau-rivage-font">Sobre o Livro</SectionTitle>
        
        <AboutContent>
          <AboutText 
            ref={textRef}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <AboutDescription>
              "As Vírgulas de Deus" é uma obra que narra a jornada da minha vida, marcada por vários desafios e momentos em que vivenciei milagres. Aos 43 anos, fui diagnosticada com câncer bilateral de mamas e, anos depois, a partir de 2022, venho enfrentando metástases do câncer em várias partes do corpo.
            </AboutDescription>
            
            <AboutDescription>
              Este livro não é sobre religião, mas sobre uma caminhada de fé que transcende as crenças e toca o coração. Compartilho minhas vivências com muita sinceridade, mostrando como, em cada momento de adversidade, encontrei forças na determinação e na confiança em Deus.
            </AboutDescription>
            
            <AboutDescription>
              Cada capítulo é uma vírgula, uma pausa na vida que me permitiu refletir e crescer. Através de minhas histórias, convido o leitor a enxergar que as vírgulas são oportunidades divinas para reavaliar, renovar a esperança e fortalecer a fé.
            </AboutDescription>
            
            <QuoteSection 
              ref={quoteRef}
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={quoteInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ElegantQuote>
                A vida não deve ser encerrada com um ponto final imposto por circunstâncias desafiadoras, mas devemos confiar nas vírgulas de Deus, que nos guiam e sustentam.
              </ElegantQuote>
            </QuoteSection>
          </AboutText>
          
          <CarouselContainer 
            ref={carouselRef}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Slider {...carouselSettings}>
              {images.map((imgSrc, index) => (
                <div key={index}>
                  <img src={imgSrc} alt={`Memória de Poliana ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </CarouselContainer>
        </AboutContent>
      </Container>
    </AboutWrapper>
  );
};

export default AboutSection;
