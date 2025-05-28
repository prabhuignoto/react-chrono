// Test file to verify imports work
console.log('Testing imports...');

try {
  const dataExports = require('./src/demo/data/index.ts');
  console.log('Data exports available:', Object.keys(dataExports));
  console.log(
    'Basic data length:',
    dataExports.basicData?.length || 'undefined',
  );
  console.log('SUCCESS: All imports working correctly');
} catch (error) {
  console.error('ERROR:', error.message);
}
