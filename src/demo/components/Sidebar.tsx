import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';

interface SidebarItem {
  path: string;
  label: string;
  description?: string;
  icon?: string;
  featured?: boolean;
  new?: boolean;
}

interface SidebarSection {
  title: string;
  icon: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Getting Started',
    icon: '🚀',
    items: [
      {
        path: '/',
        label: 'Overview',
        description: 'Basic vertical timeline',
        icon: '📋',
      },
      {
        path: '/theme-showcase',
        label: 'Theme Gallery',
        description: 'Explore different themes',
        icon: '🎨',
        featured: true,
      },
    ],
  },
  {
    title: 'Vertical Timelines',
    icon: '📊',
    items: [
      {
        path: '/vertical-basic',
        label: 'Basic Vertical',
        description: 'Simple vertical layout',
        icon: '📝',
      },
      {
        path: '/vertical-alternating',
        label: 'Alternating Layout',
        description: 'Cards alternate sides',
        icon: '🔄',
      },
      {
        path: '/vertical-basic-nested',
        label: 'Nested Timeline',
        description: 'Timeline with nested items',
        icon: '🌳',
      },
      {
        path: '/vertical-alternating-nested',
        label: 'Alternating Nested',
        description: 'Alternating with nested items',
        icon: '🔀',
      },
      {
        path: '/vertical-world-history',
        label: 'World History',
        description: 'Rich media timeline',
        icon: '🌍',
      },
      {
        path: '/vertical-comprehensive',
        label: 'Technology Evolution',
        description: 'Advanced features showcase',
        icon: '💻',
        featured: true,
      },
      {
        path: '/vertical-alternating-mixed',
        label: 'Mixed Content',
        description: 'Various content types',
        icon: '🎭',
      },
    ],
  },
  {
    title: 'Horizontal Timelines',
    icon: '➡️',
    items: [
      {
        path: '/horizontal',
        label: 'Basic Horizontal',
        description: 'Simple horizontal layout',
        icon: '📈',
      },
      {
        path: '/horizontal-all',
        label: 'All Features',
        description: 'Horizontal with all features',
        icon: '⭐',
      },
      {
        path: '/horizontal-initial-select',
        label: 'Initial Selection',
        description: 'Pre-selected timeline item',
        icon: '🎯',
      },
    ],
  },
  {
    title: 'Customization',
    icon: '🛠️',
    items: [
      {
        path: '/vertical-custom',
        label: 'Custom Content',
        description: 'Custom card content',
        icon: '✨',
      },
      {
        path: '/vertical-custom-icon',
        label: 'Custom Icons',
        description: 'Custom timeline icons',
        icon: '🎪',
      },
      {
        path: '/timeline-without-cards',
        label: 'Cardless (Vertical)',
        description: 'Timeline without cards',
        icon: '🔹',
      },
      {
        path: '/timeline-without-cards-horizontal',
        label: 'Cardless (Horizontal)',
        description: 'Horizontal without cards',
        icon: '🔸',
      },
    ],
  },
  {
    title: 'Advanced Features',
    icon: '⚡',
    items: [
      {
        path: '/dynamic-load',
        label: 'Dynamic Loading',
        description: 'Load content dynamically',
        icon: '🔄',
        new: true,
      },
    ],
  },
];

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Getting Started', 'Vertical Timelines'])
  );

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside className="bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Demo Examples
        </h3>
        
        <nav className="space-y-2">
          {sidebarSections.map((section) => {
            const isExpanded = expandedSections.has(section.title);
            
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </span>
                  <svg
                    className={cls(
                      'w-4 h-4 transform transition-transform',
                      isExpanded ? 'rotate-90' : ''
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onItemClick}
                        className={({ isActive }) =>
                          cls(
                            'group flex items-start px-3 py-2 text-sm rounded-md transition-colors',
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          )
                        }
                      >
                        <span className="mr-2 text-xs">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={cls(
                              'font-medium truncate',
                              item.featured ? 'text-indigo-600' : ''
                            )}>
                              {item.label}
                            </span>
                            {item.featured && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Featured
                              </span>
                            )}
                            {item.new && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;