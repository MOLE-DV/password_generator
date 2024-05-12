import React from 'react';
import './sass/site.sass';
import './sass/responsiveness.sass'
import Header from './Components/Header';
import PageContent from './Components/PageContent';

function App() {
  return (
    <div className="App">
      <Header />
      <PageContent />
    </div>
  );
}

export default App;
