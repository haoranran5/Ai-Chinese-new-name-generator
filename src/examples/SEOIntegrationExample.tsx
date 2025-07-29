import React from 'react';
import SEOManager, { withSEO, useDynamicSEO, SEODebugger } from '../components/SEOManager';
import { SEO_PAGES } from '../config/seoConfig';

// Example 1: Using SEOManager directly
const ExamplePage1: React.FC = () => {
  return (
    <SEOManager pageKey="nameGenerator">
      <div>
        <h1>Chinese Name Generator</h1>
        <p>Generate authentic Chinese names with BaZi analysis...</p>
      </div>
    </SEOManager>
  );
};

// Example 2: Using withSEO HOC
const ExamplePage2 = withSEO(
  () => (
    <div>
      <h1>Chinese Zodiac Compatibility</h1>
      <p>Discover your zodiac compatibility...</p>
    </div>
  ),
  { pageKey: 'compatibility' }
);

// Example 3: Using custom SEO data
const ExamplePage3: React.FC = () => {
  return (
    <SEOManager
      customSEO={{
        title: 'Custom Page Title - Chinese Astrology',
        description: 'Custom description for this specific page with unique content.',
        keywords: 'custom, keywords, chinese, astrology',
        canonicalUrl: 'https://chinesecharactername.top/custom-page',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Custom Article",
          "description": "Custom article description"
        }
      }}
    >
      <div>
        <h1>Custom Page</h1>
        <p>This page has custom SEO configuration...</p>
      </div>
    </SEOManager>
  );
};

// Example 4: Using dynamic SEO updates
const ExamplePage4: React.FC = () => {
  const { updateSEO } = useDynamicSEO();
  const [selectedZodiac, setSelectedZodiac] = React.useState('');

  React.useEffect(() => {
    if (selectedZodiac) {
      updateSEO({
        title: `${selectedZodiac} Chinese Zodiac - Compatibility & Traits`,
        description: `Discover ${selectedZodiac} zodiac sign compatibility, personality traits, and fortune predictions in Chinese astrology.`,
        keywords: `${selectedZodiac}, chinese zodiac, compatibility, traits, astrology`,
        canonicalUrl: `https://chinesecharactername.top/zodiac/${selectedZodiac.toLowerCase()}`
      });
    }
  }, [selectedZodiac, updateSEO]);

  return (
    <SEOManager pageKey="astrology">
      <div>
        <h1>Chinese Zodiac Signs</h1>
        <select 
          value={selectedZodiac} 
          onChange={(e) => setSelectedZodiac(e.target.value)}
        >
          <option value="">Select a zodiac sign</option>
          <option value="Rat">Rat</option>
          <option value="Ox">Ox</option>
          <option value="Tiger">Tiger</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Dragon">Dragon</option>
          <option value="Snake">Snake</option>
          <option value="Horse">Horse</option>
          <option value="Goat">Goat</option>
          <option value="Monkey">Monkey</option>
          <option value="Rooster">Rooster</option>
          <option value="Dog">Dog</option>
          <option value="Pig">Pig</option>
        </select>
        {selectedZodiac && (
          <div>
            <h2>{selectedZodiac} Zodiac Sign</h2>
            <p>Information about {selectedZodiac}...</p>
          </div>
        )}
      </div>
    </SEOManager>
  );
};

// Example 5: Page with noindex for certain conditions
const ExamplePage5: React.FC = () => {
  const [isPrivateMode, setIsPrivateMode] = React.useState(false);

  return (
    <SEOManager
      customSEO={{
        title: 'Private Content - Chinese Astrology',
        description: 'Private content that should not be indexed.',
        noIndex: isPrivateMode
      }}
    >
      <div>
        <h1>Content Page</h1>
        <label>
          <input 
            type="checkbox" 
            checked={isPrivateMode}
            onChange={(e) => setIsPrivateMode(e.target.checked)}
          />
          Private Mode (noindex)
        </label>
        <p>This content visibility depends on private mode setting...</p>
      </div>
    </SEOManager>
  );
};

// Main example component showing all patterns
const SEOIntegrationExample: React.FC = () => {
  const [currentExample, setCurrentExample] = React.useState(1);

  const renderExample = () => {
    switch (currentExample) {
      case 1:
        return <ExamplePage1 />;
      case 2:
        return <ExamplePage2 />;
      case 3:
        return <ExamplePage3 />;
      case 4:
        return <ExamplePage4 />;
      case 5:
        return <ExamplePage5 />;
      default:
        return <ExamplePage1 />;
    }
  };

  return (
    <div>
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <h2>SEO Integration Examples</h2>
        <div>
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => setCurrentExample(num)}
              style={{
                margin: '0 10px',
                padding: '10px 15px',
                backgroundColor: currentExample === num ? '#007bff' : '#f8f9fa',
                color: currentExample === num ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Example {num}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>Example 1: Direct SEOManager usage</p>
          <p>Example 2: withSEO HOC pattern</p>
          <p>Example 3: Custom SEO configuration</p>
          <p>Example 4: Dynamic SEO updates</p>
          <p>Example 5: Conditional noindex</p>
        </div>
      </nav>
      
      <main style={{ padding: '20px' }}>
        {renderExample()}
      </main>
      
      {/* SEO Debugger - only shows in development */}
      <SEODebugger />
    </div>
  );
};

export default SEOIntegrationExample;

// Usage instructions:
/*
1. Import SEOManager in your page components
2. Wrap your page content with SEOManager
3. Use pageKey for predefined configurations or customSEO for custom settings
4. Use withSEO HOC for cleaner component composition
5. Use useDynamicSEO hook for runtime SEO updates
6. Include SEODebugger in development for debugging

Example integration in App.tsx:
```tsx
import SEOManager from './components/SEOManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <SEOManager pageKey="home">
            <HomePage />
          </SEOManager>
        } />
        <Route path="/nameGenerator" element={
          <SEOManager pageKey="nameGenerator">
            <NameGeneratorPage />
          </SEOManager>
        } />
        // ... other routes
      </Routes>
    </Router>
  );
}
```

Or using the HOC pattern:
```tsx
const HomePageWithSEO = withSEO(HomePage, { pageKey: 'home' });
const NameGeneratorPageWithSEO = withSEO(NameGeneratorPage, { pageKey: 'nameGenerator' });

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageWithSEO />} />
        <Route path="/nameGenerator" element={<NameGeneratorPageWithSEO />} />
        // ... other routes
      </Routes>
    </Router>
  );
}
```
*/
