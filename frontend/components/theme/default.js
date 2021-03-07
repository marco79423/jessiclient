export const colorTable = {
  'deep-purple-50': '#EDE7F6',
  'deep-purple-100': '#D1C4E9',
  'deep-purple-200': '#B39DDB',
  'deep-purple-300': '#9575CD',
  'deep-purple-400': '#7E57C2',
  'deep-purple-500': '#673AB7',
  'deep-purple-600': '#5E35B1',
  'deep-purple-700': '#512DA8',
  'deep-purple-800': '#4527A0',
  'deep-purple-900': '#311B92',
  'deep-purple-A100': '#B388FF',
  'deep-purple-A200': '#7C4DFF',
  'deep-purple-A400': '#651FFF',
  'deep-purple-A700': '#6200EA',

  'indigo-50': '#E8EAF6',
  'indigo-100': '#C5CAE9',
  'indigo-200': '#9FA8DA',
  'indigo-300': '#7986CB',
  'indigo-400': '#5C6BC0',
  'indigo-500': '#3F51B5',
  'indigo-600': '#3949AB',
  'indigo-700': '#303F9F',
  'indigo-800': '#283593',
  'indigo-900': '#1A237E',
  'indigo-A100': '#8C9EFF',
  'indigo-A200': '#536DFE',
  'indigo-A400': '#3D5AFE',
  'indigo-A700': '#304FFE',

  'grey-50': '#FAFAFA',
  'grey-200': '#EEEEEE',
  'grey-300': '#E0E0E0',
  'grey-600': '#757575',
  'grey-700': '#616161',
  'grey-900': '#212121'
}

const basicTheme = {
  primary: colorTable['indigo-600'],
  secondary: colorTable['deep-purple-600']
}

const theme = {
  basic: {
    ...basicTheme,
  },
  page: {
    background: colorTable['grey-700'],
    header: {
      background: colorTable['indigo-800'],
      titleColor: colorTable['grey-50'],
      subtitleColor: colorTable['grey-50'],
      settingsButton: colorTable['grey-50'],
    },
    main: {
      background: colorTable['grey-200'],
      controlPanel: {
        background: colorTable['indigo-400'],
        connectionPanel: {
          background: 'white',
          connectButtonTextColor: colorTable['indigo-600'],
        },
        requestPanel: {
          tab: colorTable['indigo-100'],
        },
        copyright: {
          textColor: colorTable['grey-200'],
        }
      },
      listPanel: {
        background: colorTable['grey-200'],
        controlBar: {
          background: colorTable['indigo-400'],
          clearButton: 'white',
        },
        message: {
          background: 'white',
        }
      },
      detailPanel: {
        controlBar: {
          background: colorTable['indigo-400'],
          tab: colorTable['indigo-200'],
        },
      },
      favoriteRequestsPanel: {
        header: {
          background: colorTable['indigo-800'],
          textColor: 'white',
          closeButton: 'white',
        },
        background: colorTable['indigo-400'],
      }
    },
  }
}

export default theme
