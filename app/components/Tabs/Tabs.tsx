import React from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from 'react-router-dom';
import useStyles from './Tabs.styles';

const tabAllyProps = (key: string) => ({
  id: `settings-tab-${key}`,
  'aria-controls': `settings-tabpanel-${key}`,
});

const tabPanelAllyProps = (key: string) => ({
  role: 'tabpanel',
  id: `settings-tabpanel-${key}`,
  'aria-labelledby': `settings-tab-${key}`,
});

export type TabType = {
  value: string;
  label: string;
  linkTo?: string;
  disabled?: boolean;
  Icon: React.ComponentType;
  Component: React.ComponentType;
};

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: TabType[];
}

const Tabs: React.FC<TabsProps> = ({ value, onChange, tabs }) => {
  const classes = useStyles();
  const currentTab = tabs.find((tab) => tab.value === value) as TabType;
  return (
    <>
      <MuiTabs
        classes={{
          root: classes.tabs,
          indicator: classes.indicator,
        }}
        value={value}
        onChange={(_e, newValue) => onChange(newValue)}
        variant="fullWidth"
      >
        {tabs.map((tab) => {
          const linkProps = tab.linkTo
            ? {
                component: Link,
                to: tab.linkTo,
              }
            : {};
          return (
            <MuiTab
              key={tab.value}
              classes={{
                root: classes.tab,
                selected: classes.selectedTab,
              }}
              value={tab.value}
              {...linkProps}
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
          );
        })}
      </MuiTabs>
      <div
        className={classes.tabPanel}
        {...tabPanelAllyProps(currentTab.value)}
      >
        <currentTab.Component />
      </div>
    </>
  );
};

export default React.memo(Tabs);
