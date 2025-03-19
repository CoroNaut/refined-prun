export interface BuildingCosts {
  Ticker: string;
  AreaCost: number;
  BuildingCosts: {
    CommodityTicker: string;
    Amount: number;
  }[];
}

export const allBuildingCategories = {
  Infrastructure: ['HB1', 'HB2', 'HB3', 'HB4', 'HB5', 'HBB', 'HBC', 'HBL', 'HBM', 'STO'],
  Resources: ['COL', 'EXT', 'RIG'],
  Pioneers: ['BMP', 'FRM', 'FP', 'INC', 'PP1', 'SME', 'WEL'],
  Settlers: [
    'CHP',
    'CLF',
    'EDM',
    'FER',
    'FS',
    'GF',
    'HYF',
    'PPF',
    'POL',
    'PP2',
    'REF',
    'UPF',
    'WPL',
  ],
  Technicians: [
    'CLR',
    'ELP',
    'ECA',
    'HWP',
    'IVP',
    'LAB',
    'MCA',
    'ORC',
    'PHF',
    'PP3',
    'SKF',
    'SCA',
    'SD',
    'TMP',
  ],
  Engineers: ['AML', 'ASM', 'APF', 'DRS', 'PP4', 'SE', 'SPP'],
  Scientists: ['AAF', 'EEP', 'SL', 'SPF'],
};

