
import { useState } from 'react';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaYoutube, 
  FaInstagram, 
  FaLinkedinIn, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

export default function FloatingSocialIcons() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, url: 'https://www.facebook.com/profile.php?id=61573197735821' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://www.youtube.com/@Radical-Unlearning' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/radicalunlearning/' },
  ];

  return (
    <div 
      className={`fixed right-0 top-1/3 z-50 flex transition-all duration-300 ${
        isCollapsed ? 'translate-x-12' : 'translate-x-0'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#F2C078] text-white h-10 w-6 flex items-center justify-center self-center rounded-l-md cursor-pointer"
        aria-label={isCollapsed ? "Expand social icons" : "Collapse social icons"}
      >
        {isCollapsed ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
      </button>

      {/* Social Icons Container */}
      <div className="bg-[#F2C078] py-2 px-3 rounded-l-lg flex flex-col gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#868674] transition-colors duration-200"
            aria-label={link.name}
          >
            <div className="text-xl">{link.icon}</div>
          </a>
        ))}
      </div>
    </div>
  );
}