import { locationUtils, type State, type LocalGovernment, nigeriaStates } from "@/data/nigeriaData"

export const locationHelpers = {
  ...locationUtils,

  // Format location display string
  formatLocation: (state: State, lga?: LocalGovernment): string => {
    if (lga) {
      return `${lga.name}, ${state.name}`
    }
    return `${state.name} (${state.capital})`
  },

  // Get location breadcrumb
  getLocationBreadcrumb: (state: State, lga?: LocalGovernment): string[] => {
    const breadcrumb = [state.name]
    if (lga) {
      breadcrumb.push(lga.name)
    }
    return breadcrumb
  },

  // Validate Nigerian phone number
  validateNigerianPhone: (phone: string): boolean => {
    const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/
    return phoneRegex.test(phone.replace(/\s+/g, ""))
  },

  // Format Nigerian phone number
  formatNigerianPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "")

    if (cleaned.startsWith("234")) {
      return `+${cleaned}`
    } else if (cleaned.startsWith("0")) {
      return `+234${cleaned.slice(1)}`
    } else if (cleaned.length === 10) {
      return `+234${cleaned}`
    }

    return phone
  },

  // Get nearest states by coordinates
  getNearestStates: (latitude: number, longitude: number, limit = 5): Array<{ state: State; distance: number }> => {
    const statesWithDistance = nigeriaStates
      .filter((state) => state.coordinates)
      .map((state) => ({
        state,
        distance: locationUtils.calculateDistance(
          latitude,
          longitude,
          state.coordinates!.latitude,
          state.coordinates!.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)

    return statesWithDistance
  },

  // Get states by population range
  getStatesByPopulation: (minPopulation: number, maxPopulation?: number): State[] => {
    return nigeriaStates.filter((state) => {
      if (maxPopulation) {
        return state.population >= minPopulation && state.population <= maxPopulation
      }
      return state.population >= minPopulation
    })
  },

  // Get states by area range
  getStatesByArea: (minArea: number, maxArea?: number): State[] => {
    return nigeriaStates.filter((state) => {
      const area = Number.parseFloat(state.area.replace(/,/g, ""))
      if (maxArea) {
        return area >= minArea && area <= maxArea
      }
      return area >= minArea
    })
  },

  // Generate location-based registration number
  generateRegistrationNumber: (state: State, lga?: LocalGovernment, year?: number): string => {
    const stateCode = state.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    const lgaCode = lga
      ? lga.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
      : ""
    const currentYear = year || new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")

    return `${stateCode}${lgaCode ? "/" + lgaCode : ""}/COOP/${currentYear}/${randomNum}`
  },

  // Get location statistics
  getLocationStats: (state?: State, lga?: LocalGovernment) => {
    if (lga && state) {
      const totalWards = lga.wards.length
      const totalCooperatives = lga.wards.reduce((sum, ward) => sum + ward.cooperatives.length, 0)
      const totalMembers = lga.wards.reduce(
        (sum, ward) => sum + ward.cooperatives.reduce((coopSum, coop) => coopSum + coop.memberCount, 0),
        0,
      )

      return {
        wards: totalWards,
        cooperatives: totalCooperatives,
        members: totalMembers,
        avgMembersPerCoop: totalCooperatives > 0 ? Math.round(totalMembers / totalCooperatives) : 0,
      }
    }

    if (state) {
      const totalLGAs = state.localGovernments.length
      const totalWards = state.localGovernments.reduce((sum, lga) => sum + lga.wards.length, 0)
      const totalCooperatives = state.localGovernments.reduce(
        (sum, lga) => sum + lga.wards.reduce((wardSum, ward) => wardSum + ward.cooperatives.length, 0),
        0,
      )

      return {
        lgas: totalLGAs,
        wards: totalWards,
        cooperatives: totalCooperatives,
        avgCoopsPerLGA: totalLGAs > 0 ? Math.round(totalCooperatives / totalLGAs) : 0,
      }
    }

    return locationUtils.getTotalStats()
  },
}

export default locationHelpers
