export const menuData = {
  menuItems: [
    { id: "Главная", label: "Главная", href: "/" },
    { id: "Пространство", label: "Пространство", href: "/gallery" },
    { id: "События", label: "События", href: "/events" },
    { id: "Контакты", label: "Контакты", href: "/contact" }
  ],

  subMenuSections: {
    account: {
      title: "Account",
      icon: "👤",
      items: [
        { id: "profile", label: "Profile", icon: "👤", href: "/profile" },
        { id: "settings", label: "Settings", icon: "⚙️", href: "/settings" },
        { id: "privacy", label: "Privacy", icon: "🔒", href: "/privacy" },
        { id: "logout", label: "Sign Out", icon: "↗️", href: "/logout" }
      ]
    },
    content: {
      title: "Content",
      icon: "🎨",
      items: [
        { id: "favorites", label: "Favorites", icon: "❤️", href: "/favorites" },
        { id: "collections", label: "Collections", icon: "📁", href: "/collections" },
        { id: "recent", label: "Recent", icon: "🕒", href: "/recent" },
        { id: "uploads", label: "Uploads", icon: "📤", href: "/uploads" }
      ]
    },
    support: {
      title: "Support",
      icon: "❓", 
      items: [
        { id: "help", label: "Help", icon: "❓", href: "/help" },
        { id: "tutorials", label: "Tutorials", icon: "🎓", href: "/tutorials" },
        { id: "feedback", label: "Feedback", icon: "💬", href: "/feedback" },
        { id: "contact-support", label: "Contact", icon: "📧", href: "/contact-support" }
      ]
    }
  },

  sitesMenuItems: [
    { 
      id: "expo", 
      label: "ART Expo", 
      icon: "🎨", 
      href: "/expo", 
      desc: "Virtual exhibitions",
      color: "rgba(255, 100, 100, 0.1)"
    },
    { 
      id: "vera", 
      label: "Vera Gallery", 
      icon: "🖼️", 
      href: "/vera", 
      desc: "Contemporary art",
      color: "rgba(100, 255, 100, 0.1)"
    },
    { 
      id: "shop", 
      label: "ART Shop", 
      icon: "🛍️", 
      href: "/shop", 
      desc: "Art marketplace",
      color: "rgba(100, 100, 255, 0.1)"
    },
    { 
      id: "tickets", 
      label: "Event Tickets", 
      icon: "🎫", 
      href: "/tickets", 
      desc: "Book events",
      color: "rgba(255, 255, 100, 0.1)"
    }
  ],

  featuredExhibition: {
    title: "Глобальный Диалог",
    subtitle: "Modern Art & Digital Innovation",
    description: "«Глобальный Диалог» — это всеобъемлющая панорама современного искусства из разных стран и культур.",
    backgroundImage: "/RUSSIANGlobalDialogue.png",
    startDate: "18 Сентября",
    endDate: "05 Октября",
    location: "Москва, Тверская 9 'ART-Space'",
    href: "/exhibitions/contemporary-visions-2025",
    badge: "Is On Now"
  }
};
