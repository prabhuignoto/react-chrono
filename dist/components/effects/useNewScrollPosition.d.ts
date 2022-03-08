import { Scroll } from '../../models/TimelineHorizontalModel';
import { TimelineMode } from '../../models/TimelineModel';
declare let useNewScrollPosition: (mode: TimelineMode, itemWidth?: number) => [number, (e: HTMLElement, s: Partial<Scroll>) => void];
export default useNewScrollPosition;
