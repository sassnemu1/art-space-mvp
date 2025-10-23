import { forwardRef } from 'react';
import LiquidGlassBackground from './LiquidGlassBackground';

const MainMenu = forwardRef(({ isOpen, sections, onItemClick }, ref) => {
  return (
    <div 
      ref={ref}
      className={`liquid-glass-menu liquid-glass-menu--menu-width ${isOpen ? 'liquid-glass-menu--open' : ''}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '30%',
        '--mouse-x-px': '400px',
        '--mouse-y-px': '120px'
      }}
    >
      <LiquidGlassBackground />
      
      <div className="liquid-glass-menu__content liquid-glass-menu__content--sections">
        {Object.entries(sections).map(([sectionKey, section], sectionIndex) => (
          <MenuSection
            key={sectionKey}
            section={section}
            sectionIndex={sectionIndex}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
});

MainMenu.displayName = 'MainMenu';

// Компонент секции меню
function MenuSection({ section, sectionIndex, onItemClick }) {
  return (
    <div 
      className="liquid-glass-menu__section"
      style={{ '--section-index': sectionIndex }}
    >
      <div className="liquid-glass-menu__section-header">
        <span className="liquid-glass-menu__section-icon">{section.icon}</span>
        <h4 className="liquid-glass-menu__section-title">{section.title}</h4>
      </div>

      <div className="liquid-glass-menu__section-items">
        {section.items.map((item, itemIndex) => (
          <a
            key={item.id}
            href={item.href}
            className="liquid-glass-menu__item liquid-glass-menu__item--compact"
            style={{ '--item-index': sectionIndex * 4 + itemIndex }}
            onClick={() => {
              onItemClick();
              if (item.id === 'logout') {
                console.log('Logging out...');
              }
            }}
          >
            <span className="liquid-glass-menu__icon">{item.icon}</span>
            <span className="liquid-glass-menu__label">{item.label}</span>
            <span className="liquid-glass-menu__arrow">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MainMenu;
