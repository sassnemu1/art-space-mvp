export default function MenuOverlay({ isActive, onClick }) {
  return (
    <div 
      className={`menu-overlay ${isActive ? 'menu-overlay--active' : ''}`}
      onClick={onClick}
    />
  );
}
