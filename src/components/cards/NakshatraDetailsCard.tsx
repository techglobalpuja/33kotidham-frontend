'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NakshatraDetails {
  name: string;
  meaning: string;
  lord: string;
  gender: string;
  quality: string;
  gan: string;
  nadi: string;
  devata: string;
  pada_1: string;
  pada_2: string;
  pada_3: string;
  pada_4: string;
  [key: string]: string | undefined; // Allow for additional properties
}

interface NakshatraDetailsCardProps {
  details: NakshatraDetails;
}

const NakshatraDetailsCard: React.FC<NakshatraDetailsCardProps> = ({ details }) => {
  if (!details || typeof details !== 'object') return null;

  // Check if there are any meaningful values in the details object
  const hasMeaningfulData = Object.values(details).some(value => 
    value !== undefined && value !== null && value !== '' && 
    !(Array.isArray(value) && value.length === 0)
  );
  
  if (!hasMeaningfulData) return null;

  const detailsList = [
    { label: 'Name', value: details.name, icon: '⭐' },
    { label: 'Meaning', value: details.meaning, icon: '📝' },
    { label: 'Lord', value: details.lord, icon: '👑' },
    { label: 'Gender', value: details.gender, icon: '⚥' },
    { label: 'Quality', value: details.quality, icon: '💎' },
    { label: 'Gan', value: details.gan, icon: '🛡️' },
    { label: 'Nadi', value: details.nadi, icon: '🌊' },
    { label: 'Deity', value: details.devata, icon: '🕉️' },
  ];

  // Filter out entries with empty values
  const validDetailsList = detailsList.filter(detail => 
    detail.value !== undefined && detail.value !== null && detail.value !== ''
  );

  if (validDetailsList.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-6 border border-orange-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🌟</span>
        <h3 className="text-xl font-semibold text-gray-800">Nakshatra Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validDetailsList.map((detail, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-orange-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{detail.icon}</span>
              <span className="font-medium text-gray-700">{detail.label}:</span>
            </div>
            <div className="mt-1 text-gray-900 font-medium">{detail.value}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Pada details */}
      {details.pada_1 && details.pada_2 && details.pada_3 && details.pada_4 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Pada Details:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Pada 1</div>
              <div className="font-medium">{details.pada_1}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Pada 2</div>
              <div className="font-medium">{details.pada_2}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Pada 3</div>
              <div className="font-medium">{details.pada_3}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Pada 4</div>
              <div className="font-medium">{details.pada_4}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NakshatraDetailsCard;