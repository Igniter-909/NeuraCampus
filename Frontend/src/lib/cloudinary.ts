export const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "photogallery");
      data.append("cloud_name", "dxueqphl3");
  
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxueqphl3/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary error:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }
  
      const result = await response.json();
      console.log('Cloudinary response:', result);
      return result.secure_url;
    } catch (error) {
      console.error('Detailed upload error:', error);
      throw error;
    }
  }; 