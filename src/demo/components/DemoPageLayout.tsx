import React from 'react';

interface DemoPageLayoutProps {
  title: string;
  description: string;
  features?: string[];
  codeExample?: string;
  children: React.ReactNode;
}

const DemoPageLayout: React.FC<DemoPageLayoutProps> = ({
  title,
  description,
  features = [],
  codeExample,
  children,
}) => {
  return (
    <div className="space-y-6 lg:space-y-8 w-full">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        {features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Key Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Demo Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden w-full">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Live Demo</h2>
          <p className="text-sm text-gray-600 mt-1">
            Interact with the timeline below to see all features in action
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-gray-50 w-full">
          <div className="bg-white rounded-lg shadow-inner min-h-96 overflow-hidden w-full">
            {children}
          </div>
        </div>
      </div>

      {/* Code Example */}
      {codeExample && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Code Example</h2>
            <p className="text-sm text-gray-600 mt-1">
              Basic implementation to get started with this timeline variant
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-gray-900 text-gray-100 overflow-x-auto">
            <pre className="text-xs sm:text-sm">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Usage Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-blue-900">Usage Tips</h3>
            <div className="mt-2 text-sm text-blue-800 space-y-1">
              <p>• All timeline variants support custom themes and styling</p>
              <p>• Keyboard navigation is fully supported (Tab, Arrow keys, Enter, Space)</p>
              <p>• Timeline automatically adapts to mobile screens</p>
              <p>• You can customize icons, colors, and content structure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPageLayout;