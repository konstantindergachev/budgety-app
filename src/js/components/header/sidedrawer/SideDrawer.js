import PropTypes from 'prop-types';
import React from 'react';
import Backdrop from '../../ui/backdrop/Backdrop';
import NavigationItems from '../navigation/NavigationItems';
import './SideDrawer.scss';

const SideDrawer = ({ open, closed, getToken }) => {
  let attachedClasses = [ 'side__drawer', 'close' ];
  if (open) attachedClasses = [ 'side__drawer', 'open' ];
  return (
    <React.Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <nav className="side__drawer-only">
          <NavigationItems token={getToken} />
        </nav>
      </div>
    </React.Fragment>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.bool.isRequired,
  ]),
  closed: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.bool.isRequired,
  ]),
  getToken: PropTypes.string,
};

export default SideDrawer;
