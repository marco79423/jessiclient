import React from 'react'

import JSONView from './JSONView'

export default {
  title: 'elements/JSONView',
  component: JSONView,
}


const Template = (args) => (
  <JSONView {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: '沒資料',
  data: null,
}

export const WithActions = Template.bind({})
WithActions.args = {
  title: '有資料',
  data: [
    {
      '_id': '60dbe4e715307f1c08baca64',
      'index': 0,
      'guid': '9c1b5ce1-bf72-444f-9905-0735e915e0a8',
      'isActive': false,
      'balance': '$1,049.53',
      'picture': 'http://placehold.it/32x32',
      'age': 39,
      'eyeColor': 'brown',
      'name': 'Miller Lang',
      'gender': 'male',
      'company': 'CYTREX',
      'email': 'millerlang@cytrex.com',
      'phone': '+1 (848) 469-3195',
      'address': '288 Noll Street, Bladensburg, Kentucky, 3046',
      'about': 'Dolore id et ea elit deserunt dolor occaecat mollit eiusmod labore excepteur aute. Deserunt id adipisicing consectetur est ut eiusmod incididunt reprehenderit. Deserunt minim ad in nulla nisi enim ullamco minim ea officia voluptate veniam nostrud et. Minim velit consequat aute laborum consequat tempor labore id. Enim ex officia incididunt irure. Dolor anim dolor velit amet commodo irure veniam ea consectetur duis ad laboris. Duis laborum proident adipisicing mollit do.\r\n',
      'registered': '2014-01-21T11:44:09 -08:00',
      'latitude': 42.790664,
      'longitude': -141.485083,
      'tags': [
        'consectetur',
        'aliqua',
        'deserunt',
        'nisi',
        'ipsum',
        'amet',
        'tempor'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Maude Bowman'
        },
        {
          'id': 1,
          'name': 'Castillo Hanson'
        },
        {
          'id': 2,
          'name': 'Juarez Parker'
        }
      ],
      'greeting': 'Hello, Miller Lang! You have 6 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '60dbe4e7a9d7975a4d6128eb',
      'index': 1,
      'guid': '5e456233-747a-4d21-aca2-5b9f442ea90d',
      'isActive': true,
      'balance': '$3,288.54',
      'picture': 'http://placehold.it/32x32',
      'age': 22,
      'eyeColor': 'blue',
      'name': 'Roberts Wilson',
      'gender': 'male',
      'company': 'NORSUP',
      'email': 'robertswilson@norsup.com',
      'phone': '+1 (800) 487-2381',
      'address': '336 Aberdeen Street, Dorneyville, Mississippi, 6119',
      'about': 'Ipsum incididunt duis officia nulla quis. Eu aliquip esse dolore elit deserunt cupidatat eiusmod. Nulla ad ipsum laboris qui irure id. Velit non velit sunt dolor proident Lorem veniam sunt labore aliquip est enim consequat.\r\n',
      'registered': '2014-10-14T10:41:42 -08:00',
      'latitude': 6.307669,
      'longitude': -43.966473,
      'tags': [
        'exercitation',
        'amet',
        'id',
        'ex',
        'dolore',
        'anim',
        'velit'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Gay Woods'
        },
        {
          'id': 1,
          'name': 'Dorsey Stuart'
        },
        {
          'id': 2,
          'name': 'Luisa Calderon'
        }
      ],
      'greeting': 'Hello, Roberts Wilson! You have 8 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '60dbe4e7f9bd69ba2c62ab5a',
      'index': 2,
      'guid': '71f9d36e-c897-4c4e-a857-6640eb5835bc',
      'isActive': true,
      'balance': '$2,003.46',
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'eyeColor': 'brown',
      'name': 'Teri French',
      'gender': 'female',
      'company': 'BLUPLANET',
      'email': 'terifrench@bluplanet.com',
      'phone': '+1 (824) 426-2370',
      'address': '502 Irving Avenue, Choctaw, Massachusetts, 3286',
      'about': 'Velit laboris reprehenderit aute nostrud fugiat occaecat veniam eu quis adipisicing consequat esse minim fugiat. Laborum exercitation adipisicing sint ex amet officia eu minim elit dolore sunt Lorem quis commodo. Aute veniam reprehenderit ad officia consectetur qui non. Reprehenderit magna eiusmod commodo nulla id. Ad non aliquip dolore occaecat labore consequat nulla nulla et. Cillum ad quis sit tempor non deserunt nulla ad laborum. Cillum nisi deserunt et officia ullamco excepteur ex anim eiusmod.\r\n',
      'registered': '2021-04-25T05:47:07 -08:00',
      'latitude': -75.623195,
      'longitude': 129.819826,
      'tags': [
        'do',
        'dolore',
        'voluptate',
        'duis',
        'esse',
        'fugiat',
        'ullamco'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Rose Dyer'
        },
        {
          'id': 1,
          'name': 'Holden Gallagher'
        },
        {
          'id': 2,
          'name': 'Catalina Zamora'
        }
      ],
      'greeting': 'Hello, Teri French! You have 5 unread messages.',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '60dbe4e740e563a27fdd9c2d',
      'index': 3,
      'guid': 'cff2bca5-c8eb-4a6e-9e07-22ebc5d53ea5',
      'isActive': false,
      'balance': '$3,640.38',
      'picture': 'http://placehold.it/32x32',
      'age': 39,
      'eyeColor': 'brown',
      'name': 'Cline Sanford',
      'gender': 'male',
      'company': 'CENTREXIN',
      'email': 'clinesanford@centrexin.com',
      'phone': '+1 (980) 427-2959',
      'address': '945 Holmes Lane, Gerber, Vermont, 5236',
      'about': 'Quis sit duis anim ut. Sit aliqua quis magna et nostrud excepteur deserunt quis enim. Excepteur velit quis veniam reprehenderit. Deserunt aute sunt quis dolor minim dolor commodo dolor ea nisi tempor laboris anim enim. Nostrud irure veniam sit laboris labore aute anim est sit culpa incididunt nostrud non. Consectetur aute ex aute magna nisi est dolore labore sit ex.\r\n',
      'registered': '2016-06-30T02:04:41 -08:00',
      'latitude': -32.483753,
      'longitude': -121.256398,
      'tags': [
        'qui',
        'magna',
        'tempor',
        'non',
        'voluptate',
        'deserunt',
        'laboris'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Ellison Phelps'
        },
        {
          'id': 1,
          'name': 'Burt Browning'
        },
        {
          'id': 2,
          'name': 'Loraine Bird'
        }
      ],
      'greeting': 'Hello, Cline Sanford! You have 7 unread messages.',
      'favoriteFruit': 'banana'
    },
    {
      '_id': '60dbe4e7aa802ce23d0f29be',
      'index': 4,
      'guid': '19112449-018c-456c-b1de-1b123df25a54',
      'isActive': true,
      'balance': '$2,749.60',
      'picture': 'http://placehold.it/32x32',
      'age': 29,
      'eyeColor': 'green',
      'name': 'West Bass',
      'gender': 'male',
      'company': 'CINCYR',
      'email': 'westbass@cincyr.com',
      'phone': '+1 (992) 570-2226',
      'address': '578 Grace Court, Riviera, Missouri, 821',
      'about': 'Ex laboris minim commodo in labore magna consectetur occaecat incididunt nostrud. Adipisicing nisi ad proident duis laboris esse mollit irure officia et minim non excepteur. Tempor consequat culpa excepteur reprehenderit in anim Lorem est occaecat tempor do aute. Laboris duis excepteur laboris eu amet consectetur mollit esse labore consequat labore labore. Laboris qui aliquip voluptate mollit. Excepteur est consectetur aliqua tempor non minim sit. Ex eiusmod enim adipisicing ipsum laborum do non non laboris mollit.\r\n',
      'registered': '2020-03-06T07:19:07 -08:00',
      'latitude': 16.843906,
      'longitude': 92.405642,
      'tags': [
        'proident',
        'officia',
        'mollit',
        'sunt',
        'ullamco',
        'tempor',
        'anim'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Rochelle Suarez'
        },
        {
          'id': 1,
          'name': 'Kane Eaton'
        },
        {
          'id': 2,
          'name': 'Cecelia Andrews'
        }
      ],
      'greeting': 'Hello, West Bass! You have 1 unread messages.',
      'favoriteFruit': 'banana'
    },
    {
      '_id': '60dbe4e7d95c1b55f3584376',
      'index': 5,
      'guid': '7b0a399b-789a-4ac9-b4bf-b149b4220410',
      'isActive': true,
      'balance': '$1,541.40',
      'picture': 'http://placehold.it/32x32',
      'age': 27,
      'eyeColor': 'green',
      'name': 'Paige Conway',
      'gender': 'female',
      'company': 'COMTEXT',
      'email': 'paigeconway@comtext.com',
      'phone': '+1 (983) 552-3942',
      'address': '830 Adams Street, Clayville, District Of Columbia, 942',
      'about': 'Amet esse ea fugiat pariatur nostrud incididunt ad voluptate velit id do labore est exercitation. Do ad Lorem officia adipisicing laboris et in mollit nisi. Esse proident dolore sint esse.\r\n',
      'registered': '2016-05-10T03:03:05 -08:00',
      'latitude': 24.294948,
      'longitude': -177.26458,
      'tags': [
        'est',
        'eu',
        'anim',
        'sunt',
        'anim',
        'esse',
        'do'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Haley Hoover'
        },
        {
          'id': 1,
          'name': 'Rutledge Hendricks'
        },
        {
          'id': 2,
          'name': 'Jodi Howard'
        }
      ],
      'greeting': 'Hello, Paige Conway! You have 5 unread messages.',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '60dbe4e7e79a17ad026fc024',
      'index': 6,
      'guid': 'abb99ca9-2b09-4ee6-a9d0-3b3992ce8347',
      'isActive': true,
      'balance': '$1,139.07',
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'eyeColor': 'brown',
      'name': 'Graves Sanders',
      'gender': 'male',
      'company': 'ZAYA',
      'email': 'gravessanders@zaya.com',
      'phone': '+1 (986) 451-2095',
      'address': '766 Vanderbilt Avenue, Greenwich, Louisiana, 9155',
      'about': 'Labore laborum velit consectetur elit consequat. Aute mollit aute fugiat esse voluptate sit. Id culpa id reprehenderit eu ipsum aliqua enim aliqua quis eiusmod laboris nostrud ex. Ipsum reprehenderit ea veniam aliqua voluptate culpa ullamco veniam ut enim.\r\n',
      'registered': '2016-05-29T08:55:42 -08:00',
      'latitude': -52.551252,
      'longitude': 163.310248,
      'tags': [
        'nostrud',
        'officia',
        'minim',
        'voluptate',
        'minim',
        'mollit',
        'sunt'
      ],
      'friends': [
        {
          'id': 0,
          'name': 'Adrian Thomas'
        },
        {
          'id': 1,
          'name': 'Greta Luna'
        },
        {
          'id': 2,
          'name': 'Emerson Watts'
        }
      ],
      'greeting': 'Hello, Graves Sanders! You have 10 unread messages.',
      'favoriteFruit': 'banana'
    }
  ],
}
