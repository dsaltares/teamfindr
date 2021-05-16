import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Scrollbars from 'react-custom-scrollbars';
import { AutoSizer } from 'react-virtualized';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import PageTitle, { PageTitleAction } from './PageTitle';
import { useWindowSize } from '../../hooks';
import useStyles from './Page.styles';

interface PageProps {
  title?: string;
  titleActions?: PageTitleAction[];
  children: React.ReactElement;
}

const Page: React.FC<PageProps> = ({ title, titleActions = [], children }) => {
  const classes = useStyles();
  const dimensions = useWindowSize();

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
              height: dimensions.clientHeight - height,
            }}
          >
            <div className={classes.centered}>
              <main className={classes.pageContainer}>
                <PageTitle title={title} actions={titleActions} />
                <div className={classes.content}>{children}</div>
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
