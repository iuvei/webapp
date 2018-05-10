import Utils from '../../assets/js/mUtils'

export const uniquelizeNosort = (arr) => { // 去重复不排序
  let re = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== re[re.length - 1]) {
      re.push(arr[i])
    }
  }
  return re
}

//玩法ID对应的生成随机的算法
export const lt_method = {
  '2': 'ZX3',  //前三直选
  '3': 'ZXHZ', //前三直选_和值
  '5': 'ZX3',
  '6': 'ZXHZ',
  '8': 'ZUS',
  '9': 'ZUL',
  '10': 'ZUL',
  '10': 'HHZX',
  '11': 'ZUHZ',
  '13': 'ZUS',
  '14': 'ZUL',
  '15': 'HHZX',
  '16': 'ZUHZ',
  '18': 'BDW1',
  '20': 'BDW2',
  '22': 'ZX2',
  '24': 'ZX2',
  '26': 'ZU2',
  '28': 'ZU2',
  '30': 'DWD',
  '31': 'DWD',
  '32': 'DWD',
  '33': 'DWD',
  '34': 'DWD',
  '36': 'DXDS',
  '38': 'DXDS',
  '89': 'ZX3',
  '92': 'ZXHZ',
  '102': 'ZX3',
  '103': 'ZXHZ',
  '104': 'ZUS',
  '105': 'ZUL',
  '106': 'HHZX',
  '107': 'ZUHZ',
  '108': 'ZUS',
  '109': 'ZUL',
  '110': 'HHZX',
  '111': 'ZUHZ',
  '112': 'BDW1',
  '113': 'BDW2',
  '114': 'ZX2',
  '115': 'ZX2',
  '116': 'ZU2',
  '117': 'ZU2',
  '118': 'DWD',
  '119': 'DWD',
  '120': 'DWD',
  '121': 'DWD',
  '122': 'DWD',
  '123': 'DXDS',
  '124': 'DXDS',
  '126': 'ZX3',
  '127': 'ZXHZ',
  '129': 'ZX3',
  '130': 'ZXHZ',
  '132': 'ZUS',
  '133': 'ZUL',
  '134': 'HHZX',
  '135': 'ZUHZ',
  '137': 'ZUS',
  '138': 'ZUL',
  '139': 'HHZX',
  '140': 'ZUHZ',
  '142': 'BDW1',
  '144': 'BDW2',
  '146': 'ZX2',
  '148': 'ZX2',
  '150': 'ZU2',
  '152': 'ZU2',
  '154': 'DWD',
  '155': 'DWD',
  '156': 'DWD',
  '157': 'DWD',
  '158': 'DWD',
  '160': 'DXDS',
  '162': 'DXDS',
  '189': 'ZX3',
  '190': 'ZXHZ',
  '192': 'ZUS',
  '193': 'ZUL',
  '194': 'HHZX',
  '195': 'ZUHZ',
  '197': 'BDW1',
  '199': 'ZX2',
  '201': 'ZX2',
  '203': 'ZU2',
  '205': 'ZU2',
  '220': 'SD337',
  '222': 'SD339',
  '224': 'SD341',
  '226': 'SD343',
  '228': 'SD345',
  '230': 'SD347',
  '231': 'SDDWD',
  '232': 'SDDWD',
  '234': 'SDQWX1',
  '236': 'SDQWX2',
  '238': 'SD355',
  '240': 'SD357',
  '243': 'SD359',
  '246': 'SD361',
  '249': 'SD363',
  '252': 'SD365',
  '255': 'SD367',
  '258': 'SD369',
  '261': 'DWD',
  '262': 'DWD',
  '263': 'DWD',
  '265': 'ZX3',
  '266': 'ZXHZ',
  '268': 'ZX3',
  '269': 'ZXHZ',
  '271': 'ZUS',
  '272': 'ZUL',
  '273': 'HHZX',
  '274': 'ZUHZ',
  '276': 'ZUS',
  '277': 'ZUL',
  '278': 'HHZX',
  '279': 'ZUHZ',
  '281': 'BDW1',
  '283': 'BDW2',
  '285': 'ZX2',
  '287': 'ZX2',
  '289': 'ZU2',
  '291': 'ZU2',
  '293': 'DWD',
  '294': 'DWD',
  '295': 'DWD',
  '296': 'DWD',
  '297': 'DWD',
  '299': 'DXDS',
  '301': 'DXDS',
  '303': 'SD337',
  '305': 'SD339',
  '307': 'SD341',
  '309': 'SD343',
  '311': 'SD345',
  '313': 'SD347',
  '314': 'SDDWD',
  '315': 'SDDWD',
  '317': 'SDQWX1',
  '319': 'SDQWX2',
  '321': 'SD355',
  '323': 'SD357',
  '325': 'SD359',
  '327': 'SD361',
  '329': 'SD363',
  '331': 'SD365',
  '333': 'SD367',
  '335': 'SD369',
  '337': 'SD337',
  '339': 'SD339',
  '341': 'SD341',
  '343': 'SD343',
  '345': 'SD345',
  '347': 'SD347',
  '348': 'SDDWD',
  '349': 'SDDWD',
  '351': 'SDQWX1',
  '353': 'SDQWX2',
  '355': 'SD355',
  '357': 'SD357',
  '359': 'SD359',
  '361': 'SD361',
  '363': 'SD363',
  '365': 'SD365',
  '367': 'SD367',
  '369': 'SD369',
  '385': 'BJHZDS',
  '387': 'BJHZDX',
  '389': 'BJSXP',
  '391': 'BJJOP',
  '393': 'SD337',
  '395': 'SD339',
  '397': 'SD341',
  '399': 'SD343',
  '401': 'SD345',
  '403': 'SD347',
  '404': 'SDDWD',
  '405': 'SDDWD',
  '407': 'SDQWX1',
  '409': 'SDQWX2',
  '411': 'SD355',
  '413': 'SD357',
  '415': 'SD359',
  '417': 'SD361',
  '419': 'SD363',
  '421': 'SD365',
  '423': 'SD367',
  '425': 'SD369',
  '427': 'BJDXDS',
  '433': 'TX5',//CQSSC:五星通选
  '453': 'ZU3BD',
  '463': 'ZU3BD',
  '472': 'ZXHZ2',
  '474': 'ZXHZ2',
  '476': 'ZUHZ2',
  '478': 'ZUHZ2',
  '512': 'BDW1',
  '513': 'BDW2',
  '1189': 'ZX3',
  '1190': 'ZXHZ',
  '1192': 'ZUS',
  '1193': 'ZUL',
  '1194': 'HHZX',
  '1195': 'ZUHZ',
  '1197': 'BDW1',
  '1199': 'ZX2',
  '1201': 'ZX2',
  '1203': 'ZU2',
  '1205': 'ZU2',
  '1261': 'DWD',
  '1262': 'DWD',
  '1263': 'DWD',
  '2189': 'ZX3',
  '2190': 'ZXHZ',
  '2192': 'ZUS',
  '2193': 'ZUL',
  '2194': 'HHZX',
  '2195': 'ZUHZ',
  '2197': 'BDW1',
  '2199': 'ZX2',
  '2201': 'ZX2',
  '2203': 'ZU2',
  '2205': 'ZU2',
  '2261': 'DWD',
  '2262': 'DWD',
  '2263': 'DWD',
  '2265': 'ZX4',
  '2267': 'ZH4',
  '2269': 'SXZU24',
  '2270': 'SXZU12',
  '2271': 'SXZU6',
  '2272': 'SXZU4',
  '2274': 'ZX5',
  '2276': 'ZH5',
  '2278': 'WXZU120',
  '2279': 'WXZU60',
  '2280': 'WXZU30',
  '2281': 'WXZU20',
  '2282': 'WXZU10',
  '2283': 'WXZU5',
  '2285': 'BDW1',
  '2286': 'HSCS',
  '2287': 'SXBX',
  '2288': 'SJFC',
  '2291': 'ZX3',
  '2292': 'ZXHZ',
  '2293': 'ZUS',
  '2294': 'ZUL',
  '2295': 'HHZX',
  '2296': 'ZUHZ',
  '2298': 'BDW2',
  '2304': 'BJRX1',
  '2305': 'BJRX2',
  '2306': 'BJRX3',
  '2307': 'BJRX4',
  '2308': 'BJRX5',
  '2309': 'BJRX6',
  '2310': 'BJRX7',
  '2314': 'BDW2',
  //任选二
  '1010102': 'RXZXSSC2',//任选二直选复式-万百
  '1010103': 'RXZXSSC2',//任选二直选复式-万十
  '1010104': 'RXZXSSC2',//任选二直选复式-万个
  '1010105': 'RXZXSSC2',//任选二直选复式-千百
  '1010106': 'RXZXSSC2',//任选二直选复式-千十
  '1010107': 'RXZXSSC2',//任选二直选复式-千个
  '1010108': 'RXZXSSC2',//任选二直选复式-百十
  '1010109': 'RXZXSSC2',//任选二直选复式-百个
  '1010110': 'RXZXSSC2',//任选二直选复式-十个
  '1010122': 'RXZXSSC2HZ',  //任选二直选和值-百个
  '1010123': 'RXZXSSC2HZ',  //任选二直选和值-百十
  '1010124': 'RXZXSSC2HZ',  //任选二直选和值-千个
  '1010125': 'RXZXSSC2HZ',  //任选二直选和值-千十
  '1010126': 'RXZXSSC2HZ',  //任选二直选和值-千百
  '1010127': 'RXZXSSC2HZ',  //任选二直选和值-万个
  '1010128': 'RXZXSSC2HZ',  //任选二直选和值-万十
  '1010129': 'RXZXSSC2HZ',  //任选二直选和值-万百
  '1010130': 'RXZXSSC2HZ',  //任选二直选和值-万千
  '1010202': 'RXZUSSC2',//任选二组选复式-万百
  '1010203': 'RXZUSSC2',//任选二组选复式-万十
  '1010204': 'RXZUSSC2',//任选二组选复式-千个
  '1010205': 'RXZUSSC2',//任选二组选复式-千百
  '1010206': 'RXZUSSC2',//任选二组选复式-千十
  '1010207': 'RXZUSSC2',//任选二组选复式-千个
  '1010208': 'RXZUSSC2',//任选二组选复式-百十
  '1010209': 'RXZUSSC2',//任选二组选复式-百个
  '1010210': 'RXZUSSC2',//任选二组选复式-十个
  '1010222': 'RXZUSSC2HZ',  //任选二组选和值-百个
  '1010223': 'RXZUSSC2HZ',  //任选二组选和值-百十
  '1010224': 'RXZUSSC2HZ',  //任选二组选和值-千个
  '1010225': 'RXZUSSC2HZ',  //任选二组选和值-千十
  '1010226': 'RXZUSSC2HZ',  //任选二组选和值-千百
  '1010227': 'RXZUSSC2HZ',  //任选二组选和值-千个
  '1010228': 'RXZUSSC2HZ',  //任选二组选和值-万十
  '1010229': 'RXZUSSC2HZ',  //任选二组选和值-万百
  '1010230': 'RXZUSSC2HZ',  //任选二组选和值-万千

  '1010439': 'SD337',
  '1010440': 'SD339',
  '1010441': 'SD341',
  '1010442': 'SD343',
  '1010443': 'SD345',
  '1010444': 'SD347',
  '1010447': 'SDQWX1',
  '1010448': 'SDQWX2',
  '1010449': 'SD355',
  '1010450': 'SD357',
  '1010451': 'SD359',
  '1010452': 'SD361',
  '1010453': 'SD363',
  '1010454': 'SD365',
  '1010455': 'SD367',
  '1010456': 'SD369',

  '2327': 'ZXHZ',//天津后三直选_和值
  '2332': 'ZUS',//天津后三组选_组三
  '2333': 'ZUL',//天津后三组选_组六
  '2335': 'ZUHZ',//天津后三组选_和值
  '2324': 'ZX3',//天津前三直选
  '2325': 'ZXHZ',//天津
  '2328': 'ZUS',//天津
  '2329': 'ZUL',//天津
  '2331': 'ZUHZ',//天津
  '2338': 'ZX2',//天津前二直选
  '2340': 'ZU2',//天津
  '2341': 'ZU2',//天津
  '2342': 'DWD',
  '2343': 'DWD',
  '2344': 'DWD',
  '2345': 'DWD',
  '2346': 'DWD',
  '2336': 'BDW1',
  '2337': 'BDW2',
  '2347': 'DXDS',
  '2348': 'DXDS',


  '2433': 'JSK3a1',
  '2434': 'JSK3a2',
  '2435': 'JSK3a3',
  '2436': 'JSK3a4',
  '2438': 'JSK3a6',
  '2439': 'JSK3a7',
  '2440': 'JSK3a6i',
  '2441': 'JSK3a8',
  '2442': 'JSK3a4i',
  '2443': 'JSK3a9',


  //秒秒彩
  1010472: 'ZX3',
  1010473: 'ZXHZ',
  1010475: 'ZX3',
  1010476: 'ZXHZ',
  1010478: 'ZUS',
  1010479: 'ZUL',
  1010480: 'HHZX',
  1010481: 'ZUHZ',
  1010482: 'ZU3BD',
  1010484: 'ZUS',
  1010485: 'ZUL',
  1010486: 'HHZX',
  1010487: 'ZUHZ',
  1010488: 'ZU3BD',
  1010490: 'BDW1',
  1010491: 'BDW1',
  1010493: 'BDW2',
  1010495: 'ZX2',
  1010496: 'ZX2',
  1010497: 'ZXHZ2',
  1010498: 'ZXHZ2',
  1010501: 'DWD',
  1010502: 'DWD',
  1010503: 'DWD',
  1010504: 'DWD',
  1010505: 'DWD',
  1010507: 'DXDS',
  1010508: 'DXDS',
  1010510: 'ZX4',
  1010512: 'ZH4',
  1010514: 'SXZU24',
  1010515: 'SXZU12',
  1010516: 'SXZU6',
  1010517: 'SXZU4',
  1010519: 'ZX5',
  1010521: 'ZH5',
  1010523: 'WXZU120',
  1010524: 'WXZU60',
  1010525: 'WXZU30',
  1010526: 'WXZU20',
  1010527: 'WXZU10',
  1010528: 'WXZU5',
  1010530: 'BDW1',
  1010531: 'HSCS',
  1010532: 'SXBX',
  1010533: 'SJFC',
  1010535: 'ZX3',
  1010536: 'ZXHZ',
  1010538: 'ZUS',
  1010539: 'ZUL',
  1010540: 'HHZX',
  1010541: 'ZUHZ',
  1010543: 'RXZXSSC2',
  1010544: 'RXZXSSC2',
  1010545: 'RXZXSSC2',
  1010546: 'RXZXSSC2',
  1010547: 'RXZXSSC2',
  1010548: 'RXZXSSC2',
  1010549: 'RXZXSSC2',
  1010550: 'RXZXSSC2',
  1010551: 'RXZXSSC2',
  1010552: 'RXZXSSC2',
  1010553: 'RXZXSSC2DS',
  1010554: 'RXZXSSC2DS',
  1010555: 'RXZXSSC2DS',
  1010556: 'RXZXSSC2DS',
  1010557: 'RXZXSSC2DS',
  1010558: 'RXZXSSC2DS',
  1010559: 'RXZXSSC2DS',
  1010560: 'RXZXSSC2DS',
  1010561: 'RXZXSSC2DS',
  1010562: 'RXZXSSC2DS',
  1010563: 'RXZXSSC2HZ',
  1010564: 'RXZXSSC2HZ',
  1010565: 'RXZXSSC2HZ',
  1010566: 'RXZXSSC2HZ',
  1010567: 'RXZXSSC2HZ',
  1010568: 'RXZXSSC2HZ',
  1010569: 'RXZXSSC2HZ',
  1010570: 'RXZXSSC2HZ',
  1010571: 'RXZXSSC2HZ',
  1010572: 'RXZXSSC2HZ',
  1010574: 'RXZUSSC2',
  1010575: 'RXZUSSC2',
  1010576: 'RXZUSSC2',
  1010577: 'RXZUSSC2',
  1010578: 'RXZUSSC2',
  1010579: 'RXZUSSC2',
  1010580: 'RXZUSSC2',
  1010581: 'RXZUSSC2',
  1010582: 'RXZUSSC2',
  1010583: 'RXZUSSC2',
  1010584: 'RXZUSSC2DS',
  1010585: 'RXZUSSC2DS',
  1010586: 'RXZUSSC2DS',
  1010587: 'RXZUSSC2DS',
  1010588: 'RXZUSSC2DS',
  1010589: 'RXZUSSC2DS',
  1010590: 'RXZUSSC2DS',
  1010591: 'RXZUSSC2DS',
  1010592: 'RXZUSSC2DS',
  1010593: 'RXZUSSC2DS',
  1010594: 'RXZUSSC2HZ',
  1010595: 'RXZUSSC2HZ',
  1010596: 'RXZUSSC2HZ',
  1010597: 'RXZUSSC2HZ',
  1010598: 'RXZUSSC2HZ',
  1010599: 'RXZUSSC2HZ',
  1010600: 'RXZUSSC2HZ',
  1010601: 'RXZUSSC2HZ',
  1010602: 'RXZUSSC2HZ',
  1010603: 'RXZUSSC2HZ',
  1010605: 'RXZXSSC3',
  1010606: 'RXZXSSC3',
  1010607: 'RXZXSSC3',
  1010608: 'RXZXSSC3',
  1010609: 'RXZXSSC3',
  1010610: 'RXZXSSC3',
  1010611: 'RXZXSSC3',
  1010612: 'RXZXSSC3',
  1010613: 'RXZXSSC3',
  1010614: 'RXZXSSC3',
  1010615: 'RXZXSSC3DS',
  1010616: 'RXZXSSC3DS',
  1010617: 'RXZXSSC3DS',
  1010618: 'RXZXSSC3DS',
  1010619: 'RXZXSSC3DS',
  1010620: 'RXZXSSC3DS',
  1010621: 'RXZXSSC3DS',
  1010622: 'RXZXSSC3DS',
  1010623: 'RXZXSSC3DS',
  1010624: 'RXZXSSC3DS',
  1010625: 'RXZXSSC3HZ',
  1010626: 'RXZXSSC3HZ',
  1010627: 'RXZXSSC3HZ',
  1010628: 'RXZXSSC3HZ',
  1010629: 'RXZXSSC3HZ',
  1010630: 'RXZXSSC3HZ',
  1010631: 'RXZXSSC3HZ',
  1010632: 'RXZXSSC3HZ',
  1010633: 'RXZXSSC3HZ',
  1010634: 'RXZXSSC3HZ',
  1010636: 'RXZUSANSSC3',
  1010637: 'RXZUSANSSC3',
  1010638: 'RXZUSANSSC3',
  1010639: 'RXZUSANSSC3',
  1010641: 'RXZUSANSSC3',
  1010642: 'RXZUSANSSC3',
  1010643: 'RXZUSANSSC3',
  1010644: 'RXZUSANSSC3',
  1010645: 'RXZUSANSSC3',
  1010646: 'RXZUSIXSSC3',
  1010647: 'RXZUSIXSSC3',
  1010648: 'RXZUSIXSSC3',
  1010649: 'RXZUSIXSSC3',
  1010650: 'RXZUSIXSSC3',
  1010651: 'RXZUSIXSSC3',
  1010652: 'RXZUSIXSSC3',
  1010653: 'RXZUSIXSSC3',
  1010654: 'RXZUSIXSSC3',
  1010655: 'RXZUSIXSSC3',
  1010656: 'RXZUSSC3HH',
  1010657: 'RXZUSSC3HH',
  1010658: 'RXZUSSC3HH',
  1010659: 'RXZUSSC3HH',
  1010660: 'RXZUSSC3HH',
  1010661: 'RXZUSSC3HH',
  1010662: 'RXZUSSC3HH',
  1010663: 'RXZUSSC3HH',
  1010664: 'RXZUSSC3HH',
  1010665: 'RXZUSSC3HH',
  1010666: 'RXZUSSC3HZ',
  1010667: 'RXZUSSC3HZ',
  1010668: 'RXZUSSC3HZ',
  1010669: 'RXZUSSC3HZ',
  1010670: 'RXZUSSC3HZ',
  1010671: 'RXZUSSC3HZ',
  1010672: 'RXZUSSC3HZ',
  1010673: 'RXZUSSC3HZ',
  1010674: 'RXZUSSC3HZ',
  1010675: 'RXZUSSC3HZ',
  1010676: 'RXZUSANSSC3',
  1010678: 'RXZXSSC4',
  1010679: 'RXZXSSC4',
  1010680: 'RXZXSSC4',
  1010681: 'RXZXSSC4',
  1010682: 'RXZXSSC4',
  1010683: 'RXZXSSC4DS',
  1010684: 'RXZXSSC4DS',
  1010685: 'RXZXSSC4DS',
  1010686: 'RXZXSSC4DS',
  1010687: 'RXZXSSC4DS',
  1010689: 'RXZU24SSC4',
  1010690: 'RXZU24SSC4',
  1010691: 'RXZU24SSC4',
  1010692: 'RXZU24SSC4',
  1010693: 'RXZU24SSC4',
  1010694: 'RXZU12SSC4',
  1010695: 'RXZU12SSC4',
  1010696: 'RXZU12SSC4',
  1010697: 'RXZU12SSC4',
  1010698: 'RXZU12SSC4',
  1010699: 'RXZU6SSC4',
  1010700: 'RXZU6SSC4',
  1010701: 'RXZU6SSC4',
  1010702: 'RXZU6SSC4',
  1010703: 'RXZU6SSC4',
  1010704: 'RXZU4SSC4',
  1010705: 'RXZU4SSC4',
  1010706: 'RXZU4SSC4',
  1010707: 'RXZU4SSC4',
  1010708: 'RXZU4SSC4',
  1020494: 'BDW2',
  1020500: 'ZU2',
  1020501: 'ZU2',
  1020502: 'ZUHZ2',
  1020503: 'ZUHZ2',


  '2357': 'PK10CGJ',
  '2359': 'PK10CGYJ',
  '2361': 'PK10CQ3',
  '2363': 'PK10CQ4',
  '2365': 'PK10CQ5',
  '2367': 'PK10CQ6',
  '3111006': 'PK10CGJ',
  '3111007': 'PK10CGYJ',
  '3111008': 'PK10CQ3',
  '3111024': 'PK10CQ4',
  '3111025': 'PK10CQ5',
  '3111027': 'PK10CQ6',
  '2368': 'ZX3',
  '2369': 'ZXHZ',
  '2370': 'PK10CQ8',
  '2371': 'ZXHZ',
  '2372': 'ZUS',
  '2373': 'ZUL',
  '2375': 'ZUHZ',
  '2377': 'ZUS',
  '2378': 'ZUL',
  '2380': 'ZUHZ',
  '2381': 'ZXHZ',
  '2382': 'BDW1',
  '2383': 'BDW1',
  '2384': 'BDW2',
  '2385': 'BDW2',
  '2386': 'ZX2',
  '2387': 'ZX2',
  '2388': 'ZXHZ2',
  '2389': 'ZXHZ2',
  '2390': 'ZU2',
  '2391': 'ZU2',
  '2392': 'ZUHZ2',
  '2393': 'ZUHZ2',
  '3111012': 'pk10DWD',
  '3111013': 'pk10DWD',
  '3111014': 'pk10DWD',
  '3111015': 'pk10DWD',
  '3111016': 'pk10DWD',
  '3111017': 'pk10DWD',
  '3111018': 'pk10DWD',
  '3111019': 'pk10DWD',
  '3111020': 'pk10DWD',
  '3111021': 'pk10DWD',
  '2394': 'DWD',
  '2396': 'BDW2',
  '2397': 'BDW2',
  '2399': 'DXDS',
  '3111009': 'DXDS',
  '3111010': 'DXDS',
  '3111011': 'DXDS',
  '2400': 'DXDS',
  '2401': 'ZX4',
  '2402': 'ZH4',
  '2403': 'SXZU24',
  '2404': 'SXZU12',
  '2405': 'SXZU6',
  '2406': 'SXZU4',
  '2407': 'ZX5',
  '2408': 'ZH5',
  '2409': 'WXZU120',
  '2410': 'WXZU60',
  '2411': 'WXZU30',
  '2412': 'WXZU20',
  '2413': 'WXZU10',
  '2414': 'WXZU5',

  '2415': 'BDW1',
  '2416': 'HSCS',
  '2417': 'SXBX',
  '2418': 'SJFC',
  '2419': 'ZX3',
  '2420': 'ZXHZ',
  '2421': 'ZUS',
  '2422': 'ZUL',
  '2424': 'ZUHZ',
  '2425': 'SXZU4',
  '2429': 'ZH5',

  '2379': 'HHZX',
  '2374': 'HHZX',
  '2423': 'HHZX',
  '190403': 'HHZX',
  '190303': 'HHZX',
  '3111899': 'HHZX',
  '191501': 'ZH5',
  '3111933': 'ZH5',

  '190101': 'ZX3',
  '190102': 'ZXHZ',
  '190301': 'ZUS',
  '190302': 'ZUL',
  '190304': 'ZUHZ',

  '3111893': 'ZX3',
  '3111894': 'ZXHZ',
  '3111897': 'ZUS',
  '3111898': 'ZUL',
  '3111900': 'ZUHZ',

  '190201': 'ZX3',
  '190202': 'ZXHZ',
  '190401': 'ZUS',
  '190402': 'ZUL',
  '190404': 'ZUHZ',

  '3111895': 'ZX3',
  '3111896': 'ZXHZ',
  '3111902': 'ZUS',
  '3111903': 'ZUL',
  '3111905': 'ZUHZ',

  '190501': 'BDW1',
  '190601': 'BDW2',
  '190502': 'BDW1',
  '190602': 'BDW2',

  '3111907': 'BDW1',
  '3111909': 'BDW2',
  '3111908': 'BDW1',
  '3111910': 'BDW2',


  '190701': 'ZX2',
  '190702': 'ZX2',
  '190703': 'ZXHZ2',
  '190704': 'ZXHZ2',


  '3111912': 'ZX2',
  '3111911': 'ZX2',
  '3111914': 'ZXHZ2',
  '3111913': 'ZXHZ2',

  '190801': 'ZU2',
  '190802': 'ZU2',
  '190803': 'ZUHZ2',
  '190804': 'ZUHZ2',

  '3111916': 'ZU2',
  '3111915': 'ZU2',
  '3111918': 'ZUHZ2',
  '3111917': 'ZUHZ2',

  '190901': 'DWD',
  '3111919': 'DWD',
  '191001': 'DXDS',
  '191002': 'DXDS',

  '3111925': 'DXDS',
  '3111924': 'DXDS',

  '191101': 'ZX4',
  '191201': 'ZH4',
  '191301': 'SXZU24',
  '191302': 'SXZU12',
  '191303': 'SXZU6',
  '191304': 'SXZU4',

  '3111926': 'ZX4',
  '3111927': 'ZH4',
  '3111928': 'SXZU24',
  '3111929': 'SXZU12',
  '3111930': 'SXZU6',
  '3111931': 'SXZU4',

  '191601': 'WXZU120',
  '191602': 'WXZU60',
  '191603': 'WXZU30',
  '191604': 'WXZU20',
  '191605': 'WXZU10',
  '191606': 'WXZU5',
  '3111934': 'WXZU120',
  '3111935': 'WXZU60',
  '3111936': 'WXZU30',
  '3111937': 'WXZU20',
  '3111938': 'WXZU10',
  '3111939': 'WXZU5',

  '191701': 'BDW1',
  '191702': 'HSCS',
  '191703': 'SXBX',
  '191704': 'SJFC',

  '3111940': 'BDW1',
  '3111941': 'HSCS',
  '3111942': 'SXBX',
  '3111943': 'SJFC',

  '191801': 'ZX3',
  '191802': 'ZXHZ',

  '3111944': 'ZX3',
  '3111945': 'ZXHZ',

  '191901': 'ZUS',
  '191902': 'ZUL',
  '191903': 'HHZX',
  '191904': 'ZUHZ',
  '3111946': 'ZUS',
  '3111947': 'ZUL',
  '3111948': 'HHZX',
  '3111949': 'ZUHZ',

  '2452': 'RXZXSSC3',
  '2453': 'RXZXSSC3',
  '2454': 'RXZXSSC3',
  '2455': 'RXZXSSC3',
  '2456': 'RXZXSSC3',
  '2458': 'RXZXSSC3',
  '2459': 'RXZXSSC3',
  '2460': 'RXZXSSC3',
  '2461': 'RXZXSSC3',
  '2462': 'RXZXDSSSC3',
  '2463': 'RXZXDSSSC3',
  '2464': 'RXZXDSSSC3',
  '2465': 'RXZXDSSSC3',
  '2466': 'RXZXDSSSC3',
  '2468': 'RXZXDSSSC3',
  '2469': 'RXZXDSSSC3',
  '2470': 'RXZXDSSSC3',
  '2471': 'RXZXDSSSC3',
  '2472': 'RXZXHZSSC3',
  '2473': 'RXZXHZSSC3',
  '2474': 'RXZXHZSSC3',
  '2475': 'RXZXHZSSC3',
  '2476': 'RXZXHZSSC3',
  '2478': 'RXZXHZSSC3',
  '2479': 'RXZXHZSSC3',
  '2480': 'RXZXHZSSC3',
  '2481': 'RXZXHZSSC3',
  '2482': 'RXZUSSC3',
  '2483': 'RXZUSSC3',
  '2484': 'RXZUSSC3',
  '2485': 'RXZUSSC3',
  '2486': 'RXZUSSC3',
  '2487': 'RXZUSSC3',
  '2488': 'RXZUSSC3',
  '2489': 'RXZUSSC3',
  '2490': 'RXZUSSC3',
  '2491': 'RXZUSSC3',
  '2492': 'RX3ZU6SSC',
  '2493': 'RX3ZU6SSC',
  '2494': 'RX3ZU6SSC',
  '2495': 'RX3ZU6SSC',
  '2496': 'RX3ZU6SSC',
  '2497': 'RX3ZU6SSC',
  '2498': 'RX3ZU6SSC',
  '2499': 'RX3ZU6SSC',
  '2500': 'RX3ZU6SSC',
  '2501': 'RX3ZU6SSC',
  '2502': 'RX3ZUHSSC',
  '2503': 'RX3ZUHSSC',
  '2504': 'RX3ZUHSSC',
  '2505': 'RX3ZUHSSC',
  '2506': 'RX3ZUHSSC',
  '2507': 'RX3ZUHSSC',
  '2508': 'RX3ZUHSSC',
  '2509': 'RX3ZUHSSC',
  '2510': 'RX3ZUHSSC',
  '2511': 'RX3ZUHSSC',
  '2512': 'RX3ZUHZSSC',
  '2513': 'RX3ZUHZSSC',
  '2514': 'RX3ZUHZSSC',
  '2515': 'RX3ZUHZSSC',
  '2516': 'RX3ZUHZSSC',
  '2517': 'RX3ZUHZSSC',
  '2518': 'RX3ZUHZSSC',
  '2519': 'RX3ZUHZSSC',
  '2520': 'RX3ZUHZSSC',
  '2521': 'RX3ZUHZSSC',
  '2523': 'RXZXDSSSC2',
  '2524': 'RXZXDSSSC2',
  '2525': 'RXZXDSSSC2',
  '2526': 'RXZXDSSSC2',
  '2527': 'RXZXDSSSC2',
  '2528': 'RXZXDSSSC2',
  '2529': 'RXZXDSSSC2',
  '2530': 'RXZXDSSSC2',
  '2531': 'RXZXDSSSC2',
  '2532': 'RXZXDSSSC2',
  '2533': 'RXZXHZSSC2',
  '2534': 'RXZXHZSSC2',
  '2535': 'RXZXHZSSC2',
  '2536': 'RXZXHZSSC2',
  '2537': 'RXZXHZSSC2',
  '2538': 'RXZXHZSSC2',
  '2539': 'RXZXHZSSC2',
  '2540': 'RXZXHZSSC2',
  '2541': 'RXZXHZSSC2',
  '2542': 'RXZXHZSSC2',
  '2543': 'RXZUDSSSC2',
  '2685': 'RXZUDSSSC2',
  '2544': 'RXZUDSSSC2',
  '2545': 'RXZUDSSSC2',
  '2546': 'RXZUDSSSC2',
  '2547': 'RXZUDSSSC2',
  '2548': 'RXZUDSSSC2',
  '2549': 'RXZUDSSSC2',
  '2550': 'RXZUDSSSC2',
  '2551': 'RXZUDSSSC2',
  '2552': 'RXZUDSSSC2',
  '2553': 'RXZUHZSSC2',
  '2554': 'RXZUHZSSC2',
  '2555': 'RXZUHZSSC2',
  '2556': 'RXZUHZSSC2',
  '2557': 'RXZUHZSSC2',
  '2558': 'RXZUHZSSC2',
  '2559': 'RXZUHZSSC2',
  '2560': 'RXZUHZSSC2',
  '2561': 'RXZUHZSSC2',
  '2562': 'RXZUHZSSC2',
  '2564': 'ZX3',
  '2565': 'ZXHZ',
  '2567': 'ZX3',
  '2568': 'ZXHZ',
  '2570': 'ZUS',
  '2571': 'ZUL',
  '2572': 'HHZX',
  '2573': 'ZUHZ',
  '2575': 'ZUS',
  '2576': 'ZUL',
  '2577': 'HHZX',
  '2578': 'ZUHZ',
  '2580': 'BDW1',
  '2581': 'BDW1',
  '2583': 'BDW2',
  '2584': 'BDW2',
  '2586': 'ZX2',
  '2587': 'ZX2',
  '2588': 'ZXHZ2',
  '2589': 'ZXHZ2',
  '2591': 'ZU2',
  '2592': 'ZU2',
  '2593': 'ZUHZ2',
  '2594': 'ZUHZ2',
  '2596': 'DWD',
  '2597': 'DWD',
  '2598': 'DWD',
  '2599': 'DWD',
  '2600': 'DWD',
  '2602': 'DXDS',
  '2603': 'DXDS',
  '2605': 'ZX4',
  '2607': 'ZH4',
  '2609': 'SXZU24',
  '2610': 'SXZU12',
  '2611': 'SXZU6',
  '2612': 'SXZU4',
  '2614': 'ZX5',
  '2616': 'ZH5',
  '2618': 'WXZU120',
  '2619': 'WXZU60',
  '2620': 'WXZU30',
  '2621': 'WXZU20',
  '2622': 'WXZU10',
  '2623': 'WXZU5',
  '2625': 'BDW1',
  '2626': 'HSCS',
  '2627': 'SXBX',
  '2628': 'SJFC',
  '2630': 'ZX3',
  '2631': 'ZXHZ',
  '2633': 'ZUS',
  '2634': 'ZUL',
  '2635': 'HHZX',
  '2636': 'ZUHZ',

  //腾讯分分彩start
  '3111575': 'ZX3',
  '3111576': 'ZXHZ',
  '3111577': 'ZX3',
  '3111578': 'ZXHZ',
  '3111579': 'ZUS',
  '3111580': 'ZUL',
  '3111581': 'HHZX',
  '3111582': 'ZUHZ',
  '3111583': 'ZU3BD',
  '3111584': 'ZUS',
  '3111585': 'ZUL',
  '3111586': 'HHZX',
  '3111587': 'ZUHZ',
  '3111588': 'ZU3BD',
  '3111589': 'BDW1',
  '3111590': 'BDW1',
  '3111591': 'BDW2',
  '3111592': 'BDW2',
  '3111593': 'ZX2',
  '3111594': 'ZX2',
  '3111595': 'ZXHZ2',
  '3111596': 'ZXHZ2',
  '3111597': 'ZU2',
  '3111598': 'ZU2',
  '3111599': 'ZUHZ2',
  '3111600': 'ZUHZ2',
  '3111601': 'DWD',
  '3111602': 'DWD',
  '3111603': 'DWD',
  '3111604': 'DWD',
  '3111605': 'DWD',
  '3111606': 'DXDS',
  '3111607': 'DXDS',
  '3111608': 'ZX4',
  '3111609': 'ZH4',
  '3111610': 'SXZU24',
  '3111611': 'SXZU12',
  '3111612': 'SXZU6',
  '3111613': 'SXZU4',
  '3111614': 'ZX5',
  '3111615': 'ZH5',
  '3111616': 'WXZU120',
  '3111617': 'WXZU60',
  '3111618': 'WXZU30',
  '3111619': 'WXZU20',
  '3111620': 'WXZU10',
  '3111621': 'WXZU5',
  '3111622': 'BDW1',
  '3111623': 'HSCS',
  '3111624': 'SXBX',
  '3111625': 'SJFC',
  '3111626': 'ZX3',
  '3111627': 'ZXHZ',
  '3111628': 'ZUS',
  '3111629': 'ZUL',
  '3111630': 'HHZX',
  '3111631': 'ZUHZ',
  //任选二-直选复式
  '3111633': 'RXZXFFC2',
  '3111634': 'RXZXFFC2',
  '3111635': 'RXZXFFC2',
  '3111636': 'RXZXFFC2',
  '3111637': 'RXZXFFC2',
  '3111638': 'RXZXFFC2',
  '3111639': 'RXZXFFC2',
  '3111640': 'RXZXFFC2',
  '3111641': 'RXZXFFC2',
  //任选二-直选单式
  '3111643': 'RXZXFFC2DS',
  '3111644': 'RXZXFFC2DS',
  '3111645': 'RXZXFFC2DS',
  '3111646': 'RXZXFFC2DS',
  '3111647': 'RXZXFFC2DS',
  '3111648': 'RXZXFFC2DS',
  '3111649': 'RXZXFFC2DS',
  '3111650': 'RXZXFFC2DS',
  '3111651': 'RXZXFFC2DS',
  //任选二-直选和值
  '3111653': 'RXZXFFC2HZ',
  '3111654': 'RXZXFFC2HZ',
  '3111655': 'RXZXFFC2HZ',
  '3111656': 'RXZXFFC2HZ',
  '3111657': 'RXZXFFC2HZ',
  '3111658': 'RXZXFFC2HZ',
  '3111659': 'RXZXFFC2HZ',
  '3111660': 'RXZXFFC2HZ',
  '3111661': 'RXZXFFC2HZ',
  //任选二-组选复式
  '3111663': 'RXZUFFC2',
  '3111664': 'RXZUFFC2',
  '3111665': 'RXZUFFC2',
  '3111666': 'RXZUFFC2',
  '3111667': 'RXZUFFC2',
  '3111668': 'RXZUFFC2',
  '3111669': 'RXZUFFC2',
  '3111670': 'RXZUFFC2',
  '3111671': 'RXZUFFC2',
  //任选二-组选单式
  '3111673': 'RXZUFFC2DS',
  '3111674': 'RXZUFFC2DS',
  '3111675': 'RXZUFFC2DS',
  '3111676': 'RXZUFFC2DS',
  '3111677': 'RXZUFFC2DS',
  '3111678': 'RXZUFFC2DS',
  '3111679': 'RXZUFFC2DS',
  '3111680': 'RXZUFFC2DS',
  '3111681': 'RXZUFFC2DS',
  //任选二-组选和值
  '3111683': 'RXZUFFC2HZ',
  '3111684': 'RXZUFFC2HZ',
  '3111685': 'RXZUFFC2HZ',
  '3111686': 'RXZUFFC2HZ',
  '3111687': 'RXZUFFC2HZ',
  '3111688': 'RXZUFFC2HZ',
  '3111689': 'RXZUFFC2HZ',
  '3111690': 'RXZUFFC2HZ',
  '3111691': 'RXZUFFC2HZ',
  //任选三-直选复式
  '3111694': 'RXZXFFC3',
  '3111695': 'RXZXFFC3',
  '3111696': 'RXZXFFC3',
  '3111697': 'RXZXFFC3',
  '3111698': 'RXZXFFC3',
  '3111699': 'RXZXFFC3',
  '3111700': 'RXZXFFC3',
  '3111701': 'RXZXFFC3',
  '3111702': 'RXZXFFC3',
  //任选三-直选单式
  '3111704': 'RXZXFFC3DS',
  '3111705': 'RXZXFFC3DS',
  '3111706': 'RXZXFFC3DS',
  '3111707': 'RXZXFFC3DS',
  '3111708': 'RXZXFFC3DS',
  '3111709': 'RXZXFFC3DS',
  '3111710': 'RXZXFFC3DS',
  '3111711': 'RXZXFFC3DS',
  '3111712': 'RXZXFFC3DS',
  //任选三-直选和值
  '3111714': 'RXZXFFC3HZ',
  '3111715': 'RXZXFFC3HZ',
  '3111716': 'RXZXFFC3HZ',
  '3111717': 'RXZXFFC3HZ',
  '3111718': 'RXZXFFC3HZ',
  '3111719': 'RXZXFFC3HZ',
  '3111720': 'RXZXFFC3HZ',
  '3111721': 'RXZXFFC3HZ',
  '3111722': 'RXZXFFC3HZ',
  //任选三-组选组三
  '3111725': 'RXZUSANFFC3',
  '3111726': 'RXZUSANFFC3',
  '3111727': 'RXZUSANFFC3',
  '3111728': 'RXZUSANFFC3',
  '3111729': 'RXZUSANFFC3',
  '3111730': 'RXZUSANFFC3',
  '3111731': 'RXZUSANFFC3',
  '3111732': 'RXZUSANFFC3',
  '3111733': 'RXZUSANFFC3',
  //任选三-组选组六
  '3111735': 'RXZUSIXFFC3',
  '3111736': 'RXZUSIXFFC3',
  '3111737': 'RXZUSIXFFC3',
  '3111738': 'RXZUSIXFFC3',
  '3111739': 'RXZUSIXFFC3',
  '3111740': 'RXZUSIXFFC3',
  '3111741': 'RXZUSIXFFC3',
  '3111742': 'RXZUSIXFFC3',
  '3111743': 'RXZUSIXFFC3',
  //任选三-混合组选
  '3111745': 'RXZUFFC3HH',
  '3111746': 'RXZUFFC3HH',
  '3111747': 'RXZUFFC3HH',
  '3111748': 'RXZUFFC3HH',
  '3111749': 'RXZUFFC3HH',
  '3111750': 'RXZUFFC3HH',
  '3111751': 'RXZUFFC3HH',
  '3111752': 'RXZUFFC3HH',
  '3111753': 'RXZUFFC3HH',
  //任选三-组选和值
  '3111755': 'RXZUFFC3HZ',
  '3111756': 'RXZUFFC3HZ',
  '3111757': 'RXZUFFC3HZ',
  '3111758': 'RXZUFFC3HZ',
  '3111759': 'RXZUFFC3HZ',
  '3111760': 'RXZUFFC3HZ',
  '3111761': 'RXZUFFC3HZ',
  '3111762': 'RXZUFFC3HZ',
  '3111763': 'RXZUFFC3HZ',
  //任选四-直选复式
  '3111788': 'RXZXFFC4',
  '3111789': 'RXZXFFC4',
  '3111790': 'RXZXFFC4',
  '3111791': 'RXZXFFC4',
  //任选四-直选单式
  '3111793': 'RXZXFFC4DS',
  '3111794': 'RXZXFFC4DS',
  '3111795': 'RXZXFFC4DS',
  '3111796': 'RXZXFFC4DS',
  //任选四-组选24
  '3111803': 'RXZU24FFC4',
  '3111804': 'RXZU24FFC4',
  '3111805': 'RXZU24FFC4',
  '3111806': 'RXZU24FFC4',
  //任选四-组选12
  '3111807': 'RXZU12FFC4',
  '3111809': 'RXZU12FFC4',
  '3111810': 'RXZU12FFC4',
  '3111811': 'RXZU12FFC4',
  //任选四-组选6
  '3111813': 'RXZU6FFC4',
  '3111814': 'RXZU6FFC4',
  '3111815': 'RXZU6FFC4',
  '3111816': 'RXZU6FFC4',
  //任选四-组选4
  '3111818': 'RXZU4FFC4',
  '3111819': 'RXZU4FFC4',
  '3111820': 'RXZU4FFC4',
  '3111821': 'RXZU4FFC4',
  //腾讯分分彩end


  // 上海11选5
  '3111838': 'SD337',
  '3111839': 'SD339',
  '3111840': 'SD341',
  '3111841': 'SD343',
  '3111842': 'SD345',
  '3111843': 'SD347',
  '3111846': 'SDQWX1',
  '3111847': 'SDQWX2',
  '3111848': 'SD355',
  '3111849': 'SD357',
  '3111850': 'SD359',
  '3111851': 'SD361',
  '3111852': 'SD363',
  '3111853': 'SD365',
  '3111854': 'SD367',
  '3111855': 'SD369',
  // ssc  任选玩法
  '2427': 'RX2ZXFS', // 任2 直选 复式
  '2447': 'RX2ZXDS',// 任2 直选 单式
  '2467': 'RX2ZXHZ',// 任2 直选 和值
  '2437': 'RX2ZUXFS',// 任2 组选 复式
  '2457': 'RX2ZUXDS',// 任2 组选 单式
  '2477': 'RX2ZUXHZ',// 任2 组选 和值
  '1010101': 'RX3ZXFS',//任3 直选 复式
  '1010111': 'RX3ZXDS',//任3 直选 单式
  '1010121': 'RX3ZXHZ',  //任3 直选 和值
  '1010201': 'RX3ZUXZ3',//任3 组选 组三
  '1010211': 'RX3ZUXZ6',//任3 组选 组六
  '1010221': 'RX3ZUXHX',//任3 组选 混选
  '1010231': 'RX3ZUXHZ',  //任3 组选 和值
  '1010301': 'RX4ZXFS', // 任4 直选 复式
  '1010306': 'RX4ZXDS',// 任4 直选 单式
  '1010401': 'SSCRX4ZUX24', // 任4 组选 24
  '1010406': 'SSCRX4ZUX12',// 任4 组选 12
  '1010411': 'SSCRX4ZUX6',// 任4 组选 6
  '1010416': 'SSCRX4ZUX4',// 任4 组选 4
  // jnd30s  任选玩法
  '3111950': 'RX2ZXFS', // 任2 直选 复式
  '3111960': 'RX2ZXDS',// 任2 直选 单式
  '3111970': 'RX2ZXHZ',// 任2 直选 和值
  '3111980': 'RX2ZUXFS',// 任2 组选 复式
  '3111990': 'RX2ZUXDS',// 任2 组选 单式
  '3112000': 'RX2ZUXHZ',// 任2 组选 和值
  '3112010': 'RX3ZXFS',//任3 直选 复式
  '3112020': 'RX3ZXDS',//任3 直选 单式
  '3112030': 'RX3ZXHZ',  //任3 直选 和值
  '3112041': 'RX3ZUXZ3',//任3 组选 组三
  '3112051': 'RX3ZUXZ6',//任3 组选 组六
  '3112061': 'RX3ZUXHX',//任3 组选 混选
  '3112071': 'RX3ZUXHZ',  //任3 组选 和值
  '3112094': 'RX4ZXFS', // 任4 直选 复式
  '3112099': 'RX4ZXDS',// 任4 直选 单式
  '3112109': 'SSCRX4ZUX24', // 任4 组选 24
  '3112115': 'SSCRX4ZUX12',// 任4 组选 12
  '3112119': 'SSCRX4ZUX6',// 任4 组选 6
  '3112124': 'SSCRX4ZUX4',// 任4 组选 4

  // ffc 任选玩法
  '3110101': 'RX2ZXFS', // 任2 直选 复式
  '3110111': 'RX2ZXDS',// 任2 直选 单式
  '3110121': 'RX2ZXHZ',// 任2 直选 和值
  '3110201': 'RX2ZUXFS',// 任2 组选 复式
  '3110211': 'RX2ZUXDS',// 任2 组选 单式
  '3110221': 'RX2ZUXHZ',// 任2 组选 和值
  '3110301': 'RX3ZXFS',//任3 直选 复式
  '3110311': 'RX3ZXDS',//任3 直选 单式
  '3110321': 'RX3ZXHZ',  //任3 直选 和值
  '3110401': 'RX3ZUXZ3',//任3 组选 组三
  '3110411': 'RX3ZUXZ6',//任3 组选 组六
  '3110421': 'RX3ZUXHX',//任3 组选 混选
  '3110431': 'RX3ZUXHZ',  //任3 组选 和值
  '3110501': 'RX4ZXFS', // 任4 直选 复式
  '3110506': 'RX4ZXDS',// 任4 直选 单式
  '3110601': 'SSCRX4ZUX24', // 任4 组选 24
  '3110606': 'SSCRX4ZUX12',// 任4 组选 12
  '3110611': 'SSCRX4ZUX6',// 任4 组选 6
  '3110616': 'SSCRX4ZUX4',// 任4 组选 4
  // 腾讯分分彩 任选玩法
  '3111632': 'RX2ZXFS', // 任2 直选 复式
  '3111642': 'RX2ZXDS',// 任2 直选 单式
  '3111652': 'RX2ZXHZ',// 任2 直选 和值
  '3111662': 'RX2ZUXFS',// 任2 组选 复式
  '3111672': 'RX2ZUXDS',// 任2 组选 单式
  '3111682': 'RX2ZUXHZ',// 任2 组选 和值
  '3111693': 'RX3ZXFS',//任3 直选 复式
  '3111703': 'RX3ZXDS',//任3 直选 单式
  '3111713': 'RX3ZXHZ',  //任3 直选 和值
  '3111724': 'RX3ZUXZ3',//任3 组选 组三
  '3111734': 'RX3ZUXZ6',//任3 组选 组六
  '3111744': 'RX3ZUXHX',//任3 组选 混选
  '3111754': 'RX3ZUXHZ',  //任3 组选 和值
  '3111787': 'RX4ZXFS', // 任4 直选 复式
  '3111792': 'RX4ZXDS',// 任4 直选 单式
  '3111802': 'SSCRX4ZUX24', // 任4 组选 24
  '3111808': 'SSCRX4ZUX12',// 任4 组选 12
  '3111812': 'SSCRX4ZUX6',// 任4 组选 6
  '3111817': 'SSCRX4ZUX4'// 任4 组选 4
};
let nums = 0

