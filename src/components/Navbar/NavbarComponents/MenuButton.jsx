export default function MenuButton({ isOpen, onClick }) {
  return (
    <button 
      className={`macos-menu-button ${isOpen ? 'macos-menu-button--open' : ''}`}
      onClick={onClick}
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      <div className="macos-menu-button__line macos-menu-button__line--top"></div>
      <div className="macos-menu-button__line macos-menu-button__line--middle"></div>
      <div className="macos-menu-button__line macos-menu-button__line--bottom"></div>
    </button>
  );
}
