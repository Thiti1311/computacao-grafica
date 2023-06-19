import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './pages/Home';
import Sobre from './pages/Sobre';

// Retas
import RDda from './pages/Retas/Dda';
import RPontoM from './pages/Retas/PontoM';
//Circulos
import CExplicita from './pages/Circulos/Explicita';
import CTrigonometrica from './pages/Circulos/Trigonometria';
import CPontoM from './pages/Circulos/CPontoM';
//Elipses
import EPontoM from './pages/Elipses/EPontoM';

const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/retas/dda" component={RDda} />
      <Route path="/retas/pontom" component={RPontoM} />
      <Route path="/circulos/explicita" component={CExplicita} />
      <Route path="/circulos/trigonometrica" component={CTrigonometrica} />
      <Route path="/circulos/cpontom" component={CPontoM} />
      <Route path="/elipses/epontom" component={EPontoM} />
    </Router>
  );
}

export default App;
