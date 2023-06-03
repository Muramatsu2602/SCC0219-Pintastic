import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.style.css'
import VisaImg from './assets/img/logos/visa.png'
import MastercardImg from './assets/img/logos/mastercard.png'
import PixImg from './assets/img/logos/pix.png'
import BoletoImg from './assets/img/logos/boleto.png'
import LogoImg from './assets/img/pintastic-logo.png'

const Footer = () => {
  return (
    <footer>
      <div className='footer-main'>
        <div className='footer-left'>
          <div className='footer-column'>
            <h4>Social Media</h4>
            <ul>
              <li>
                <a href='*'>Facebook</a>
              </li>
              <li>
                <a href='*'>Twitter</a>
              </li>
              <li>
                <a href='*'>Instagram</a>
              </li>
              <li>
                <a href='*'>YouTube</a>
              </li>
              <li>
                <a href='*'>LinkedIn</a>
              </li>
            </ul>
          </div>
          <div className='footer-column'>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href='*'>Talk to Us</a>
              </li>
              <li>
                <a href='*'>FAQ</a>
              </li>
            </ul>
          </div>
          <div className='footer-column'>
            <h4>Pintastic</h4>
            <ul>
              <li>
                <a href='*'>About Us</a>
              </li>
              <li>
                <a href='*'>Address</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='footer-right'>
          <div className='payment-icons'>
            <img src={VisaImg} alt='Visa' />
            <img src={MastercardImg} alt='Mastercard' />
            <img src={PixImg} alt='PIX' />
            <img src={BoletoImg} alt='Boleto' />
          </div>
        </div>
      </div>
      <div className='footer-under'>
        <div className='footer-logo'>
          <Link to='/'>
            <img src={LogoImg} alt='Logo' />
          </Link>
        </div>
        <div>
          <span>© 2023, All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
