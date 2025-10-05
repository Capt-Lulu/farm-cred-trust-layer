"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { nigeriaStates, locationUtils, type State, type LocalGovernment } from "../data/nigeriaData"
import { Search, MapPin, Building2, X } from "lucide-react"

interface LocationSelectorProps {
  onLocationSelect?: (location: {
    state: State
    lga?: LocalGovernment
  }) => void
  showSearch?: boolean
  showZoneFilter?: boolean
  showStats?: boolean
  className?: string
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelect,
  showSearch = true,
  showZoneFilter = true,
  showStats = true,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedZone, setSelectedZone] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<State | null>(null)

  const zones = ["North Central", "North East", "North West", "South East", "South South", "South West"]

  const filteredStates = useMemo(() => {
    let states = nigeriaStates

    // Filter by zone
    if (selectedZone !== "all") {
      states = locationUtils.getStatesByZone(selectedZone as State["zone"])
    }

    // Filter by search query
    if (searchQuery.trim()) {
      states = locationUtils.searchStates(searchQuery)
    }

    return states
  }, [searchQuery, selectedZone])

  const stats = useMemo(() => locationUtils.getTotalStats(), [])

  const handleStateSelect = (state: State) => {
    setSelectedState(state)
    onLocationSelect?.({ state })
  }

  const handleLGASelect = (lga: LocalGovernment) => {
    if (selectedState) {
      onLocationSelect?.({ state: selectedState, lga })
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedZone("all")
    setSelectedState(null)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {showSearch && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search states or capitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {showZoneFilter && (
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {(searchQuery || selectedZone !== "all") && (
          <Button variant="outline" onClick={clearFilters} size="sm">
            <X size={16} className="mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Statistics */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.states}</div>
            <div className="text-sm text-muted-foreground">States + FCT</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.lgas}</div>
            <div className="text-sm text-muted-foreground">LGAs</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.wards}</div>
            <div className="text-sm text-muted-foreground">Wards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.cooperatives}</div>
            <div className="text-sm text-muted-foreground">Cooperatives</div>
          </Card>
        </div>
      )}

      {/* States Grid */}
      {!selectedState && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {selectedZone === "all" ? "All Nigerian States" : `${selectedZone} States`}
            </h3>
            <Badge variant="outline">
              {filteredStates.length} state{filteredStates.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStates.map((state) => (
              <Card
                key={state.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleStateSelect(state)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="text-primary" size={20} />
                    <div>
                      <h4 className="font-medium">{state.name}</h4>
                      <p className="text-sm text-muted-foreground">Capital: {state.capital}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {state.zone}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {state.localGovernments.length} LGAs
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>Area: {state.area} km²</div>
                    <div>Pop: {(state.population / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* LGAs Grid */}
      {selectedState && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedState(null)}>
              ← Back to States
            </Button>
            <span className="text-muted-foreground">|</span>
            <h3 className="text-lg font-semibold">{selectedState.name} - Local Government Areas</h3>
            <Badge variant="outline">{selectedState.localGovernments.length} LGAs</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedState.localGovernments.map((lga) => (
              <Card
                key={lga.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleLGASelect(lga)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary" size={20} />
                    <div>
                      <h4 className="font-medium">{lga.name}</h4>
                      <p className="text-sm text-muted-foreground">{lga.wards.length} Wards</p>
                      {lga.area && <p className="text-xs text-muted-foreground">Area: {lga.area} km²</p>}
                    </div>
                  </div>
                  {lga.population && (
                    <div className="text-right text-xs text-muted-foreground">
                      <div>Pop: {(lga.population / 1000).toFixed(0)}K</div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}