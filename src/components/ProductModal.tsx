
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bitcoin, ArrowRight, Check, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { sendOrderToTelegram } from '@/utils/telegramService';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    content: React.ReactNode;
  };
}

type FormStep = 'product' | 'payment' | 'contact' | 'complete';

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('product');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    cryptoType: 'bitcoin',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useIsMobile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepComplete = async () => {
    if (currentStep === 'product') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('contact');
    } else if (currentStep === 'contact') {
      if (!formData.name || !formData.email || !formData.walletAddress) {
        toast({
          title: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      try {
        // Send the data to Telegram
        await sendOrderToTelegram({
          ...formData,
          productName: product.name
        });
        
        toast({
          title: "Order submitted!",
          description: "Your inquiry has been sent to our team."
        });
        
        setCurrentStep('complete');
      } catch (error) {
        console.error('Error sending to Telegram:', error);
        toast({
          title: "Error submitting order",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 'complete') {
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    setCurrentStep('product');
    setFormData({
      name: '',
      email: '',
      walletAddress: '',
      cryptoType: 'bitcoin',
      message: ''
    });
    onClose();
  };

  // Calculate progress percentage
  const progressPercentage = () => {
    switch (currentStep) {
      case 'product': return 25;
      case 'payment': return 50;
      case 'contact': return 75;
      case 'complete': return 100;
      default: return 0;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-none p-4 md:p-6 max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-lg">
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
          <div 
            className="h-full bg-bio-mid rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black/80">
            {currentStep === 'complete' ? 'Order Confirmed!' : product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 max-h-[60vh] overflow-y-auto px-1">
          {currentStep === 'product' && (
            <div className="space-y-4">
              <p className="text-black/70 mb-4">{product.description}</p>
              <div className="py-2">{product.content}</div>
            </div>
          )}
          
          {currentStep === 'payment' && (
            <div className="space-y-4">
              <p className="text-center text-black/70 mb-4">Select your preferred cryptocurrency</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.cryptoType === 'bitcoin' ? 'border-bio-mid bg-bio-light/30' : 'border-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, cryptoType: 'bitcoin' }))}
                >
                  <div className="flex items-center gap-3">
                    <Bitcoin className="w-6 h-6 text-amber-500" />
                    <div>
                      <p className="font-medium">Bitcoin</p>
                      <p className="text-xs text-black/60">BTC</p>
                    </div>
                    {formData.cryptoType === 'bitcoin' && (
                      <Check className="w-4 h-4 ml-auto text-bio-mid" />
                    )}
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.cryptoType === 'ethereum' ? 'border-bio-mid bg-bio-light/30' : 'border-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, cryptoType: 'ethereum' }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs font-bold">Ξ</div>
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-xs text-black/60">ETH</p>
                    </div>
                    {formData.cryptoType === 'ethereum' && (
                      <Check className="w-4 h-4 ml-auto text-bio-mid" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="walletAddress">Your Wallet Address</Label>
                <Input 
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="Enter your wallet address"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-black/60">We'll use this to verify your payment</p>
              </div>
            </div>
          )}
          
          {currentStep === 'contact' && (
            <div className="space-y-4">
              <p className="text-center text-black/70 mb-4">Please provide your contact information</p>
              
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Input 
                  id="message"
                  name="message"
                  placeholder="Any specific requirements?"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          
          {currentStep === 'complete' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-center text-black/70">
                Thanks for your order! We'll process it shortly and reach out to you via email.
              </p>
            </div>
          )}
        </div>
          
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            onClick={handleStepComplete} 
            className="w-full bg-bio-mid hover:bg-bio-dark text-white transition-colors flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Processing...'
            ) : currentStep === 'complete' ? (
              'Close'
            ) : (
              <>
                {currentStep === 'contact' ? 'Submit' : 'Continue'}
                {currentStep !== 'contact' && <ArrowRight className="w-4 h-4" />}
                {currentStep === 'contact' && <Send className="w-4 h-4" />}
              </>
            )}
          </Button>
          
          {currentStep !== 'product' && currentStep !== 'complete' && !isSubmitting && (
            <Button 
              onClick={() => setCurrentStep(currentStep === 'contact' ? 'payment' : 'product')}
              variant="ghost" 
              className="w-full mt-2"
            >
              Back
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
