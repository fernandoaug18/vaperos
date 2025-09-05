import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImageFromUrl } from '@/utils/removeBackground';

const ImageBackgroundRemover = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<{[key: string]: string}>({});

  const imagesToProcess = [
    {
      id: 'cuvie-plus',
      url: '/lovable-uploads/111b99d2-1cba-4a4f-9746-6b818a2779f4.png',
      name: 'HQD CUVIE PLUS 2.0'
    },
    {
      id: 'glaze-pro', 
      url: '/lovable-uploads/a51e8369-0710-4463-a114-08e49aef3d18.png',
      name: 'HQD GLAZE PRO'
    },
    {
      id: 'click-plus',
      url: '/lovable-uploads/ee45f844-16a5-431f-b94c-9335a1b2ffda.png', 
      name: 'HQD CLICK PLUS'
    }
  ];

  const processImages = async () => {
    setIsProcessing(true);
    const processed: {[key: string]: string} = {};

    try {
      for (const imageInfo of imagesToProcess) {
        console.log(`Processing ${imageInfo.name}...`);
        
        // Load the image
        const imageElement = await loadImageFromUrl(imageInfo.url);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create object URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        processed[imageInfo.id] = processedUrl;
        
        console.log(`✅ Processed ${imageInfo.name}`);
      }
      
      setProcessedImages(processed);
      console.log('🎉 All images processed successfully!');
      
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedImage = (imageId: string, name: string) => {
    const url = processedImages[imageId];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-no-bg.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Remover Fondo de Imágenes</h3>
      
      <Button 
        onClick={processImages} 
        disabled={isProcessing}
        className="mb-6"
      >
        {isProcessing ? 'Procesando...' : 'Procesar Imágenes'}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imagesToProcess.map((imageInfo) => (
          <div key={imageInfo.id} className="text-center">
            <h4 className="font-medium mb-2">{imageInfo.name}</h4>
            
            {/* Original Image */}
            <div className="mb-2">
              <p className="text-sm text-muted-foreground mb-1">Original:</p>
              <img 
                src={imageInfo.url} 
                alt={`${imageInfo.name} original`}
                className="w-full max-w-[200px] mx-auto border rounded"
              />
            </div>

            {/* Processed Image */}
            {processedImages[imageInfo.id] && (
              <div className="mb-2">
                <p className="text-sm text-muted-foreground mb-1">Sin fondo:</p>
                <img 
                  src={processedImages[imageInfo.id]} 
                  alt={`${imageInfo.name} processed`}
                  className="w-full max-w-[200px] mx-auto border rounded"
                  style={{ backgroundColor: '#f0f0f0' }}
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  className="mt-2"
                  onClick={() => downloadProcessedImage(imageInfo.id, imageInfo.name)}
                >
                  Descargar
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBackgroundRemover;