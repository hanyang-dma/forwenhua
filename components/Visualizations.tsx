import React, { useEffect, useRef, useState } from 'react';
import { Concept } from '../types';

interface VisualizationProps {
  type: Concept['type'];
  isActive: boolean;
}

// --- Neural Network Visualization ---
const NeuralNetViz: React.FC = () => {
  const [activations, setActivations] = useState<number[][]>([
    [1, 1, 1], // Input
    [0, 0, 0, 0], // Hidden
    [0, 0] // Output
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomize activations to simulate processing
      setActivations([
        [Math.random(), Math.random(), Math.random()],
        [Math.random(), Math.random(), Math.random(), Math.random()],
        [Math.random(), Math.random()]
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden relative">
      <svg width="100%" height="100%" viewBox="0 0 300 200" className="opacity-80">
        {/* Connections Layer 1 to 2 */}
        {activations[0].map((_, i) => 
          activations[1].map((_, j) => (
            <line 
              key={`l1-${i}-${j}`} 
              x1={50} y1={50 + i * 50} 
              x2={150} y2={40 + j * 40} 
              stroke="black" 
              strokeWidth={activations[0][i] * activations[1][j] * 2} 
              opacity={0.1 + activations[0][i] * 0.3}
            />
          ))
        )}
        {/* Connections Layer 2 to 3 */}
        {activations[1].map((_, i) => 
          activations[2].map((_, j) => (
            <line 
              key={`l2-${i}-${j}`} 
              x1={150} y1={40 + i * 40} 
              x2={250} y2={75 + j * 50} 
              stroke="black" 
              strokeWidth={activations[1][i] * activations[2][j] * 2}
              opacity={0.1 + activations[1][i] * 0.3}
            />
          ))
        )}

        {/* Nodes */}
        {activations[0].map((val, i) => (
          <circle key={`n1-${i}`} cx={50} cy={50 + i * 50} r={8} fill="white" stroke="black" strokeWidth={2 + val * 2} />
        ))}
        {activations[1].map((val, i) => (
          <circle key={`n2-${i}`} cx={150} cy={40 + i * 40} r={8} fill="white" stroke="black" strokeWidth={2 + val * 2} />
        ))}
        {activations[2].map((val, i) => (
          <circle key={`n3-${i}`} cx={250} cy={75 + i * 50} r={8} fill={val > 0.5 ? "black" : "white"} stroke="black" strokeWidth={2} />
        ))}
      </svg>
    </div>
  );
};

// --- Gradient Descent Visualization ---
const GradientViz: React.FC = () => {
  const [step, setStep] = useState(0);
  
  // Simple parabola: y = 0.01(x-150)^2 + 20
  const getY = (x: number) => 0.005 * Math.pow(x - 150, 2) + 50;
  
  // Path for the ball
  const pathPoints = [];
  for(let x = 50; x <= 250; x+=10) {
    pathPoints.push(`${x},${getY(x)}`);
  }
  const pathD = `M ${pathPoints.join(' L ')}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 20); // 20 steps to converge
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Calculate ball position
  // Start at x=50, move towards 150
  const progress = step / 19; 
  // Ease out function to simulate slowing down at bottom
  const easedProgress = 1 - Math.pow(1 - progress, 3); 
  const currentX = 50 + (100 * easedProgress); // Move from 50 to 150
  const currentY = getY(currentX);

  // Tangent line (gradient)
  const slope = 0.01 * (currentX - 150);
  const x1 = currentX - 20;
  const y1 = currentY - slope * 20;
  const x2 = currentX + 20;
  const y2 = currentY + slope * 20;

  return (
    <div className="w-full h-64 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg relative overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 300 200">
        <path d={pathD} fill="none" stroke="#ddd" strokeWidth="2" />
        {/* Tangent Line */}
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1" strokeDasharray="4" opacity={0.6} />
        {/* Ball */}
        <circle cx={currentX} cy={currentY} r={8} fill="black" />
        <text x="20" y="30" fontSize="10" fill="#666">Cost: {Math.round(currentY)}</text>
      </svg>
    </div>
  );
};

// --- Diffusion Visualization ---
const DiffusionViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = adding noise, -1 = denoising

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    const draw = () => {
      // Clear
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, size, size);

      // Draw "Target" (A simple circle)
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = 60;

      // Noise factor (0 = clear, 1 = total noise)
      const noiseLevel = time / 100;

      for (let i = 0; i < 2000; i++) {
        // Random point in circle
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radius;
        let x = centerX + r * Math.cos(angle);
        let y = centerY + r * Math.sin(angle);

        // Add noise
        x += (Math.random() - 0.5) * noiseLevel * 300;
        y += (Math.random() - 0.5) * noiseLevel * 300;

        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 2, 2);
      }
    };

    draw();
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => {
        if (t >= 100) { setDirection(-1); return 99; }
        if (t <= 0) { setDirection(1); return 1; }
        return t + direction;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="w-full h-64 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg relative">
      <canvas ref={canvasRef} className="border border-zinc-100 bg-white" style={{ width: 200, height: 200 }} />
      <div className="absolute bottom-2 right-2 text-xs text-zinc-500">
        {direction === 1 ? 'Adding Noise...' : 'Denoising...'}
      </div>
    </div>
  );
};

// --- Attention Visualization ---
const AttentionViz: React.FC = () => {
  const words = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired"];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Simplified attention weights matrix (fake data for demo)
  // When "it" (index 7) is hovered, it attends strongly to "animal" (1) and "tired" (10).
  const getOpacity = (source: number, target: number) => {
    if (source === target) return 0;
    if (source === 7) { // "it"
       if (target === 1) return 0.9; // animal
       if (target === 10) return 0.5; // tired
       return 0.1;
    }
    // Randomish logic for others
    const dist = Math.abs(source - target);
    return Math.max(0.1, 1 - dist * 0.2); 
  };

  return (
    <div className="w-full h-64 flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg relative px-4">
      <div className="text-sm text-zinc-500 mb-8 w-full text-center">Hover over a word to visualize attention weights</div>
      <div className="flex justify-between w-full relative">
        {/* Draw arcs */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ top: '-40px', height: '100px' }}>
            {hoveredIndex !== null && words.map((_, i) => {
                if (i === hoveredIndex) return null;
                const opacity = getOpacity(hoveredIndex, i);
                if (opacity < 0.2) return null;
                
                // Calculate rough positions based on percentage (naive implementation)
                const startX = (hoveredIndex / (words.length - 1)) * 100;
                const endX = (i / (words.length - 1)) * 100;
                
                // SVG coordinates are tricky with flexbox, using percentage approximations
                // For a real production app, use useRef/getBoundingClientRect
                return (
                    <path 
                        key={i}
                        d={`M ${startX}% 50 Q ${(startX + endX) / 2}% ${50 - opacity * 40} ${endX}% 50`}
                        fill="none"
                        stroke="black"
                        strokeWidth={opacity * 3}
                        strokeOpacity={opacity}
                    />
                )
            })}
        </svg>

        {words.map((word, idx) => (
            <span 
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`cursor-pointer px-1 py-1 rounded transition-colors z-10 ${hoveredIndex === idx ? 'bg-black text-white' : 'hover:bg-zinc-200'}`}
            >
                {word}
            </span>
        ))}
      </div>
      {hoveredIndex === 7 && (
          <div className="mt-8 text-xs text-center text-zinc-600">
              Note how "it" pays attention to "animal" (reference) and "tired" (context).
          </div>
      )}
    </div>
  )
}

const GenericViz: React.FC = () => (
    <div className="w-full h-64 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400">
        Interactive visualization not available for this concept.
    </div>
)

export const ConceptVisualization: React.FC<VisualizationProps> = ({ type, isActive }) => {
  if (!isActive) return null;

  switch (type) {
    case 'neural-net': return <NeuralNetViz />;
    case 'gradient': return <GradientViz />;
    case 'diffusion': return <DiffusionViz />;
    case 'attention': return <AttentionViz />;
    default: return <GenericViz />;
  }
};