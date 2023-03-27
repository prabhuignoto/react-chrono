import cls from 'classnames';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

const items = [
  { path: '/vertical-basic', label: 'Vertical Basic' },
  {
    path: '/vertical-basic-nested',
    label: 'Vertical Basic Nested',
    hoverClass: 'hover:bg-blue-600',
  },
  { path: '/vertical-world-history', label: 'Vertical World History' },
  { path: '/vertical-alternating-mixed', label: 'Vertical Alternating Mixed' },
  {
    path: '/vertical-alternating-nested',
    label: 'Vertical Alternating Nested',
  },
  { path: '/vertical-alternating', label: 'Vertical Alternating' },
  { path: '/horizontal', label: 'Horizontal' },
  { path: '/horizontal-all', label: 'Horizontal All' },
  { path: '/horizontal-initial-select', label: 'Horizontal Initial Select' },
  { path: '/vertical-custom', label: 'Vertical Custom' },
  { path: '/vertical-custom-icon', label: 'Vertical Custom Icon' },
  { path: '/dynamic-load', label: 'Dynamic Load' },
  {
    path: '/timeline-without-cards',
    label: 'Timeline Without Cards (Vertical)',
  },
  {
    path: '/timeline-without-cards-horizontal',
    label: 'Timeline Without Cards (Horizontal)',
  },
];

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <header
        className={cls([
          'bg-gray-900',
          'text-white',
          'px-4',
          'py-2',
          styles.header,
          'rounded',
        ])}
      >
        <h2 className={cls('text-3xl font-bold')}>
          React-Chrono (Kitchen Sink)
        </h2>
      </header>
      <div className={styles.container}>
        <aside className={cls(styles.aside, ['bg-gray-100', 'p-4'])}>
          <ul className={cls(['list-none', 'list-inside'])}>
            {items.map((item, index) => (
              <li
                key={index}
                className={cls(
                  'hover:bg-gray-600',
                  'rounded',
                  'm-2',
                  'py-2',
                  'pl-1',
                  'hover:text-gray-200',
                )}
              >
                <NavLink to={item.path} style={{ height: '100%' }}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout };
