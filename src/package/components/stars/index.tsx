import Particles, { CollisionMode, IOptions, RecursivePartial } from "react-tsparticles";


const startConfig:  RecursivePartial<IOptions> = {
  background: {
    color: {
        value: "transparent",
    },
  },
  fpsLimit: 30,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#4d4d4d"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 0.1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  retina_detect: false
}

export default function Stars(props) {
  return (
      <Particles
        style={{zIndex: -1, position: "fixed", top: 0, left: 0, bottom: 0,}}
        options={startConfig}
      />
  );
}
