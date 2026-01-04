'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Papasamyam {
  total_score: number;
  category: string;
  interpretation: string;
  remedial_measures: string[];
  [key: string]: number | string | string[] | undefined;
}

interface PapasamyamCardProps {
  papa: Papasamyam;
}

const PapasamyamCard: React.FC<PapasamyamCardProps> = ({ papa }) => {
  if (!papa || typeof papa !== 'object') return null;

  // Check if there are any meaningful values in the papa object
  const hasMeaningfulData = papa.total_score !== undefined && papa.total_score !== null &&
    papa.category !== undefined && papa.category !== null && papa.category !== '' ||
    papa.interpretation !== undefined && papa.interpretation !== null && papa.interpretation !== '' ||
    (papa.remedial_measures && Array.isArray(papa.remedial_measures) && papa.remedial_measures.length > 0);
  
  if (!hasMeaningfulData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">⚖️</span>
        <h3 className="text-xl font-semibold text-gray-800">Papasamyam</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {papa.total_score !== undefined && papa.total_score !== null && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center">
              <span className="text-lg mr-2">📊</span>
              <span className="font-medium text-gray-700">Total Score:</span>
              <span className="ml-2 font-bold text-lg">{papa.total_score}</span>
            </div>
          </div>
        )}
        
        {papa.category !== undefined && papa.category !== null && papa.category !== '' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center">
              <span className="text-lg mr-2">🏷️</span>
              <span className="font-medium text-gray-700">Category:</span>
              <span className="ml-2 font-bold">{papa.category}</span>
            </div>
          </div>
        )}
      </div>
      
      {papa.interpretation && papa.interpretation !== '' && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Interpretation:</h4>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <p className="text-gray-700">{papa.interpretation}</p>
          </div>
        </div>
      )}
      
      {papa.remedial_measures && Array.isArray(papa.remedial_measures) && papa.remedial_measures.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Remedial Measures:</h4>
          <div className="space-y-2">
            {papa.remedial_measures.map((measure, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-3 text-sm border border-purple-100 flex items-start"
              >
                <span className="mr-2">🙏</span>
                <span>{measure}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PapasamyamCard;