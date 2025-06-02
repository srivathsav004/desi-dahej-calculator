import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Calculator from './components/Form/Calculator';
import ResultCard from './components/Results/ResultCard';
import { useDowryCalculator } from './hooks/useDowryCalculator';

function App() {
  const { result, showResult, showMemes, calculateResult } = useDowryCalculator();

  return (
    <div className="min-h-screen flex flex-col royal-pattern">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="section-title gold-gradient">Calculate Your Dahej</h2>
              <p className="text-center text-maroon mb-8">
                Fill in the details below to get your satirical dowry estimate
              </p>
              
              <Calculator onCalculate={calculateResult} />
            </section>
            
            {showResult && result && (
              <section className="mb-12">
                <h2 className="section-title maroon-gradient">Your Results</h2>
                <ResultCard breakdown={result} showMemes={showMemes} />
              </section>
            )}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;