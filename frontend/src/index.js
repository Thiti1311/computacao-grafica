import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import MenuStart from './pages/MenuStart.js';

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
// import Transformacao2D from './pages/Recorte-de-Tela/transformacao-2d.html';
import Transformacao3D from './pages/Recorte-de-Tela/Transformacao3D';
import Cubo from './pages/Recorte-de-Tela/Cubo.js';
import ProjecaoIsometrica from './pages/Recorte-de-Tela/ProjecaoIsometrica.js';
import ProjecaoOrtografica from './pages/Recorte-de-Tela/ProjecaoOrtografica.js';
// Filtros
import Filter from './pages/Processamento-de-imagem/Filtros';
// Frequencia cardiaca
import Frequencia from './pages/Frequencia-cardiaca/FrequenciaCardiaca';

import OperadoresMorfologicosBinario from './pages/Processamento-de-imagem/OperadoresMorfologicosBinario'
import OperacoesImagem from './pages/Processamento-de-imagem/OperacoesImagem'
import EqualizarHistograma from './pages/Processamento-de-imagem/EqualizarHistograma'
import TransformacaoImagem from './pages/Processamento-de-imagem/transformacoesImagem.js'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path:'/', element:<Home/>},
  {path:'/sobre', element:<Sobre/>},
  {path:'/menustart', element:<MenuStart/>},
  {path:'/ndc/ndc', element:<NDC/>},
  {path:'/retas/dda', element:<RDda/>},
  {path:'/retas/pontom', element:<RPontoM/>},
  {path:'/circulos/explicita', element:<CExplicita/>},
  {path:'/circulos/trigonometrica', element:<CTrigonometrica/>},
  {path:'/circulos/cpontom', element:<CPontoM/>},
  {path:'/elipses/epontom', element:<EPontoM/>},
  {path:'/recorte/cohensutherland', element:<CohenSutherland/>},
  {path:'/imagem/filtros', element:<Filter/>},
  {path:'/frequencia-caridaca', element:<Frequencia/>},
  {path:'/recorte/transformacao2d', element:<Transformacao2D/>},
  {path:'/recorte/transformacao3d', element:<Transformacao3D/>},
  {path:'/recorte/cubo', element:<Cubo/>},
  {path:'/recorte/projecaoisometrica', element:<ProjecaoIsometrica/>},
  {path:'/recorte/projecaoortografica', element:<ProjecaoOrtografica/>},
  {path:'/imagem/operacoes-morfologicas-binarias', element:<OperadoresMorfologicosBinario/>},
  {path:'/imagem/operacoes-imagens', element:<OperacoesImagem/>},
  {path:'/imagem/equalizar-histograma', element:<EqualizarHistograma/>},
  {path:'/imagem/transformacao-histograma', element:<TransformacaoImagem/>},
])

ReactDOM.createRoot(document.getElementById('root')).
render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
);
