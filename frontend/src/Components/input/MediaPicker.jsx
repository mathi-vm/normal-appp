import React, { useEffect } from 'react';

const MediaPicker = ({ media, setMedia }) => {
  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleMediaUpload(files);
  };

  // Handle media file upload 
  const handleMediaUpload = (files) => {
    const mediaData = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      type: file.type
    }));
    setMedia(prevMedia => [...prevMedia, ...mediaData]);
  };

  // Cleanup object URLs when media changes
  useEffect(() => {
    return () => {
      media.forEach(file => URL.revokeObjectURL(file.url));
    };
  }, [media]);

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className=" mt-5 mb-2 ms-2  border-0"
        style={{outline:"none"}}
      />
    
      {media.length > 0 && (
        <div className="media-previews border-0 ms-2" >
          {media.map((file, index) => (
            <div key={index} className="media-item p-2">
              {file.type.startsWith('image/') ? (
                <img
                className='ms-5'
                  src={file.url}
                  alt={`Media ${index}`}
                  style={{ width: '200px' }}
                />
              ) : (
                <video
                  src={file.url}
                  controls
                  style={{ width: '100px' }}
                  aria-label={`Media ${index}`}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaPicker;
