// Helper function to get responsive styles based on window width
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false; // Default to desktop view when server-side rendering
};

export const styles = {
  container: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: isMobile ? '100%' : '1440px',
    margin: '0 auto'
  }),
  heroContent: (isMobile = getResponsiveStyles()) => ({
    margin: '0 auto',
    padding: isMobile ? '30px 20px' : '60px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: isMobile ? '20px' : '43px',
    borderRadius: '20px',
    background: 'rgba(102, 83, 198, 0.05)',
    position: 'relative',
    textAlign: isMobile ? 'center' : 'left'
  }),
  backgroundImage: (isMobile = getResponsiveStyles()) => ({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: isMobile ? '100%' : '40%',
    height: isMobile ? '100%' : 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: isMobile ? 0.2 : 0.7,
    zIndex: isMobile ? 0 : 'auto'
  }),
  heroText: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '40%',
    zIndex: isMobile ? 1 : 'auto',
    position: isMobile ? 'relative' : 'static'
  }),
  subtitle: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.8, 18)}px` : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: 'normal',
    display: 'block',
    marginBottom: isMobile ? '5px' : '10px'
  }),
  title: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.6, 28)}px` : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: isMobile ? '1.2' : '50px',
    marginBottom: isMobile ? '20px' : '40px',
    marginTop: '0px'
  }),
  description: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.9, 16)}px` : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: isMobile ? '25px' : '40px'
  }),
  button: (bgColor, textColor, fontSize, isMobile = getResponsiveStyles()) => ({
    backgroundColor: bgColor,
    color: textColor,
    display: 'flex',
    height: isMobile ? '45px' : '50px',
    padding: isMobile ? '8px 30px' : '10px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    border: 'none',
    borderRadius: '8px',
    fontSize: isMobile ? `${Math.max(fontSize * 0.9, 16)}px` : `${fontSize}px`,
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(74, 222, 128, 0.2)',
    margin: isMobile ? '0 auto' : 'initial'
  })
};