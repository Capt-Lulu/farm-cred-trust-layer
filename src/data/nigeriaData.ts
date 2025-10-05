export interface Agent {
  id: string
  name: string
  phone: string
  email: string
  address: string
  cooperativeId: string
}

export interface Ward {
  id: string
  name: string
  cooperatives: Cooperative[]
}

export interface Cooperative {
  id: string
  name: string
  address: string
  memberCount: number
  executiveCommittee: {
    chairman: string
    secretary: string
    treasurer: string
    publicRelationsOfficer?: string
  }
  establishedYear: number
  registrationNumber: string
  agents: Agent[]
}

export interface LocalGovernment {
  id: string
  name: string
  wards: Ward[]
  coordinates?: {
    latitude: number
    longitude: number
  }
  area?: string // in square kilometers
  population?: number
}

export interface State {
  id: string
  name: string
  localGovernments: LocalGovernment[]
  coordinates?: {
    latitude: number
    longitude: number
  }
  capital: string
  area: string // in square kilometers
  population: number
  zone: "North Central" | "North East" | "North West" | "South East" | "South South" | "South West"
  createdDate: string
}

export const locationUtils = {
  // Get all states in a specific geopolitical zone
  getStatesByZone: (zone: State["zone"]): State[] => {
    return nigeriaStates.filter((state) => state.zone === zone)
  },

  // Search states by name
  searchStates: (query: string): State[] => {
    const searchTerm = query.toLowerCase()
    return nigeriaStates.filter(
      (state) => state.name.toLowerCase().includes(searchTerm) || state.capital.toLowerCase().includes(searchTerm),
    )
  },

  // Get LGAs by state ID
  getLGAsByState: (stateId: string): LocalGovernment[] => {
    const state = nigeriaStates.find((s) => s.id === stateId)
    return state ? state.localGovernments : []
  },

  // Search LGAs across all states
  searchLGAs: (query: string): { state: State; lga: LocalGovernment }[] => {
    const searchTerm = query.toLowerCase()
    const results: { state: State; lga: LocalGovernment }[] = []

    nigeriaStates.forEach((state) => {
      state.localGovernments.forEach((lga) => {
        if (lga.name.toLowerCase().includes(searchTerm)) {
          results.push({ state, lga })
        }
      })
    })

    return results
  },

  // Get total statistics
  getTotalStats: () => {
    const totalLGAs = nigeriaStates.reduce((sum, state) => sum + state.localGovernments.length, 0)
    const totalWards = nigeriaStates.reduce(
      (sum, state) => sum + state.localGovernments.reduce((wardSum, lga) => wardSum + lga.wards.length, 0),
      0,
    )
    const totalCooperatives = nigeriaStates.reduce(
      (sum, state) =>
        sum +
        state.localGovernments.reduce(
          (lgaSum, lga) => lgaSum + lga.wards.reduce((wardSum, ward) => wardSum + ward.cooperatives.length, 0),
          0,
        ),
      0,
    )

    return {
      states: nigeriaStates.length,
      lgas: totalLGAs,
      wards: totalWards,
      cooperatives: totalCooperatives,
    }
  },

  // Calculate distance between two coordinates (Haversine formula)
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  },
}

