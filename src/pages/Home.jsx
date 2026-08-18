import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';

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
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Marvel on ${name}`}
              title={name}
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.5rem',
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;