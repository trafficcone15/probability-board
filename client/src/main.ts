import './style.css';
import { Visualisation } from './Visualisation';

// Sample initialization of ProbabilisticObjects
const objects: ProbabilisticObject[] = [
  {
    position: 0,
    qProbability: 0.2, // Example probability for being in this position
    zLayers: [
      { depth: 0, probability: 0.5 }, // Example probability for this layer
      { depth: 1, probability: 0.3 },
      { depth: 2, probability: 0.2 },
      { depth: 3, probability: 0.0 },
    ],
  },
  {
    position: 1,
    qProbability: 0.3,
    zLayers: [
      { depth: 0, probability: 0.1 },
      { depth: 1, probability: 0.4 },
      { depth: 2, probability: 0.4 },
      { depth: 3, probability: 0.1 },
    ],
  },
  // ... add more objects as needed ...
];

const gridSize = 3;
const visualisation = new Visualisation(objects, gridSize);