import { useServices } from '@components/providers/ServicesProvider';

const useLoginViaSocialMedia = () => {
  const services = useServices();
  return services.user.openIdpAuthPage;
};

export default useLoginViaSocialMedia;
