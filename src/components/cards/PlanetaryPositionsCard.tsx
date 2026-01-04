'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PlanetPosition {
  id: number;
  name: string;
  position: number;
  nakshatra: string;
  sign: string;
  degree: number;
  [key: string]: number | string | undefined;
}

interface PlanetaryPositionsCardProps {
  planets: PlanetPosition[];
}

const PlanetaryPositionsCard: React.FC<PlanetaryPositionsCardProps> = ({ planets }) => {
  if (!planets || !Array.isArray(planets) || planets.length === 0) return null;

  // Filter out planets with no meaningful data
  const validPlanets = planets.filter(planet => 
    planet && 
    typeof planet === 'object' && 
    (planet.name || planet.sign || planet.nakshatra || planet.position !== undefined)
  );
  
  if (validPlanets.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🪐</span>
        <h3 className="text-xl font-semibold text-gray-800">Planetary Positions</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validPlanets.map((planet, index) => (
          <motion.div 
            key={planet.id || index}
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg text-gray-800">{planet.name || 'Unknown Planet'}</h4>
              <span className="text-2xl">🪐</span>
            </div>
            
            <div className="space-y-2">
              {planet.sign && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sign:</span>
                  <span className="font-medium">{planet.sign}</span>
                </div>
              )}
              
              {planet.nakshatra && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Nakshatra:</span>
                  <span className="font-medium">{planet.nakshatra}</span>
                </div>
              )}
              
              {planet.position !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-medium">{planet.position}°</span>
                </div>
              )}
              
              {planet.degree !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Degree:</span>
                  <span className="font-medium">{planet.degree}°</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PlanetaryPositionsCard;