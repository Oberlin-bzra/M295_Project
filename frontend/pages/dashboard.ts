export const API_BASE = 'http://localhost:3000/api';

// Interfaces
export interface Team {
  _id: string;
  name: string;
  country: string;
  drivers: string[];
  teamPrincipal: string;
  championships: number;
  constructorPoints: number;
  constructorPlace: number;
}

export interface Driver {
  _id: string;
  name: string;
  nationality: string;
  age: number;
  championships: number;
  teamId: string;
  wins: number;
  podiums: number;
  driverPoints: number;
  driverPlace: number;
}

export interface Vehicle {
  _id: string;
  model: string;
  engine: string;
  teamId: string;
  driverId: string[];
  horsepower: number;
  year: number;
}

export interface GarageData {
  savedTeams: string[];
  savedDrivers: string[];
  savedVehicles: string[];
}

// Garage state
export let garageData: GarageData = {
  savedTeams: [],
  savedDrivers: [],
  savedVehicles: []
};

// Teams data
export const teams: Team[] = [
  { _id: "team_RB", name: "Red Bull Racing Honda RBPT", country: "Austria", drivers: ["driver_VER","driver_PER"], teamPrincipal: "Christian Horner", championships: 6, constructorPoints: 589, constructorPlace: 3 },
  { _id: "team_MER", name: "Mercedes", country: "United Kingdom", drivers: ["driver_HAM","driver_RUS"], teamPrincipal: "Toto Wolff", championships: 8, constructorPoints: 468, constructorPlace: 4 },
  { _id: "team_FER", name: "Ferrari", country: "Italy", drivers: ["driver_LEC","driver_SAI"], teamPrincipal: "Frédéric Vasseur", championships: 16, constructorPoints: 652, constructorPlace: 2 },
  { _id: "team_MCL", name: "McLaren Mercedes", country: "United Kingdom", drivers: ["driver_NOR","driver_PIA"], teamPrincipal: "Andrea Stella", championships: 9, constructorPoints: 666, constructorPlace: 1 },
  { _id: "team_AST", name: "Aston Martin Aramco Mercedes", country: "United Kingdom", drivers: ["driver_ALO","driver_STR"], teamPrincipal: "Mike Krack", championships: 0, constructorPoints: 94, constructorPlace: 5 },
  { _id: "team_ALP", name: "Alpine Renault", country: "France", drivers: ["driver_OCO","driver_GAS"], teamPrincipal: "Oliver Oakes", championships: 2, constructorPoints: 65, constructorPlace: 6 },
  { _id: "team_WIL", name: "Williams Mercedes", country: "United Kingdom", drivers: ["driver_ALB","driver_SAR"], teamPrincipal: "James Vowles", championships: 0, constructorPoints: 17, constructorPlace: 9 },
  { _id: "team_HAA", name: "Haas Ferrari", country: "United States", drivers: ["driver_HUL","driver_MAG"], teamPrincipal: "Ayao Komatsu", championships: 0, constructorPoints: 58, constructorPlace: 7 },
  { _id: "team_KSA", name: "Kick Sauber Ferrari", country: "Switzerland", drivers: ["driver_BOT","driver_ZHO"], teamPrincipal: "Bruno Famin", championships: 0, constructorPoints: 4, constructorPlace: 10 },
  { _id: "team_RB2", name: "RB Honda RBPT", country: "Italy", drivers: ["driver_TSU","driver_RIC"], teamPrincipal: "Laurent Mekies", championships: 0, constructorPoints: 46, constructorPlace: 8 }
];

