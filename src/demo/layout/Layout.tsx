import cls from 'classnames';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { routeConfigs, getRoutesByCategory } from '../routes/routes.config';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  const verticalRoutes = getRoutesByCategory('vertical');
  const horizontalRoutes = getRoutesByCategory('horizontal');
  const customRoutes = getRoutesByCategory('custom');
  const specialRoutes = getRoutesByCategory('special');

  const NavSection: React.FC<{ title: string; routes: typeof routeConfigs }> = ({
    title,
    routes,
  }) => (
    <>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 mt-4 first:mt-0">
        {title}
      </h3>
      {routes.map((route, index) => (
        <li
          key={index}
          className={cls('m-1', 'py-1', 'pl-1', 'hover:text-blue-800')}
        >
          <NavLink
            to={route.path}
            className={({ isActive }) =>
              cls(
                'block py-1 px-2 rounded transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'hover:bg-gray-50'
              )
            }
            title={route.description}
          >
            {route.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div className={styles.wrapper}>
      <header
        className={cls([
          'bg-gray-900',
          'text-white',
          'px-6',
          'py-4',
          styles.header,
          'shadow-lg',
        ])}
      >
        <h1 className="text-3xl font-bold">React-Chrono</h1>
        <p className="text-gray-300 mt-1">Interactive Timeline Component Demos</p>
      </header>
      <div className={styles.container}>
        <aside className={cls(styles.aside, ['bg-gray-50', 'p-4', 'border-r'])}>
          <nav>
            <ul className="list-none space-y-1">
              <NavSection title="Vertical Timelines" routes={verticalRoutes} />
              <NavSection title="Horizontal Timelines" routes={horizontalRoutes} />
              <NavSection title="Custom Content" routes={customRoutes} />
              <NavSection title="Special Features" routes={specialRoutes} />
            </ul>
          </nav>
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { Layout }; 