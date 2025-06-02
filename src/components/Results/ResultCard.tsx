import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DowryBreakdown, ChartData } from '../../types';
import DowryBreakdownComponent from './DowryBreakdown';
import PieChart from './PieChart';
import MemeDisplay from './MemeDisplay';
import { getTagline, formatCurrency, prepareChartData } from '../../utils/calculations';
import { Download, Share2 } from 'lucide-react';

interface ResultCardProps {
  breakdown: DowryBreakdown;
  showMemes: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ breakdown, showMemes }) => {
  const [showNegotiationGame, setShowNegotiationGame] = useState(false);
  const [negotiationMultiplier, setNegotiationMultiplier] = useState(1);
  
  const chartData: ChartData[] = prepareChartData(breakdown);
  const tagline = getTagline(breakdown.total);
  
  const adjustedTotal = breakdown.total * negotiationMultiplier;
  
  const handleShareResult = () => {
    const shareText = `According to the Desi Dahej Calculator, my dowry estimate is ${formatCurrency(adjustedTotal)}! ${tagline} Check it out! #DesiDahejCalculator #SayNoToDowry`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Dahej Calculation Result',
        text: shareText,
        url: window.location.href,
      }).catch((err) => {
        console.error('Could not share:', err);
        alert('Copied to clipboard!');
        navigator.clipboard.writeText(shareText);
      });
    } else {
      alert('Copied to clipboard!');
      navigator.clipboard.writeText(shareText);
    }
  };
  
  const handleDownloadResult = () => {
    // In a real app, this would generate a PDF or image
    // For now, we'll just show an alert
    alert('In a real app, this would download a PDF with your dahej calculation results!');
  };
  
  const startNegotiationGame = () => {
    setShowNegotiationGame(true);
  };
  
  const handleNegotiationResult = (agreed: boolean) => {
    if (agreed) {
      // If user agrees to demands, double the dowry
      setNegotiationMultiplier(2);
      alert('Negotiations failed! Your dowry amount has doubled! 😱');
    } else {
      // If user refuses demands, keep the original dowry
      alert('You stood your ground! Good job standing up against dowry demands! 👏');
    }
    setShowNegotiationGame(false);
  };
  
  return (
    <div id="results">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card mb-6 border-2 border-gold">
          <h2 className="text-center text-2xl md:text-3xl font-baloo font-bold mb-4">
            <span className="gold-gradient">Official Dahej Report</span>
          </h2>
          
          <div className="shimmer mb-6 p-4 border border-gold-light rounded-lg bg-ivory">
            <p className="text-xl md:text-2xl text-center font-medium">{tagline}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-baloo mb-3 text-maroon">Dowry Breakdown</h3>
              <DowryBreakdownComponent breakdown={{ ...breakdown, total: adjustedTotal }} />
            </div>
            
            <div>
              <h3 className="text-xl font-baloo mb-3 text-maroon">Dowry Components</h3>
              <PieChart data={chartData} />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center">
            <button
              onClick={handleShareResult}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share Result
            </button>
            
            <button
              onClick={handleDownloadResult}
              className="btn-gold flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Certificate
            </button>
            
            <button
              onClick={startNegotiationGame}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Negotiation Game
            </button>
          </div>
        </div>
        
        {showNegotiationGame && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-baloo mb-4 text-maroon">Negotiation Challenge</h3>
              <p className="mb-6">The groom's family has made additional demands! Will you agree?</p>
              <p className="font-medium mb-4">
                "We would like a luxury car and 100g more gold in the dowry package."
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => handleNegotiationResult(false)}
                  className="btn-secondary"
                >
                  Refuse
                </button>
                <button
                  onClick={() => handleNegotiationResult(true)}
                  className="btn-gold"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      <MemeDisplay show={showMemes} />
    </div>
  );
};

export default ResultCard;