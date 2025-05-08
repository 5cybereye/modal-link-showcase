
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

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
      <DialogContent className="glass-card border-none p-6 max-w-md bg-white/80 backdrop-blur-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black/80">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-black/70 mb-6">{product.description}</p>
          <div className="py-2">{product.content}</div>
          
          {/* Payment Form */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium mb-4 text-center">Purchase Options</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card">Card Information</Label>
                <div className="relative">
                  <Input 
                    id="card" 
                    placeholder="1234 5678 9012 3456" 
                    className="pl-10" 
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-bio-mid hover:bg-bio-dark text-white transition-colors"
              >
                Pay Now
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
