import React from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono - Nested Timeline
 *
 * Demonstrates hierarchical project structure with nested items.
 * Perfect for showing main phases with sub-tasks.
 */

function App() {
  const items = [
    {
      title: 'Phase 1: Planning',
      cardTitle: 'Project Initiation',
      cardSubtitle: 'Week 1-2',
      cardDetailedText: `
        <strong>Requirements:</strong>
        <ul>
          <li>Define project scope and objectives</li>
          <li>Identify stakeholders and gather requirements</li>
          <li>Create project timeline and budget</li>
          <li>Assemble core team members</li>
        </ul>
      `,
      items: [
        {
          title: 'Task 1.1',
          cardTitle: 'Scope Definition',
          cardDetailedText: 'Document detailed project scope'
        },
        {
          title: 'Task 1.2',
          cardTitle: 'Stakeholder Analysis',
          cardDetailedText: 'Identify key stakeholders'
        }
      ]
    },
    {
      title: 'Phase 2: Design',
      cardTitle: 'Architecture & Design',
      cardSubtitle: 'Week 3-5',
      cardDetailedText: `
        <strong>Design Activities:</strong>
        <ul>
          <li>Create system architecture diagrams</li>
          <li>Design database schema</li>
          <li>Develop UI/UX mockups</li>
          <li>Establish coding standards</li>
        </ul>
      `,
      items: [
        {
          title: 'Task 2.1',
          cardTitle: 'Architecture Design',
          cardDetailedText: 'Plan system architecture'
        },
        {
          title: 'Task 2.2',
          cardTitle: 'UI/UX Design',
          cardDetailedText: 'Create design mockups'
        }
      ]
    },
    {
      title: 'Phase 3: Development',
      cardTitle: 'Implementation',
      cardSubtitle: 'Week 6-12',
      cardDetailedText: `
        <strong>Development Tasks:</strong>
        <ul>
          <li>Set up development environment</li>
          <li>Implement backend services</li>
          <li>Build frontend components</li>
          <li>Integrate third-party services</li>
        </ul>
      `,
      items: [
        {
          title: 'Task 3.1',
          cardTitle: 'Backend Dev',
          cardDetailedText: 'Develop API services'
        },
        {
          title: 'Task 3.2',
          cardTitle: 'Frontend Dev',
          cardDetailedText: 'Build UI components'
        }
      ]
    },
    {
      title: 'Phase 4: Testing',
      cardTitle: 'QA & Testing',
      cardSubtitle: 'Week 13-14',
      cardDetailedText: `
        <strong>Testing Activities:</strong>
        <ul>
          <li>Unit testing for all modules</li>
          <li>Integration testing across services</li>
          <li>Performance and load testing</li>
          <li>User acceptance testing (UAT)</li>
        </ul>
      `,
      items: [
        {
          title: 'Task 4.1',
          cardTitle: 'Unit Testing',
          cardDetailedText: 'Write unit tests'
        },
        {
          title: 'Task 4.2',
          cardTitle: 'UAT',
          cardDetailedText: 'Conduct user testing'
        }
      ]
    },
    {
      title: 'Phase 5: Deployment',
      cardTitle: 'Release & Maintenance',
      cardSubtitle: 'Week 15+',
      cardDetailedText: `
        <strong>Launch Activities:</strong>
        <ul>
          <li>Prepare production environment</li>
          <li>Execute deployment strategy</li>
          <li>Conduct post-launch monitoring</li>
          <li>Provide user support and training</li>
        </ul>
      `,
      items: [
        {
          title: 'Task 5.1',
          cardTitle: 'Deployment',
          cardDetailedText: 'Deploy to production'
        },
        {
          title: 'Task 5.2',
          cardTitle: 'Post-Launch Support',
          cardDetailedText: 'Monitor and support'
        }
      ]
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>🏗️ Software Development Project Timeline</h1>
        <p>Hierarchical view of project phases and sub-tasks</p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="vertical"
          layout={{
            cardWidth: 600,
            cardHeight: 300,
            pointSize: 18
          }}
          display={{
            toolbar: {
              enabled: true,
              sticky: true
            }
          }}
          content={{
            allowHTML: true
          }}
          theme={{
            primary: '#8b5cf6',
            secondary: '#7c3aed',
            cardBgColor: '#f8f7ff',
            cardTitleColor: '#6d28d9',
            cardDetailsColor: '#4c1d95'
          }}
        />
      </div>

      <footer className="footer">
        <div className="info">
          <h3>📊 Project Structure</h3>
          <p>This timeline demonstrates:</p>
          <ul>
            <li>✓ Main phases with detailed descriptions</li>
            <li>✓ Sub-tasks organized within phases</li>
            <li>✓ Timeline spanning from planning to deployment</li>
            <li>✓ HTML content support for rich formatting</li>
            <li>✓ Professional color scheme (purple)</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
