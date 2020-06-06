import React from 'react';
import { MyContext } from '../../provider/MyProvider';
import Copyright from './copyright/Copyright';
import './Footer.scss';
import FooterSocialIconItem from './footersocialicon/FooterSocialIconItem';

const Footer = () => {
  return (
    <footer className="footer">
      <MyContext.Consumer>
        {(context) =>
          Object.entries(context.state.footerSection).map(
            ([ key, value ]) =>
              key === 'copyright' ? (
                <Copyright key={key} data={value} />
              ) : key === 'social' ? (
                Object.entries(value).map(
                  ([ key, value ]) =>
                    key !== '#facebook' ? (
                      <FooterSocialIconItem key={key} id={key} data={value} />
                    ) : key !== '#github' ? (
                      <FooterSocialIconItem key={key} id={key} data={value} />
                    ) : null
                )
              ) : null
          )}
      </MyContext.Consumer>
    </footer>
  );
};

export default Footer;
