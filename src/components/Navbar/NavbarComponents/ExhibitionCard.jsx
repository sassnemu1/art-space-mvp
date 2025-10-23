import { forwardRef } from 'react';

const ExhibitionCard = forwardRef(({ isOpen, exhibition, onItemClick }, ref) => {
  return (
    <a
      ref={ref}
      href={exhibition.href}
      className={`exhibition-card ${isOpen ? 'exhibition-card--open' : ''}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--mouse-x-px': '400px',
        '--mouse-y-px': '100px'
      }}
      onClick={onItemClick}
    >
      <div className="exhibition-card__background">
        <div 
          className="exhibition-card__image"
          style={{ backgroundImage: `url(${exhibition.backgroundImage})` }}
        ></div>
        <div className="exhibition-card__overlay"></div>
      </div>

      <div className="exhibition-card__badge">{exhibition.badge}</div>

      <div className="exhibition-card__content">
        <div className="exhibition-card__text">
          <h3 className="exhibition-card__title">{exhibition.title}</h3>
          <h4 className="exhibition-card__subtitle">{exhibition.subtitle}</h4>
          <p className="exhibition-card__description">{exhibition.description}</p>
        </div>

        <div className="exhibition-card__details">
          <div className="exhibition-card__date">
            <span className="exhibition-card__date-icon">📅</span>
            <span>{exhibition.startDate} - {exhibition.endDate}</span>
          </div>
          <div className="exhibition-card__location">
            <span className="exhibition-card__location-icon">📍</span>
            <span>{exhibition.location}</span>
          </div>
        </div>

        <div className="exhibition-card__cta">
          <span className="exhibition-card__cta-text">Explore Exhibition</span>
          <span className="exhibition-card__cta-arrow">→</span>
        </div>
      </div>
    </a>
  );
});

ExhibitionCard.displayName = 'ExhibitionCard';

export default ExhibitionCard;
