import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Declare global interface to avoid TypeScript errors
declare global {
  interface Window {
    particlesJS: any;
  }
}

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ParticlesBackground: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS && particlesRef.current) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 1500
            }
          },
          color: {
            value: ["#ffffff", "#f8f8ff", "#fffafa", "#ffffe0", "#f0ffff"]
          },
          shape: {
            type: "star",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "bubble"
            },
            onclick: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 0.5
              }
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 1,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true,
        background: {
          color: "transparent",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover"
        }
      });
    }

    return () => {
      // Clean up if needed
    };
  }, []);

  return <ParticlesContainer id="particles-js" ref={particlesRef} />;
};

export default ParticlesBackground;
