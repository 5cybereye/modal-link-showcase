
import React, { useState } from 'react';
import BioLinkButton from './BioLinkButton';
import ProductModal from './ProductModal';
import { Instagram, Youtube, Lock, Code, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define our product data
const products = [
  {
    id: 1,
    name: "Dapp Script",
    icon: <Code className="w-5 h-5" />,
    description: "Fully functional decentralized application scripts for blockchain integration",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Code className="w-12 h-12 text-pink-600" />
        <p>Our DApp scripts are optimized for performance and security on multiple blockchains.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            Solidity Based
          </div>
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            Multi-chain Support
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Vinance Script",
    icon: <Instagram className="w-5 h-5" />,
    description: "Premium finance and trading scripts for crypto markets",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Instagram className="w-12 h-12 text-purple-600" />
        <p>Advanced algorithms for cryptocurrency trading and financial operations.</p>
        <div className="grid grid-cols-1 gap-2 w-full">
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            Automated Trading
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Link Encrypter",
    icon: <Lock className="w-5 h-5" />,
    description: "Secure your sensitive links with our military-grade encryption",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Lock className="w-12 h-12 text-blue-600" />
        <p>Protect your important links with end-to-end encryption technology.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            256-bit Encryption
          </div>
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            Time-limited Links
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Cloning Service",
    icon: <Code className="w-5 h-5" />,
    description: "Professional website and application cloning services",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Code className="w-12 h-12 text-green-600" />
        <p>Get exact replicas of websites and applications with our advanced cloning techniques.</p>
        <div className="glass-button px-6 py-2 rounded-lg text-center">
          1:1 Exact Replica
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Personal Hire",
    icon: <User className="w-5 h-5" />,
    description: "Hire our experts for your custom development needs",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <User className="w-12 h-12 text-purple-600" />
        <p>Get personalized development services from our team of experienced developers.</p>
        <div className="grid grid-cols-1 gap-2 w-full">
          <div className="glass-button px-4 py-2 rounded-lg text-center text-sm">
            Custom Development
          </div>
        </div>
      </div>
    )
  }
];

const BioCard = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 w-full">
      <div className="rounded-3xl overflow-hidden glass-card flex flex-col items-center pt-16 pb-12 px-6 relative">
        {/* Profile Section */}
        <div className="absolute top-6 right-6">
          <span className="text-sm text-white/70">✦</span>
        </div>
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm p-1 mb-3">
          <div className="w-full h-full rounded-full bg-purple-200 flex items-center justify-center">
            <span className="text-purple-600 text-2xl font-bold">Z</span>
          </div>
        </div>
        
        {/* Name */}
        <h1 className="text-2xl font-bold text-black/80 mb-1">Zohn Doe</h1>
        <p className="text-black/60 text-sm mb-8">Welcome to my profile</p>
        
        {/* My Playlist Button */}
        <div className="w-full mb-8">
          <div className="flex items-center gap-3 glass-button px-4 py-3 rounded-full">
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-purple-600 text-sm">♫</span>
            </div>
            <span className="text-black/70">My playlist</span>
          </div>
        </div>
        
        {/* Useful Links Header */}
        <div className="w-full mb-4">
          <h2 className="text-center text-black/70 text-sm font-medium">Services</h2>
        </div>
        
        {/* Bio Link Buttons */}
        <div className="w-full space-y-3">
          {products.map(product => (
            <BioLinkButton
              key={product.id}
              label={product.name}
              icon={product.icon}
              onClick={() => handleOpenModal(product)}
            />
          ))}
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-6 mt-10 mb-6">
          <a href="#" className="text-black/70 hover:text-black transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-black/70 hover:text-black transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-black/70 hover:text-black transition-colors">
            <Youtube size={20} />
          </a>
        </div>
        
        {/* Footer */}
        <div className="mt-auto">
          <p className="text-black/70 text-sm font-semibold tracking-wide">CRYPTLINK</p>
        </div>
      </div>
      
      {/* Modals */}
      {selectedProduct && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          product={selectedProduct} 
        />
      )}
    </div>
  );
};

// Facebook icon component since it's not imported from lucide-react
const Facebook = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default BioCard;
