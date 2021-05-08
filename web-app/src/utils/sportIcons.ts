import FootballIcon from '../components/Icons/Football.svg';
import BasketballIcon from '../components/Icons/Basketball.svg';
import TennisIcon from '../components/Icons/Squash.svg';
import VolleyIcon from '../components/Icons/Volley.svg';

const SportIcons: Record<string, React.ComponentType> = {
  Football: FootballIcon,
  Basketball: BasketballIcon,
  Tennis: TennisIcon,
  Squash: TennisIcon,
  Volleyball: VolleyIcon,
  Handball: VolleyIcon,
  Padel: TennisIcon,
  Badminton: TennisIcon,
  'Table tennis': TennisIcon,
};

export default SportIcons;
