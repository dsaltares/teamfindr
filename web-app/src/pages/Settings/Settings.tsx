import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import Profile from './Profile';
import NotificationSettings from './NotificationSettings';
import useStyles from './Settings.styles';

// const Settings = () => {
//   const handleSelectFile = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = event.target.files as FileList;
//     const url = await uploadImage(files[0], (loaded, total) => {
//       console.log('progress:', Math.round((loaded / total) * 100));
//     });
//     console.log(url);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleSelectFile} />
//     </div>
//   );
// };

const tabAllyProps = (key: string) => ({
  id: `settings-tab-${key}`,
  'aria-controls': `settings-tabpanel-${key}`,
});

const tabPanelAllyProps = (key: string) => ({
  role: 'tabpanel',
  id: `settings-tabpanel-${key}`,
  'aria-labelledby': `settings-tab-${key}`,
});

const AllTabs = [
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
    disabled: true,
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
  const currentTab = lastSegment(location.pathname);

  const handleChangeTab = (event: React.ChangeEvent<{}>, value: string) => {
    history.push(`${match.url}/${value}`);
  };

  return (
    <div className={classes.container}>
      <Tabs
        className={classes.tabs}
        value={currentTab}
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
            label={tab.label}
            icon={<tab.Icon />}
            disabled={tab.disabled}
            {...tabAllyProps(tab.value)}
          />
        ))}
      </Tabs>
      <Switch>
        <Route
          path={`${match.url}/`}
          exact
          render={() => <Redirect to={`${match.url}/profile`} />}
        />
        {AllTabs.map((tab) => (
          <Route
            key={tab.value}
            path={`${match.url}/${tab.value}`}
            render={() => (
              <div
                className={classes.tabPanel}
                {...tabPanelAllyProps(tab.value)}
              >
                <tab.Component />
              </div>
            )}
          />
        ))}
      </Switch>
    </div>
  );
};

export default React.memo(Settings);
