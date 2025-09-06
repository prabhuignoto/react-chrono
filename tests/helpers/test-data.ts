/**
 * Test data for timeline tests
 */

export const testTimelineItems = [
  {
    title: 'May 1945',
    cardTitle: 'Dunkirk',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
    cardDetailedText: 'On 10 May 1940, Hitler began his long-awaited offensive in the west...',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg'
      }
    }
  },
  {
    title: 'December 1941',
    cardTitle: 'Pearl Harbor',
    cardSubtitle: 'The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft',
    cardDetailedText: 'The attack on Pearl Harbor was a surprise military strike...',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image2.jpg'
      }
    }
  },
  {
    title: 'June 1944',
    cardTitle: 'D-Day',
    cardSubtitle: 'Allied forces storm the beaches of Normandy',
    cardDetailedText: 'The Normandy landings were the landing operations...',
    media: {
      type: 'VIDEO',
      source: {
        url: 'http://someurl/video.mp4'
      }
    }
  },
  {
    title: 'August 1945',
    cardTitle: 'Hiroshima',
    cardSubtitle: 'The atomic bomb is dropped on Hiroshima',
    cardDetailedText: 'On August 6, 1945, the United States dropped an atomic bomb...',
    media: {
      type: 'YOUTUBE',
      source: {
        url: 'https://www.youtube.com/watch?v=abc123'
      }
    }
  },
  {
    title: 'September 1945',
    cardTitle: 'End of WWII',
    cardSubtitle: 'Japan surrenders, ending World War II',
    cardDetailedText: 'The surrender of Imperial Japan was announced...'
  }
];

export const testTimelineProps = {
  basic: {
    items: testTimelineItems,
    mode: 'VERTICAL',
    theme: {
      primary: '#0f52ba',
      secondary: '#ffdf00',
      cardBgColor: '#ffffff',
      cardTextColor: '#000000'
    }
  },
  
  withSlideshow: {
    items: testTimelineItems,
    mode: 'HORIZONTAL',
    slideShow: true,
    slideItemDuration: 2000,
    showProgressOnSlideshow: true
  },
  
  withMedia: {
    items: testTimelineItems,
    mode: 'VERTICAL_ALTERNATING',
    mediaHeight: 200,
    mediaSettings: {
      align: 'center',
      fit: 'cover'
    }
  },
  
  cardless: {
    items: testTimelineItems,
    mode: 'VERTICAL',
    cardLess: true,
    disableClickOnCircle: false
  },
  
  withCustomStyling: {
    items: testTimelineItems,
    mode: 'HORIZONTAL_ALL',
    cardHeight: 300,
    cardWidth: 400,
    lineWidth: 4,
    timelinePointDimension: 20,
    timelinePointShape: 'diamond',
    borderLessCards: true
  },
  
  withNavigation: {
    items: testTimelineItems,
    mode: 'HORIZONTAL',
    disableNavOnKey: false,
    enableQuickJump: true,
    focusActiveItemOnLoad: true,
    disableAutoScrollOnClick: false
  },
  
  withAccessibility: {
    items: testTimelineItems,
    mode: 'VERTICAL',
    buttonTexts: {
      first: 'Go to first',
      last: 'Go to last',
      next: 'Next item',
      previous: 'Previous item',
      play: 'Start slideshow',
      stop: 'Stop slideshow'
    },
    semanticTags: {
      cardTitle: 'h3',
      cardSubtitle: 'h4'
    }
  },
  
  responsive: {
    items: testTimelineItems,
    mode: 'VERTICAL_ALTERNATING',
    responsiveBreakPoint: 768,
    enableBreakPoint: true,
    flipLayout: false
  },
  
  darkMode: {
    items: testTimelineItems,
    mode: 'HORIZONTAL',
    darkMode: true,
    enableDarkToggle: true,
    theme: {
      primary: '#7c3aed',
      secondary: '#db2777',
      cardBgColor: '#1f2937',
      cardTextColor: '#ffffff'
    }
  },
  
  withSearch: {
    items: testTimelineItems,
    mode: 'VERTICAL',
    toolbarPosition: 'top',
    toolbarSearchConfig: {
      width: '300px',
      maxWidth: '400px',
      minWidth: '200px'
    }
  },
  
  nested: {
    items: testTimelineItems.map(item => ({
      ...item,
      nestedItems: [
        { cardTitle: 'Nested Item 1', cardSubtitle: 'Nested subtitle 1' },
        { cardTitle: 'Nested Item 2', cardSubtitle: 'Nested subtitle 2' }
      ]
    })),
    mode: 'VERTICAL',
    nestedCardHeight: 150
  },
  
  scrollable: {
    items: [...testTimelineItems, ...testTimelineItems], // Double items for scrolling
    mode: 'VERTICAL',
    scrollable: { scrollbar: true },
    onScrollEnd: () => console.log('Scroll ended')
  },
  
  interactive: {
    items: testTimelineItems,
    mode: 'HORIZONTAL',
    highlightCardsOnHover: true,
    disableInteraction: false,
    onItemSelected: (data: any) => console.log('Item selected:', data)
  }
};

export const viewportSizes = {
  mobile: { width: 375, height: 667, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1920, height: 1080, name: 'desktop' },
  wide: { width: 2560, height: 1440, name: 'wide' }
};

export const keyboardKeys = {
  navigation: {
    next: 'ArrowRight',
    previous: 'ArrowLeft',
    up: 'ArrowUp',
    down: 'ArrowDown',
    first: 'Home',
    last: 'End'
  },
  general: {
    escape: 'Escape',
    enter: 'Enter',
    space: 'Space',
    tab: 'Tab'
  }
};

export const expectedTexts = {
  buttons: {
    next: 'next',
    previous: 'previous',
    first: 'first',
    last: 'last',
    play: 'start slideshow',
    stop: 'stop slideshow'
  },
  aria: {
    timeline: 'Timeline',
    navigation: 'Timeline navigation',
    item: 'Timeline item'
  }
};

export const timeouts = {
  animation: 500,
  slideshow: 2000,
  scroll: 1000,
  network: 5000,
  render: 300
};