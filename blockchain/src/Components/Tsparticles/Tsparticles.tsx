import Particles from "react-tsparticles";
import "./Tsparticles.css";
import { loadFull } from "tsparticles";

function Tsparticles(): JSX.Element {
    const particlesInit = async (main:any) => {
        await loadFull(main);
      };
    
      return (
        <div id="particles-js">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push"
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse"
                  },
                  resize: true
                },
                modes: {
                  push: {
                    quantity: 4
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4
                  }
                }
              },
              particles: {
                color: {
                  value: "#000"
                },
                links: {
                  color: "#000",
                  distance: 150,
                  enable: true,
                  opacity: 0.7,
                  width: 0.6
                },
                collisions: {
                  enable: true
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce"
                  },
                  random: false,
                  speed: 0.3,
                  straight: false
                },
                number: {
                  density: {
                    enable: true,
                    area: 800
                  },
                  value: 20
                },
                opacity: {
                  value: 0.5
                },
                shape: {
                  type: "circle"
                },
                size: {
                  value: { min: 1, max: 3 }
                }
              },
              detectRetina: true
            }}
          />
    
        </div>
      );
    }

export default Tsparticles;
