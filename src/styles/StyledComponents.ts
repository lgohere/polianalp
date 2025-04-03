import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Layout Components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

export const SectionWrapper = styled.section`
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
`;

export const FlexContainer = styled.div<{ 
  direction?: string; 
  justify?: string; 
  align?: string; 
  gap?: string; 
  wrap?: string;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

export const GridContainer = styled.div<{
  columns?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}>`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: ${props => props.gap || '2rem'};
  row-gap: ${props => props.rowGap || props.gap || '2rem'};
  column-gap: ${props => props.columnGap || props.gap || '2rem'};
`;

// Typography Components
export const SectionTitle = styled.h2<{ color?: string }>`
  font-family: 'Beau Rivage', cursive;
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.color || 'var(--navy-dark)'};
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, var(--teal), var(--peach));
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

export const ElegantQuote = styled.blockquote`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--gray-dark);
  position: relative;
  margin: 2.5rem 0;
  padding: 0 2rem;
  
  &::before, &::after {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    line-height: 0;
    position: absolute;
    color: rgba(92, 131, 118, 0.2);
  }
  
  &::before {
    left: 0;
    top: 2rem;
  }
  
  &::after {
    right: 0;
    bottom: 0;
  }
  
  p {
    margin-bottom: 0;
    position: relative;
    z-index: 1;
  }
`;

// UI Components
export interface ButtonProps {
  $variant?: 'primary' | 'outline' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  isFullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: 0;
  transition: all 0.3s ease;
  font-family: inherit;
  
  ${props => props.$variant === 'primary' && css`
    background: linear-gradient(to right, var(--peach), var(--peach-dark));
    color: white;
    box-shadow: 0 4px 12px rgba(244, 161, 98, 0.25);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(244, 161, 98, 0.4);
    }
  `}
  
  ${props => props.$variant === 'secondary' && css`
    background: linear-gradient(to right, var(--navy), var(--navy-dark));
    color: white;
    box-shadow: 0 4px 12px rgba(61, 93, 82, 0.25);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(61, 93, 82, 0.4);
    }
  `}
  
  ${props => props.$variant === 'outline' && css`
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
  `}
  
  ${props => props.size === 'small' && css`
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 30px;
  `}
  
  ${props => props.size === 'medium' && css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 30px;
  `}
  
  ${props => props.size === 'large' && css`
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
  `}
  
  ${props => props.size === 'xlarge' && css`
    padding: 1.25rem 2.75rem;
    font-size: 1.2rem;
    border-radius: 50px;
    min-width: 220px;
  `}
  
  ${props => props.isFullWidth && css`
    width: 100%;
  `}
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

export const CardContent = styled.div`
  padding: 2rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--gray-dark);
  margin-bottom: 1rem;
`;

export const CardText = styled.p`
  color: var(--gray);
  margin-bottom: 1.5rem;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: var(--gray-light);
  margin: 2rem 0;
  width: 100%;
`;

export const MotionContainer = styled(motion.div)`
  position: relative;
`;

export const PriceTag = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gray-dark);
  margin: 1rem 0;
  
  .currency {
    font-size: 1rem;
    font-weight: 400;
    vertical-align: super;
    margin-right: 0.25rem;
  }
`;
