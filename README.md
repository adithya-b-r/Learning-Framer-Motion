# Motion Framer React Project

## Overview
This project demonstrates various animation techniques using the `motion/react` library. It includes components that showcase animations, drag interactions, and hover effects, making it a useful reference for learning animation handling in React applications.

## Features
- **AnimateDiv**: Demonstrates keyframe animations, transformations, and transitions.
- **DragDiv**: Implements draggable elements with constraints and interactive scaling.
- **WhileDiv**: Showcases hover and tap interactions for dynamic UI responses.

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/adithya-b-r/Learning-Framer-Motion
   cd Learning-Framer-Motion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure
```
├── src
│   ├── Examples
│   │   ├── AnimateDiv.js
│   │   ├── DragDiv.js
│   │   ├── WhileDiv.js
│   ├── App.js
│   ├── App.css
└── package.json
```

## Usage
To enable different animations, modify `App.js` and uncomment the required component:
```jsx
import AnimateDiv from './Examples/AnimateDiv';
import WhileDiv from './Examples/WhileDiv';
import DragDiv from './Examples/DragDiv';

function App() {
  return (
    <>
      {/* <AnimateDiv /> */}
      {/* <WhileDiv/> */}
      <DragDiv/>
    </>
  );
}
export default App;
```

## Customization
- Modify the `AnimateDiv.js` file to experiment with different animation sequences.
- Change the `dragConstraints` in `DragDiv.js` to limit movement in specific directions.
- Adjust the styles in `App.css` to alter the appearance of the animated elements.

## Dependencies
- **Vite**
- **motion/react** (Framer Motion for animations)

## Contributing
Feel free to fork this repository and experiment with different animations. Contributions are welcome!