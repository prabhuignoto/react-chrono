import { Chrono } from 'react-chrono';
// Import Vanilla Extract CSS
import 'react-chrono/dist/style.css';

const items = [
  {
    title: '2020',
    cardTitle: 'First Event',
    cardSubtitle: 'This is the first event',
    cardDetailedText: 'Details about the first event go here.',
  },
  {
    title: '2021',
    cardTitle: 'Second Event',
    cardSubtitle: 'This is the second event',
    cardDetailedText: 'Details about the second event go here.',
  },
  {
    title: '2022',
    cardTitle: 'Third Event',
    cardSubtitle: 'This is the third event',
    cardDetailedText: 'Details about the third event go here.',
  },
];

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <h1>React Chrono - Integration Test</h1>
      <p>Testing the built package imports correctly and renders properly.</p>
      <div style={{ width: '100%', height: '500px' }}>
        <Chrono
          items={items}
          mode="VERTICAL"
          data-testid="timeline-component"
        />
      </div>
    </div>
  );
}

export default App;
