
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const fadeInDown = {
  initial: { 
    opacity: 0, 
    y: -20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const fadeIn = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const scaleIn = {
  initial: { 
    opacity: 0,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {}
};

export const staggerItems = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const slideInFromRight = {
  initial: { x: 30, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    x: 20, 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const slideInFromLeft = {
  initial: { x: -30, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    x: -20, 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const buttonHoverScale = {
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: [0.23, 1, 0.32, 1]
  }
};

export const buttonTapScale = {
  scale: 0.98,
  transition: {
    duration: 0.1,
    ease: [0.23, 1, 0.32, 1]
  }
};
