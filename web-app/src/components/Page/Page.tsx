import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Scrollbars from 'react-custom-scrollbars';
import { AutoSizer } from 'react-virtualized';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import PageTitle, { PageTitleAction } from './PageTitle';
import { useWindowSize } from '../../hooks';
import useStyles from './Page.styles';

interface PageProps {
  title?: string;
  smallScreenTitle?: string;
  titleActions?: PageTitleAction[];
  children: React.ReactElement;
  showLogo?: boolean;
  fullScreen?: boolean;
}

const Page: React.FC<PageProps> = ({
  title,
  smallScreenTitle,
  titleActions = [],
  children,
  showLogo,
  fullScreen,
}) => {
  const classes = useStyles();
  const dimensions = useWindowSize();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                {!fullScreen && (
                  <PageTitle
                    title={title}
                    smallScreenTitle={smallScreenTitle}
                    actions={titleActions}
                    showLogo={showLogo}
                  />
                )}

                <div
                  className={
                    fullScreen && isSmallScreen
                      ? undefined
                      : classes.paddedContent
                  }
                >
                  {children}
                </div>
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
