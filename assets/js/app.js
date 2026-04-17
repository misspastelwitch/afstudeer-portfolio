const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const page = ref('home');
    const menuOpen = ref(false);
    const loaderPct = ref(0);
    const loaderDone = ref(false);
    const localTime = ref('');
    const activeFilter = ref('All');
    const ctaWords = ['meaningful', 'accessible', 'cheerful', 'inclusive', 'impactful', 'user-friendly', 'refreshing', 'fun'];
    const ctaWord = ref(ctaWords[0]);
    const ctaWordFading = ref(false);
    let ctaIdx = 0;

    // ── Loader ──
    onMounted(() => {
      const steps = [8, 16, 32, 40, 56, 64, 72, 80, 100];
      let idx = 0;
      const tick = setInterval(() => {
        if (idx < steps.length) {
          loaderPct.value = steps[idx++];
        } else {
          clearInterval(tick);
          setTimeout(() => { loaderDone.value = true; }, 300);
        }
      }, 120);

        // Live amsterdam time zone clock
        const updateTime = () => {
        const now = new Date();
        const hh = String(now.getUTCHours() + 1).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        localTime.value = hh + ':' + mm;
        };
        updateTime();
        const clockTimer = setInterval(updateTime, 10000);


      // changing word
      const wordTimer = setInterval(() => {
        ctaWordFading.value = true;
        setTimeout(() => {
          ctaIdx = (ctaIdx + 1) % ctaWords.length;
          ctaWord.value = ctaWords[ctaIdx];
          ctaWordFading.value = false;
        }, 400);
      }, 5000);

      onUnmounted(() => {
        clearInterval(clockTimer);
        clearInterval(wordTimer);
      });
    });

    // ── Navigation ──
    function goTo(p) {
      page.value = p;
      window.scrollTo(0, 0);
    }

    // ── GSAP wiggle ──
    function wiggleIn(e) {
      gsap.killTweensOf(e.currentTarget);
      gsap.to(e.currentTarget, {
        keyframes: [
          { rotation: -8, x: -2, duration: .18, ease: 'power2.out' },
          { rotation:  7, x:  2, duration: .2,  ease: 'power1.inOut' },
          { rotation: -5, x: -1, duration: .18, ease: 'power1.inOut' },
          { rotation:  3, x:  1, duration: .16, ease: 'power1.inOut' },
          { rotation:  0, x:  0, duration: .15, ease: 'power2.out' },
        ]
      });
    }
    function wiggleOut(e) {
      gsap.killTweensOf(e.currentTarget);
      gsap.to(e.currentTarget, { rotation: 0, x: 0, duration: .2, ease: 'elastic.out(1,0.5)' });
    }

    // ── Projects ──
    function openProject(p) {
      if (p.url) window.open(p.url, '_blank');
    }

    const filters = ['All', 'Design ', 'Development '];

    const projects = [
      {
        title: 'Nebula Xplorer website',
        desc: 'A responsive website showcasing the latest developments for SRONs latest student-led satellite project.',
        year: '2025',
        tags: ['#Aerospace', '#SRON', '#Leiden'],
        category: 'Development ',
        image: './assets/img/sron.png',
        url: 'https://www.sron.nl/en/missions/in-development/missies-in-development-nebula-xplorer/'
      },
      {
        title: 'Oncollaboration web app',
        desc: 'A mobile-first app that lets healthcare workers in the Netherlands & Indonesia collaborate and share patient information securely.',
        year: '2024',
        tags: ['#Medical', '#B2B', '#Amsterdam'],
        category: 'Development ',
        image: './assets/img/onco.png',
        url: 'https://oncollaboration.dev.fdnd.nl/'
      },
      {
        title: 'Merchant sales platform - Blue',
        desc: 'Frontend development work during my internship, building reusable Vue components and improving accessibility across the ticketing platform.',
        year: '2026',
        tags: ['#A11y', '#B2B', '#Leiden'],
        category: 'Development ',
        image: './assets/img/blue.png',
        url: 'https://blue.nl/'
      },
            {
        title: 'Mahjong game website',
        desc: 'A personal project where I designed and developed a Mahjong game, implementing game logic, responsive design, and a cute user interface to provide a calm userexperience.',
        year: '2026',
        tags: ['#JavaScript', '#GameDevelopment', '#PersonalProject'],
        category: 'Development ',
        image: './assets/img/Mahjong.png',
        url: 'https://misspastelwitch.github.io/Mahjong/'
      },
            {
        title: 'Urumi - Itch.Io game',
        desc: 'A short game I developed for the Pirate Software Game Jam, where I designed the storyline and assets to make the game engaging.',
        year: '2026',
        tags: ['#GameJam', '#IndieGame', '#GodotEngine'],
        category: 'Design ',
        image: './assets/img/urumi.png',
        url: 'https://oliveorange.itch.io/urumi'
      },
    ];

    const filteredProjects = computed(() =>
      activeFilter.value === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter.value)
    );

    function filterCount(f) {
      return projects.filter(p => p.category === f).length;
    }

    // ── About ──
    const methods = [
      {
        icon: '',
        title: 'Planning & strategy',
        desc: 'I approach each project with a strategic mindset, carefully planning and prioritizing tasks to ensure efficient use of time and resources. By breaking down complex projects into manageable steps, I can maintain focus on the end goal while adapting to any challenges that arise along the way.'
      },
      {
        icon: '',
        title: 'Programming & collaboration',
        desc: 'I am proficient in a variety of programming languages and frameworks, and I enjoy collaborating with other developers, designers, product owners and stakeholders to bring projects to life. I believe that effective communication and teamwork are essential for creating successful products, and I am always eager to learn from others and share my own niche knowledge and expertise.'
      },
      {
        icon: '',
        title: 'Testing & accessibility',
        desc: 'I am committed to creating inclusive and accessible digital experiences. I rigorously test my designs across different devices, browsers, and assistive technologies to ensure that they are usable by everyone, regardless of their abilities or circumstances. By going beyond just adhering to accessibility standards and best practices, I strive to make the web a more welcoming and equitable place for all users.'
      },
    ];

    const skills = [
      'Figma', 'Canva', 'Prototyping', 'UX Research', 'User Testing',
      'Wireframing', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'GSAP',
      'Vue.js', 'Project Management', 'Accessibility / WCAG adherence', 'Agile / Scrum'
    ];

    return {
      page, menuOpen, loaderPct, loaderDone, localTime,
      activeFilter, filters, projects, filteredProjects, filterCount,
      methods, skills, ctaWord, ctaWordFading,
      goTo, openProject, wiggleIn, wiggleOut
    };
  }
}).mount('#app');