// Drivers data
export const drivers: Driver[] = [
  { _id: "driver_VER", name: "Max Verstappen", nationality: "Netherlands", age: 27, championships: 4, teamId: "team_RB", wins: 9, podiums: 14, driverPoints: 437, driverPlace: 1 },
  { _id: "driver_PER", name: "Sergio Pérez", nationality: "Mexico", age: 34, championships: 0, teamId: "team_RB", wins: 0, podiums: 4, driverPoints: 152, driverPlace: 8 },
  { _id: "driver_HAM", name: "Lewis Hamilton", nationality: "United Kingdom", age: 39, championships: 7, teamId: "team_MER", wins: 2, podiums: 5, driverPoints: 223, driverPlace: 7 },
  { _id: "driver_RUS", name: "George Russell", nationality: "United Kingdom", age: 26, championships: 0, teamId: "team_MER", wins: 2, podiums: 4, driverPoints: 245, driverPlace: 6 },
  { _id: "driver_LEC", name: "Charles Leclerc", nationality: "Monaco", age: 27, championships: 0, teamId: "team_FER", wins: 3, podiums: 13, driverPoints: 356, driverPlace: 3 },
  { _id: "driver_SAI", name: "Carlos Sainz", nationality: "Spain", age: 30, championships: 0, teamId: "team_FER", wins: 2, podiums: 9, driverPoints: 290, driverPlace: 5 },
  { _id: "driver_NOR", name: "Lando Norris", nationality: "United Kingdom", age: 25, championships: 0, teamId: "team_MCL", wins: 4, podiums: 13, driverPoints: 374, driverPlace: 2 },
  { _id: "driver_PIA", name: "Oscar Piastri", nationality: "Australia", age: 23, championships: 0, teamId: "team_MCL", wins: 2, podiums: 5, driverPoints: 292, driverPlace: 4 },
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
  { _id: "driver_RIC", name: "Daniel Ricciardo", nationality: "Australia", age: 35, championships: 0, teamId: "team_RB2", wins: 0, podiums: 0, driverPoints: 12, driverPlace: 16 }
];

// Vehicles data
export const vehicles: Vehicle[] = [
  { _id: "vehicle_RB", model: "RB20", engine: "Honda RBPT", teamId: "team_RB", driverId: ["driver_VER","driver_PER"], horsepower: 1050, year: 2024 },
  { _id: "vehicle_MER", model: "W15", engine: "Mercedes", teamId: "team_MER", driverId: ["driver_HAM","driver_RUS"], horsepower: 1030, year: 2024 },
  { _id: "vehicle_FER", model: "SF-24", engine: "Ferrari", teamId: "team_FER", driverId: ["driver_LEC","driver_SAI"], horsepower: 1040, year: 2024 },
  { _id: "vehicle_MCL", model: "MCL38", engine: "Mercedes", teamId: "team_MCL", driverId: ["driver_NOR","driver_PIA"], horsepower: 1020, year: 2024 },
  { _id: "vehicle_AST", model: "AMR24", engine: "Mercedes", teamId: "team_AST", driverId: ["driver_ALO","driver_STR"], horsepower: 1025, year: 2024 },
  { _id: "vehicle_ALP", model: "A524", engine: "Renault", teamId: "team_ALP", driverId: ["driver_OCO","driver_GAS"], horsepower: 1010, year: 2024 },
  { _id: "vehicle_WIL", model: "FW46", engine: "Mercedes", teamId: "team_WIL", driverId: ["driver_ALB","driver_SAR"], horsepower: 1005, year: 2024 },
  { _id: "vehicle_HAA", model: "VF-24", engine: "Ferrari", teamId: "team_HAA", driverId: ["driver_HUL","driver_MAG"], horsepower: 1000, year: 2024 },
  { _id: "vehicle_KSA", model: "C44", engine: "Ferrari", teamId: "team_KSA", driverId: ["driver_BOT","driver_ZHO"], horsepower: 1000, year: 2024 },
  { _id: "vehicle_RB2", model: "VCARB 01", engine: "Honda RBPT", teamId: "team_RB2", driverId: ["driver_TSU","driver_RIC"], horsepower: 1015, year: 2024 }
];

// Load garage
export async function loadGarage() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/garage`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      garageData = await res.json();
      renderAllTables();
    }
  } catch (err) {
    console.error('Failed to load garage:', err);
  }
}

// Toggle saved item
export async function toggleGarageItem(type: 'team' | 'driver' | 'vehicle', id: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Bitte logge dich ein, um Favoriten zu speichern!');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/garage`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, id })
    });

    if (res.ok) {
      await loadGarage();
    } else {
      const data = await res.json();
      alert(data.message || 'Fehler beim Speichern');
    }
  } catch (err) {
    console.error('Failed to toggle garage item:', err);
    alert('Verbindung zum Server fehlgeschlagen');
  }
}

