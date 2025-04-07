// import React from 'react';

function GoogleMap() {
  return (
    <div className="google-map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.02449841476!2d-6.9635646311523445!3d33.92444000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76a5610af0e79%3A0x453e50fedc8da6e5!2sTemara%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1712422841869!5m2!1sfr!2sfr"
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Temara, Maroc"
      ></iframe>
    </div>
  );
}

export default GoogleMap;