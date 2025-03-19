declare namespace FioApi {
  export interface PlanetShort {
    PlanetNaturalId: string;
    PlanetName: string;
  }

  export declare type AllPlanetsShort = PlanetShort[];

  export interface Commodity {
    CommodityName: string;
    CommodityTicker: string;
    Weight: number;
    Volume: number;
    Amount: number;
  }

  export interface Building {
    BuildingCosts: Commodity[];
    Recipes: [
      {
        Inputs: Commodity[];
        Outputs: Commodity[];
        BuildingRecipeId: string;
        DurationMs: number;
        RecipeName: string;
        StandardRecipeName: string;
      },
    ];
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
}