// Render table
export function renderTable(
  array: any[],
  tableId: string,
  keys: string[],
  type: 'team' | 'driver' | 'vehicle'
) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (!tbody) return;

  tbody.innerHTML = '';

  array.forEach(item => {
    const tr = document.createElement('tr');

    keys.forEach(key => {
      const td = document.createElement('td');
      let value = item[key];
      if (Array.isArray(value)) value = value.join(', ');
      if (value === undefined || value === null) value = '0';
      td.textContent = value;
      tr.appendChild(td);
    });

    const starTd = document.createElement('td');
    starTd.style.textAlign = 'center';
    starTd.style.cursor = 'pointer';
    starTd.style.fontSize = '1.5rem';

    let savedArray: string[] = [];
    if (type === 'team') savedArray = garageData.savedTeams;
    if (type === 'driver') savedArray = garageData.savedDrivers;
    if (type === 'vehicle') savedArray = garageData.savedVehicles;

    const isSaved = savedArray.includes(item._id);
    starTd.textContent = isSaved ? '⭐' : '☆';

    starTd.addEventListener('click', () => toggleGarageItem(type, item._id));

    tr.appendChild(starTd);
    tbody.appendChild(tr);
  });
}

// Add star header
export function addStarColumnHeader(tableId: string) {
  const thead = document.querySelector(`#${tableId} thead tr`);
  if (!thead) return;

  if (!thead.querySelector('.star-header')) {
    const th = document.createElement('th');
    th.textContent = '⭐';
    th.className = 'star-header';
    th.style.textAlign = 'center';
    th.style.width = '50px';
    thead.appendChild(th);
  }
}

// Render all
export function renderAllTables() {
  addStarColumnHeader('teams-table');
  addStarColumnHeader('drivers-table');
  addStarColumnHeader('vehicles-table');

  const driversWithTeam = drivers.map(d => {
    const team = teams.find(t => t._id === d.teamId);
    return { ...d, team: team?.name || 'Unknown' };
  });

  const vehiclesWithDrivers = vehicles.map(v => {
    const driverNames = v.driverId.map(id => {
      const driver = drivers.find(d => d._id === id);
      return driver?.name || 'Unknown';
    });
    const team = teams.find(t => t._id === v.teamId);
    return { ...v, drivers: driverNames, team: team?.name || 'Unknown' };
  });

  const teamsWithDrivers = teams.map(t => {
    const driverNames = t.drivers.map(id => {
      const driver = drivers.find(d => d._id === id);
      return driver?.name || 'Unknown';
    });
    return { ...t, drivers: driverNames };
  });

  renderTable(
    teamsWithDrivers,
    'teams-table',
    ['name', 'country', 'drivers', 'teamPrincipal', 'championships', 'constructorPoints', 'constructorPlace'],
    'team'
  );

  renderTable(
    driversWithTeam,
    'drivers-table',
    ['name', 'nationality', 'age', 'championships', 'team', 'wins', 'podiums', 'driverPoints', 'driverPlace'],
    'driver'
  );

  renderTable(
    vehiclesWithDrivers,
    'vehicles-table',
    ['model', 'engine', 'team', 'drivers', 'horsepower', 'year'],
    'vehicle'
  );
}

// Sortable tables
export function makeTableSortable(tableId: string) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const headers = table.querySelectorAll<HTMLTableCellElement>('th:not(.star-header)');
  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  headers.forEach(header => {
    const h = header as HTMLElement;

    h.style.cursor = 'pointer';
    h.style.userSelect = 'none';
    h.style.position = 'relative';

    if (!h.querySelector('.sort-arrow')) {
      h.innerHTML += ' <span class="sort-arrow">↕</span>';
    }

    h.addEventListener('click', () => {
      const rows = Array.from(tbody.querySelectorAll('tr'));

      const index = Array.from(header.parentElement!.children).indexOf(header);
      const numeric = !isNaN(parseFloat(rows[0].children[index].textContent?.trim() || ''));

      const asc = h.dataset.asc !== 'true';
      h.dataset.asc = asc ? 'true' : 'false';

      table.querySelectorAll('.sort-arrow').forEach(a => (a.textContent = '↕'));
      const arrow = h.querySelector('.sort-arrow');
      if (arrow) arrow.textContent = asc ? '▲' : '▼';

      rows.sort((a, b) => {
        const A = a.children[index].textContent?.trim() || '';
        const B = b.children[index].textContent?.trim() || '';

        if (numeric) {
          return asc ? Number(A) - Number(B) : Number(B) - Number(A);
        }
        return asc ? A.localeCompare(B) : B.localeCompare(A);
      });

      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
  await loadGarage();
  makeTableSortable('teams-table');
  makeTableSortable('drivers-table');
  makeTableSortable('vehicles-table');
});
