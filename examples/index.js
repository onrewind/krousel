function makeKrousel({ count = 5, name = '', className, ...config }) {
  let section = document.createElement('section');
  if (className) {
    section.classList.add(className);
  }
  let sectionTitle = document.createElement('h1');
  sectionTitle.innerHTML = name;
  section.appendChild(sectionTitle);
  let configDesc = document.createElement('pre');
  configDesc.innerHTML = JSON.stringify(config, null, 2);
  section.appendChild(configDesc);
  let target = document.createElement('div');
  section.appendChild(target);
  new Array(count).fill(null).forEach((__, i) => {
    let slide = document.createElement('div');
    let title = document.createElement('h3');
    title.innerHTML = (i + 1).toString();
    slide.appendChild(title);
    target.append(slide);
  });
  document.body.appendChild(section);
  new Krousel(target, config);
}

const CONFIGS = [
  {
    name: 'Simple demo',
    count: 5,
    infinite: false,
  },
  {
    name: 'Infinite loop (default)',
    count: 5,
    infinite: true,
  },
  {
    name: 'Transition speed',
    count: 5,
    speed: 1000,
    className: 'slow',
  },
  {
    name: 'Show multiple',
    count: 5,
    slidesToShow: 2,
  },
  {
    name: 'Scroll multiple',
    count: 5,
    slidesToShow: 2,
    slidesToScroll: 2,
  },
  {
    name: 'Scroll multiple',
    count: 25,
    slidesToShow: 4,
    slidesToScroll: 3,
  },
  {
    name: 'Hide dots',
    count: 5,
    dots: false,
  },
  {
    name: 'hover lens effect',
    className: 'lens',
    infinite: true,
    zoomHover: true,
    count: 10,
    slidesToShow: 3,
  },
];

// window.addEventListener('load', function() {
  CONFIGS.map(makeKrousel);
// });