import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import './Home.css';

const SOCIAL_LINKS = [
  { name: 'YouTube', href: 'https://www.youtube.com/marvel', Icon: FaYoutube },
  { name: 'Instagram', href: 'https://www.instagram.com/marvel', Icon: FaInstagram },
  { name: 'Facebook', href: 'https://www.facebook.com/Marvel', Icon: FaFacebookF },
  { name: 'X', href: 'https://x.com/marvel', Icon: FaXTwitter },
  { name: 'TikTok', href: 'https://www.tiktok.com/@marvel', Icon: FaTiktok },
];

const Home = () => {
  return (
    <PageTransition>
      <div className="tva-container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Placeholder for future Home content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>
            HOME SECTION UPGRADE PENDING...
          </p>
        </div>

        {/* ---------- Footer ---------- */}
        <footer className="tva-footer">
          <nav className="social-row" aria-label="Marvel on social media">
            <span className="social-label">FOLLOW MARVEL</span>
            <div className="social-icons">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Marvel on ${name}`}
                  className="social-icon"
                  title={name}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>

          <p className="footer-disclaimer">
            This is an unofficial fan resource. Marvel, the Marvel logo, and
            all associated characters are trademarks of Marvel Studios / The
            Walt Disney Company. Social links above go to Marvel's official
            channels.
          </p>
        </footer>

      </div>
    </PageTransition>
  );
};

export default Home;