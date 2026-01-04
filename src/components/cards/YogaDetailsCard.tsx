'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface YogaDetail {
  name: string;
  description: string;
  effect: string;
  [key: string]: string | undefined;
}

interface YogaDetailsCardProps {
  yogas: YogaDetail[];
}

const YogaDetailsCard: React.FC<YogaDetailsCardProps> = ({ yogas }) => {
  if (!yogas || !Array.isArray(yogas) || yogas.length === 0) return null;

  // Filter out yogas with no meaningful data
  const validYogas = yogas.filter(yoga => 
    yoga && 
    typeof yoga === 'object' && 
    (yoga.name || yoga.description || yoga.effect)
  );
  
  if (validYogas.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🧘</span>
        <h3 className="text-xl font-semibold text-gray-800">Yoga Details</h3>
      </div>
      
      <div className="space-y-4">
        {validYogas.map((yoga, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <span className="text-xl mr-3 mt-1">✨</span>
              <div className="flex-1">
                {yoga.name && (
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{yoga.name}</h4>
                )}
                {yoga.description && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Description:</span>
                    <p className="text-gray-600 mt-1">{yoga.description}</p>
                  </div>
                )}
                {yoga.effect && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Effect:</span>
                    <p className="text-gray-600 mt-1">{yoga.effect}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default YogaDetailsCard;