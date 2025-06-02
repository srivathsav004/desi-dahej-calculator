import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart } from 'lucide-react';
import { DOWRY_FACTS } from '../../utils/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-maroon text-ivory py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-error-dark text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <AlertTriangle size={20} />
              <span className="font-bold">Say No to Dowry</span>
            </div>
          </div>
          
          <div className="bg-maroon-dark p-4 rounded-lg mb-6">
            <h2 className="text-xl font-baloo mb-3 border-b border-gold pb-2">Facts About Dowry</h2>
            <ul className="space-y-2">
              {DOWRY_FACTS.map((fact, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-maroon-dark p-4 rounded-lg mb-6">
            <h2 className="text-xl font-baloo mb-3 border-b border-gold pb-2">Legal Information</h2>
            <p className="mb-2">
              <strong>Dowry Prohibition Act, 1961:</strong> Makes giving, taking, or demanding dowry illegal with imprisonment up to 5 years.
            </p>
            <p>
              <strong>IPC Section 498A:</strong> Protects women from cruelty by husband or his relatives in connection with demands for dowry.
            </p>
          </div>
          
          <div className="text-center">
            <p className="mb-4 text-lg font-medium flex items-center justify-center gap-2">
              <Heart size={20} className="text-error-light" fill="currentColor" />
              Let's celebrate love, not price tags
              <Heart size={20} className="text-error-light" fill="currentColor" />
            </p>
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Desi Dahej Calculator | A satirical tool with a serious message
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;