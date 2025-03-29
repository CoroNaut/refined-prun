declare namespace FioApi {
  export interface PlanetShort {
    PlanetNaturalId: string;
    PlanetName: string;
  }

  export declare type AllPlanetsShort = PlanetShort[];

  export interface Building {
    BuildingCosts: Commodity[];
    Recipes: BuildingRecipe[];
    BuildingId: string;
    Name: string;
    Ticker: string;
    Expertise: string | null;
    Pioneers: number;
    Settlers: number;
    Technicians: number;
    Engineers: number;
    Scientists: number;
    AreaCost: number;
    UserNameSubmitted: string;
    Timestamp: string;
  }

  interface BuildingRecipe {
    Inputs: Commodity[];
    Outputs: Commodity[];
    BuildingRecipeId: string;
    DurationMs: number;
    RecipeName: string;
    StandardRecipeName: string;
  }

  interface Commodity {
    CommodityName: string;
    CommodityTicker: string;
    Weight: number;
    Volume: number;
    Amount: number;
  }

  interface Planet {
    Resources: PlanetResource[];
    BuildRequirements: PlanetBuildRequirement[];
    PlanetProductionFees: PlanetProductionFee[];
    PlanetCOGCPrograms: PlanetCOGCProgram[];
    COGCVotes: COGCVote[];
    COGCUpkeep: object[];
    PlanetId: string;
    PlanetNaturalId: string;
    PlanetName: string;
    Namer: string | null;
    NamingDataEpochMs: number;
    Nameable: boolean;
    SystemId: string;
    Gravity: number;
    MagneticField: number;
    Mass: number;
    MassEarth: number;
    OrbitSemiMajorAxis: number;
    OrbitEccentricity: number;
    OrbitInclination: number;
    OrbitRightAscension: number;
    OrbitPeriapsis: number;
    OrbitIndex: number;
    Pressure: number;
    Radiation: number;
    Radius: number;
    Sunlight: number;
    Surface: boolean;
    Temperature: number;
    Fertility: number;
    HasLocalMarket: boolean;
    HasChamberOfCommerce: boolean;
    HasWarehouse: boolean;
    HasAdministrationCenter: boolean;
    HasShipyard: boolean;
    FactionCode: string;
    FactionName: string;
    GoverningEntity: string;
    CurrencyName: string;
    CurrencyCode: string;
    BaseLocalMarketFee: number;
    LocalMarketFeeFactor: number;
    WarehouseFee: number;
    EstablishmentFee: number;
    PopulationId: string;
    COGCProgramStatus: string;
    PlanetTier: number;
    UserNameSubmitted: string;
    Timestamp: string;
  }

  export interface PlanetResource {
    MaterialId: string;
    ResourceType: string;
    Factor: number;
  }

  interface PlanetBuildRequirement {
    MaterialName: string;
    MaterialId: string;
    MaterialTicker: string;
    MaterialCategory: string;
    MaterialAmount: number;
    MaterialWeight: number;
    MaterialVolume: number;
  }
  type ProductionFeeCategory =
    | 'Agriculture'
    | 'Chemistry'
    | 'Construction'
    | 'Electronics'
    | 'Food_Industries'
    | 'Fuel_Refining'
    | 'Manufacturing'
    | 'Metallurgy'
    | 'Resource_Extraction';
  type ProductionWorkforceLevel = 'PIONEER' | 'SETTLER' | 'TECHNICIAN' | 'ENGINEER' | 'SCIENTIST';
  type ProductionFeeCurrency = 'AIC' | 'CIS' | 'ECD' | 'ICA' | 'NCC';

  interface PlanetProductionFee {
    Category: ProductionFeeCategory;
    WorkforceLevel: ProductionWorkforceLevel;
    FeeAmount: number;
    FeeCurrency: ProductionFeeCurrency;
  }

  type ProgramType =
    | 'ADVERTISING_AGRICULTURE'
    | 'ADVERTISING_PIONEERS'
    | 'ADVERTISING_SETTLERS'
    | 'ADVERTISING_TECHNICIANS'
    | 'ADVERTISING_ENGINEERS'
    | 'ADVERTISING_SCIENTISTS'
    | 'ADVERTISING_CHEMISTRY'
    | 'ADVERTISING_CONSTRUCTION'
    | 'ADVERTISING_ELECTRONICS'
    | 'ADVERTISING_FOOD_INDUSTRIES'
    | 'ADVERTISING_FUEL_REFINING'
    | 'ADVERTISING_MANUFACTURING'
    | 'ADVERTISING_METALLURGY'
    | 'ADVERTISING_RESOURCE_EXTRACTION';

  interface PlanetCOGCProgram {
    ProgramType: ProgramType;
    StartEpochMs: number;
    EndEpochMs: number;
  }

  interface COGCVote {
    CompanyName: string;
    CompanyCode: string;
    Influence: number;
    VoteType: string;
    VoteTimeEpochMs: number;
  }
}
