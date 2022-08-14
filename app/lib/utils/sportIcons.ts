import FootballIcon from '@components/Icons/Football.svg';
import BasketballIcon from '@components/Icons/Basketball.svg';
import TennisIcon from '@components/Icons/Tennis.svg';
import SquashIcon from '@components/Icons/Squash.svg';
import VolleyIcon from '@components/Icons/Volley.svg';

const SportIcons: Record<string, React.ComponentType> = {
  Football: FootballIcon,
  Basketball: BasketballIcon,
  Tennis: TennisIcon,
  Squash: SquashIcon,
  Volleyball: VolleyIcon,
  Handball: VolleyIcon,
  Padel: SquashIcon,
  Badminton: SquashIcon,
  'Table tennis': SquashIcon,
};

export default SportIcons;
