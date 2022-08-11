import { useEffect } from 'react';

const WebsitePolicies = () => {
  useEffect(() => {
    window.wpcc.init({
      corners: 'normal',
      colors: {
        popup: {
          background: '#e2f7d4',
          text: '#000000',
          border: '#7fc25e',
        },
        button: { background: '#7fc25e', text: '#ffffff' },
      },
      padding: 'small',
      margin: 'small',
      content: {
        href: 'https://www.websitepolicies.com/policies/view/pfmhVPJG',
        message:
          'TeamFindr uses cookies to ensure you get the best experience.',
      },
    });
  }, []);
  return null;
};

export default WebsitePolicies;
