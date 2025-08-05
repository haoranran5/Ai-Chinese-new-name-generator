import React from 'react';
import React from 'react';

interface StructuredDataProps {
  data: object | object[];
  id?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data, id }) => {
  React.useEffect(() => {
    const scriptId = id || 'structured-data-script';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    
    // Add to document head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);

  return null; // This component doesn't render anything visible
};

export default StructuredData;
