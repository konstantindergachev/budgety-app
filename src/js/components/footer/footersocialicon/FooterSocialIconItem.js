import PropTypes from 'prop-types';
import React from 'react';
import image from '../../../../img/socials-sprite.svg';
import './FooterSocialIcons.scss';

const FooterSocialIconItem = ({ data, id }) => (
  <a
    href={data}
    className={`footer__icon footer__icon-${id.substring(1)}`}
    target="_blank"
  >
    <svg className="footer__svg">
      <use className="footer__img" xlinkHref={`${image}${id}`} />
    </svg>
  </a>
);

FooterSocialIconItem.propTypes = {
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FooterSocialIconItem;
