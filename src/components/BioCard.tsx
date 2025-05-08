
import React, { useState } from 'react';
import BioLinkButton from './BioLinkButton';
import ProductModal from './ProductModal';
import { Instagram, Youtube, Play, Package, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define our product data
const products = [
  {
    id: 1,
    name: "Follow my Instagram",
    icon: <Instagram className="w-5 h-5" />,
    description: "Check out my latest photos and stories on Instagram",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Instagram className="w-12 h-12 text-pink-600" />
        <p>Follow me for daily updates and behind the scenes content.</p>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button px-6 py-2 rounded-full"
        >
          Visit Instagram
        </a>
      </div>
    )
  },
  {
    id: 2,
    name: "YouTube Channel",
    icon: <Youtube className="w-5 h-5" />,
    description: "Subscribe to my YouTube channel for weekly videos",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Youtube className="w-12 h-12 text-red-600" />
        <p>New videos every week! Don't forget to subscribe and turn on notifications.</p>
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button px-6 py-2 rounded-full"
        >
          Watch Now
        </a>
      </div>
    )
  },
  {
    id: 3,
    name: "Latest Videos",
    icon: <Play className="w-5 h-5" />,
    description: "Check out my most recent content",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Play className="w-12 h-12 text-blue-600" />
        <p>Watch my latest uploads and trending content.</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); toast({ title: "Video 1 clicked" });}}
            className="glass-button px-4 py-2 rounded-full text-center text-sm"
          >
            Video 1
          </a>
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); toast({ title: "Video 2 clicked" });}}
            className="glass-button px-4 py-2 rounded-full text-center text-sm"
          >
            Video 2
          </a>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Shop My Products",
    icon: <ShoppingBag className="w-5 h-5" />,
    description: "Browse and shop my product collection",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-green-600" />
        <p>Exclusive products and special offers just for my followers.</p>
        <a 
          href="#" 
          onClick={(e) => {e.preventDefault(); toast({ title: "Shop now clicked" });}}
          className="glass-button px-6 py-2 rounded-full"
        >
          Shop Now
        </a>
      </div>
    )
  },
  {
    id: 5,
    name: "Join My Community",
    icon: <Package className="w-5 h-5" />,
    description: "Connect with like-minded people in my community",
    content: (
      <div className="flex flex-col items-center space-y-4">
        <Package className="w-12 h-12 text-purple-600" />
        <p>Join our growing community of creatives and enthusiasts!</p>
        <a 
          href="#" 
          onClick={(e) => {e.preventDefault(); toast({ title: "Community link clicked" });}}
          className="glass-button px-6 py-2 rounded-full"
        >
          Join Now
        </a>
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
          <h2 className="text-center text-black/70 text-sm font-medium">Useful Links</h2>
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
          <p className="text-black/70 text-sm font-semibold tracking-wide">QUICKLINK</p>
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
