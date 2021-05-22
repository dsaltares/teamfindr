import { useMutation } from 'react-query';
import { useServices } from '../../providers/ServicesProvider';

const useUploadImage = () => {
  const services = useServices();
  const mutation = useMutation(services.images.uploadImage);
  return mutation;
};

export default useUploadImage;
