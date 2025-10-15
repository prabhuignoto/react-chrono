# How to Use This CodeSandbox Example

This directory contains a complete React Chrono v3.0 example ready to be uploaded to CodeSandbox.

## 📤 Uploading to CodeSandbox

### Option 1: Direct Upload (Recommended)

1. Go to [codesandbox.io](https://codesandbox.io/)
2. Click "Create Sandbox"
3. Select "Import from GitHub" or drag and drop this folder
4. The sandbox will be created automatically

### Option 2: Manual Creation

1. Go to [codesandbox.io](https://codesandbox.io/)
2. Create a new React sandbox
3. Copy files from this directory:
   - `src/App.js` → `/src/App.js`
   - `src/styles.css` → `/src/styles.css`
   - `src/index.js` → `/src/index.js`
   - `public/index.html` → `/public/index.html`
   - `package.json` → `/package.json`

### Option 3: Using CodeSandbox CLI

```bash
# Install CodeSandbox CLI
npm install -g codesandbox

# Navigate to this directory
cd codesandbox-example

# Deploy to CodeSandbox
codesandbox deploy
```

## 📁 File Structure

```
codesandbox-example/
├── package.json          # Dependencies and scripts
├── sandbox.config.json   # CodeSandbox configuration
├── public/
│   └── index.html       # HTML template
├── src/
│   ├── index.js         # React entry point
│   ├── App.js           # Main component with all features
│   └── styles.css       # Custom styling
└── README.md            # Documentation
```

## 🎯 What's Included

This example showcases:

- ✅ **Grouped Configuration API** - All 9 configuration groups
- ✅ **Google Fonts Integration** - Inter font with per-element styling
- ✅ **Comprehensive i18n** - Custom text for all UI elements
- ✅ **Enhanced Dark Mode** - Dynamic theme switching with 36 properties
- ✅ **Sticky Toolbar** - With search configuration
- ✅ **Fullscreen Mode** - Cross-browser support
- ✅ **Advanced Slideshow** - With progress indicators
- ✅ **Rich Media** - Images with lazy loading
- ✅ **HTML Content** - Formatted text with lists
- ✅ **Event Callbacks** - onItemSelected and onThemeChange

## 🔗 Sharing Your Sandbox

Once created, you can:

1. **Get a shareable link** - Click "Share" button in CodeSandbox
2. **Embed in websites** - Use the embed code provided
3. **Fork for customization** - Allow others to create their own versions

## 💡 Customization Ideas

Try modifying:

- Change `mode` to `"horizontal"`, `"alternating"`, or `"horizontal-all"`
- Add more timeline items with different content
- Customize theme colors to match your brand
- Try different Google Fonts (e.g., "Roboto", "Playfair Display")
- Modify i18n text to another language
- Add custom media (videos, images)
- Experiment with different slideshow durations and types

## 📚 Reference Documentation

- [Props Reference](https://github.com/prabhuignoto/react-chrono/blob/master/PROPS-REFERENCE.md)
- [GitHub Repository](https://github.com/prabhuignoto/react-chrono)
- [npm Package](https://www.npmjs.com/package/react-chrono)

---

Happy coding with React Chrono v3.0! 🎉
