import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import Page from '../../components/Page';
import Profile from './Profile';
import NotificationSettings from './NotificationSettings';
import Tabs, { TabType } from '../../components/Tabs';

const lastSegment = (pathname: string) => {
  const parts = pathname.split('/');
  return parts[parts.length - 1];
};

const Settings = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const tabs = [
    {
      value: 'profile',
      label: 'Profile',
      Icon: PersonIcon,
      Component: Profile,
      linkTo: `${match.url}/profile`,
    },
    {
      value: 'notifications',
      label: 'Notifications',
      Icon: NotificationsIcon,
      Component: NotificationSettings,
      linkTo: `${match.url}/notifications`,
      disabled: true,
    },
  ];
  const currentTab = tabs.find(
    (tab) => tab.value === lastSegment(location.pathname)
  ) as TabType;

  const changeTab = (newValue: string) => {
    if (newValue !== currentTab.value) {
      history.push(`${match.url}/${newValue}`);
    }
  };

  const isRootPath = match.url === location.pathname;
  if (isRootPath) {
    return <Redirect to={`${match.url}/profile`} />;
  }

  return (
    <Page title="Settings">
      <Tabs value={currentTab.value} onChange={changeTab} tabs={tabs} />
    </Page>
  );
};

export default React.memo(Settings);
