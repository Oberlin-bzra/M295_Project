export const teams = [
  { _id: "team_RB", name: "Red Bull Racing Honda RBPT", country: "Austria", drivers: ["driver_VER", "driver_PER"], teamPrincipal: "Christian Horner", championships: 6, constructorPoints: 589, constructorPlace: 3 },
  { _id: "team_MER", name: "Mercedes", country: "United Kingdom", drivers: ["driver_HAM", "driver_RUS"], teamPrincipal: "Toto Wolff", championships: 8, constructorPoints: 468, constructorPlace: 4 },
  { _id: "team_FER", name: "Ferrari", country: "Italy", drivers: ["driver_LEC", "driver_SAI"], teamPrincipal: "Frédéric Vasseur", championships: 16, constructorPoints: 652, constructorPlace: 2 },
  { _id: "team_MCL", name: "McLaren Mercedes", country: "United Kingdom", drivers: ["driver_NOR", "driver_PIA"], teamPrincipal: "Andrea Stella", championships: 9, constructorPoints: 666, constructorPlace: 1 },
  { _id: "team_AST", name: "Aston Martin Aramco Mercedes", country: "United Kingdom", drivers: ["driver_ALO", "driver_STR"], teamPrincipal: "Mike Krack", championships: 0, constructorPoints: 94, constructorPlace: 5 },
  { _id: "team_ALP", name: "Alpine Renault", country: "France", drivers: ["driver_OCO", "driver_GAS"], teamPrincipal: "Oliver Oakes", championships: 2, constructorPoints: 65, constructorPlace: 6 },
  { _id: "team_WIL", name: "Williams Mercedes", country: "United Kingdom", drivers: ["driver_ALB", "driver_SAR"], teamPrincipal: "James Vowles", championships: 9, constructorPoints: 17, constructorPlace: 9 },
  { _id: "team_HAA", name: "Haas Ferrari", country: "United States", drivers: ["driver_HUL", "driver_MAG"], teamPrincipal: "Ayao Komatsu", championships: 0, constructorPoints: 58, constructorPlace: 7 },
  { _id: "team_KSA", name: "Kick Sauber Ferrari", country: "Switzerland", drivers: ["driver_BOT", "driver_ZHO"], teamPrincipal: "Bruno Famin", championships: 0, constructorPoints: 4, constructorPlace: 10 },
  { _id: "team_RB2", name: "RB Honda RBPT", country: "Italy", drivers: ["driver_TSU", "driver_RIC"], teamPrincipal: "Laurent Mekies", championships: 0, constructorPoints: 46, constructorPlace: 8 },
]

