const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const isStreamtape = url.includes('streamtape.com/e/');
  const embedUrl = isStreamtape ? url : url;

  if (!url) return null;

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      {isStreamtape ? (
        <iframe
          src={embedUrl}
          width="720"
          height="420"
          allowFullScreen
          frameBorder="0"
          style={{ border: 'none', maxWidth: '100%' }}
          title="Streamtape Player"
        />
      ) : (
        <video
          width="720"
          height="420"
          controls
          autoPlay
          preload="auto"
          style={{ width: '100%', maxWidth: '720px', backgroundColor: 'black' }}
        >
          <source src={url} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
