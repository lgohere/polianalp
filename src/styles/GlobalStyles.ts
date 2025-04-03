import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --teal: #5C8376;
    --teal-light: rgba(92, 131, 118, 0.2);
    --teal-dark: #3D5D52;
    --peach: #F4A162;
    --peach-light: #FCF0E4;
    --peach-dark: #E88841;
    --blue-light: #D1E4E9;
    --navy: #2A3852;
    --navy-light: #3B4B6B;
    --navy-dark: #1A2439;
    --beige: #F7EBE1;
    --gold: #FFD56F;
    --gray: #718096;
    --gray-light: #E2E8F0;
    --gray-dark: #2D3748;
    --text: #4A5568;
    --background: #FFFFFF;
    --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --radius: 0.5rem;
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--text);
    background-color: var(--background);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--gray-dark);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--teal);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--teal-dark);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  ul, ol {
    list-style-position: inside;
  }

  section {
    padding: 4rem 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .mb-1 {
    margin-bottom: 0.5rem;
  }

  .mb-2 {
    margin-bottom: 1rem;
  }

  .mb-3 {
    margin-bottom: 1.5rem;
  }

  .mb-4 {
    margin-bottom: 2rem;
  }

  .mb-5 {
    margin-bottom: 2.5rem;
  }

  .mt-1 {
    margin-top: 0.5rem;
  }

  .mt-2 {
    margin-top: 1rem;
  }

  .mt-3 {
    margin-top: 1.5rem;
  }

  .mt-4 {
    margin-top: 2rem;
  }

  .mt-5 {
    margin-top: 2.5rem;
  }

  .py-1 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .py-2 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .py-3 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .py-4 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .py-5 {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .px-1 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .px-2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .px-3 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .px-4 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .px-5 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .w-full {
    width: 100%;
  }

  .text-teal {
    color: var(--teal);
  }

  .text-peach {
    color: var(--peach);
  }

  .text-gold {
    color: var(--gold);
  }

  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    section {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyles;
