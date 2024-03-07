import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import MenuStart from './pages/MenuStart.js'

// NDC
import NDC from './pages/NDC/Ndc';
// Retas
import RDda from './pages/Retas/Dda';
import RPontoM from './pages/Retas/PontoM';
// Circulos
import CExplicita from './pages/Circulos/Explicita';
import CTrigonometrica from './pages/Circulos/Trigonometria';
import CPontoM from './pages/Circulos/CPontoM';
// Elipses
import EPontoM from './pages/Elipses/EPontoM';
// Recorte de tela
import CohenSutherland from './pages/Recorte-de-Tela/CohenSutherland';
import Transformacao2D from './pages/Recorte-de-Tela/Transformacao2D';
import Transformacao3D from './pages/Recorte-de-Tela/Transformacao3D';
import Cubo from './pages/Recorte-de-Tela/Cubo.js';
import ProjecaoIsometrica from './pages/Recorte-de-Tela/ProjecaoIsometrica.js';
import ProjecaoOrtografica from './pages/Recorte-de-Tela/ProjecaoOrtografica.js';
// Filtros
import Filter from './pages/Processamento-de-imagem/Filtros';
// Frequencia cardiaca
import Frequencia from './pages/Frequencia-cardiaca/FrequenciaCardiaca.jsx';

import OperadoresMorfologicosBinario from './pages/Processamento-de-imagem/OperadoresMorfologicosBinario'
import OperacoesImagem from './pages/Processamento-de-imagem/OperacoesImagem'
import EqualizarHistograma from './pages/Processamento-de-imagem/EqualizarHistograma'
import TransformacaoImagem from './pages/Processamento-de-imagem/transformacoesImagem.js'

const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/menustart" component={MenuStart} />
      <Route path="/ndc/ndc" component={NDC} />
      <Route path="/retas/dda" component={RDda} />
      <Route path="/retas/pontom" component={RPontoM} />
      <Route path="/circulos/explicita" component={CExplicita} />
      <Route path="/circulos/trigonometrica" component={CTrigonometrica} />
      <Route path="/circulos/cpontom" component={CPontoM} />
      <Route path="/elipses/epontom" component={EPontoM} />
      <Route path="/recorte/cohensutherland" component={CohenSutherland} />
      <Route path="/imagem/filtros" component={Filter} />
      <Route path="/frequencia-caridaca" component={Frequencia} />
      <Route path="/recorte/transformacao2d" component={Transformacao2D} />
      <Route path="/recorte/transformacao3d" component={Transformacao3D} />
      <Route path="/recorte/cubo" component={Cubo} />
      <Route path="/recorte/projecaoisometrica" component={ProjecaoIsometrica} />
      <Route path="/recorte/projecaoortografica" component={ProjecaoOrtografica} />
      <Route path="/imagem/operacoes-morfologicas-binarias" component={OperadoresMorfologicosBinario} />
      <Route path="/imagem/operacoes-imagens" component={OperacoesImagem} />
      <Route path="/imagem/equalizar-histograma" component={EqualizarHistograma}/>
      <Route path="/imagem/transformacao-histograma" component={TransformacaoImagem}/>
    </Router>
  );
}

export default App;