export const intersect = (a, b) => {
  let tempArr = uniquelize(a)
  let arrlist = []
  for (let i = 0; i < tempArr.length; i++) {
    let tempVal = contains(tempArr[i], b) ? tempArr[i] : null
    if (tempVal != null) {
      arrlist.push(tempVal)
    }
  }
  return arrlist
}

// 针对 一般数组,如 [1,2,3,4,5]
export const uniquelize = (arr) => { // 去重复
  arr.sort()
  let re = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== re[re.length - 1]) {
      re.push(arr[i])
    }
  }
  return re
}

export const contains = (a, b) => {
  for (var i = 0; i < b.length; i++) {
    if (b[i] == a) {
      return true;
    }
  }
  return false;
}
/*------------------------------------------------------------------------------------------------------------*/
// 生成随机号码方法
export const random = (methid) => {
  let random_number = []
  let mname = lt_method[methid]
  let tmp_nums = 1
  switch (mname) {
    // 任选 和值
    case 'RX2ZXHZ':
      random_number = [[parseInt(Math.random() * 19)]]
      break
    case 'RX2ZUXHZ':
      random_number = [[parseInt((Math.random() * 17) + 1)]]
      break
    case 'RX3ZXHZ':
      random_number = [[parseInt(Math.random() * 28)]]
      break
    case 'RX3ZUXHZ':
      random_number = [[parseInt((Math.random() * 26) + 1)]]
      break
    // 任选 组选 复试
    case 'RX2ZUXFS':
    // 任3 组三
    case 'RX3ZUXZ3':
      random_number = getNoRepeat(2)
      break
    // 任3 组6
    case 'RX3ZUXZ6':
      random_number = getNoRepeat(3)
      break
    // 任4 组选24
    case 'SSCRX4ZUX24':
      random_number = getNoRepeat(4)
      break
    case 'SSCRX4ZUX12':
      random_number = getNoRepeat(3)
      break
    case 'SSCRX4ZUX6':
      random_number = getNoRepeat(2)
      break
    case 'SBTHDT':
      random_number = getSuiji(10, [1, 2, 0, 0, 0])
      break;
    case 'RXZXSSC2':
      random_number = getSuiji(10, [1, 1, 1, 1, 1])
      break;
    case 'RXZUSSC2':
      random_number = getSuiji(10, [2, 2, 2, 2, 2])
      break;
    case 'RXZXSSC3':
      random_number = getSuiji(10, [1, 1, 1, 1, 1])
      break;
    case 'RXZUSSC3':
      random_number = getSuiji(10, [1, 1, 1, 1, 1])
      break;
    case 'RX3ZU6SSC':
      random_number = getSuiji(25, [1, 0, 0, 0, 0]);
      break;
    case 'WXZU120':
      random_number = getSuiji(10, [5, 0, 0, 0, 0]);
      break;
    case 'WXZU60':
      random_number = getSuiji(10, [1, 3, 0, 0, 0]);
      break;
    case 'WXZU30':
      random_number = getSuiji(10, [2, 1, 0, 0, 0]);
      break;
    case 'WXZU20':
      random_number = getSuiji(10, [1, 2, 0, 0, 0]);
      break;
    case 'WXZU10':
      random_number = getSuiji(10, [1, 1, 0, 0, 0]);
      break;
    case 'WXZU5':
      random_number = getSuiji(10, [1, 1, 0, 0, 0]);
      break;
    case 'RXZXHZSSC3':
      random_number = getSuiji(27, [1, 0, 0, 0, 0]);
      break;
    case 'RXZXHZSSC2':
      random_number = getSuiji(18, [1, 0, 0, 0, 0]);
      break;
    case 'RXZUHZSSC2':
      random_number = getSuiji(17, [1, 0, 0, 0, 0]);
      random_number[0][0] += 1;
      break;
    case 'ZXHZ':

    case 'ZUHZ':
      random_number = getSuiji(25, [1, 0, 0, 0, 0]);
      random_number[0][0] += 1;
      break;
    case 'ZUS':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'ZUL':
      random_number = getSuiji(10, [3, 0, 0, 0, 0]);
      break;
    case 'ZH5':
    case 'ZH4':
    case 'ZH3':
      random_number = getSuiji(10, [1, 1, 1, 1, 1]);
      break;
    case 'SXZU24':
      random_number = getSuiji(10, [4, 0, 0, 0, 0]);
      break;
    case 'SXZU6':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'SXZU12':
      random_number = getSuiji(10, [1, 2, 0, 0, 0]);
      break;
    case 'SXZU4':
      random_number = getSuiji(10, [1, 1, 0, 0, 0]);
      break;
    case 'BDW2':
    case 'ZU2':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'ZXHZ2':
      random_number = getSuiji(18, [1, 0, 0, 0, 0]);
      break;
    case 'ZUHZ2':
      random_number = getSuiji(17, [1, 0, 0, 0, 0]);
      random_number[0][0] += 1;
      break;
    case 'DWD':
      random_number = getSuiji3(10, [1, 0, 0, 0, 0], 'true');
      break;
    case 'SDZX3':
      random_number = getSuiji(10, [1, 0, 0, 0, 0]);
      break;
    case 'SDZU3':
      random_number = getSuiji(10, [3, 0, 0, 0, 0]);
      break;
    case 'SDZX2':
      random_number = getSuiji(10, [0, 1, 0, 0, 0]);
      break;
    case 'SDZU2':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'SDBDW':
    case 'SDDWD':
    case 'SDDDS':
    case 'SDCZW':
    case 'SDRX1':
      random_number = getSuiji(10, [1, 0, 0, 0, 0]);
      break;
    case 'SDRX2':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'SDRX3':
      random_number = getSuiji(10, [3, 0, 0, 0, 0]);
      break;
    case 'SDRX4':
      random_number = getSuiji(10, [4, 0, 0, 0, 0]);
      break;
    case 'SDRX5':
      random_number = getSuiji(10, [5, 0, 0, 0, 0]);
      break;
    case 'SDRX6':
      random_number = getSuiji(10, [6, 0, 0, 0, 0]);
      break;
    case 'SDRX7':
      random_number = getSuiji(10, [7, 0, 0, 0, 0]);
      break;
    case 'SDRX8':
      random_number = getSuiji(10, [8, 0, 0, 0, 0]);
      break;
    case 'BJRX2':
      random_number = getSuiji(10, [2, 0, 0, 0, 0]);
      break;
    case 'BJRX3':
      random_number = getSuiji(10, [3, 0, 0, 0, 0]);
      break;
    case 'BJRX4':
      random_number = getSuiji(10, [4, 0, 0, 0, 0]);
      break;
    case 'BJRX5':
      random_number = getSuiji(10, [5, 0, 0, 0, 0]);
      break;
    case 'BJRX6':
      random_number = getSuiji(10, [6, 0, 0, 0, 0]);
      break;
    case 'BJRX7':
      random_number = getSuiji(10, [7, 0, 0, 0, 0]);
      break;
    case 'DXDS':
      random_number = getSuiji(4, [1, 1, 0, 0, 0]);
      for (var i = random_number.length - 1; i >= 0; i--) {
        switch (random_number[i][0]) {
          case 0:
            random_number[i][0] = '大';
            break;
          case 1:
            random_number[i][0] = '小';
            break;

          case 2:
            random_number[i][0] = '单';
            break;
          case 3:
            random_number[i][0] = '双';
            break;
        }
        ;

      }
      ;
      break;
    case 'SD337': //220
      random_number = getSuiji2(11, [1, 1, 1]);
      break;
    case 'SD339': //222
      random_number = getSuiji2(11, [3]);
      break;
    case 'SD341': //224
      random_number = getSuiji2(11, [1, 1]);
      break;
    case 'SD343': //226
      random_number = getSuiji2(11, [2]);
      break;
    case 'SD345': //228
      random_number = getSuiji2(11, [1]);
      break;
    case 'SD347': //230
      random_number = getSuiji2(11, [1, 0, 0, 1, 1], 'true');
      break;
    case 'SDQWX1': //234
      var r5 = getSuijiDing(['5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双']);
      var results = [];
      results[0] = r5;
      random_number = results;
      break;
    case 'SDQWX2': //236
      random_number = getSuiji(1, [1], 'zw');
      break;
    case 'SD355': //238
      random_number = getSuiji2(11, [1]);
      break;
    case 'SD357': //240
      random_number = getSuiji2(11, [2]);
      break;
    case 'SD359': //243
      random_number = getSuiji2(11, [3]);
      break;
    case 'SD361': //246
      random_number = getSuiji2(11, [4]);
      break;
    case 'SD363': //249
      random_number = getSuiji2(11, [5]);
      break;
    case 'SD365': //252
      random_number = getSuiji2(11, [6]);
      break;
    case 'SD367': //255
      random_number = getSuiji2(11, [7]);
      break;
    case 'SD369': //258
      random_number = getSuiji2(11, [8]);
      break;
    case 'PK10CGJ': //2357
      random_number = getSuiji2(10, [1]);
      break;
    case 'PK10CGYJ': //2359
      random_number = getSuiji2(10, [1, 1]);
      break;
    case 'PK10CQ3': //2361
      random_number = getSuiji2(10, [1, 1, 1]);
      break;
    case 'PK10CQ4': //2363
      random_number = getSuiji2(10, [1, 1, 1, 1]);
      break;
    case 'PK10CQ5': //2365
      random_number = getSuiji2(10, [1, 1, 1, 1, 1]);
      break;
    case 'PK10CQ6': //2365
      random_number = getSuiji2(10, [1, 1, 1, 1, 1, 1]);
      break;
    case 'pk10DWD':
      random_number = getSuiji2(10, [1, 0, 0, 0, 0], 'true');
      break;
    case 'JSK3a1': //2338
      var list1 = getSuijiDing([11, 22, 33, 44, 55, 66]);
      var results = [];
      results[0] = list1;
      var oneN = String(results[0]).slice(0, 1);
      var datN = [1, 2, 3, 4, 5, 6];
      datN.splice(oneN - 1, 1);
      var list2 = getSuijiDing(datN);
      results[1] = list2;
      random_number = results;
      break;
    case 'JSK3a2': //2340
      var list1 = getSuijiDing(['11*', '22*', '33*', '44*', '55*', '66*']);
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a3': //2342
      random_number = getSuiji(6, [3]);
      break;
    case 'JSK3a4': //2343
      random_number = getSuiji2(6, [2, 1], 'true');
      break;
    case 'JSK3a4i': //2354
      random_number = getSuiji2(6, [2]);
      break;
    case 'JSK3a5': //2344
      var list1 = getSuijiDing([6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a6': //2346
      var list1 = ['通选'];
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a6i': //2350
      var list1 = ['通选'];
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a7': //2348
      var list1 = getSuijiDing([111, 222, 333, 444, 555, 666]);
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a8': //2352
      var list1 = getSuijiDing([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
      var results = [];
      results[0] = list1;
      random_number = results;
      break;
    case 'JSK3a9': //2355
      random_number = getSuiji(6, [1, 1]);
      break;
    default:
      random_number = getSuiji(10, [1, 1, 1, 1, 1]);
      break;
  }
  return random_number;
};
// 生成不重复随机数
/*
*   n 生成的个数
* */
export const getNoRepeat = (n) => {
  let arr = [], numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], arrs = []
  for (let i = 0; i < n; i++) {
    let _index = parseInt(Math.random() * numbers.length)
    arr.push(numbers[_index])
    numbers.splice(_index, 1)
  }
  arr.sort()
  for (let i = 0; i < n; i++) {
    arrs.push([arr[i]])
  }
  return arrs
}
// export const getNoRepeat12 = (n, m) => {
//   let arr = [], numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], arrs = []
//   for (let i = 0; i < n+m; i++) {
//     let _index = parseInt(Math.random() * numbers.length)
//     arr.push(numbers[_index])
//     numbers.splice(_index, 1)
//   }
//   arr.sort()
//   for (let i = 0; i < (n + m); i++) {
//     arrs.push([arr[i]])
//   }
//
//   return arrs
// }

//随机算法1
export const getSuiji = (length, minchose, string) => {
  var size = 0; //表示随机生成几个数字
  var sizes = 0; //表示随机生成数组内部的数组个数
  var list = []; //全部的数字列表
  var result = []; //随机生成的数字
  var results = []; //最后返回数组的数组

  for (var i = 0; i < minchose.length; i++) {
    results[i] = [];
    size += minchose[i];
  }

  if (string == 'zw') { //猜中位
    list = [3, 4, 5, 6, 7, 8, 9];
  } else {
    if (length == 6) {
      for (var i = 0; i < length; i++) {
        list[i] = i + 1;
      }
    } else {
      for (var i = 0; i < length; i++) {
        list[i] = i;
      }
    }
  }
  for (var i = 0; i < size; i++) {
    var suiji = parseInt(Math.random() * list.length);
    result[i] = list[suiji];
    list.splice(suiji, 1);
  }
  for (var i = 0; i < minchose.length; i++) {

    for (var j = 0; j < minchose[i]; j++) {
      results[i][j] = result[sizes];
      sizes++;
    }

  }
  return results;
}
//时时彩定胆位
export const getSuiji3 = (length, minchose, t) => {
  var size = 0; //表示随机生成几个数字
  var sizes = 0; //表示随机生成数组内部的数组个数
  var list = []; //全部的数字列表
  var result = []; //随机生成的数字
  var results = []; //最后返回数组的数组
  if (t == 'true') {
    minchose = minchose.sort(function () {
      var d = Math.random() - 0.5;
      return d;
    });
  }
  for (var i = 0; i < minchose.length; i++) {
    results[i] = [];
    size += minchose[i];
  }

  for (var i = 0; i < length; i++) {
    list[i] = i;
  }

  for (var i = 0; i < size; i++) {
    var suiji = parseInt(Math.random() * list.length);
    result[i] = list[suiji];
    list.splice(suiji, 1);
  }
  for (var i = 0; i < minchose.length; i++) {

    for (var j = 0; j < minchose[i]; j++) {
      results[i][j] = result[sizes];
      sizes++;
    }

  }
  return results;
}
//只用于北京PK10,11选5
export const getSuiji2 = (length, minchose, t) => {
  var size = 0; //表示随机生成几个数字
  var sizes = 0; //表示随机生成数组内部的数组个数
  var list = []; //全部的数字列表
  var result = []; //随机生成的数字
  var results = []; //最后返回数组的数组
  if (t == "true") {
    minchose = minchose.sort(function () {
      var d = Math.random() - 0.5;
      return d;
    });
  }
  for (var i = 0; i < minchose.length; i++) {
    results[i] = [];
    size += minchose[i];
  }
  for (var i = 0; i < length; i++) {
    if (length >= 10) {
      if (i < 9) {
        list[i] = "0" + (i + 1);
      } else {
        list[i] = (1 + i).toString();
      }
    } else {
      list[i] = i + 1;
    }
  }

  for (var i = 0; i < size; i++) {
    var suiji = parseInt(Math.random() * list.length);
    result[i] = list[suiji];
    list.splice(suiji, 1);
  }
  for (var i = 0; i < minchose.length; i++) {

    for (var j = 0; j < minchose[i]; j++) {
      results[i][j] = result[sizes];
      sizes++;
    }

  }
  return results;
}
//随机算法3
export const getSuijiDing = (list) => {
  var list = list;
  var suiji = parseInt(Math.random() * list.length);
  var d = [];
  d[0] = list[suiji];
  return d;
}

/*---------------------------------------------------------------------------------------------------------------------*/
//pk10CQ4
export const array_unique = (inputArr) => {
  var key = '',
    tmp_arr2 = {},
    val = '';
  var __array_search = function (needle, haystack) {
    var fkey = '';
    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if ((haystack[fkey] + '') === (needle + '')) {
          return fkey;
        }
      }
    }
    return false;
  };
  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];
      if (false === __array_search(val, tmp_arr2)) {
        tmp_arr2[key] = val;
      }
    }
  }
  return tmp_arr2;
}
// 投注注数的算法
// posArr 任选中 所选的位置
export const checkNum = (methid, data_sel, posArr) => {
  var mname = lt_method[methid];
  nums = 0
  var max_place = data_sel.length - 1
  var tmp_nums = 1
  let i = 0
  let j = 0
  let k = 0
  switch (mname) {
    // 任选2 直选复式
    case'RX2ZXFS':
      nums = 0
      for (let i = 0; i < 5; i++) {
        if (data_sel[i].length) {
          for (let j = i + 1; j < 5; j++) {
            if (data_sel[j].length) {
              nums += data_sel[i].length * data_sel[j].length
            }
          }
        }
      }
      break
    // 任选3 直选复式
    case'RX3ZXFS':
      nums = 0
      for (let i = 0; i < 5; i++) {
        if (data_sel[i].length) {
          for (let j = i + 1; j < 5; j++) {
            if (data_sel[j].length) {
              for (let k = j + 1; k < 5; k++) {
                if (data_sel[k].length) {
                  nums += data_sel[i].length * data_sel[j].length * data_sel[k].length
                }
              }
            }
          }
        }
      }
      break
    // 任选2 组选复试
    case'RX2ZUXFS':
      nums = calRXZXNums(data_sel, posArr, 2, 2, 1)
      break
    // 任选3 组3
    case'RX3ZUXZ3':
      nums = calRXZXNums(data_sel, posArr, 3, 2, 2)
      break
    // 任选3 组6
    case'RX3ZUXZ6':
      nums = calRXZXNums(data_sel, posArr, 3, 3, 1)
      break
    // 任选4 组选24
    case'SSCRX4ZUX24':
      nums = calRXZXNums(data_sel, posArr, 4, 4, 1)
      break
    // 任选4 组选12
    case'SSCRX4ZUX12':
      nums = calRXZX12(data_sel, posArr, 2)
      break
    // 任选4 组选6
    case'SSCRX4ZUX6':
      nums = calRXZXNums(data_sel, posArr, 4, 2, 1)
      break
    // 任选4 组选4
    case'SSCRX4ZUX4':
      nums = calRXZX12(data_sel, posArr, 1)
      break
    // 任选2 直选和值
    case'RX2ZXHZ':
      nums = calRXHZNums2(data_sel, posArr, 2)
      break
    // 任选3 直选和值
    case'RX3ZXHZ':
      nums = calRXHZNums3(data_sel, posArr, 3)
      break
    // 任选2 组选和值
    case'RX2ZUXHZ':
      nums = calRXHZNums2(data_sel, posArr, 2, true)
      break
    // 任选3 组选和值
    case'RX3ZUXHZ':
      nums = calRXHZNums3(data_sel, posArr, 3, true)
      break

    // 任选4 直选复式
    case'RX4ZXFS':
      nums = 0
      for (let i = 0; i < 5; i++) {
        if (data_sel[i].length) {
          for (let j = i + 1; j < 5; j++) {
            if (data_sel[j].length) {
              for (let k = j + 1; k < 5; k++) {
                if (data_sel[k].length) {
                  for (let m = k + 1; m < 5; m++) {
                    if (data_sel[m].length) {
                      nums += data_sel[i].length * data_sel[j].length * data_sel[k].length * data_sel[m].length
                    }
                  }
                }
              }
            }
          }
        }
      }
      break
    case 'SD337': //11选5--------------------------------
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0) {
        for (i = 0; i < data_sel[0].length; i++) {
          for (j = 0; j < data_sel[1].length; j++) {
            for (k = 0; k < data_sel[2].length; k++) {
              if (data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k]) {
                nums++;
              }
            }
          }
        }
      }
      break;
    case 'SD339':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      break;
    case 'SD341':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0) {
        for (i = 0; i < data_sel[0].length; i++) {
          for (j = 0; j < data_sel[1].length; j++) {
            if (data_sel[0][i] != data_sel[1][j]) {
              nums++;
            }
          }
        }
      }
      break;
    case 'SD343':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'SD347':
      for (i = 0; i < 3; i++) {
        nums += data_sel[i].length;
      }
      ;
      break;
    case 'SD355':
      for (i = 0; i <= max_place; i++) {
        nums += data_sel[i].length;
      }
      ;
      break;
    case 'SD357':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'SD359':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      break;
    case 'SD361':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 3) {
          nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
        }
      }
      ;
      break;
    case 'SD363':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 4) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
        }
      }
      ;
      break;
    case 'SD365':
      for (i = 0; i <= max_place; i++) {
        let s = data_sel[i].length;
        if (s > 5) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720;
        }
      }
      ;
      break;
    case 'SD367':
      for (i = 0; i <= max_place; i++) {
        let s = data_sel[i].length;
        if (s > 6) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040;
        }
      }
      ;
      break;
    case 'SD369':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 7) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) * (s - 7) / 40320;
        }
      }
      ;
      break;
    case 'PK10CGYJ': //PK10-------------------------------------------------------------------
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            if (data_sel[0][i] != data_sel[1][j]) {
              nums++
            }
          }
        }
      }
      break;
    case 'PK10CQ3':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            for (let k = 0; k < data_sel[2].length; k++) {
              if (data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k]) {
                nums++
              }
            }
          }
        }
      }
      break;
    case 'PK10CQ4':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0 && data_sel[3].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            for (let k = 0; k < data_sel[2].length; k++) {
              for (let m = 0; m < data_sel[3].length; m++) {
                var res = array_unique({
                  0: data_sel[0][i],
                  1: data_sel[1][j],
                  2: data_sel[2][k],
                  3: data_sel[3][m]
                });
                var jslength = 0;
                for (var x in res) {
                  jslength++;
                  if (jslength == 4) {
                    nums++
                  }
                }
              }
            }
          }
        }
      }
      ;
      break;
    case 'PK10CQ5':
      nums = 0
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0 && data_sel[3].length > 0 && data_sel[4].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            for (let k = 0; k < data_sel[2].length; k++) {
              for (let x = 0; x < data_sel[3].length; x++) {
                for (let y = 0; y < data_sel[4].length; y++) {
                  if (data_sel[0][i] != data_sel[1][j] &&
                    data_sel[0][i] != data_sel[2][k] &&
                    data_sel[0][i] != data_sel[3][x] &&
                    data_sel[0][i] != data_sel[4][y] &&
                    data_sel[1][j] != data_sel[2][k] &&
                    data_sel[1][j] != data_sel[3][x] &&
                    data_sel[1][j] != data_sel[4][y] &&
                    data_sel[2][k] != data_sel[3][x] &&
                    data_sel[2][k] != data_sel[4][y] &&
                    data_sel[3][x] != data_sel[4][y]) {
                    nums++
                  }
                }
              }
            }
          }
        }
      }
      break
    case 'PK10CQ6':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0 && data_sel[3].length > 0 && data_sel[4].length > 0 && data_sel[5].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            for (let k = 0; k < data_sel[2].length; k++) {
              for (let x = 0; x < data_sel[3].length; x++) {
                for (let y = 0; y < data_sel[4].length; y++) {
                  for (let z = 0; z < data_sel[5].length; z++) {
                    if (data_sel[0][i] != data_sel[1][j] &&
                      data_sel[0][i] != data_sel[2][k] &&
                      data_sel[0][i] != data_sel[3][x] &&
                      data_sel[0][i] != data_sel[4][y] &&
                      data_sel[0][i] != data_sel[5][z] &&
                      data_sel[1][j] != data_sel[2][k] &&
                      data_sel[1][j] != data_sel[3][x] &&
                      data_sel[1][j] != data_sel[4][y] &&
                      data_sel[1][j] != data_sel[5][z] &&
                      data_sel[2][k] != data_sel[3][x] &&
                      data_sel[2][k] != data_sel[4][y] &&
                      data_sel[2][k] != data_sel[5][z] &&
                      data_sel[3][x] != data_sel[4][y] &&
                      data_sel[3][x] != data_sel[5][z] &&
                      data_sel[4][y] != data_sel[5][z]) {
                      nums++;
                    }
                  }
                }
              }
            }
          }
        }
      }
      break;
    case 'JSK3a3': // 江苏快三--------------------------------------------------------
      if (data_sel[0].length >= 3) {
        nums += Combination(data_sel[0].length, 3)
      }
      break;
    case 'JSK3a4':
      var danlen = data_sel[0].length;
      var tuolen = data_sel[1].length;
      if (danlen < 1 || tuolen < 1 || danlen >= 3) {
        nums = 0
      } else {
        nums = Combination(tuolen, 3 - danlen)
      }
      break;
    case 'JSK3a5':
      var cc = {
        6: 1,
        7: 1,
        8: 2,
        9: 3,
        10: 3,
        11: 3,
        12: 3,
        13: 2,
        14: 1,
        15: 1
      };
      var s = data_sel[0].length;
      if (s > 0) {
        for (j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[0][j], 10)]
        }
      }
      break;
    case 'JSK3a4i':
      if (data_sel[0].length >= 2) {
        nums += Combination(data_sel[0].length, 2)
      }
      break;
    case 'RXZXSSC2': //-------------------------------------------------------------
      var wan = data_sel[0].length;
      var qian = data_sel[1].length;
      var bai = data_sel[2].length;
      var shi = data_sel[3].length;
      var ge = data_sel[4].length;
      nums += wan * qian + wan * bai + wan * shi + wan * ge + qian * bai + qian * shi + qian * ge + bai * shi + bai * ge + shi * ge;
      break;
    case 'RXZUSSC2':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      var select_num = $("input[name='pos[]']:checked").length;
      var multi = 0;
      switch (select_num) {
        case 0:
          multi = 0;
          break;
        case 1:
          multi = 0;
          break;
        case 2:
          multi = 1;
          break;
        case 3:
          multi = 3;
          break;
        case 4:
          multi = 6;
          break;
        case 5:
          multi = 10;
          break;
      }
      nums = nums * multi;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });

      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'RXZXSSC3':
      var wan = data_sel[0].length;
      var qian = data_sel[1].length;
      var bai = data_sel[2].length;
      var shi = data_sel[3].length;
      var ge = data_sel[4].length;
      nums += wan * qian * bai + wan * qian * shi + wan * qian * ge + wan * bai * shi + wan * bai * ge + wan * shi * ge + qian * bai * shi + qian * bai * ge + qian * shi * ge + bai * shi * ge;
      break;
    case 'RXZUSSC3':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1);
        }
      }
      ;
      var select_num = $("input[name='pos[]']:checked").length
      var multi = 0;
      switch (select_num) {
        case 0:
          multi = 0;
          break;
        case 1:
          multi = 0;
          break;
        case 2:
          multi = 0;
          break;
        case 3:
          multi = 1;
          break;
        case 4:
          multi = 4;
          break;
        case 5:
          multi = 10;
          break;
      }
      nums = nums * multi;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1))
      break;
    case 'RX3ZU6SSC':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      var select_num = $("input[name='pos[]']:checked").length;
      var multi = 0;
      switch (select_num) {
        case 0:
          multi = 0;
          break;
        case 1:
          multi = 0;
          break;
        case 2:
          multi = 0;
          break;
        case 3:
          multi = 1;
          break;
        case 4:
          multi = 4;
          break;
        case 5:
          multi = 10;
          break;
      }
      nums = nums * multi;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'RX3ZUHZSSC':
      switch ($("input[name='pos[]']:checked").length) {
        case 0:
          poscount = 0;
          break;
        case 1:
          poscount = 0;
          break;
        case 2:
          poscount = 0;
          break;
        case 3:
          poscount = 1;
          break;
        case 4:
          poscount = 4;
          break;
        case 5:
          poscount = 10;
          break;
      }
      cc = {
        1: 1,
        2: 2,
        3: 2,
        4: 4,
        5: 5,
        6: 6,
        7: 8,
        8: 10,
        9: 11,
        10: 13,
        11: 14,
        12: 14,
        13: 15,
        14: 15,
        15: 14,
        16: 14,
        17: 13,
        18: 11,
        19: 10,
        20: 8,
        21: 6,
        22: 5,
        23: 4,
        24: 2,
        25: 2,
        26: 1
      };
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        for (j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      nums *= poscount;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'WXZU120':
      var s = data_sel[0].length;
      if (s > 4) {
        nums += Combination(s, 5)
      }
      break;
    case 'WXZU60':
      if (data_sel[0].length >= 1 && data_sel[1].length >= 3) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 3);
        if (h > 0) {

          tmp_nums -= Combination(h, 1) * Combination(data_sel[1].length - 1, 2)

        }
        nums += tmp_nums
      }


      break;
    case 'WXZU30':
      if (data_sel[0].length >= 2 && data_sel[1].length >= 1) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 2) * Combination(data_sel[1].length, 1);
        if (h > 0) {


          tmp_nums -= Combination(h, 2) * Combination(2, 1);
          if (data_sel[0].length - h > 0) {
            tmp_nums -= Combination(h, 1) * Combination(data_sel[0].length - h, 1)

          }
        }
        nums += tmp_nums
      }


      break;
    case 'WXZU20':
      if (data_sel[0].length >= 1 && data_sel[1].length >= 2) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 2);
        if (h > 0) {


          tmp_nums -= Combination(h, 1) * Combination(data_sel[1].length - 1, 1)

        }
        nums += tmp_nums
      }


      break;
    case 'WXZU10':
      if (data_sel[0].length >= 1 && data_sel[1].length >= 1) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 1);
        if (h > 0) {


          if (mname == 'WXZU10' || mname == 'WXZU5') {
            tmp_nums -= Combination(h, 1)
          }
        }

        nums += tmp_nums
      }


      break;
    case 'WXZU5':
      if (data_sel[0].length >= 1 && data_sel[1].length >= 1) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 1);
        if (h > 0) {
          if (mname == 'WXZU10' || mname == 'WXZU5') {
            tmp_nums -= Combination(h, 1)
          }
        }
        nums += tmp_nums
      }


      break;
    case 'RXZXHZSSC3':
      switch ($("input[name='pos[]']:checked").length) {
        case 0:
          poscount = 0;
          break;
        case 1:
          poscount = 0;
          break;
        case 2:
          poscount = 0;
          break;
        case 3:
          poscount = 1;
          break;
        case 4:
          poscount = 4;
          break;
        case 5:
          poscount = 10;
          break;
      }
      var cc = {
        0: 1,
        1: 3,
        2: 6,
        3: 10,
        4: 15,
        5: 21,
        6: 28,
        7: 36,
        8: 45,
        9: 55,
        10: 63,
        11: 69,
        12: 73,
        13: 75,
        14: 75,
        15: 73,
        16: 69,
        17: 63,
        18: 55,
        19: 45,
        20: 36,
        21: 28,
        22: 21,
        23: 15,
        24: 10,
        25: 6,
        26: 3,
        27: 1
      };
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        for (j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      nums *= poscount;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'RXZXHZSSC2':
      switch ($("input[name='pos[]']:checked").length) {
        case 0:
          multi = 0;
          break;
        case 1:
          multi = 0;
          break;
        case 2:
          multi = 1;
          break;
        case 3:
          multi = 3;
          break;
        case 4:
          multi = 6;
          break;
        case 5:
          multi = 10;
          break;
      }
      var cc = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 10,
        9: 10,
        10: 10,
        11: 8,
        12: 7,
        13: 6,
        14: 5,
        15: 4,
        16: 3,
        17: 2,
        18: 1
      };
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        for (j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      nums *= multi;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'RXZUHZSSC2':
      switch ($("input[name='pos[]']:checked").length) {
        case 0:
          poscount = 0;
          break;
        case 1:
          poscount = 0;
          break;
        case 2:
          poscount = 1;
          break;
        case 3:
          poscount = 3;
          break;
        case 4:
          poscount = 6;
          break;
        case 5:
          poscount = 10;
          break;
      }
      cc = {
        0: 0,
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 4,
        8: 4,
        9: 5,
        10: 4,
        11: 4,
        12: 3,
        13: 3,
        14: 2,
        15: 2,
        16: 1,
        17: 1,
        18: 0
      };
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        for (j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      nums *= poscount;
      var str = '';
      $("input[name='pos[]']:checked").each(function () {
        if ($(this).attr('checked')) {
          str += $(this).val() + ','
        }
      });
      $("input[name='poschoose']").val(str.slice(0, -1));
      break;
    case 'ZXHZ':
      var cc = {
        0: 1,
        1: 3,
        2: 6,
        3: 10,
        4: 15,
        5: 21,
        6: 28,
        7: 36,
        8: 45,
        9: 55,
        10: 63,
        11: 69,
        12: 73,
        13: 75,
        14: 75,
        15: 73,
        16: 69,
        17: 63,
        18: 55,
        19: 45,
        20: 36,
        21: 28,
        22: 21,
        23: 15,
        24: 10,
        25: 6,
        26: 3,
        27: 1
      };
    case 'ZUHZ':
      if (mname == 'ZUHZ') {
        cc = {
          1: 1,
          2: 2,
          3: 2,
          4: 4,
          5: 5,
          6: 6,
          7: 8,
          8: 10,
          9: 11,
          10: 13,
          11: 14,
          12: 14,
          13: 15,
          14: 15,
          15: 14,
          16: 14,
          17: 13,
          18: 11,
          19: 10,
          20: 8,
          21: 6,
          22: 5,
          23: 4,
          24: 2,
          25: 2,
          26: 1
        };
      }
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        for (let j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      break;
    case 'ZUS':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1);
        }
      }
      ;
      break;
    case 'ZUL':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      break;
    case 'ZH5':
    case 'ZH4':
    case 'ZH3':
      for (let i = 0; i <= max_place; i++) {
        if (data_sel[i].length == 0) {
          tmp_nums = 0;
          break;
        }
        tmp_nums *= data_sel[i].length;
      }
      nums = tmp_nums * parseInt(mname.charAt(mname.length - 1));
      break;
    case 'SXZU24':
      var s = data_sel[0].length;
      if (s > 3) {
        nums += Combination(s, 4)
      }
      break;
    case 'SXZU6':
      if (data_sel[0].length >= 2) {
        nums += Combination(data_sel[0].length, 2);
      }
      break;
    case 'SXZU12':

      if (data_sel[0].length >= 1 && data_sel[1].length >= 2) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 2);
        if (h > 0) {

          tmp_nums -= Combination(h, 1) * Combination(data_sel[1].length - 1, 1)

        }
        nums += tmp_nums
      }
      break;
    case 'SXZU4':

      if (data_sel[0].length >= 1 && data_sel[1].length >= 1) {
        var h = intersect(data_sel[0], data_sel[1]).length;
        tmp_nums = Combination(data_sel[0].length, 1) * Combination(data_sel[1].length, 1);
        if (h > 0) {

          if (mname == 'SXZU4') {
            tmp_nums -= Combination(h, 1)
          }

        }
        nums += tmp_nums
      }
      break;
    case 'BDW2':
    case 'ZU2':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'ZXHZ2':
      cc = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 9,
        11: 8,
        12: 7,
        13: 6,
        14: 5,
        15: 4,
        16: 3,
        17: 2,
        18: 1
      };
      for (let i = 0; i <= max_place; i++) {
        let s = data_sel[i].length;
        for (let j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      break;
    case 'ZUHZ2':
      cc = {
        0: 0,
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 4,
        8: 4,
        9: 5,
        10: 4,
        11: 4,
        12: 3,
        13: 3,
        14: 2,
        15: 2,
        16: 1,
        17: 1,
        18: 0
      };
      for (let i = 0; i <= max_place; i++) {
        let s = data_sel[i].length;
        for (let j = 0; j < s; j++) {
          nums += cc[parseInt(data_sel[i][j], 10)];
        }
      }
      ;
      break;
    case 'DWD':
    case 'pk10DWD' :
      for (let i = 0; i <= max_place; i++) {
        nums += data_sel[i].length;
      }
      ;
      break;
    case 'SDZX3':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            for (let k = 0; k < data_sel[2].length; k++) {
              if (data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k]) {
                nums++
              }
            }
          }
        }
      }
      break;
    case 'SDZU3':
      for (let i = 0; i <= max_place; i++) {
        let s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6
        }
      }
      ;
      break;
    case 'SDZX2':
      nums = 0;
      if (data_sel[0].length > 0 && data_sel[1].length > 0) {
        for (let i = 0; i < data_sel[0].length; i++) {
          for (let j = 0; j < data_sel[1].length; j++) {
            if (data_sel[0][i] != data_sel[1][j]) {
              nums++
            }
          }
        }
      }
      break;
    case 'SDZU2':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'SDBDW':
    case 'SDDWD':
    case 'SDDDS':
    case 'SDCZW':
    case 'SDRX1':
      for (let i = 0; i <= max_place; i++) {
        nums += data_sel[i].length;
      }
      ;
      break;
    case 'SDRX2':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'SDRX3':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      break;
    case 'SDRX4':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 3) {
          nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
        }
      }
      ;
      break;
    case 'SDRX5':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 4) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
        }
      }
      ;
      break;
    case 'SDRX6':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 5) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720;
        }
      }
      ;
      break;
    case 'SDRX7':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 6) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040;
        }
      }
      ;
      break;
    case 'SDRX8':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 7) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) * (s - 7) / 40320;
        }
      }
      ;
      break;
    case 'BJRX2':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 1) {
          nums += s * (s - 1) / 2;
        }
      }
      ;
      break;
    case 'BJRX3':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 2) {
          nums += s * (s - 1) * (s - 2) / 6;
        }
      }
      ;
      break;
    case 'BJRX4':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 3) {
          nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
        }
      }
      ;
      break;
    case 'BJRX5':
      for (i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 4) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
        }
      }
      ;
      break;
    case 'BJRX6':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 5) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720;
        }
      }
      ;
      break;
    case 'BJRX7':
      for (let i = 0; i <= max_place; i++) {
        var s = data_sel[i].length;
        if (s > 6) {
          nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040;
        }
      }
      ;
      break
    default:
      for (let i = 0; i <= max_place; i++) {
        if (data_sel[i].length == 0) {
          tmp_nums = 0
          break
        }
        tmp_nums *= data_sel[i].length
      }
      nums = tmp_nums
      break
  }
  return nums
}
// 计算任选和值 注数
// flag true组选 false 复选 任2
export const calRXHZNums2 = (data, pos, n, flag) => {
  let sum = 0
  data.forEach(value => {
    value.forEach(val => {
      for (let i = 0; i < (flag ? 9 : 10); i++) {
        for (let j = (flag ? i + 1 : 0); j < 10; j++) {
          if (i + j == val) {
            sum += 1
            break
          }
        }
        if (i > val) {
          break
        }
      }
    })
  })
  return sum * (Utils.factorial(pos.length) / Utils.factorial(pos.length - n) / Utils.factorial(n))
}
// flag true组选 false 复选 任3
export const calRXHZNums3 = (data, pos, n, flag) => {
  let sum = 0, _arr = [], _r = 0
  data.forEach(value => {
    value.forEach(val => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          for (let k = 0; k < 10; k++) {
            if (i + j + k == val) {
              if (flag && !(i == j && j == k)) {
                _arr.push([i, j, k].sort().toString())
              } else {
                sum += 1
              }
              break
            }
          }
          if (j > val) {
            break
          }
        }
        if (i > val) {
          break
        }
      }
    })
  })
  if (flag) {
    return Array.from(new Set(_arr)).length * (Utils.factorial(pos.length) / Utils.factorial(pos.length - n) / Utils.factorial(n))
  } else {
    return sum * (Utils.factorial(pos.length) / Utils.factorial(pos.length - n) / Utils.factorial(n))
  }
}
// 计算任选组选 注数
/*
* @params
* @pos 当前位置集合
* @n 最少位置数
* @m 最少号码数
* @times 倍数
* */
export const calRXZXNums = (data, pos, n, m, times) => {
  let sum = 0, len = data[0].length
  if (len < m) {
    sum = 0
  } else {
    sum = (Utils.factorial(len) / Utils.factorial(len - m) / Utils.factorial(m)) * (Utils.factorial(pos.length) / Utils.factorial(pos.length - n) / Utils.factorial(n)) * times
  }
  return sum
}
/*
*
*  @n 第二个位置最小个数
* */
export const calRXZX12 = (data, pos, n) => {
  let sum = 0
  data[0].forEach(value => {
    let arr = [...data[1]]
    if (arr.indexOf(Number(value)) > -1) {
      arr.splice(arr.indexOf(value), 1)
    }
    if (arr.indexOf(String(value)) > -1) {
      arr.splice(arr.indexOf(value), 1)
    }
    if (arr.length >= n) {
      sum += Utils.factorial(arr.length) / Utils.factorial(arr.length - n) / Utils.factorial(n)
    }
  })
  return sum * Utils.factorial(pos.length) / Utils.factorial(pos.length - 4) / Utils.factorial(4)
}
export const Combination = (n, m) => {
  m = parseInt(m)
  n = parseInt(n)
  if (m < 0 || n < 0) {
    return false;
  }
  if (m == 0 || n == 0) {
    return 1;
  }
  if (m > n) {
    return 0;
  }
  if (m > n / 2.0) {
    m = n - m;
  }
  var result = 0.0;
  for (let i = n; i >= (n - m + 1); i--) {
    result += Math.log(i);
  }
  for (let i = m; i >= 1; i--) {
    result -= Math.log(i);
  }
  result = Math.exp(result);
  return Math.round(result);
}




