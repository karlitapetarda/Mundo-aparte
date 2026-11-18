var i;

function mostrar(n) {
  var texto = String(n);
  var html = '';
  var j;
  while (texto.length < 6) {
    texto = '0' + texto;
  }
  for (j = 0; j < texto.length; j++) {
    html = html + '<span>' + texto.charAt(j) + '</span>';
  }
  document.getElementById('contador').innerHTML = html;
}

fetch('https://api.counterapi.dev/v1/broken-dreams-expo-carlaglez/visitas/up')
  .then(function (r) {
    return r.json();
  })
  .then(function (d) {
    mostrar(d.count);
  });

var paginas = {
  home: {
    titulo: 'bienvenidos a mi pequeño mundo',
    parrafos: [
      'Un rincón para fotografías, música y todo aquello que permanece con nosotros.',
      'Tómate tu tiempo, echa un vistazo y disfruta.'
    ]
  },
  series: {
    titulo: 'mundo aparte, mi serie fotográfica.',
    parrafos: [
      'Esta serie reúne momentos, lugares y sentimientos que existen en algún espacio entre la realidad y los sueños.',
      'Trata de las cosas que vemos, pero a las que no prestamos atención.',
      'De ser joven, sentirse perdido y encontrar un lugar al que llamar hogar.'
    ]
  },
  gallery: {
    titulo: 'galería',
    parrafos: [
      'Una colección de pequeños momentos, lugares de paso y cosas que quise recordar.',
      'Cada foto guarda una historia, aunque sea silenciosa.'
    ]
  },
  about: {
    titulo: 'sobre mí',
    parrafos: [
      'Solo soy una chica con una cámara, coleccionando momentos e intentando entenderlos.',
      'Me gustan los paseos nocturnos, las luces borrosas y encontrar belleza en las cosas raras.'
    ]
  },
  music: {
    titulo: 'música',
    parrafos: [
      'Algunas canciones se sienten como un lugar al que siempre puedes volver.',
      'Este es un pequeño espacio para los sonidos que me han acompañado en el proyecto.'
    ]
  }
};

var pagina = new URLSearchParams(window.location.search).get('pagina');
var contenido = paginas[pagina];

if (contenido) {
  var centro = document.getElementById('centro');
  var titulo = document.createElement('h2');
  titulo.textContent = '\u2606 ' + contenido.titulo;
  centro.replaceChildren(titulo);

  contenido.parrafos.forEach(function (texto) {
    var parrafo = document.createElement('p');
    parrafo.textContent = texto;
    centro.appendChild(parrafo);
  });

  if (pagina === 'music') {
    var instruccionesMusica = document.createElement('p');
    var listaMusica = document.createElement('div');
    var numeroCancion;
    var cancionesMusica = [
      {
        titulo: 'Chop Suey! - System of a Down',
        portada: './contenido/chop-suey.png',
        youtube: 'https://www.youtube.com/watch?v=CSvFpBOe8eY'
      },
      {
        titulo: 'Emo Boy - Ayesha Erotica',
        portada: './contenido/ayesha.jpg',
        youtube: 'https://www.youtube.com/watch?v=HljuZ0VllBM'
      },
      { titulo: 'Britney Spears - Circus',
         portada: './contenido/britney.jpe',
          youtube: 'https://youtu.be/lVhJ_A8XUgc?si=icK0_vFMVpZ4rqsn' 
        },
      { titulo: '', portada: '', youtube: '' },
      { titulo: '', portada: '', youtube: '' },
      { titulo: '', portada: '', youtube: '' }
    ];
    // Completa estos datos con el título, la ruta de portada y el enlace de YouTube.

    listaMusica.id = 'musica-grid';
    centro.appendChild(instruccionesMusica);
    centro.appendChild(listaMusica);

    function obtenerEnlaceYoutube(url) {
      var direccion;
      var anfitrion;

      try {
        direccion = new URL(url);
      } catch (error) {
        return null;
      }

      anfitrion = direccion.hostname.toLowerCase();
      if (direccion.protocol === 'https:' &&
          (anfitrion === 'youtube.com' ||
           anfitrion === 'www.youtube.com' ||
           anfitrion === 'm.youtube.com' ||
           anfitrion === 'music.youtube.com' ||
           anfitrion === 'youtu.be')) {
        return direccion.href;
      }

      return null;
    }

    for (numeroCancion = 0; numeroCancion < cancionesMusica.length; numeroCancion++) {
      var cancion = cancionesMusica[numeroCancion];
      var tarjetaMusica = document.createElement('figure');
      var portada = document.createElement('div');
      var pie = document.createElement('figcaption');
      var tituloCancion;
      var estadoCancion;
      var imagen;
      var enlace;
      var enlacePortada;

      tarjetaMusica.className = 'tarjeta-musica';
      portada.className = 'foto musica-portada';
      pie.className = 'pie-musica';

      enlace = cancion.youtube ? obtenerEnlaceYoutube(cancion.youtube) : null;
      if (cancion.portada) {
        imagen = document.createElement('img');
        imagen.src = cancion.portada;
        imagen.alt = cancion.titulo || 'Portada de canción';
        portada.appendChild(imagen);
      }

      tituloCancion = document.createElement(enlace && cancion.titulo ? 'a' : 'span');
      tituloCancion.className = 'titulo-cancion';
      tituloCancion.textContent = cancion.titulo || 'Añade el título en script.js';
      if (enlace && cancion.titulo) {
        tituloCancion.href = enlace;
        tituloCancion.target = '_blank';
        tituloCancion.rel = 'noopener noreferrer';
      }
      pie.appendChild(tituloCancion);
      if (enlace) {
        enlacePortada = document.createElement('a');
        enlacePortada.href = enlace;
        enlacePortada.target = '_blank';
        enlacePortada.rel = 'noopener noreferrer';
        enlacePortada.setAttribute('aria-label', 'Abrir video de ' +
          (cancion.titulo || 'YouTube'));
        enlacePortada.appendChild(portada);
        tarjetaMusica.appendChild(enlacePortada);
      } else {
        tarjetaMusica.appendChild(portada);
      }
      tarjetaMusica.appendChild(pie);

      if (cancion.titulo && !enlace) {
        estadoCancion = document.createElement('span');
        estadoCancion.className = 'estado-cancion';
        estadoCancion.textContent = cancion.youtube
          ? 'Enlace no válido: revisa la URL de YouTube en script.js.'
          : 'Añade el enlace de YouTube en script.js.';
        tarjetaMusica.appendChild(estadoCancion);
      } else if (enlace && !cancion.titulo) {
        estadoCancion = document.createElement('span');
        estadoCancion.className = 'estado-cancion';
        estadoCancion.textContent = 'Añade el título en script.js para activar el enlace.';
        tarjetaMusica.appendChild(estadoCancion);
      }

      listaMusica.appendChild(tarjetaMusica);
    }
  }
}

var huecos = document.querySelectorAll('.foto');
var selector = document.createElement('input');
var actual = null;

selector.type = 'file';
selector.accept = 'image/*';

for (i = 0; i < huecos.length; i++) {
  if (huecos[i].classList.contains('musica-portada')) {
    continue;
  }
  huecos[i].onclick = function () {
    actual = this;
    selector.click();
  };
}

selector.onchange = function () {
  var archivo = selector.files[0];
  var img;
  if (archivo && actual) {
    img = actual.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      actual.appendChild(img);
    }
    img.src = URL.createObjectURL(archivo);
  }
};
