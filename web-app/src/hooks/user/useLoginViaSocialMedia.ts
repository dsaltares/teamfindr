import { useServices } from '../../providers/ServicesProvider';

const useLoginViaSocialMedia = () => {
  const services = useServices();
  return services.user.openIdpAuthPage;
};

export default useLoginViaSocialMedia;
