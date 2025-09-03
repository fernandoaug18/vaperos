import { useState, useEffect } from 'react';
import { removeBackground, loadImageFromUrl } from '@/utils/backgroundRemoval';
import whatsappLogo from '@/assets/whatsapp-official-logo.png';

interface BackgroundRemovalProcessorProps {
  onProcessed: (processedImageUrl: string) => void;
}

export const BackgroundRemovalProcessor = ({ onProcessed }: BackgroundRemovalProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      if (processed) return;
      
      setIsProcessing(true);
      try {
        console.log('Loading WhatsApp logo for background removal...');
        const imageElement = await loadImageFromUrl(whatsappLogo);
        
        console.log('Removing background from WhatsApp logo...');
        const processedBlob = await removeBackground(imageElement);
        
        const processedUrl = URL.createObjectURL(processedBlob);
        console.log('Background removed successfully, new URL:', processedUrl);
        
        onProcessed(processedUrl);
        setProcessed(true);
      } catch (error) {
        console.error('Failed to process WhatsApp logo:', error);
        // Fallback to original logo if processing fails
        onProcessed(whatsappLogo);
        setProcessed(true);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [onProcessed, processed]);

  return null; // Este componente no renderiza nada visible
};