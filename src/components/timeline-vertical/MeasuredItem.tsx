import React, { useEffect, useRef } from 'react';

type MeasuredItemProps = {
  onMeasure: (height: number) => void;
  children: React.ReactNode;
};

const MeasuredItem: React.FC<MeasuredItemProps> = ({ onMeasure, children }) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => onMeasure(node.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [onMeasure]);

  return (
    <li ref={ref} style={{ listStyle: 'none' }}>
      {children}
    </li>
  );
};

export default MeasuredItem;
