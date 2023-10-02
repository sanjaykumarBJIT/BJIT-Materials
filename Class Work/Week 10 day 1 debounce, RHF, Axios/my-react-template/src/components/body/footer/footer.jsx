import React from 'react';
import './footer.style.scss';

const Footer = () => {
  return (
    <div className='footer-main'>
      <div className='footer-section'>
        <h3>CONNECT WITH US</h3>
        <div>
          <i className='fab fa-facebook icon'></i>
          <i className='fab fa-linkedin icon'></i>
          <i className='fab fa-youtube icon'></i>
        </div>
      </div>
      <div className='footer-section'>
        <h3>COMPANY</h3>
        <a href='/'>HOME</a>
        <a href='#footer-section'>BOOKS</a>
        <a href='/new-release'>New Release</a>
        <a href='/contact-us'>Contact Us</a>
        <a href='/blog'>BLOG</a>
      </div>
      <div className='footer-section'>
        <h3>IMPORTANT LINKS</h3>
        <a href='/privacy-policy'>Privacy Policy</a>
        <a href='/faqs'>FAQs</a>
        <a href='/terms-of-service'>Terms of Service</a>
      </div>
    </div>
  );
};

export default Footer;
