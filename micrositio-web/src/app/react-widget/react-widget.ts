import { createElement } from 'react';

export function ReactWidget() {
  return createElement(
    'article',
    { className: 'react-widget' },
    createElement('span', null, 'COMPONENTE REACT'),
    createElement('h2', null, 'Aprende a tu ritmo'),
    createElement(
      'p',
      null,
      'Explora recursos, descubre actividades y sigue desarrollando tus habilidades.'
    ),
    createElement(
      'button',
      {
        type: 'button',
        onClick: () => alert('¡Sigue explorando Campus Guía!')
      },
      '¡Vamos a explorar!'
    )
  );
}