// Complete data for all Nigerian states, LGAs, wards and cooperatives
export const nigeriaStates: State[] = [
  {
    id: "abia",
    name: "Abia State",
    capital: "Umuahia",
    area: "6,320",
    population: 2833999,
    zone: "South East",
    createdDate: "1991-08-27",
    coordinates: { latitude: 5.4527, longitude: 7.5248 },
    localGovernments: [
      {
        id: "aba-north",
        name: "Aba North",
        coordinates: { latitude: 5.1065, longitude: 7.3986 },
        area: "17.59",
        population: 204000,
        wards: [
          {
            id: "aba-north-ward1",
            name: "Eziama Ward",
            cooperatives: [
              {
                id: "abia-coop-1",
                name: "Aba North Farmers Cooperative",
                address: "No. 45 Azikiwe Road, Aba",
                memberCount: 234,
                executiveCommittee: {
                  chairman: "Chief Emeka Okafor",
                  secretary: "Mrs. Ngozi Eze",
                  treasurer: "Mr. Chukwu Okoro",
                },
                establishedYear: 2019,
                registrationNumber: "AB/COOP/2019/001",
                agents: [
                  {
                    id: "agent-ab-001",
                    name: "Ikechukwu Nwankwo",
                    phone: "+234 803 123 4567",
                    email: "ikechukwu@farmcred.ng",
                    address: "12 School Road, Aba",
                    cooperativeId: "abia-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "umuahia-north",
        name: "Umuahia North",
        coordinates: { latitude: 5.525, longitude: 7.4896 },
        area: "296.26",
        population: 179394,
        wards: [
          {
            id: "umuahia-north-ward1",
            name: "Afara Ward",
            cooperatives: [
              {
                id: "abia-coop-2",
                name: "Umuahia Agricultural Cooperative",
                address: "Government House Road, Umuahia",
                memberCount: 189,
                executiveCommittee: {
                  chairman: "Dr. Kelechi Okoye",
                  secretary: "Mrs. Adaeze Nwosu",
                  treasurer: "Mr. Obinna Ike",
                },
                establishedYear: 2018,
                registrationNumber: "AB/COOP/2018/002",
                agents: [
                  {
                    id: "agent-ab-002",
                    name: "Chioma Okwu",
                    phone: "+234 805 234 5678",
                    email: "chioma@farmcred.ng",
                    address: "23 Ikot Ekpene Road, Umuahia",
                    cooperativeId: "abia-coop-2",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "adamawa",
    name: "Adamawa State",
    capital: "Yola",
    area: "36,917",
    population: 4248436,
    zone: "North East",
    createdDate: "1991-08-27",
    coordinates: { latitude: 9.3265, longitude: 12.3984 },
    localGovernments: [
      {
        id: "yola-north",
        name: "Yola North",
        coordinates: { latitude: 9.2094, longitude: 12.4814 },
        area: "193.68",
        population: 198405,
        wards: [
          {
            id: "yola-north-ward1",
            name: "Alkalawa Ward",
            cooperatives: [
              {
                id: "adamawa-coop-1",
                name: "Yola North Farmers Union",
                address: "Jimeta Market Road, Yola",
                memberCount: 312,
                executiveCommittee: {
                  chairman: "Alhaji Musa Adamu",
                  secretary: "Hajiya Aisha Mohammed",
                  treasurer: "Mallam Ibrahim Yusuf",
                },
                establishedYear: 2017,
                registrationNumber: "AD/COOP/2017/001",
                agents: [
                  {
                    id: "agent-ad-001",
                    name: "Abdullahi Bello",
                    phone: "+234 807 345 6789",
                    email: "abdullahi@farmcred.ng",
                    address: "15 Atiku Abubakar Way, Yola",
                    cooperativeId: "adamawa-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "akwa-ibom",
    name: "Akwa Ibom State",
    capital: "Uyo",
    area: "7,081",
    population: 5482177,
    zone: "South South",
    createdDate: "1987-09-23",
    coordinates: { latitude: 5.0378, longitude: 7.9036 },
    localGovernments: [
      {
        id: "uyo",
        name: "Uyo",
        coordinates: { latitude: 5.0378, longitude: 7.9036 },
        area: "119.23",
        population: 309573,
        wards: [
          {
            id: "uyo-ward1",
            name: "Etoi Ward",
            cooperatives: [
              {
                id: "akwa-ibom-coop-1",
                name: "Uyo Metropolitan Farmers Cooperative",
                address: "Wellington Bassey Way, Uyo",
                memberCount: 267,
                executiveCommittee: {
                  chairman: "Chief Godwin Akpan",
                  secretary: "Mrs. Ime Udoh",
                  treasurer: "Mr. Nsikak Edem",
                },
                establishedYear: 2020,
                registrationNumber: "AK/COOP/2020/001",
                agents: [
                  {
                    id: "agent-ak-001",
                    name: "Emem Bassey",
                    phone: "+234 809 456 7890",
                    email: "emem@farmcred.ng",
                    address: "8 Aka Road, Uyo",
                    cooperativeId: "akwa-ibom-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "anambra",
    name: "Anambra State",
    capital: "Awka",
    area: "4,844",
    population: 5527809,
    zone: "South East",
    createdDate: "1991-08-27",
    coordinates: { latitude: 6.2209, longitude: 6.9909 },
    localGovernments: [
      {
        id: "awka-north",
        name: "Awka North",
        coordinates: { latitude: 6.2649, longitude: 7.0794 },
        area: "99.16",
        population: 139915,
        wards: [
          {
            id: "awka-north-ward1",
            name: "Achalla Ward",
            cooperatives: [
              {
                id: "anambra-coop-1",
                name: "Awka North Agricultural Society",
                address: "Enugu-Onitsha Expressway, Awka",
                memberCount: 198,
                executiveCommittee: {
                  chairman: "Chief Chukwuemeka Odumegwu",
                  secretary: "Mrs. Chinelo Okafor",
                  treasurer: "Mr. Ikenna Nwachukwu",
                },
                establishedYear: 2019,
                registrationNumber: "AN/COOP/2019/001",
                agents: [
                  {
                    id: "agent-an-001",
                    name: "Obiora Nnaji",
                    phone: "+234 811 567 8901",
                    email: "obiora@farmcred.ng",
                    address: "21 Zik Avenue, Awka",
                    cooperativeId: "anambra-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bauchi",
    name: "Bauchi State",
    capital: "Bauchi",
    area: "45,837",
    population: 6537390,
    zone: "North East",
    createdDate: "1976-02-03",
    coordinates: { latitude: 10.3158, longitude: 9.8442 },
    localGovernments: [
      {
        id: "bauchi",
        name: "Bauchi",
        coordinates: { latitude: 10.3158, longitude: 9.8442 },
        area: "3,687",
        population: 493810,
        wards: [
          {
            id: "bauchi-ward1",
            name: "Birshi Ward",
            cooperatives: [
              {
                id: "bauchi-coop-1",
                name: "Bauchi Central Farmers Cooperative",
                address: "Murtala Mohammed Way, Bauchi",
                memberCount: 445,
                executiveCommittee: {
                  chairman: "Alhaji Suleiman Adamu",
                  secretary: "Mallam Usman Garba",
                  treasurer: "Alhaji Yakubu Mohammed",
                },
                establishedYear: 2016,
                registrationNumber: "BC/COOP/2016/001",
                agents: [
                  {
                    id: "agent-bc-001",
                    name: "Haruna Aliyu",
                    phone: "+234 813 678 9012",
                    email: "haruna@farmcred.ng",
                    address: "45 Dass Road, Bauchi",
                    cooperativeId: "bauchi-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bayelsa",
    name: "Bayelsa State",
    capital: "Yenagoa",
    area: "10,773",
    population: 2277961,
    zone: "South South",
    createdDate: "1996-10-01",
    coordinates: { latitude: 4.9267, longitude: 6.2676 },
    localGovernments: [
      {
        id: "yenagoa",
        name: "Yenagoa",
        coordinates: { latitude: 4.9267, longitude: 6.2676 },
        area: "706",
        population: 352285,
        wards: [
          {
            id: "yenagoa-ward1",
            name: "Amarata Ward",
            cooperatives: [
              {
                id: "bayelsa-coop-1",
                name: "Yenagoa Aquaculture Cooperative",
                address: "Mbiama-Yenagoa Road, Yenagoa",
                memberCount: 156,
                executiveCommittee: {
                  chairman: "Chief Douye Diri",
                  secretary: "Mrs. Ebiere Jonathan",
                  treasurer: "Mr. Timipre Sylva",
                },
                establishedYear: 2021,
                registrationNumber: "BY/COOP/2021/001",
                agents: [
                  {
                    id: "agent-by-001",
                    name: "Preye Aganaba",
                    phone: "+234 815 789 0123",
                    email: "preye@farmcred.ng",
                    address: "12 Isaac Boro Expressway, Yenagoa",
                    cooperativeId: "bayelsa-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "benue",
    name: "Benue State",
    capital: "Makurdi",
    area: "34,059",
    population: 5741815,
    zone: "North Central",
    createdDate: "1976-02-03",
    coordinates: { latitude: 7.7319, longitude: 8.5211 },
    localGovernments: [
      {
        id: "makurdi",
        name: "Makurdi",
        coordinates: { latitude: 7.7319, longitude: 8.5211 },
        area: "804",
        population: 300377,
        wards: [
          {
            id: "makurdi-ward1",
            name: "Ankpa Ward",
            cooperatives: [
              {
                id: "benue-coop-1",
                name: "Makurdi Yam Farmers Association",
                address: "High Level, Makurdi",
                memberCount: 389,
                executiveCommittee: {
                  chairman: "Chief Samuel Ortom",
                  secretary: "Mrs. Rebecca Apedzan",
                  treasurer: "Mr. Terver Akase",
                },
                establishedYear: 2018,
                registrationNumber: "BN/COOP/2018/001",
                agents: [
                  {
                    id: "agent-bn-001",
                    name: "Terseer Ugbah",
                    phone: "+234 817 890 1234",
                    email: "terseer@farmcred.ng",
                    address: "34 Gboko Road, Makurdi",
                    cooperativeId: "benue-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "borno",
    name: "Borno State",
    capital: "Maiduguri",
    area: "70,898",
    population: 5860183,
    zone: "North East",
    createdDate: "1976-02-03",
    coordinates: { latitude: 11.8311, longitude: 13.1511 },
    localGovernments: [
      {
        id: "maiduguri",
        name: "Maiduguri Metropolitan Council",
        coordinates: { latitude: 11.8311, longitude: 13.1511 },
        area: "543",
        population: 1197497,
        wards: [
          {
            id: "maiduguri-ward1",
            name: "Bolori Ward",
            cooperatives: [
              {
                id: "borno-coop-1",
                name: "Maiduguri Resilience Farmers Cooperative",
                address: "Shehu Laminu Way, Maiduguri",
                memberCount: 278,
                executiveCommittee: {
                  chairman: "Alhaji Babagana Zulum",
                  secretary: "Mallam Kaka Shehu",
                  treasurer: "Alhaji Ali Modu",
                },
                establishedYear: 2020,
                registrationNumber: "BO/COOP/2020/001",
                agents: [
                  {
                    id: "agent-bo-001",
                    name: "Fatima Bukar",
                    phone: "+234 819 901 2345",
                    email: "fatima@farmcred.ng",
                    address: "67 Baga Road, Maiduguri",
                    cooperativeId: "borno-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cross-river",
    name: "Cross River State",
    capital: "Calabar",
    area: "20,156",
    population: 3737517,
    zone: "South South",
    createdDate: "1987-05-27",
    coordinates: { latitude: 4.9517, longitude: 8.3417 },
    localGovernments: [
      {
        id: "calabar-municipal",
        name: "Calabar Municipal",
        coordinates: { latitude: 4.9517, longitude: 8.3417 },
        area: "331",
        population: 375196,
        wards: [
          {
            id: "calabar-municipal-ward1",
            name: "Atimbo East Ward",
            cooperatives: [
              {
                id: "cross-river-coop-1",
                name: "Calabar Cocoa Farmers Cooperative",
                address: "Murtala Mohammed Highway, Calabar",
                memberCount: 223,
                executiveCommittee: {
                  chairman: "Chief Ben Ayade",
                  secretary: "Mrs. Linda Ayade",
                  treasurer: "Mr. Bassey Duke",
                },
                establishedYear: 2019,
                registrationNumber: "CR/COOP/2019/001",
                agents: [
                  {
                    id: "agent-cr-001",
                    name: "Edem Bassey",
                    phone: "+234 821 012 3456",
                    email: "edem@farmcred.ng",
                    address: "89 Calabar Road, Calabar",
                    cooperativeId: "cross-river-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "delta",
    name: "Delta State",
    capital: "Asaba",
    area: "17,698",
    population: 5663362,
    zone: "South South",
    createdDate: "1991-08-27",
    coordinates: { latitude: 6.2027, longitude: 6.7795 },
    localGovernments: [
      {
        id: "oshimili-south",
        name: "Oshimili South",
        coordinates: { latitude: 6.2027, longitude: 6.7795 },
        area: "884",
        population: 155405,
        wards: [
          {
            id: "oshimili-south-ward1",
            name: "Asaba Ward",
            cooperatives: [
              {
                id: "delta-coop-1",
                name: "Asaba Rice Farmers Association",
                address: "Nnebisi Road, Asaba",
                memberCount: 334,
                executiveCommittee: {
                  chairman: "Chief Ifeanyi Okowa",
                  secretary: "Mrs. Edith Okowa",
                  treasurer: "Mr. Kingsley Otuaro",
                },
                establishedYear: 2017,
                registrationNumber: "DT/COOP/2017/001",
                agents: [
                  {
                    id: "agent-dt-001",
                    name: "Chukwuma Soludo",
                    phone: "+234 823 123 4567",
                    email: "chukwuma@farmcred.ng",
                    address: "45 Summit Road, Asaba",
                    cooperativeId: "delta-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ebonyi",
    name: "Ebonyi State",
    capital: "Abakaliki",
    area: "5,670",
    population: 2880383,
    zone: "South East",
    createdDate: "1996-10-01",
    coordinates: { latitude: 6.325, longitude: 8.1137 },
    localGovernments: [
      {
        id: "abakaliki",
        name: "Abakaliki",
        coordinates: { latitude: 6.325, longitude: 8.1137 },
        area: "549.5",
        population: 149683,
        wards: [
          {
            id: "abakaliki-ward1",
            name: "Azugwu Ward",
            cooperatives: [
              {
                id: "ebonyi-coop-1",
                name: "Abakaliki Rice Mill Cooperative",
                address: "Enugu-Abakaliki Expressway, Abakaliki",
                memberCount: 412,
                executiveCommittee: {
                  chairman: "Chief David Umahi",
                  secretary: "Mrs. Rachel Umahi",
                  treasurer: "Mr. Kelechi Igwe",
                },
                establishedYear: 2018,
                registrationNumber: "EB/COOP/2018/001",
                agents: [
                  {
                    id: "agent-eb-001",
                    name: "Chinyere Ohaa",
                    phone: "+234 825 234 5678",
                    email: "chinyere@farmcred.ng",
                    address: "12 Ogoja Road, Abakaliki",
                    cooperativeId: "ebonyi-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "edo",
    name: "Edo State",
    capital: "Benin City",
    area: "17,802",
    population: 4235595,
    zone: "South South",
    createdDate: "1991-08-27",
    coordinates: { latitude: 6.335, longitude: 5.6037 },
    localGovernments: [
      {
        id: "oredo",
        name: "Oredo",
        coordinates: { latitude: 6.335, longitude: 5.6037 },
        area: "249",
        population: 375899,
        wards: [
          {
            id: "oredo-ward1",
            name: "Aduwawa Ward",
            cooperatives: [
              {
                id: "edo-coop-1",
                name: "Benin City Rubber Farmers Cooperative",
                address: "Ring Road, Benin City",
                memberCount: 289,
                executiveCommittee: {
                  chairman: "Chief Godwin Obaseki",
                  secretary: "Mrs. Betsy Obaseki",
                  treasurer: "Mr. Philip Shaibu",
                },
                establishedYear: 2019,
                registrationNumber: "ED/COOP/2019/001",
                agents: [
                  {
                    id: "agent-ed-001",
                    name: "Osaze Osagie",
                    phone: "+234 827 345 6789",
                    email: "osaze@farmcred.ng",
                    address: "78 Sapele Road, Benin City",
                    cooperativeId: "edo-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ekiti",
    name: "Ekiti State",
    capital: "Ado-Ekiti",
    area: "6,353",
    population: 3270798,
    zone: "South West",
    createdDate: "1996-10-01",
    coordinates: { latitude: 7.721, longitude: 5.3106 },
    localGovernments: [
      {
        id: "ado-ekiti",
        name: "Ado-Ekiti",
        coordinates: { latitude: 7.721, longitude: 5.3106 },
        area: "300.4",
        population: 313690,
        wards: [
          {
            id: "ado-ekiti-ward1",
            name: "Ajilosun Ward",
            cooperatives: [
              {
                id: "ekiti-coop-1",
                name: "Ado-Ekiti Cocoa Farmers Union",
                address: "Oba Adejugbe Avenue, Ado-Ekiti",
                memberCount: 267,
                executiveCommittee: {
                  chairman: "Chief Biodun Oyebanji",
                  secretary: "Mrs. Olayemi Oyebanji",
                  treasurer: "Mr. Monisade Afuye",
                },
                establishedYear: 2020,
                registrationNumber: "EK/COOP/2020/001",
                agents: [
                  {
                    id: "agent-ek-001",
                    name: "Adebayo Adeyemi",
                    phone: "+234 829 456 7890",
                    email: "adebayo@farmcred.ng",
                    address: "23 Ilawe Road, Ado-Ekiti",
                    cooperativeId: "ekiti-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "enugu",
    name: "Enugu State",
    capital: "Enugu",
    area: "7,161",
    population: 4411119,
    zone: "South East",
    createdDate: "1991-08-27",
    coordinates: { latitude: 6.5244, longitude: 7.5086 },
    localGovernments: [
      {
        id: "enugu-east",
        name: "Enugu East",
        coordinates: { latitude: 6.4598, longitude: 7.5428 },
        area: "383.5",
        population: 279089,
        wards: [
          {
            id: "enugu-east-ward1",
            name: "Abakpa Nike Ward",
            cooperatives: [
              {
                id: "enugu-coop-1",
                name: "Enugu Coal City Farmers Cooperative",
                address: "Ogui Road, Enugu",
                memberCount: 345,
                executiveCommittee: {
                  chairman: "Chief Peter Mbah",
                  secretary: "Mrs. Nkechinyere Mbah",
                  treasurer: "Mr. Ifeanyi Ugwuanyi",
                },
                establishedYear: 2018,
                registrationNumber: "EN/COOP/2018/001",
                agents: [
                  {
                    id: "agent-en-001",
                    name: "Chukwudi Nnamani",
                    phone: "+234 831 567 8901",
                    email: "chukwudi@farmcred.ng",
                    address: "56 Zik Avenue, Enugu",
                    cooperativeId: "enugu-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fct",
    name: "Federal Capital Territory",
    capital: "Abuja",
    area: "7,315",
    population: 3564126,
    zone: "North Central",
    createdDate: "1976-02-03",
    coordinates: { latitude: 9.0579, longitude: 7.4951 },
    localGovernments: [
      {
        id: "abuja-municipal",
        name: "Abuja Municipal Area Council",
        coordinates: { latitude: 9.0579, longitude: 7.4951 },
        area: "1,769",
        population: 776298,
        wards: [
          {
            id: "abuja-municipal-ward1",
            name: "Garki Ward",
            cooperatives: [
              {
                id: "fct-coop-1",
                name: "FCT Metropolitan Farmers Cooperative",
                address: "Central Business District, Abuja",
                memberCount: 123,
                executiveCommittee: {
                  chairman: "Hon. Nyesom Wike",
                  secretary: "Mrs. Judith Wike",
                  treasurer: "Mallam Nasir El-Rufai",
                },
                establishedYear: 2020,
                registrationNumber: "FCT/COOP/2020/001",
                agents: [
                  {
                    id: "agent-fct-001",
                    name: "Bala Mohammed",
                    phone: "+234 803 456 7890",
                    email: "bala@farmcred.ng",
                    address: "89 Shehu Shagari Way, Abuja",
                    cooperativeId: "fct-coop-1",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "gwagwalada",
        name: "Gwagwalada Area Council",
        coordinates: { latitude: 8.9428, longitude: 7.0839 },
        area: "1,043",
        population: 157770,
        wards: [
          {
            id: "gwagwalada-ward1",
            name: "Gwagwalada Central Ward",
            cooperatives: [
              {
                id: "fct-coop-2",
                name: "Gwagwalada Farmers Cooperative",
                address: "Gwagwalada Town, FCT",
                memberCount: 189,
                executiveCommittee: {
                  chairman: "Chief Adamu Aliero",
                  secretary: "Mrs. Zainab Aliero",
                  treasurer: "Alhaji Sani Danladi",
                },
                establishedYear: 2019,
                registrationNumber: "FCT/COOP/2019/002",
                agents: [
                  {
                    id: "agent-fct-002",
                    name: "Mohammed Bello",
                    phone: "+234 805 567 8901",
                    email: "mohammed@farmcred.ng",
                    address: "34 Gwagwalada Market, FCT",
                    cooperativeId: "fct-coop-2",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
