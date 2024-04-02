

export interface PartyMatchmakingInfo {
    buildId: 0,
    hotfixVersion: 0,
    regionId: string;
    playlistName: string;
    playlistRevision: 0,
    tournamentId: string;
    eventWinqdowId: string;
    linkCode: string;
}

export interface MMSTicket {
    serviceUrl: string;
    ticketType: string;
    payload: string;
    signature: string;
}

export interface ApiPlaylist {
    id: string;
    name: string;
    subName: string;
    description: string;
    gameType: string;
    ratingType: string;
    minPlayers: -1,
    maxPlayers: -1,
    maxTeams: -1,
    maxTeamSize: 1,
    maxSquads: -1,
    maxSquadSize: 1,
    isDefault: false,
    isTournament: false,
    isLimitedTimeMode: false,
    isLargeTeamGame: false,
    accumulateToProfileStats: false,
    images: {
        showcase: string;
        missionIcon: string;
    },
    gameplayTags: [],
    path: string;
    added: string;
}



export interface lightSwitchInfo {
    serviceInstanceId: string;
    status: string;
    message: string;
    maintenanceUri?: any;
    overrideCatalogIds: string[];
    allowedActions: any[];
    banned: boolean;
    launcherInfoDTO: {
        appName: string;
        catalogItemId: string;
        namespace: string;
    };
}

export interface authToken {
    access_token: string;
    expires_in: number;
    expires_at: Date;
    token_type: string;
    client_id: string;
    internal_client: boolean;
    client_service: string;
}

export interface fortniteBuild {
    elements: {
        appName: string;
        labelName: string;
        buildVersion: string;
        hash: string;
        metadata: {
            installationPoolId: string;
        };
        manifests: {
            uri: string;
            queryParams: {
                name: string;
                value: string;
            }[];
        }[];
    }[];
}

export interface BRShop {
    refreshIntervalHrs: number;
    dailyPurchaseHrs: number;
    expiration: Date;
    storefronts: Storefront[];
}

export interface Storefront {
    name: string;
    catalogEntries: CatalogEntry[];
}

export interface CatalogEntry {
    offerId: string;
    devName: string;
    offerType: OfferType;
    prices: Price[];
    categories: string[];
    dailyLimit: number;
    weeklyLimit: number;
    monthlyLimit: number;
    refundable: boolean;
    appStoreId: string[];
    requirements: Requirement[];
    metaInfo?: MetaInfo[];
    catalogGroup?: CatalogGroup;
    catalogGroupPriority: number;
    sortPriority: number;
    title?: string;
    shortDescription?: ShortDescription;
    description?: string;
    displayAssetPath?: string;
    itemGrants: ItemGrant[];
    giftInfo?: GiftInfo;
    fulfillmentIds?: any[];
    dynamicBundleInfo?: DynamicBundleInfo;
    meta?: Meta;
    matchFilter?: string;
    filterWeight?: number;
    additionalGrants?: any[];
    fulfillmentClass?: string;
}

export enum CatalogGroup {
    Empty = "",
    Shared = "Shared",
    Upgrade = "Upgrade",
}

export interface DynamicBundleInfo {
    discountedBasePrice: number;
    regularBasePrice: number;
    floorPrice: number;
    currencyType: CurrencyType;
    currencySubType: string;
    displayType: string;
    bundleItems: BundleItem[];
}

export interface BundleItem {
    bCanOwnMultiple: boolean;
    regularPrice: number;
    discountedPrice: number;
    alreadyOwnedPriceReduction: number;
    item: Item;
}

export interface Item {
    templateId: string;
    quantity: number;
}

export enum CurrencyType {
    GameItem = "GameItem",
    MtxCurrency = "MtxCurrency",
    RealMoney = "RealMoney",
}

export interface GiftInfo {
    bIsEnabled: boolean;
    forcedGiftBoxTemplateId: string;
    purchaseRequirements: any[];
    giftRecordIds?: any[];
}

export interface ItemGrant {
    templateId: string;
    quantity: number;
    attributes?: Attributes;
}

export interface Attributes {
    Alteration: Alteration;
}

export interface Alteration {
    LootTierGroup: string;
    Tier: number;
}

export interface Meta {
    NewDisplayAssetPath?: string;
    SectionId?: string;
    TileSize?: TileSize;
    AnalyticOfferGroupId?: string;
    FirstSeen?: FirstSeen;
    offertag?: string;
    EncryptionKey?: string;
    ViolatorTag?: string;
    ViolatorIntensity?: string;
    MaxConcurrentPurchases?: string;
    Preroll?: string;
    ProfileId?: string;
    EventLimit?: string;
    PurchaseLimitingEventId?: string;
    StoreToastHeader?: string;
    StoreToastBody?: string;
    open_cardpacks?: string;
}

export enum FirstSeen {
    The11162021 = "11/16/2021",
    The11192021 = "11/19/2021",
    The11212021 = "11/21/2021",
}

export enum TileSize {
    DoubleWide = "DoubleWide",
    Normal = "Normal",
    Small = "Small",
}

export interface MetaInfo {
    key?: string;
    value?: string;
    Key?: Key;
    Value?: string;
}

export enum Key {
    CurrencyAnalyticsName = "CurrencyAnalyticsName",
}

export enum OfferType {
    DynamicBundle = "DynamicBundle",
    StaticPrice = "StaticPrice",
}

export interface Price {
    currencyType: CurrencyType;
    currencySubType: CurrencySubType;
    regularPrice: number;
    dynamicRegularPrice: number;
    finalPrice: number;
    saleExpiration: Date;
    basePrice: number;
    saleType?: string;
}

export enum CurrencySubType {
    AccountResourceCurrencyXrayllama = "AccountResource:currency_xrayllama",
    AccountResourceEventcurrencyScaling = "AccountResource:eventcurrency_scaling",
    AccountResourceEventcurrencySnowballs = "AccountResource:eventcurrency_snowballs",
    AccountResourceVoucherBasicpack = "AccountResource:voucher_basicpack",
    AccountResourceVoucherCardpack2021Anniversary = "AccountResource:voucher_cardpack_2021anniversary",
    AccountResourceVoucherCardpackBronze = "AccountResource:voucher_cardpack_bronze",
    AccountResourceVoucherCardpackJackpot = "AccountResource:voucher_cardpack_jackpot",
    AccountResourceVoucherCustomFirecrackerR = "AccountResource:voucher_custom_firecracker_r",
    Empty = "",
    TokenBattlepassgift = "Token:battlepassgift",
    TokenGiftglowtoken = "Token:giftglowtoken",
}

export interface Requirement {
    requirementType: RequirementType;
    requiredId: string;
    minQuantity: number;
}

export enum RequirementType {
    DenyOnFulfillment = "DenyOnFulfillment",
    DenyOnItemOwnership = "DenyOnItemOwnership",
    RequireFulfillment = "RequireFulfillment",
    RequireItemOwnership = "RequireItemOwnership",
}

export enum ShortDescription {
    BattlePass25Levels = "Battle Pass + 25 levels!",
    Chapter2Season1 = "Chapter 2 - Season 1",
    Chapter2Season8 = "Chapter 2 - Season 8",
    Empty = "",
    Season18 = "Season 18",
}

