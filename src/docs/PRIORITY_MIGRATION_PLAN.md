# Priority Migration Plan: GlobalStyle Reduction

## 🎯 **Current Status**
- **Total GlobalStyle Usage**: 198 occurrences
- **Target Reduction**: 85% (≤30 occurrences remaining)
- **New Architecture**: ✅ Complete and Ready

## 🚀 **Phase 1: High-Impact Migration** (Target: -50 occurrences)

### 1. **timeline-horizontal-card-ve.css.ts** (23 globalStyle)
**Impact**: Highest reduction potential
**Components Using**: 
- `src/components/timeline-elements/timeline-card/timeline-horizontal-card.tsx`
- `src/components/timeline-elements/timeline-card/timeline-horizontal-card.styles.ts`

**Migration Strategy**:
```typescript
// Replace with cardSystem recipes
import { cardSystem } from '../card-system-v2.css';

// Old globalStyle patterns → New recipes
const wrapper = cardSystem.wrapper({ mode: 'horizontal', interactive: true });
const header = cardSystem.header({ variant: 'default' });
const content = cardSystem.content({ spacing: 'normal' });
```

### 2. **timeline-vertical-ve.css.ts** (20 globalStyle)
**Impact**: High - Core vertical timeline styling
**Components Using**:
- `src/components/timeline-vertical/timeline-vertical.tsx`
- `src/components/timeline-vertical/timeline-vertical-item.tsx`

**Migration Strategy**:
```typescript
// Replace with timelineSystem recipes  
import { timelineSystem } from '../timeline-system-v2.css';

const wrapper = timelineSystem.wrapper({ mode: 'vertical', focusManagement: 'enabled' });
const item = timelineSystem.item({ side: 'left', visible: true, layout: 'alternating' });
const line = timelineSystem.line({ orientation: 'vertical', variant: 'continuous' });
```

### 3. **timeline-main.css.ts** (16 globalStyle)
**Impact**: Core timeline container styles
**Components Using**: Main timeline wrapper components

**Migration Strategy**:
```typescript
// Replace with timelineSystem + layoutContainer
import { timelineSystem } from './timeline-system-v2.css';
import { componentPatterns } from '../../styles/recipes/component-patterns.css';

const mainContainer = componentPatterns.layout({ size: 'full', padding: 'md' });
const timelineWrapper = timelineSystem.wrapper({ mode: 'vertical' });
```

## 🔧 **Phase 2: Medium-Impact Migration** (Target: -35 occurrences)

### 4. **toolbar.css.ts** (12 globalStyle)
**Components Using**: 
- `src/components/toolbar/*`

**Migration Strategy**:
```typescript
// Replace with toolbarSystem
import { toolbarSystem } from './toolbar-system-v2.css';

const container = toolbarSystem.container({ size: 'md', position: 'top' });
const button = toolbarSystem.button({ variant: 'ghost', size: 'md' });
```

### 5. **timeline-toolbar-ve.css.ts** (12 globalStyle)  
### 6. **timeline-horizontal.css.ts** (10 globalStyle)
### 7. **timeline-horizontal-card.css.ts** (10 globalStyle)

## 📋 **Migration Execution Steps**

### Step 1: Preparation
1. **Backup current styles**: Ensure we can rollback if needed
2. **Create migration branch**: `feature/globalstyle-reduction-phase1`
3. **Set up testing environment**: Visual regression tests ready

### Step 2: File-by-File Migration

For each target file:

1. **Analyze Usage**:
   ```bash
   # Find all components importing the old CSS file
   grep -r "timeline-horizontal-card-ve" src/ --include="*.ts" --include="*.tsx"
   ```

2. **Update Imports**:
   ```typescript
   // OLD
   import { oldClass } from './old-file.css';
   
   // NEW  
   import { newSystem } from './new-system-v2.css';
   const newClass = newSystem.recipe({ variant: 'value' });
   ```

3. **Replace Class Usage**:
   ```typescript
   // OLD
   <div className={oldStaticClass}>
   
   // NEW
   <div className={newSystem.component({ variant: dynamicValue })}>
   ```

4. **Test & Validate**:
   - Visual regression testing
   - Cross-browser testing  
   - Accessibility testing
   - Performance benchmarking

5. **Remove Old File**:
   ```bash
   # Only after confirming no imports remain
   rm src/path/to/old-file.css.ts
   ```

### Step 3: Verification
- Run build: `npm run build`
- Run tests: `npm run test`  
- Visual inspection of key components
- Performance comparison

## 🎯 **Success Metrics**

### Quantitative Targets:
- **Phase 1**: Reduce from 198 → ~148 globalStyle (-25%)
- **Phase 2**: Reduce from 148 → ~108 globalStyle (-45%)  
- **Final Goal**: Reduce to ≤30 globalStyle (-85%)

### Qualitative Benefits:
- ✅ Type-safe styling with IntelliSense
- ✅ Consistent component variants  
- ✅ Responsive design built-in
- ✅ Better performance (optimized CSS)
- ✅ Easier maintenance and extension

## ⚠️ **Risk Mitigation**

### Potential Issues:
1. **Visual Regressions**: New recipes might not match old styles exactly
2. **Performance Impact**: Recipe generation might affect bundle size
3. **Type Conflicts**: TypeScript errors from prop changes
4. **Component Coupling**: Tightly coupled components might break

### Mitigation Strategies:
1. **Pixel-Perfect Comparison**: Use visual diff tools
2. **Bundle Analysis**: Monitor CSS output size  
3. **Gradual Migration**: One component at a time
4. **Rollback Plan**: Keep old files until migration complete

## 📅 **Timeline Estimate**

### Phase 1 (High-Impact): **2-3 days**
- Day 1: Migrate timeline-horizontal-card-ve.css.ts
- Day 2: Migrate timeline-vertical-ve.css.ts  
- Day 3: Migrate timeline-main.css.ts + testing

### Phase 2 (Medium-Impact): **2 days**
- Day 1: Migrate toolbar files
- Day 2: Migrate remaining horizontal timeline files

### Phase 3 (Cleanup): **1 day**
- Final verification
- Documentation updates
- Performance benchmarking

**Total Estimated Time**: 5-6 days for 85% globalStyle reduction

## 🔄 **Next Immediate Action**

**Start with**: `timeline-horizontal-card-ve.css.ts` migration
**Reason**: Highest impact (23 globalStyle occurrences)
**Expected Result**: Immediate 12% reduction in globalStyle usage

This focused approach will deliver maximum impact with minimal risk, setting us up for rapid completion of the remaining phases.