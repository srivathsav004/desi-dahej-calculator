import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DowryBreakdown, ChartData } from '../../types';
import DowryBreakdownComponent from './DowryBreakdown';
import PieChart from './PieChart';
import MemeDisplay from './MemeDisplay';
import { getTagline, formatCurrency, prepareChartData } from '../../utils/calculations';
import { Download, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';

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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Borders
    doc.setDrawColor(139, 0, 0);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Corners
    const cornerSize = 20;
    const drawCorner = (x: number, y: number, rotate: number) => {
      const rad = (rotate * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      doc.setDrawColor(218, 165, 32);
      doc.setLineWidth(1);
      doc.line(x, y, x + cornerSize * cos, y + cornerSize * sin);
      doc.line(x, y, x - cornerSize * sin, y + cornerSize * cos);
    };
    drawCorner(15, 15, 0);
    drawCorner(pageWidth - 15, 15, 90);
    drawCorner(pageWidth - 15, pageHeight - 15, 180);
    drawCorner(15, pageHeight - 15, 270);

    // Title
    doc.setFontSize(28);
    doc.setTextColor(139, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Desi Dahej Calculator', pageWidth / 2, 40, { align: 'center' });
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 60, 45, pageWidth / 2 + 60, 45);

    // Subtitle
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Certificate', pageWidth / 2, 60, { align: 'center' });

    // Tagline
    doc.setFillColor(245, 245, 220);
    doc.roundedRect(20, 70, pageWidth - 40, 20, 3, 3, 'F');
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text(tagline, pageWidth / 2, 83, { align: 'center' });

    // Total Amount Box (smaller font, centered)
    doc.setFillColor(139, 0, 0);
    doc.roundedRect(20, 100, pageWidth - 40, 22, 3, 3, 'F');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Total ${breakdown.total < 0 ? 'Reverse Dowry' : 'Dowry'}: ${formatCurrency(breakdown.total)}`,
      pageWidth / 2,
      115,
      { align: 'center' }
    );

    // Breakdown Table
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Breakdown', pageWidth / 2, 140, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPos = 155;
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
      { label: 'MIL Wishlist', value: breakdown.motherInLawWishlistTotal }
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

    if (breakdown.offSeasonDiscount > 0) {
      doc.setFillColor(220, 255, 220);
      doc.roundedRect(22, yPos - 7, pageWidth - 44, rowHeight, 2, 2, 'F');
      doc.setTextColor(0, 128, 0);
      doc.text('Off-Season Discount', labelX, yPos);
      doc.text(`-${formatCurrency(breakdown.offSeasonDiscount)}`, valueX, yPos, { align: 'right' });
      yPos += rowHeight;
    }

    // Decorative line
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(1);
    doc.line(20, yPos + 5, pageWidth - 20, yPos + 5);

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