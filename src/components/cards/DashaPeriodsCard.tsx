'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DashaPeriod {
  planet: string;
  start_date: string;
  end_date: string;
  duration: string;
  [key: string]: string | number | undefined;
}

interface DashaBalance {
  planet: string;
  remaining: string;
  percentage: number;
  [key: string]: string | number | undefined;
}

interface DashaPeriodsCardProps {
  dashaBalance?: DashaBalance;
  dashaPeriods?: DashaPeriod[];
}

const DashaPeriodsCard: React.FC<DashaPeriodsCardProps> = ({ dashaBalance, dashaPeriods }) => {
  const hasValidDashaBalance = dashaBalance && typeof dashaBalance === 'object' && 
    dashaBalance.planet !== undefined && dashaBalance.planet !== null && dashaBalance.planet !== '' &&
    dashaBalance.remaining !== undefined && dashaBalance.remaining !== null && dashaBalance.remaining !== '';
  
  const hasValidDashaPeriods = dashaPeriods && Array.isArray(dashaPeriods) && dashaPeriods.length > 0 &&
    dashaPeriods.some(dasha => 
      dasha && 
      typeof dasha === 'object' && 
      dasha.planet !== undefined && dasha.planet !== null && dasha.planet !== ''
    );
  
  if (!hasValidDashaBalance && !hasValidDashaPeriods) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">⏳</span>
        <h3 className="text-xl font-semibold text-gray-800">Dasha Periods</h3>
      </div>
      
      {hasValidDashaBalance && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Current Dasha Balance</h4>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Planet</div>
                <div className="font-bold text-lg">{dashaBalance.planet}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Remaining</div>
                <div className="font-bold text-lg">{dashaBalance.remaining}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Percentage</div>
                <div className="font-bold text-lg">{dashaBalance.percentage}%</div>
              </div>
            </div>
            
            {/* Progress bar for the current dasha */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${dashaBalance.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {hasValidDashaPeriods && (
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Dasha Periods</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {dashaPeriods
              .filter(dasha => 
                dasha && 
                typeof dasha === 'object' && 
                dasha.planet !== undefined && dasha.planet !== null && dasha.planet !== ''
              )
              .map((dasha, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-gray-800">{dasha.planet}</h5>
                      <div className="text-sm text-gray-600">
                        {dasha.start_date && dasha.end_date ? 
                          `${dasha.start_date} to ${dasha.end_date}` : 
                          'Dates not available'
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{dasha.duration || 'Duration not specified'}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashaPeriodsCard;