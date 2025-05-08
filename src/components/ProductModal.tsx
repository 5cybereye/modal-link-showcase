
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    content: React.ReactNode;
  };
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-none p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black/80">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-black/70 mb-4">{product.description}</p>
          <div className="py-2">{product.content}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
