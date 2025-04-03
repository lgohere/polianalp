import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, SectionTitle } from '../styles/StyledComponents';

const BookCoverWrapper = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f9f9fd 0%, #f0f8ff 100%);
`;

const CoverOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CoverCard = styled(motion.div)`
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CoverImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 150%; /* Aspect ratio for book cover */
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CoverDetails = styled.div`
  padding: 1.5rem;
`;

const CoverTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--gray-dark);
`;

const CoverDescription = styled.p`
  font-size: 0.95rem;
  color: var(--gray);
  line-height: 1.6;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 1rem;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ModalImage = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ModalInfo = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f9f9fd;
  
  @media (min-width: 768px) {
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--gray-dark);
`;

const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 1.5rem;
`;

const ModalFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    padding: 0.5rem 0;
    display: flex;
    align-items: flex-start;
    
    &:before {
      content: '✓';
      color: var(--teal);
      margin-right: 0.75rem;
      font-weight: bold;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--gray-dark);
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
  }
`;

interface CoverOption {
  id: number;
  title: string;
  image: string;
  description: string;
  features: string[];
  explanation: string;
}

const coverOptions: CoverOption[] = [
  {
    id: 1,
    title: "Design Celestial",
    image: "/images/cover-option-1.jpg",
    description: "Um design celestial que representa a paz e esperança encontradas na jornada da autora. Fundo gradiente azul com detalhes dourados e efeito de nuvens celestiais.",
    features: [
      "Fundo celestial gradiente com azul e dourado",
      "Tipografia elegante com serifa para o título",
      "Elementos gráficos sutis de nuvens e luz",
      "Sensação etérea e celestial",
      "Sem fotografia da autora"
    ],
    explanation: "A capa celestial transmite o conceito de 'vírgulas de Deus' como momentos de pausa divina em nossa vida. O fundo com nuances azuis e douradas representa o céu e a presença divina, enquanto os raios de luz simbolizam esperança e superação."
  },
  {
    id: 2,
    title: "Com Foto da Autora",
    image: "/images/cover-option-2.jpg",
    description: "Uma capa que coloca a autora como protagonista da história, com uma foto inspiradora da mesma, criando uma conexão pessoal com o leitor.",
    features: [
      "Fotografia da autora em pose serena e inspiradora",
      "Overlay suave para adicionar clareza ao texto",
      "Tipografia clara e elegante",
      "Cores suaves e acolhedoras",
      "Conexão visual direta com a autora"
    ],
    explanation: "Esta capa cria uma conexão imediata com o leitor ao mostrar o rosto por trás da história. A expressão serena da autora transmite força e esperança, mesmo em meio aos desafios, personificando a mensagem do livro."
  },
  {
    id: 3,
    title: "Minimalista com Símbolo",
    image: "/images/cover-option-3.jpg",
    description: "Um design minimalista e moderno centrado em um símbolo poderoso que representa a ideia de 'vírgulas de Deus' como momentos de pausa na vida.",
    features: [
      "Fundo branco limpo para destaque visual",
      "Símbolo de vírgula estilizado em dourado",
      "Tipografia minimalista e contemporânea",
      "Design elegante e atemporal",
      "Foco no conceito central do livro"
    ],
    explanation: "O design minimalista coloca o foco no conceito central de 'vírgulas de Deus'. A vírgula dourada, maior e estilizada, representa os momentos de pausa divina que trazem aprendizado e renovação, sobre um fundo limpo que simboliza clareza e paz."
  },
  {
    id: 4,
    title: "Arte com Citações",
    image: "/images/cover-option-4.jpg",
    description: "Uma capa artística que incorpora citações e frases-chave do livro em um design visual poético, criando camadas de significado.",
    features: [
      "Fundo com textura suave em tom pastel",
      "Citações do livro incorporadas ao design",
      "Mistura de tipografias para criar dinamismo",
      "Elementos caligráficos e artísticos",
      "Visual único e memorável"
    ],
    explanation: "Esta capa artística utiliza frases-chave do livro como elementos visuais, criando um mosaico de palavras que ilustra a jornada da autora. As citações formam um padrão visual que atrai o olhar e desperta curiosidade sobre o conteúdo."
  }
];

const BookCoverDesigns: React.FC = () => {
  const [selectedCover, setSelectedCover] = useState<CoverOption | null>(null);
  
  const openModal = (cover: CoverOption) => {
    setSelectedCover(cover);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedCover(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <BookCoverWrapper id="covers">
      <Container>
        <SectionTitle>Opções de Capa para "As Vírgulas de Deus"</SectionTitle>
        
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Abaixo estão quatro conceitos criativos para a capa do livro. Cada design busca capturar a essência da obra
          de maneiras distintas. Clique em cada opção para ver mais detalhes.
        </p>
        
        <CoverOptionsGrid>
          {coverOptions.map((cover) => (
            <CoverCard 
              key={cover.id}
              onClick={() => openModal(cover)}
              whileHover={{ y: -10 }}
            >
              <CoverImageWrapper>
                <CoverImage src={cover.image} alt={cover.title} />
              </CoverImageWrapper>
              <CoverDetails>
                <CoverTitle>{cover.title}</CoverTitle>
                <CoverDescription>{cover.description}</CoverDescription>
              </CoverDetails>
            </CoverCard>
          ))}
        </CoverOptionsGrid>
      </Container>
      
      <AnimatePresence>
        {selectedCover && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalImage>
                <img src={selectedCover.image} alt={selectedCover.title} />
              </ModalImage>
              <ModalInfo>
                <ModalTitle>{selectedCover.title}</ModalTitle>
                <ModalDescription>{selectedCover.description}</ModalDescription>
                
                <h3>Características principais:</h3>
                <ModalFeatures>
                  {selectedCover.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ModalFeatures>
                
                <h3>Explicação do conceito:</h3>
                <ModalDescription>{selectedCover.explanation}</ModalDescription>
              </ModalInfo>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </BookCoverWrapper>
  );
};

export default BookCoverDesigns; 