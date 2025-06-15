import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DowryBreakdown, ChartData } from '../../types';
import DowryBreakdownComponent from './DowryBreakdown';
import PieChart from './PieChart';
import MemeDisplay from './MemeDisplay';
import { getTagline, formatCurrency, prepareChartData } from '../../utils/calculations';
import { Download, Share2, Heart, Star, TrendingUp, TrendingDown } from 'lucide-react';
import jsPDF from 'jspdf';
import NegotiationGame from './NegotiationGame';

interface ResultCardProps {
  breakdown: DowryBreakdown;
  showMemes: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ breakdown, showMemes }) => {
  const [showNegotiationGame, setShowNegotiationGame] = useState(false);
  const [negotiationMultiplier, setNegotiationMultiplier] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add decorative border
    doc.setDrawColor(139, 0, 0); // Maroon color
    doc.setLineWidth(2);
    doc.roundedRect(10, 10, pageWidth - 20, 277, 3, 3);

    // Header
    doc.setFontSize(24);
    doc.setTextColor(139, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Official Dahej Calculation Certificate', pageWidth / 2, 30, { align: 'center' });
    
    // Decorative line
    doc.setDrawColor(218, 165, 32); // Gold color
    doc.setLineWidth(1);
    doc.line(30, 40, pageWidth - 30, 40);

    // Result
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Total ${breakdown.total < 0 ? 'Reverse Dowry' : 'Dowry'}: ${formatCurrency(breakdown.total)}`,
      pageWidth / 2,
      60,
      { align: 'center' }
    );
    
    // Tagline
    doc.setFontSize(16);
    doc.setTextColor(139, 0, 0);
    doc.text(tagline, pageWidth / 2, 75, { align: 'center' });

    // Breakdown Table
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Breakdown', pageWidth / 2, 95, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPos = 110;
    const labelX = 30;
    const valueX = pageWidth - 30;
    const rowHeight = 12;
    let rowIndex = 0;

    const breakdownItems = [
      { label: 'Base Dowry', value: breakdown.baseDowry },
      { label: 'Job Multiplier', value: breakdown.jobMultiplier },
      { label: 'Foreign Bonus', value: breakdown.foreignBonus },
      { label: 'Car Value', value: breakdown.carValueAddition },
      { label: 'Education Fee', value: breakdown.educationRecoveryFee },
      { label: 'Prestige Tax', value: breakdown.prestigeTax },
      { label: 'Gold Value', value: breakdown.goldEstimateValue },
      { label: 'MIL Wishlist', value: breakdown.motherInLawWishlistTotal },
      { label: 'Negotiation Discount', value: breakdown.negotiationDiscount },
      { label: 'Insurance Discount', value: breakdown.insuranceDiscount }
    ];

    breakdownItems.forEach((item) => {
      if (item.value > 0) {
        // Alternating row background
        if (rowIndex % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.roundedRect(22, yPos - 7, pageWidth - 44, rowHeight, 2, 2, 'F');
        }
        doc.setTextColor(0, 0, 0);
        doc.text(item.label, labelX, yPos);
        doc.setTextColor(139, 0, 0);
        doc.text(formatCurrency(item.value), valueX, yPos, { align: 'right' });
        yPos += rowHeight;
        rowIndex++;
      }
    });

    // Disclaimer
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, yPos + 15, pageWidth - 40, 30, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(
      'Disclaimer: This is a satirical certificate meant to highlight the absurdity of dowry.',
      pageWidth / 2,
      yPos + 30,
      { align: 'center' }
    );
    doc.text(
      'We strongly oppose the practice of dowry in all forms.',
      pageWidth / 2,
      yPos + 40,
      { align: 'center' }
    );

    // Date and signature
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 60, { align: 'center' });
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 40, yPos + 70, pageWidth / 2 + 40, yPos + 70);
    doc.text('Digital Signature', pageWidth / 2, yPos + 75, { align: 'center' });

    doc.save('dahej-certificate.pdf');
  };
  
  const startNegotiationGame = () => {
    setShowNegotiationGame(true);
  };
  
  const handleNegotiationResult = (agreed: boolean) => {
    if (agreed) {
      setNegotiationMultiplier(2);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      alert('Negotiations failed! Your dowry amount has doubled! 😱');
    } else {
      alert('You stood your ground! Good job standing up against dowry demands! 👏');
    }
    setShowNegotiationGame(false);
  };
  
  const toggleComparison = () => {
    setShowComparison(!showComparison);
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
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
              onClick={handleShareResult}
            >
              <Share2 size={20} />
              Share Result
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2"
              onClick={handleDownloadResult}
            >
              <Download size={20} />
              Download Certificate
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-accent flex items-center gap-2"
              onClick={startNegotiationGame}
            >
              <TrendingUp size={20} />
              Negotiate Dowry
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-info flex items-center gap-2"
              onClick={toggleComparison}
            >
              <TrendingDown size={20} />
              Compare with Average
            </motion.button>
        </div>
        
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-ivory rounded-lg border border-gold"
              >
                <h4 className="text-lg font-baloo mb-2 text-maroon">Market Comparison</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Your Dowry:</span>
                    <span className="font-medium">{formatCurrency(adjustedTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Dowry:</span>
                    <span className="font-medium">{formatCurrency(5000000)}</span>
              </div>
                  <div className="flex justify-between items-center">
                    <span>Difference:</span>
                    <span className={`font-medium ${adjustedTotal < 5000000 ? 'text-success-dark' : 'text-error-dark'}`}>
                      {formatCurrency(adjustedTotal - 5000000)}
                    </span>
            </div>
          </div>
              </motion.div>
        )}
          </AnimatePresence>

          {showMemes && <MemeDisplay total={adjustedTotal} />}
        </div>
      </motion.div>
      
      <AnimatePresence>
        {showNegotiationGame && (
          <NegotiationGame
            initialAmount={breakdown.total}
            onComplete={handleNegotiationResult}
            onClose={() => setShowNegotiationGame(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultCard;