import { forwardRef } from 'react';
import LiquidGlassBackground from './LiquidGlassBackground';

const SitesMenu = forwardRef(({ isOpen, items, onItemClick }, ref) => {
  return (
    <div 
      ref={ref}
      className={`liquid-glass-sites-menu ${isOpen ? 'liquid-glass-sites-menu--open' : ''}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '30%',
        '--mouse-x-px': '140px',
        '--mouse-y-px': '80px'
      }}
    >
      <LiquidGlassBackground />
      
      <div className="liquid-glass-sites-menu__content">
        <div className="liquid-glass-sites-menu__header">
          <span className="liquid-glass-sites-menu__header-icon">🌐</span>
          <h4 className="liquid-glass-sites-menu__header-title">Our Platforms</h4>
        </div>
        
        <div className="liquid-glass-sites-menu__grid">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className="liquid-glass-sites-menu__item"
              style={{ 
                '--item-index': index,
                '--item-color': item.color
              }}
              onClick={onItemClick}
            >
              <span className="liquid-glass-sites-menu__item-icon">{item.icon}</span>
              <div className="liquid-glass-sites-menu__item-content">
                <span className="liquid-glass-sites-menu__item-label">{item.label}</span>
                <span className="liquid-glass-sites-menu__item-desc">{item.desc}</span>
              </div>
              <span className="liquid-glass-sites-menu__item-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

SitesMenu.displayName = 'SitesMenu';

export default SitesMenu;
