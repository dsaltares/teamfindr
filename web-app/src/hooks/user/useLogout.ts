import { useServices } from '../../providers/ServicesProvider';

const useLogout = () => {
  const services = useServices();
  return services.user.logout;
};

export default useLogout;