export const drivers = [
  { _id: "driver_VER", name: "Max Verstappen", nationality: "Netherlands", age: 27, championships: 4, teamId: "team_RB", wins: 9, podiums: 14, driverPoints: 437, driverPlace: 1 },
  { _id: "driver_PER", name: "Sergio Pérez", nationality: "Mexico", age: 34, championships: 0, teamId: "team_RB", wins: 0, podiums: 4, driverPoints: 152, driverPlace: 8 },
  { _id: "driver_HAM", name: "Lewis Hamilton", nationality: "United Kingdom", age: 39, championships: 7, teamId: "team_MER", wins: 2, podiums: 5, driverPoints: 223, driverPlace: 7 },
  { _id: "driver_RUS", name: "George Russell", nationality: "United Kingdom", age: 26, championships: 0, teamId: "team_MER", wins: 2, podiums: 4, driverPoints: 245, driverPlace: 6 },
  { _id: "driver_LEC", name: "Charles Leclerc", nationality: "Monaco", age: 27, championships: 0, teamId: "team_FER", wins: 3, podiums: 13, driverPoints: 356, driverPlace: 3 },
  { _id: "driver_SAI", name: "Carlos Sainz", nationality: "Spain", age: 30, championships: 0, teamId: "team_FER", wins: 2, podiums: 9, driverPoints: 290, driverPlace: 5 },
  { _id: "driver_NOR", name: "Lando Norris", nationality: "United Kingdom", age: 25, championships: 0, teamId: "team_MCL", wins: 4, podiums: 13, driverPoints: 374, driverPlace: 2 },
  { _id: "driver_PIA", name: "Oscar Piastri", nationality: "Australia", age: 23, championships: 0, teamId: "team_MCL", wins: 2, podiums: 8, driverPoints: 292, driverPlace: 4 },
  { _id: "driver_ALO", name: "Fernando Alonso", nationality: "Spain", age: 43, championships: 2, teamId: "team_AST", wins: 0, podiums: 0, driverPoints: 70, driverPlace: 9 },
  { _id: "driver_STR", name: "Lance Stroll", nationality: "Canada", age: 26, championships: 0, teamId: "team_AST", wins: 0, podiums: 0, driverPoints: 24, driverPlace: 13 },
  { _id: "driver_OCO", name: "Esteban Ocon", nationality: "France", age: 29, championships: 0, teamId: "team_ALP", wins: 0, podiums: 1, driverPoints: 23, driverPlace: 14 },
  { _id: "driver_GAS", name: "Pierre Gasly", nationality: "France", age: 29, championships: 0, teamId: "team_ALP", wins: 0, podiums: 1, driverPoints: 42, driverPlace: 10 },
  { _id: "driver_ALB", name: "Alex Albon", nationality: "Thailand", age: 28, championships: 0, teamId: "team_WIL", wins: 0, podiums: 0, driverPoints: 12, driverPlace: 17 },
  { _id: "driver_SAR", name: "Logan Sargeant", nationality: "United States", age: 24, championships: 0, teamId: "team_WIL", wins: 0, podiums: 0, driverPoints: 0, driverPlace: 20 },
  { _id: "driver_HUL", name: "Nico Hülkenberg", nationality: "Germany", age: 37, championships: 0, teamId: "team_HAA", wins: 0, podiums: 0, driverPoints: 22, driverPlace: 15 },
  { _id: "driver_MAG", name: "Kevin Magnussen", nationality: "Denmark", age: 32, championships: 0, teamId: "team_HAA", wins: 0, podiums: 0, driverPoints: 8, driverPlace: 18 },
  { _id: "driver_BOT", name: "Valtteri Bottas", nationality: "Finland", age: 35, championships: 0, teamId: "team_KSA", wins: 0, podiums: 0, driverPoints: 0, driverPlace: 19 },
  { _id: "driver_ZHO", name: "Zhou Guanyu", nationality: "China", age: 26, championships: 0, teamId: "team_KSA", wins: 0, podiums: 0, driverPoints: 4, driverPlace: 18 },
  { _id: "driver_TSU", name: "Yuki Tsunoda", nationality: "Japan", age: 24, championships: 0, teamId: "team_RB2", wins: 0, podiums: 0, driverPoints: 30, driverPlace: 12 },
  { _id: "driver_RIC", name: "Daniel Ricciardo", nationality: "Australia", age: 35, championships: 0, teamId: "team_RB2", wins: 0, podiums: 0, driverPoints: 12, driverPlace: 16 },
]

export const vehicles = [
  { _id: "vehicle_RB", model: "RB20", engine: "Honda RBPT", teamId: "team_RB", driverIds: ["driver_VER", "driver_PER"], horsepower: 1050, year: 2024 },
  { _id: "vehicle_MER", model: "W15", engine: "Mercedes", teamId: "team_MER", driverIds: ["driver_HAM", "driver_RUS"], horsepower: 1030, year: 2024 },
  { _id: "vehicle_FER", model: "SF-24", engine: "Ferrari", teamId: "team_FER", driverIds: ["driver_LEC", "driver_SAI"], horsepower: 1040, year: 2024 },
  { _id: "vehicle_MCL", model: "MCL38", engine: "Mercedes", teamId: "team_MCL", driverIds: ["driver_NOR", "driver_PIA"], horsepower: 1020, year: 2024 },
  { _id: "vehicle_AST", model: "AMR24", engine: "Mercedes", teamId: "team_AST", driverIds: ["driver_ALO", "driver_STR"], horsepower: 1025, year: 2024 },
  { _id: "vehicle_ALP", model: "A524", engine: "Renault", teamId: "team_ALP", driverIds: ["driver_OCO", "driver_GAS"], horsepower: 1010, year: 2024 },
  { _id: "vehicle_WIL", model: "FW46", engine: "Mercedes", teamId: "team_WIL", driverIds: ["driver_ALB", "driver_SAR"], horsepower: 1005, year: 2024 },
  { _id: "vehicle_HAA", model: "VF-24", engine: "Ferrari", teamId: "team_HAA", driverIds: ["driver_HUL", "driver_MAG"], horsepower: 1000, year: 2024 },
  { _id: "vehicle_KSA", model: "C44", engine: "Ferrari", teamId: "team_KSA", driverIds: ["driver_BOT", "driver_ZHO"], horsepower: 1000, year: 2024 },
  { _id: "vehicle_RB2", model: "VCARB 01", engine: "Honda RBPT", teamId: "team_RB2", driverIds: ["driver_TSU", "driver_RIC"], horsepower: 1015, year: 2024 },
]

export function getDriverNames(driverIds: string[]): string[] {
  return driverIds.map(id => {
    const driver = drivers.find(d => d._id === id)
    return driver ? driver.name : id
  })
}

export function getTeamName(teamId: string): string {
  const team = teams.find(t => t._id === teamId)
  return team ? team.name : teamId
}