import { FC } from 'react';
import './contact.styles.scss';
import ContactMap from '../../components/contact-map/contact-map.component';

const Contact: FC = () => {
  return (
    <div className="contact-page">
      <ContactMap />
    </div>
  );
};

export default Contact;
