import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './components/app';
import './styles.css';


// import FlashImageSrc from './images/flash_medium.png';
// import { ReactComponent as Logo } from './images/flash_small.svg';

// const Applist = () => {
//   return (
//     <ul>
//       <li>Мой первый элемент</li>
//       <li>Мой второй элемент</li>
//     </ul>
//   )
// }

// const AppHeader = ({title}) => {
//   return (
//     <div>
//       <Logo/>
//       <h1><span>{title}</span> </h1>
//     </div>
//   )
  
// }
// const AppInput = ({placeholder, label}) => {
//   return (
//     <label className='label'>{label}
//       <input placeholder={placeholder} type="password" />
//     </label>
//   )
// }


// const App1 = () => {
//   return (
//     <>
//       <AppHeader title = "Привет, Hui!"/>
//       <Applist />
//       <AppInput placeholder="Введите ваше имя" label="Имя" />
//       <AppInput placeholder="Введите ваше email" label="email" />
//     </>
//   )
// }
// console.log(<App1 />)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);


