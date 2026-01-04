'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BirthChartCardProps {
  chartSvg: string;
}

const BirthChartCard: React.FC<BirthChartCardProps> = ({ chartSvg }) => {
  if (!chartSvg || typeof chartSvg !== 'string') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Birth Chart (Rasi)</h2>
        
        {/* Astronomical background elements */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-orange-100/30 to-rose-100/30 blur-xl opacity-50"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-200/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-200/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          
          <motion.div 
            className="relative bg-white rounded-2xl p-6 border border-orange-200 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center">
              <div 
                className="chart-container overflow-auto max-w-full max-h-[600px] bg-gray-50 p-4 rounded-lg"
                dangerouslySetInnerHTML={{ __html: chartSvg }} 
              />
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-2xl"
          >
            ☉
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-2xl"
          >
            ☽
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="text-2xl"
          >
            ☿
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BirthChartCard;