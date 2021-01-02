import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';

const SportIcons: Record<string, React.ComponentType> = {
  Football: SportsSoccerIcon,
  Basketball: SportsBasketballIcon,
  Tennis: SportsTennisIcon,
  Squash: SportsTennisIcon,
  Volleyball: SportsVolleyballIcon,
  Handball: SportsHandballIcon,
  Padel: SportsTennisIcon,
  Badminton: SportsTennisIcon,
  'Table tennis': SportsTennisIcon,
};

export default SportIcons;
