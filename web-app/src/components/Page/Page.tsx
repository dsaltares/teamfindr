import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Scrollbars from 'react-custom-scrollbars';
import { AutoSizer } from 'react-virtualized';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import PageTitle, { PageTitleAction } from './PageTitle';
import useStyles from './Page.styles';

interface PageProps {
  title: string;
  titleAction?: PageTitleAction;
  children: React.ReactElement;
}

const Page: React.FC<PageProps> = ({ title, titleAction, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <DesktopNavigation />
      </Hidden>
      <AutoSizer disableWidth>
        {({ height }) => (
          <Scrollbars
            autoHide
            style={{
              width: '100%',
              height: document.documentElement.clientHeight - height,
            }}
          >
            <div className={classes.centered}>
              <main className={classes.content}>
                <div className={classes.titleContainer}>
                  <PageTitle title={title} action={titleAction} />
                </div>
                {children}
              </main>
            </div>
          </Scrollbars>
        )}
      </AutoSizer>
      <Hidden mdUp>
        <MobileNavigation />
      </Hidden>
    </div>
  );
};

export default React.memo(Page);
