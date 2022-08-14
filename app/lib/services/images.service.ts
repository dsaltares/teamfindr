import axios from 'axios';

const imagesService = {
  uploadImage: async (file: File): Promise<string> => {
    const endpoint = 'https://api.cloudinary.com/v1_1/teamfindr/image/upload';
    const preset = 'teamfindr';
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', preset);
    const {
      data: { secure_url: url },
    } = await axios.post(endpoint, fd);
    return url;
  },
};

export default imagesService;
