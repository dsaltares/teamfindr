import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import Page from '../../components/Page';
import Profile from './Profile';
import NotificationSettings from './NotificationSettings';
import useStyles from './Settings.styles';

const tabAllyProps = (key: string) => ({
  id: `settings-tab-${key}`,
  'aria-controls': `settings-tabpanel-${key}`,
});

const tabPanelAllyProps = (key: string) => ({
  role: 'tabpanel',
  id: `settings-tabpanel-${key}`,
  'aria-labelledby': `settings-tab-${key}`,
});

interface SettingsTab {
  value: string;
  label: string;
  Icon: React.ComponentType;
  Component: React.ComponentType;
  disabled?: boolean;
}

const AllTabs: SettingsTab[] = [
  {
    value: 'profile',
    label: 'Profile',
    Icon: PersonIcon,
    Component: Profile,
  },
  {
    value: 'notifications',
    label: 'Notifications',
    Icon: NotificationsIcon,
    Component: NotificationSettings,
    // disabled: true,
  },
];

const lastSegment = (pathname: string) => {
  const parts = pathname.split('/');
  return parts[parts.length - 1];
};

const Settings = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const classes = useStyles();
  const currentTab = AllTabs.find(
    (tab) => tab.value === lastSegment(location.pathname)
  ) as SettingsTab;

  const changeTab = (value: string) => {
    if (value !== currentTab.value) {
      history.push(`${match.url}/${value}`);
    }
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, value: string) => {
    changeTab(value);
  };

  const isRootPath = match.url === location.pathname;
  if (isRootPath) {
    return <Redirect to={`${match.url}/profile`} />;
  }

  return (
    <Page title="Settings">
      <>
        <Tabs
          value={currentTab.value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {AllTabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              component={Link}
              to={`${match.url}/${tab.value}`}
              label={
                <div className={classes.tabLabelContainer}>
                  <SvgIcon className={classes.tabIcon}>
                    <tab.Icon />
                  </SvgIcon>
                  {tab.label}
                </div>
              }
              disabled={tab.disabled}
              {...tabAllyProps(tab.value)}
            />
          ))}
        </Tabs>
        <div
          className={classes.tabPanel}
          {...tabPanelAllyProps(currentTab.value)}
        >
          <currentTab.Component />
        </div>
      </>
    </Page>
  );
};

export default React.memo(Settings);