export const allBuildingCosts: BuildingCosts[] = [
  {
    Ticker: 'RIG',
    AreaCost: 10,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'TNP',
    AreaCost: 30,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 12,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'PAR',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'SOI',
        Amount: 100,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 10,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 16,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 20,
      },
      {
        CommodityTicker: 'HAB',
        Amount: 5,
      },
    ],
  },
  {
    Ticker: 'PP1',
    AreaCost: 19,
    BuildingCosts: [
      {
        CommodityTicker: 'BBH',
        Amount: 3,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 3,
      },
    ],
  },
  {
    Ticker: 'CLF',
    AreaCost: 37,
    BuildingCosts: [
      {
        CommodityTicker: 'LDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'SDP',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'BMF',
        Amount: 1,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'ADS',
        Amount: 1,
      },
      {
        CommodityTicker: 'DOU',
        Amount: 1,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 8,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 16,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 10,
      },
    ],
  },
  {
    Ticker: 'HBL',
    AreaCost: 22,
    BuildingCosts: [
      {
        CommodityTicker: 'ASE',
        Amount: 6,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 8,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 8,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'HBM',
    AreaCost: 20,
    BuildingCosts: [
      {
        CommodityTicker: 'ASE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 8,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 4,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'COG',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'LSE',
        Amount: 24,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 32,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 32,
      },
      {
        CommodityTicker: 'BWS',
        Amount: 16,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 16,
      },
      {
        CommodityTicker: 'SP',
        Amount: 32,
      },
      {
        CommodityTicker: 'BMF',
        Amount: 1,
      },
    ],
  },
  {
    Ticker: 'CFL',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'FFC',
        Amount: 1,
      },
      {
        CommodityTicker: 'TAC',
        Amount: 6,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 16,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 32,
      },
      {
        CommodityTicker: 'SP',
        Amount: 32,
      },
    ],
  },
  {
    Ticker: 'HB4',
    AreaCost: 16,
    BuildingCosts: [
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 4,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'CIM',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 32,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 16,
      },
      {
        CommodityTicker: 'SP',
        Amount: 36,
      },
      {
        CommodityTicker: 'CRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LIS',
        Amount: 1,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 16,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 16,
      },
    ],
  },
  {
    Ticker: 'FP',
    AreaCost: 12,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 3,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 3,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 3,
      },
    ],
  },
  {
    Ticker: 'CRC',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'SP',
        Amount: 200,
      },
      {
        CommodityTicker: 'CBL',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 400,
      },
      {
        CommodityTicker: 'LIT',
        Amount: 40,
      },
      {
        CommodityTicker: 'DEC',
        Amount: 80,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 100,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 100,
      },
      {
        CommodityTicker: 'ADS',
        Amount: 1,
      },
      {
        CommodityTicker: 'LOG',
        Amount: 1,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 100,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 100,
      },
    ],
  },
  {
    Ticker: 'FS',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 2,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'HOS',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 400,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 20,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 16,
      },
      {
        CommodityTicker: 'SU',
        Amount: 1,
      },
      {
        CommodityTicker: 'DOU',
        Amount: 1,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 20,
      },
      {
        CommodityTicker: 'TCU',
        Amount: 1,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 16,
      },
    ],
  },
  {
    Ticker: 'UNI',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'ASE',
        Amount: 16,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 16,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 12,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 30,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 400,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 12,
      },
      {
        CommodityTicker: 'LOG',
        Amount: 1,
      },
      {
        CommodityTicker: 'BMF',
        Amount: 2,
      },
      {
        CommodityTicker: 'LU',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'FRM',
    AreaCost: 30,
    BuildingCosts: [
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'LIB',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 250,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 20,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 12,
      },
      {
        CommodityTicker: 'COM',
        Amount: 1,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 12,
      },
      {
        CommodityTicker: 'LOG',
        Amount: 1,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 8,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'PWH',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 20,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'WEL',
    AreaCost: 19,
    BuildingCosts: [
      {
        CommodityTicker: 'BBH',
        Amount: 8,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'BMP',
    AreaCost: 12,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'COR',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'BWS',
        Amount: 8,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 8,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 32,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'BMF',
        Amount: 2,
      },
      {
        CommodityTicker: 'SP',
        Amount: 24,
      },
    ],
  },
  {
    Ticker: 'HB5',
    AreaCost: 18,
    BuildingCosts: [
      {
        CommodityTicker: 'ASE',
        Amount: 4,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 6,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 6,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'LM',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 8,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 8,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 12,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 10,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'HBB',
    AreaCost: 14,
    BuildingCosts: [
      {
        CommodityTicker: 'LTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'STO',
    AreaCost: 15,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'PP3',
    AreaCost: 32,
    BuildingCosts: [
      {
        CommodityTicker: 'LDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'ELP',
    AreaCost: 35,
    BuildingCosts: [
      {
        CommodityTicker: 'RDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'APF',
    AreaCost: 40,
    BuildingCosts: [
      {
        CommodityTicker: 'ABH',
        Amount: 6,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 10,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 10,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'HB1',
    AreaCost: 10,
    BuildingCosts: [
      {
        CommodityTicker: 'BTA',
        Amount: 1,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'EMC',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'TCU',
        Amount: 1,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 32,
      },
      {
        CommodityTicker: 'DOU',
        Amount: 1,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 16,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 24,
      },
    ],
  },
  {
    Ticker: 'ART',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 20,
      },
      {
        CommodityTicker: 'WOR',
        Amount: 2,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 16,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 32,
      },
      {
        CommodityTicker: 'DEC',
        Amount: 10,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
    ],
  },
  {
    Ticker: 'WCE',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'DEC',
        Amount: 40,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 32,
      },
      {
        CommodityTicker: 'FLO',
        Amount: 12,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 500,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 16,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 36,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 36,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 24,
      },
    ],
  },
  {
    Ticker: 'CLR',
    AreaCost: 27,
    BuildingCosts: [
      {
        CommodityTicker: 'LDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'AAF',
    AreaCost: 50,
    BuildingCosts: [
      {
        CommodityTicker: 'ATA',
        Amount: 1,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 6,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 8,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 8,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: '4DA',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'BMF',
        Amount: 2,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 42,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 24,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 40,
      },
      {
        CommodityTicker: 'ADS',
        Amount: 1,
      },
      {
        CommodityTicker: 'FUN',
        Amount: 10,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 600,
      },
      {
        CommodityTicker: 'LIT',
        Amount: 2,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 42,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 42,
      },
    ],
  },
  {
    Ticker: 'WPL',
    AreaCost: 40,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 2,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 3,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'INC',
    AreaCost: 10,
    BuildingCosts: [
      {
        CommodityTicker: 'BTA',
        Amount: 1,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 3,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'EXT',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 16,
      },
    ],
  },
  {
    Ticker: 'HB2',
    AreaCost: 12,
    BuildingCosts: [
      {
        CommodityTicker: 'BTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 2,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 2,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 2,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'LAB',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'ASM',
    AreaCost: 34,
    BuildingCosts: [
      {
        CommodityTicker: 'LSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'ADM',
    AreaCost: 400,
    BuildingCosts: [
      {
        CommodityTicker: 'MCG',
        Amount: 750,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 5,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 25,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'BWS',
        Amount: 10,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'BMF',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'ECA',
    AreaCost: 35,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'PSY',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'ADE',
        Amount: 24,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 24,
      },
      {
        CommodityTicker: 'ABH',
        Amount: 32,
      },
      {
        CommodityTicker: 'ATA',
        Amount: 8,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 24,
      },
    ],
  },
  {
    Ticker: 'SST',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 10,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 12,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 6,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
    ],
  },
  {
    Ticker: 'CM',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'LSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'PSL',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'SKF',
    AreaCost: 40,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'SME',
    AreaCost: 17,
    BuildingCosts: [
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'HB3',
    AreaCost: 14,
    BuildingCosts: [
      {
        CommodityTicker: 'LDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 8,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'PPF',
    AreaCost: 16,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 2,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'HYF',
    AreaCost: 15,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'MHL',
        Amount: 16,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'POL',
    AreaCost: 15,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 8,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'HWP',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'SL',
    AreaCost: 20,
    BuildingCosts: [
      {
        CommodityTicker: 'RSE',
        Amount: 12,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 8,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 6,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 12,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'SD',
    AreaCost: 20,
    BuildingCosts: [
      {
        CommodityTicker: 'LTA',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 10,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'ORC',
    AreaCost: 120,
    BuildingCosts: [
      {
        CommodityTicker: 'ATA',
        Amount: 4,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 8,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'INF',
    AreaCost: 500,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 16,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 12,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 10,
      },
    ],
  },
  {
    Ticker: 'PP2',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 3,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'REF',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'CTE',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'SP',
        Amount: 44,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 8,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 32,
      },
      {
        CommodityTicker: 'LIS',
        Amount: 1,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 32,
      },
      {
        CommodityTicker: 'CC',
        Amount: 5,
      },
    ],
  },
  {
    Ticker: 'ACA',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 20,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
      {
        CommodityTicker: 'DEC',
        Amount: 32,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 12,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 24,
      },
    ],
  },
  {
    Ticker: 'PBH',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'ADS',
        Amount: 1,
      },
      {
        CommodityTicker: 'COM',
        Amount: 1,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 24,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 16,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 24,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 12,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 30,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 300,
      },
    ],
  },
  {
    Ticker: 'MCA',
    AreaCost: 35,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 4,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'PP4',
    AreaCost: 40,
    BuildingCosts: [
      {
        CommodityTicker: 'RSE',
        Amount: 8,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'CHP',
    AreaCost: 18,
    BuildingCosts: [
      {
        CommodityTicker: 'BDE',
        Amount: 3,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 3,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 3,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'SPP',
    AreaCost: 60,
    BuildingCosts: [
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 12,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'VRT',
    AreaCost: 1000,
    BuildingCosts: [
      {
        CommodityTicker: 'ADS',
        Amount: 1,
      },
      {
        CommodityTicker: 'MCG',
        Amount: 500,
      },
      {
        CommodityTicker: 'DEC',
        Amount: 20,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 32,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 32,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 30,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 24,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'PHF',
    AreaCost: 35,
    BuildingCosts: [
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'UPF',
    AreaCost: 50,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 8,
      },
      {
        CommodityTicker: 'BSE',
        Amount: 10,
      },
      {
        CommodityTicker: 'BTA',
        Amount: 3,
      },
      {
        CommodityTicker: 'BDE',
        Amount: 10,
      },
      {
        CommodityTicker: 'BBH',
        Amount: 8,
      },
    ],
  },
  {
    Ticker: 'SPF',
    AreaCost: 40,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 8,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'EDM',
    AreaCost: 30,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'IVP',
    AreaCost: 32,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 4,
      },
    ],
  },
  {
    Ticker: 'EEP',
    AreaCost: 100,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 12,
      },
    ],
  },
  {
    Ticker: 'GF',
    AreaCost: 27,
    BuildingCosts: [
      {
        CommodityTicker: 'TRU',
        Amount: 5,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'LSE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'SCA',
    AreaCost: 35,
    BuildingCosts: [
      {
        CommodityTicker: 'RBH',
        Amount: 3,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'SE',
    AreaCost: 20,
    BuildingCosts: [
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 4,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'FER',
    AreaCost: 25,
    BuildingCosts: [
      {
        CommodityTicker: 'LSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 5,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 2,
      },
      {
        CommodityTicker: 'LDE',
        Amount: 2,
      },
    ],
  },
  {
    Ticker: 'AML',
    AreaCost: 45,
    BuildingCosts: [
      {
        CommodityTicker: 'ABH',
        Amount: 10,
      },
      {
        CommodityTicker: 'ASE',
        Amount: 6,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
      {
        CommodityTicker: 'ADE',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'DRS',
    AreaCost: 30,
    BuildingCosts: [
      {
        CommodityTicker: 'RDE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 6,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 2,
      },
      {
        CommodityTicker: 'RBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 6,
      },
    ],
  },
  {
    Ticker: 'COL',
    AreaCost: 15,
    BuildingCosts: [
      {
        CommodityTicker: 'BSE',
        Amount: 16,
      },
    ],
  },
  {
    Ticker: 'HBC',
    AreaCost: 17,
    BuildingCosts: [
      {
        CommodityTicker: 'LDE',
        Amount: 2,
      },
      {
        CommodityTicker: 'RSE',
        Amount: 2,
      },
      {
        CommodityTicker: 'RTA',
        Amount: 4,
      },
      {
        CommodityTicker: 'LBH',
        Amount: 4,
      },
      {
        CommodityTicker: 'TRU',
        Amount: 2,
      },
    ],
  },
];
