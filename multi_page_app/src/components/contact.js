import React from 'react'

const Contact = (props) => {
  // Set up a redirect to the About page after two seconds as an example of programatic redirect.
  // setTimeout(() => {
  //   props.history.push('/about');
  // }, 2000);
  return (
    <div className="container">
      <h4 className="center">Contact</h4>
      <p>This is the text for Contact.  Please modify as needed.</p>
    </div>
  )
}

export default Contact;
