import React from 'react';
import { Redirect } from 'react-router-dom';

class Navigation extends React.Component {
  navigateToAuthentication = () => {
    // Виконати вашу навігаційну логіку
    return <Redirect to="/autication" />;
  };

  render() {
    // Рендеринг вашого компонента
  }
}

export default Navigation;
