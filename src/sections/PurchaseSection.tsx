import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, SectionTitle, Button, PriceTag } from '../styles/StyledComponents';
import { FaBook, FaShippingFast, FaDownload, FaMedal, FaBookReader, FaHeadset, FaHeart, FaHandHoldingHeart, FaWhatsapp } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { MdDevices, MdLibraryBooks } from 'react-icons/md';
import { FaCheck, FaTimes } from 'react-icons/fa';
import IconElement from '../components/IconElement';
import ParticlesBackground from '../components/ParticlesBackground';

const PurchaseWrapper = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
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
    z-index: 0;
  }
`;

const PurchaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 2.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-top: 2rem;
  }
`;

const SectionWhite = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 1rem;
  margin: 3rem 0;
  position: relative;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const PlanCard = styled.div<{ $isSelected?: boolean; isPopular?: boolean; disabled?: boolean }>`
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border: ${props => props.$isSelected 
    ? '2px solid var(--peach)' 
    : props.isPopular 
      ? '2px solid var(--peach-light)' 
      : '1px solid var(--gray-light)'};
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  opacity: ${props => props.disabled ? 0.6 : 1};
  filter: ${props => props.disabled ? 'grayscale(80%)' : 'none'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  ${props => props.$isSelected && !props.disabled && `
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
  `}
  
  &:hover {
    transform: ${props => !props.disabled ? 'translateY(-8px)' : 'none'};
    box-shadow: ${props => !props.disabled ? '0 20px 30px rgba(0, 0, 0, 0.12)' : '0 10px 20px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => !props.disabled ? (props.isPopular ? 'var(--peach)' : 'var(--peach-light)') : 'var(--gray-light)'};
  }
`;

const PlanHeader = styled.div<{ isPopular?: boolean }>`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const PlanIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(244, 161, 98, 0.1);
  color: var(--peach);
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--navy);
  display: flex;
  align-items: flex-start;
  
  &::before {
    content: 'R$';
    font-size: 1rem;
    margin-right: 0.25rem;
    font-weight: 600;
    margin-top: 0.25rem;
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1.5rem 2rem 0.5rem;
  color: var(--gray-dark);
`;

const PlanDescription = styled.p`
  color: var(--gray);
  margin: 0 2rem 1.5rem;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const PlanFeatures = styled.div`
  margin: 0 2rem;
  flex: 1;
`;

const PlanFeature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  
  svg {
    color: var(--peach);
    margin-right: 0.75rem;
    min-width: 16px;
  }
  
  span {
    color: var(--gray-dark);
  }
`;

const PlanFooter = styled.div`
  margin-top: auto;
  text-align: center;
  padding: 0 2rem;
`;

const SelectPlanButton = styled.button<{ $isSelected?: boolean; disabled?: boolean }>`
  background: ${props => props.$isSelected 
    ? 'linear-gradient(to right, var(--peach), var(--peach-dark))' 
    : props.disabled ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  color: ${props => props.$isSelected ? 'white' : props.disabled ? 'rgba(255, 255, 255, 0.4)' : 'var(--peach)'};
  border: ${props => props.$isSelected ? 'none' : props.disabled ? '1px solid rgba(255, 255, 255, 0.2)' : '2px solid var(--peach)'};
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 160px;
  width: 80%;
  
  &:hover {
    background: ${props => !props.disabled && !props.$isSelected && 'rgba(244, 161, 98, 0.1)'};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 12px;
  right: -35px;
  background: linear-gradient(to right, var(--peach), var(--peach-dark));
  color: white;
  padding: 0.25rem 2.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  transform: rotate(45deg);
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--gray);
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 20px;
  z-index: 10;
`;

const FormSection = styled.div`
  margin-top: 4rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 1rem;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-top: 2.5rem;
    border-radius: 0.75rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle at center, rgba(92, 131, 118, 0.15) 0%, rgba(92, 131, 118, 0) 70%);
    border-radius: 50%;
    bottom: -100px;
    left: -100px;
    z-index: -1;
    
    @media (max-width: 480px) {
      width: 150px;
      height: 150px;
      bottom: -75px;
      left: -75px;
    }
  }
`;

const FormTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 500;
    color: white;
    font-size: 0.95rem;
    
    @media (max-width: 768px) {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
  }
  
  .required::after {
    content: '*';
    color: var(--peach);
    margin-left: 0.25rem;
    font-size: 1.1rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
      border-radius: 0.5rem;
    }
    
    &:focus {
      outline: none;
      border-color: var(--peach);
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    &:invalid:not(:placeholder-shown) {
      border-color: #ff6b6b;
    }
    
    &:valid:not(:placeholder-shown) {
      border-color: #69db7c;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
    
    @media (max-width: 768px) {
      min-height: 100px;
    }
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 1rem) center;
    padding-right: 2.5rem;
  }
`;

const FormHeaderSection = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const DeliverySection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: white;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      text-align: center;
    }
  }
`;

const FormFooter = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-column: span 1;
    margin-top: 1.5rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, var(--peach), var(--peach-dark));
  color: white;
  border: none;
  padding: 1.25rem 3.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(244, 161, 98, 0.3);
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(244, 161, 98, 0.4);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DonationSection = styled.div`
  margin-top: 4rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 1rem;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle at center, rgba(244, 161, 98, 0.2) 0%, rgba(244, 161, 98, 0) 70%);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    z-index: -1;
  }
`;

const DonationTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  span {
    margin-left: 0.75rem;
    display: inline-flex;
    color: var(--peach);
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const DonationDescription = styled.p`
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 1.1rem;
  max-width: 800px;
`;

const DonationCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const DonationAmounts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DonationAmount = styled.button<{ isSelected?: boolean }>`
  background: ${({ isSelected }) => isSelected
    ? 'linear-gradient(to right, var(--peach), var(--peach-dark))'
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ isSelected }) => isSelected
    ? 'var(--peach)'
    : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 120px;
  
  &:hover {
    background: ${({ isSelected }) => isSelected
      ? 'linear-gradient(to right, var(--peach), var(--peach-dark))'
      : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const DonationCustom = styled.div`
  margin-top: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.75rem;
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
  }
`;

const CustomAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: var(--peach);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }
  
  span {
    font-size: 1.2rem;
    color: white;
    margin-right: 0.5rem;
    font-weight: 600;
  }
  
  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 1rem 0;
    font-size: 1.2rem;
    color: white;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const Message = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid var(--peach);
  display: flex;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    flex-direction: column;
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
    
    @media (max-width: 768px) {
      font-size: 0.85rem;
      line-height: 1.6;
    }
  }
  
  svg {
    margin-right: 1rem;
    min-width: 24px;
    color: var(--peach);
    
    @media (max-width: 480px) {
      margin-right: 0;
      margin-bottom: 0.75rem;
    }
  }
`;

const DonationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  button {
    padding: 1rem 2rem;
    font-size: 1rem;
    
    &:first-child {
      background: linear-gradient(to right, var(--peach), var(--peach-dark));
      box-shadow: 0 8px 15px rgba(244, 161, 98, 0.3);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(244, 161, 98, 0.4);
      }
    }
  }
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
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  color: var(--gray-dark);
  
  h3 {
    color: var(--navy);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  p {
    color: var(--gray);
    margin-bottom: 2rem;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  min-width: 120px;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(to right, var(--peach), var(--peach-dark));
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(244, 161, 98, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: var(--gray-light);
    color: var(--gray-dark);
    &:hover {
      background: var(--gray);
      color: white;
    }
  `}
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray);
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--gray-dark);
  }
`;

const WhatsAppIconWrapper = styled.span`
  margin-right: 0.5rem;
  color: #25D366;
  display: inline-flex;
  align-items: center;
`;

const PurchaseSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'digital' | 'printed' | 'combo'>('digital');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipcode: '',
    bookOption: 'digital' as 'digital' | 'printed' | 'combo',
    message: ''
  });
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update selectedPlan if bookOption changes
    if (name === 'bookOption') {
      setSelectedPlan(value as 'digital' | 'printed' | 'combo');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const redirectToWhatsApp = () => {
    const whatsappNumber = "14078207333";
    const bookOptionText = formData.bookOption === 'digital' ? 'E-book' : formData.bookOption;
    
    let message = `Olá gostaria de adquirir o livro As Vírgulas de Deus.\n\nMeus Dados:\n`;
    message += `Nome: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Telefone: ${formData.phone || 'N/A'}\n`;
    message += `Opção: ${bookOptionText}`;
    
    if (formData.bookOption === 'printed' || formData.bookOption === 'combo') {
      message += `\n\nEndereço de Entrega:\n`;
      message += `Rua: ${formData.street}, Nº: ${formData.number}\n`;
      message += `Complemento: ${formData.complement || 'N/A'}\n`;
      message += `Bairro: ${formData.neighborhood}\n`;
      message += `Cidade: ${formData.city}, Estado: ${formData.state}\n`;
      message += `CEP: ${formData.zipcode}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
  };
  
  return (
    <PurchaseWrapper id="purchase">
      <ParticlesBackground />
      <Container style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle color="white" className="beau-rivage-font">Adquira o Livro</SectionTitle>
        </motion.div>
        
        <FormSection ref={formRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <FormTitle>Dados para aquisição</FormTitle>
            <FormSubtitle>Preencha o formulário abaixo. A solicitação será finalizada via WhatsApp:</FormSubtitle>
            
            <Form onSubmit={handleSubmit}>
              <FormHeaderSection style={{ gridColumn: 'span 2' }}>
                <FormGroup>
                  <label htmlFor="name" className="required">Nome completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="email" className="required">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@email.com"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="phone">Telefone (WhatsApp)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="bookOption" className="required">Opção do livro</label>
                  <select
                    id="bookOption"
                    name="bookOption"
                    value={formData.bookOption}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="digital">E-book "As Vírgulas de Deus"</option>
                    <option disabled value="printed">Livro Impresso (Indisponível)</option>
                    <option disabled value="combo">Combo Completo (Indisponível)</option>
                  </select>
                </FormGroup>
              </FormHeaderSection>
              
              {(formData.bookOption === 'printed' || formData.bookOption === 'combo') && (
                <DeliverySection style={{ gridColumn: 'span 2' }}>
                  <h4>Endereço para entrega</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormGroup>
                      <label htmlFor="street" className="required">Rua</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Nome da rua"
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="number" className="required">Número</label>
                      <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        placeholder="Número"
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      />
                    </FormGroup>
                  </div>
                  
                  <FormGroup>
                    <label htmlFor="complement">Complemento</label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      placeholder="Apto, bloco, etc"
                    />
                  </FormGroup>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormGroup>
                      <label htmlFor="neighborhood" className="required">Bairro</label>
                      <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Bairro"
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="zipcode" className="required">CEP</label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        placeholder="00000-000"
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      />
                    </FormGroup>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormGroup>
                      <label htmlFor="city" className="required">Cidade</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Cidade"
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="state" className="required">Estado</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required={formData.bookOption === 'printed' || formData.bookOption === 'combo'}
                      >
                        <option value="">Selecione</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </FormGroup>
                  </div>
                </DeliverySection>
              )}
              
              <FormFooter>
                <SubmitButton type="submit" style={{ minWidth: '280px' }}>
                  Finalizar Pedido via WhatsApp
                </SubmitButton>
              </FormFooter>
            </Form>
          </motion.div>
        </FormSection>
        
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <ModalCloseButton onClick={closeModal}>
                <IconElement icon={FaTimes} />
              </ModalCloseButton>
              <h3><WhatsAppIconWrapper><IconElement icon={FaWhatsapp} /></WhatsAppIconWrapper> Confirmar Redirecionamento</h3>
              <p>Você será redirecionado para o WhatsApp para enviar sua solicitação com os dados preenchidos.</p>
              <ModalButtonContainer>
                <ModalButton variant="secondary" onClick={closeModal}>
                  Cancelar
                </ModalButton>
                <ModalButton variant="primary" onClick={redirectToWhatsApp}>
                  Confirmar e Abrir WhatsApp
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </PurchaseWrapper>
  );
};

export default PurchaseSection;
