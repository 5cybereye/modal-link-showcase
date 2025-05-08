
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Send, Copy, Wallet, QrCode, Bitcoin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { sendOrderToTelegram, WALLET_ADDRESSES } from '@/utils/telegramService';

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
    cryptoType: 'bitcoin',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyWalletAddress = () => {
    const address = formData.cryptoType === 'bitcoin' ? WALLET_ADDRESSES.bitcoin : WALLET_ADDRESSES.ethereum;
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard"
    });
  };

  const handleStepComplete = async () => {
    if (currentStep === 'product') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('contact');
    } else if (currentStep === 'contact') {
      if (!formData.name || !formData.email) {
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
      <DialogContent className="bg-white border-none p-6 md:p-8 max-w-md mx-auto rounded-3xl shadow-xl">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full mb-4">
          <div 
            className="h-full bg-bio-mid rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            {currentStep === 'complete' ? 'Order Confirmed!' : currentStep === 'payment' ? 'Choose Payment Method' : product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 max-h-[60vh] overflow-y-auto px-1">
          {currentStep === 'product' && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4 text-center">{product.description}</p>
              <div className="py-2">{product.content}</div>
            </div>
          )}
          
          {currentStep === 'payment' && (
            <div className="space-y-6">
              <p className="text-center text-gray-600 mb-2">Select your preferred cryptocurrency</p>
              
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.cryptoType === 'bitcoin' ? 'border-bio-mid bg-bio-light/30' : 'border-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, cryptoType: 'bitcoin' }))}
                >
                  <div className="flex items-center gap-3">
                    <Bitcoin className="w-6 h-6 text-amber-500" />
                    <div>
                      <p className="font-medium">Bitcoin</p>
                      <p className="text-xs text-gray-500">BTC</p>
                    </div>
                    {formData.cryptoType === 'bitcoin' && (
                      <Check className="w-5 h-5 ml-auto text-bio-mid" />
                    )}
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.cryptoType === 'ethereum' ? 'border-bio-mid bg-bio-light/30' : 'border-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, cryptoType: 'ethereum' }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs font-bold">Ξ</div>
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-xs text-gray-500">ETH</p>
                    </div>
                    {formData.cryptoType === 'ethereum' && (
                      <Check className="w-5 h-5 ml-auto text-bio-mid" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <Label htmlFor="walletAddress" className="text-sm font-medium">Payment Address</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyWalletAddress}
                    className="h-8 gap-1 text-xs"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
                <div className="relative">
                  <Input 
                    id="walletAddress"
                    ref={walletAddressRef}
                    value={formData.cryptoType === 'bitcoin' ? WALLET_ADDRESSES.bitcoin : WALLET_ADDRESSES.ethereum}
                    readOnly
                    className="pr-10 font-mono text-sm bg-white"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    <QrCode className="h-3 w-3" />
                    Show QR
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    <Wallet className="h-3 w-3" />
                    Open Wallet
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'contact' && (
            <div className="space-y-5">
              <p className="text-center text-gray-600 mb-2">Please provide your contact information</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-lg"
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
                    className="rounded-lg"
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
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'complete' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-center text-gray-600">
                Thanks for your order! We'll process it shortly and reach out to you via email.
              </p>
            </div>
          )}
        </div>
          
        <div className="mt-6 pt-4">
          <Button 
            onClick={handleStepComplete} 
            className="w-full bg-bio-mid hover:bg-bio-dark text-white transition-colors flex items-center justify-center gap-2 rounded-xl py-6"
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
