export default function Navigation({ items, activeItem, setActiveItem }) {
  return (
    <nav className="terminal-nav">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`terminal-nav-item ${activeItem === item.id ? 'terminal-nav-item--active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
