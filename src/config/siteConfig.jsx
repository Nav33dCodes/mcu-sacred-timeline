import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';

// ============================================================================
// SITE CONFIGURATION
// Edit these values to update the site's content without digging into the code
// ============================================================================

export const HOME_CONFIG = {

  // An array of 4K wallpapers. The hero section will automatically crossfade between them!
  wallpapers: [
    '/assets/doomsday.jpg',
    '/assets/doomsday-2.jpg'
  ],

  // If you provide a logo image, it will display instead of the text title
  heroLogoUrl: '/assets/doomsday-logo.png',
  latestDrops: [
    {
      id: 'irVNGjRFZGk', // Extracted from your Official Trailer link
      title: 'Official Trailer',
      subtitle: 'In Theaters December 18',
    },
    {
      id: 'X1aFkAkFASk', // Extracted from your Special Look link
      title: 'Special Look',
      subtitle: 'In Theaters December 18',
    }
  ],

  // Official Theatrical Posters
  posters: [
    { id: 'poster-1', url: '/assets/doomsday.jpg', title: 'Official Teaser Poster' },
    { id: 'poster-2', url: '/assets/doomsday-2.jpg', title: 'Character Poster' },
    // Add more posters here as you download them:
    // { id: 'poster-2', url: '/assets/another-poster.jpg', title: 'Character Poster' },
  ],
  
  // The big cinematic title on the home page
  heroEyebrow: 'A NEW ERA BEGINS',
  heroTitleLine1: 'AVENGERS',
  heroTitleLine2: 'DOOMSDAY'
};

export const SOCIAL_LINKS = [
  { name: 'YouTube', href: 'https://www.youtube.com/marvel', Icon: FaYoutube },
  { name: 'Instagram', href: 'https://www.instagram.com/marvel', Icon: FaInstagram },
  { name: 'Facebook', href: 'https://www.facebook.com/Marvel', Icon: FaFacebookF },
  { name: 'X', href: 'https://x.com/marvel', Icon: FaXTwitter },
  { name: 'TikTok', href: 'https://www.tiktok.com/@marvel', Icon: FaTiktok },
];
