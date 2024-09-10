export const preloadImageLinks = () => {
  const images = [
    {
      href: new URL('../assets/heroBanner/herobanner01.webp', import.meta.url).href,
      srcSet: `${new URL('../assets/heroBanner/herobanner01s.webp', import.meta.url).href} 600w, 
                ${new URL('../assets/heroBanner/herobanner01m.webp', import.meta.url).href} 1000w, 
                ${new URL('../assets/heroBanner/herobanner01l.webp', import.meta.url).href} 1500w, 
                ${new URL('../assets/heroBanner/herobanner01.webp', import.meta.url).href} 1900w`,
    },
    // {
    //   href: new URL('../assets/heroBanner/herobanner02.webp', import.meta.url).href,
    //   srcSet: `${new URL('../assets/heroBanner/herobanner02s.webp', import.meta.url).href} 600w, 
    //             ${new URL('../assets/heroBanner/herobanner02m.webp', import.meta.url).href} 1000w, 
    //             ${new URL('../assets/heroBanner/herobanner02l.webp', import.meta.url).href} 1500w, 
    //             ${new URL('../assets/heroBanner/herobanner02.webp', import.meta.url).href} 1900w`,
    // },
    // {
    //   href: new URL('../assets/heroBanner/herobanner03.webp', import.meta.url).href,
    //   srcSet: `${new URL('../assets/heroBanner/herobanner03s.webp', import.meta.url).href} 600w, 
    //             ${new URL('../assets/heroBanner/herobanner03m.webp', import.meta.url).href} 1000w, 
    //             ${new URL('../assets/heroBanner/herobanner03l.webp', import.meta.url).href} 1500w, 
    //             ${new URL('../assets/heroBanner/herobanner03.webp', import.meta.url).href} 1900w`,
    // },
  ]

  // Add the preloads dynamic in the <head>
  images.forEach(({ href, srcSet }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.setAttribute('imagesrcset', srcSet);
    link.setAttribute('imagesizes', '100%');
    link.type = 'image/webp';
    document.head.appendChild(link);
  })
}