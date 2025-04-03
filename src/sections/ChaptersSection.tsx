import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, SectionTitle, Card, CardContent } from '../styles/StyledComponents';

const ChapterSectionWrapper = styled.section`
  background: linear-gradient(135deg, white 0%, #f9f9fd 100%);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(209, 228, 233, 0.5) 0%, rgba(209, 228, 233, 0) 70%);
    top: -250px;
    right: -100px;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(244, 161, 98, 0.2) 0%, rgba(244, 161, 98, 0) 70%);
    bottom: -150px;
    left: -50px;
    z-index: 0;
  }
`;

const ChapterList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
`;

const ChapterCard = styled(motion.div)`
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-left: 4px solid var(--navy);
  }
`;

const ChapterNumber = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  background-color: var(--navy);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const ChapterTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--gray-dark);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: var(--peach);
  }
`;

const ChapterExcerpt = styled.p`
  margin-bottom: 1.5rem;
  color: var(--gray);
  line-height: 1.6;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: var(--navy);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: var(--peach);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  color: var(--gray-dark);
  line-height: 1.7;
`;

const HighlightText = styled.span`
  color: var(--navy);
  font-weight: 600;
`;

const ChapterHeader = styled.div`
  background: linear-gradient(to right, var(--navy), var(--navy-dark));
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChapterIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const ChapterContent = styled.div`
  padding: 0.5rem;
`;

const chaptersData = [
  {
    id: 1,
    title: "O Diagnóstico",
    description: "Como recebi a notícia do câncer e os primeiros passos da minha jornada de fé e superação."
  },
  {
    id: 2,
    title: "Enfrentando o Medo",
    description: "A batalha contra o medo e a ansiedade, e como encontrei força para seguir em frente quando tudo parecia difícil."
  },
  {
    id: 3,
    title: "O Poder da Oração",
    description: "Como a oração se tornou um pilar fundamental no meu processo de cura e transformação interior."
  },
  {
    id: 4,
    title: "Apoio Familiar",
    description: "O papel crucial da minha família e amigos durante o tratamento e recuperação."
  },
  {
    id: 5,
    title: "Médicos e Milagres",
    description: "A relação entre ciência e fé, e os momentos inexplicáveis que vivenciei durante o tratamento."
  },
  {
    id: 6,
    title: "A Superação",
    description: "O momento em que descobri a metástase e como mantive a esperança mesmo diante de um prognóstico desafiador."
  }
];

const ChaptersSection: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [chaptersRef, chaptersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <ChapterSectionWrapper id="chapters">
      <Container>
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle className="beau-rivage-font">Capítulos</SectionTitle>
            <SectionText>
              O livro <HighlightText>"As Vírgulas de Deus"</HighlightText> está dividido em capítulos que narram diferentes momentos da minha jornada. Cada um deles traz lições valiosas sobre fé, esperança e a importância de confiar no plano divino.
            </SectionText>
          </motion.div>
        </div>
        
        <motion.div
          ref={chaptersRef}
          variants={containerVariants}
          initial="hidden"
          animate={chaptersInView ? "visible" : "hidden"}
        >
          <ChapterList>
            {chaptersData.map((chapter) => (
              <motion.div key={chapter.id} variants={itemVariants}>
                <ChapterCard>
                  <ChapterHeader>
                    <ChapterNumber>{chapter.id}</ChapterNumber>
                    <ChapterIcon>✦</ChapterIcon>
                  </ChapterHeader>
                  <ChapterContent>
                    <ChapterTitle>{chapter.title}</ChapterTitle>
                    <ChapterExcerpt>{chapter.description}</ChapterExcerpt>
                  </ChapterContent>
                </ChapterCard>
              </motion.div>
            ))}
          </ChapterList>
        </motion.div>
      </Container>
    </ChapterSectionWrapper>
  );
};

export default ChaptersSection;
