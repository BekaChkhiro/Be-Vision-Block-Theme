export const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '1440px',
    margin: '0 auto'
  },
  heroContent: {
    margin: '0 auto',
    padding: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '43px',
    borderRadius: '20px',
    background: 'rgba(102, 83, 198, 0.05)',
    position: 'relative'
  },
  backgroundImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7
  },
  heroText: {
    flex: '1',
    maxWidth: '40%'
  },
  subtitle: (color, fontSize) => ({
    color,
    fontSize: `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: 'normal',
    display: 'block',
    marginBottom: '10px'
  }),
  title: (color, fontSize) => ({
    color,
    fontSize: `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: '50px',
    marginBottom: '40px',
    marginTop: '0px'
  }),
  description: (color, fontSize) => ({
    color,
    fontSize: `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: '40px'
  }),
  button: (bgColor, textColor, fontSize) => ({
    backgroundColor: bgColor,
    color: textColor,
    display: 'flex',
    height: '50px',
    padding: '10px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    border: 'none',
    borderRadius: '8px',
    fontSize: `${fontSize}px`,
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(74, 222, 128, 0.2)'
  })
};