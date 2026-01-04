'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MangalDosha {
  has_mangal_dosha: boolean;
  type: string;
  severity: string;
  effects: string[];
  remedies: string[];
  [key: string]: boolean | string | string[] | undefined;
}

interface MangalDoshaCardProps {
  dosha: MangalDosha;
}

const MangalDoshaCard: React.FC<MangalDoshaCardProps> = ({ dosha }) => {
  if (!dosha || typeof dosha !== 'object') return null;

  // Check if has_mangal_dosha property exists and is a boolean
  const hasValidStatus = 'has_mangal_dosha' in dosha && typeof dosha.has_mangal_dosha === 'boolean';
  
  // Check if there are any meaningful additional values in the dosha object
  const hasAdditionalData = dosha.type || dosha.severity || 
    (Array.isArray(dosha.effects) && dosha.effects.length > 0) ||
    (Array.isArray(dosha.remedies) && dosha.remedies.length > 0);
  
  if (!hasValidStatus && !hasAdditionalData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 border ${
        dosha.has_mangal_dosha 
          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
          : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
      }`}
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">
          {dosha.has_mangal_dosha ? '🔴' : '🟢'}
        </span>
        <h3 className="text-xl font-semibold text-gray-800">Mangal Dosha</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-orange-100">
          <span className="font-medium text-gray-700">Status:</span>
          <span className={`font-bold px-3 py-1 rounded-full text-sm ${
            dosha.has_mangal_dosha 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {dosha.has_mangal_dosha ? 'Present' : 'Not Present'}
          </span>
        </div>
      </div>
      
      {dosha.has_mangal_dosha && (
        <>
          {dosha.type && (
            <div className="mb-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏷️</span>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 font-medium">{dosha.type}</span>
                </div>
              </div>
            </div>
          )}
          
          {dosha.severity && (
            <div className="mb-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                <div className="flex items-center">
                  <span className="text-lg mr-2">⚖️</span>
                  <span className="font-medium text-gray-700">Severity:</span>
                  <span className="ml-2 font-medium">{dosha.severity}</span>
                </div>
              </div>
            </div>
          )}
          
          {dosha.effects && Array.isArray(dosha.effects) && dosha.effects.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Effects:</h4>
              <div className="space-y-2">
                {dosha.effects.map((effect, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-3 text-sm border border-orange-100 flex items-start"
                  >
                    <span className="mr-2">⚠️</span>
                    <span>{effect}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {dosha.remedies && Array.isArray(dosha.remedies) && dosha.remedies.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Remedies:</h4>
              <div className="space-y-2">
                {dosha.remedies.map((remedy, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-3 text-sm border border-orange-100 flex items-start"
                  >
                    <span className="mr-2">ॐ</span>
                    <span>{remedy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {!dosha.has_mangal_dosha && (
        <div className="text-center py-4">
          <p className="text-green-700 font-medium">Congratulations! No Mangal Dosha detected in your chart.</p>
        </div>
      )}
    </motion.div>
  );
};

export default MangalDoshaCard;