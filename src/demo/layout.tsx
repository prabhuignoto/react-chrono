import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>React-Chrono (Kitchen Sink)</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.aside}>
          <NavLink to={'/vertical-basic'}>Vertical Basic</NavLink>
          <NavLink to={'/vertical-basic-nested'}>Vertical Basic Nested</NavLink>
          <NavLink to={'/vertical-world-history'}>
            Vertical World History
          </NavLink>
          <NavLink to={'/vertical-alternating-mixed'}>
            Vertical Alternating Mixed
          </NavLink>
          <NavLink to={'/vertical-alternating-nested'}>
            Vertical Alternating Nested
          </NavLink>
          <NavLink to={'/vertical-alternating'}>Vertical Alternating</NavLink>
          <NavLink to={'/horizontal'}>Horizontal</NavLink>
          <NavLink to={'/horizontal-all'}>Horizontal All</NavLink>
          <NavLink to={'/horizontal-initial-select'}>
            Horizontal Initial Select
          </NavLink>
          <NavLink to={'/vertical-custom'}>Vertical Custom</NavLink>
          <NavLink to={'/vertical-custom-icon'}>Vertical Custom Icon</NavLink>
          <NavLink to={'/dynamic-load'}>Dynamic Load</NavLink>
          <NavLink to={'/timeline-without-cards'}>
            Timeline Without Cards (Vertical)
          </NavLink>
          <NavLink to={'/timeline-without-cards-horizontal'}>
            Timeline Without Cards (Horizontal)
          </NavLink>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout };
