const API_BASE = 'http://localhost:3000/api';

interface Team {
  _id: string;
  name: string;
  country: string;
  drivers: string[];
  teamPrincipal: string;
  championships: number;
  constructorPoints: number;
  constructorPlace: number;
}

interface Driver {
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

interface Vehicle {
  _id: string;
  model: string;
  engine: string;
  teamId: string;
  driverId: string[];
  horsepower: number;
  year: number;
}

// Alle Daten (gleich wie in dashboard.ts)
const teams: Team[] = [
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

const drivers: Driver[] = [
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

const vehicles: Vehicle[] = [
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

async function loadGarage() {
  const token = localStorage.getItem('token');
  if (!token) {
    document.getElementById('garage-content')!.innerHTML = 
      '<div class="login-warning"><h2>⚠️ Bitte einloggen</h2><p>Um deine Garage zu sehen, musst du eingeloggt sein.</p><a href="/pages/login.html" class="btn btn-primary">Zum Login</a></div>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/garage`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) {
      throw new Error('Failed to load garage');
    }
    
    const data = await res.json();
    displayGarage(data);
  } catch (err) {
    console.error('Error loading garage:', err);
    document.getElementById('garage-content')!.innerHTML = 
      '<div class="error-message"><h2>❌ Fehler</h2><p>Garage konnte nicht geladen werden.</p></div>';
  }
}

function displayGarage(garageData: { savedTeams: string[], savedDrivers: string[], savedVehicles: string[] }) {
  const container = document.getElementById('garage-content')!;
  
  let html = '<div class="garage-container"><h1>🏎️ Meine Garage</h1>';
  
  // Team
  html += '<section class="garage-section"><h2>Team</h2>';
  if (garageData.savedTeams.length === 0) {
    html += '<p class="empty-message">Noch kein Team gespeichert. Gehe zum Dashboard und klicke auf einen Stern!</p>';
  } else {
    const team = teams.find(t => t._id === garageData.savedTeams[0]);
    if (team) {
      const driverNames = team.drivers.map(id => {
        const driver = drivers.find(d => d._id === id);
        return driver?.name || 'Unknown';
      }).join(', ');
      
      html += `
        <div class="garage-card">
          <h3>${team.name}</h3>
          <p><strong>Land:</strong> ${team.country}</p>
          <p><strong>Team Principal:</strong> ${team.teamPrincipal}</p>
          <p><strong>Fahrer:</strong> ${driverNames}</p>
          <p><strong>Championships:</strong> ${team.championships}</p>
          <p><strong>Punkte:</strong> ${team.constructorPoints} (Platz ${team.constructorPlace})</p>
        </div>
      `;
    }
  }
  html += '</section>';
  
  // Fahrer
  html += '<section class="garage-section"><h2>Fahrer</h2>';
  if (garageData.savedDrivers.length === 0) {
    html += '<p class="empty-message">Noch keine Fahrer gespeichert (max. 2). Gehe zum Dashboard!</p>';
  } else {
    html += '<div class="garage-cards">';
    garageData.savedDrivers.forEach(driverId => {
      const driver = drivers.find(d => d._id === driverId);
      if (driver) {
        const team = teams.find(t => t._id === driver.teamId);
        html += `
          <div class="garage-card">
            <h3>${driver.name}</h3>
            <p><strong>Nationalität:</strong> ${driver.nationality}</p>
            <p><strong>Alter:</strong> ${driver.age}</p>
            <p><strong>Team:</strong> ${team?.name || 'Unknown'}</p>
            <p><strong>Championships:</strong> ${driver.championships}</p>
            <p><strong>Siege:</strong> ${driver.wins} | <strong>Podiums:</strong> ${driver.podiums}</p>
            <p><strong>Punkte:</strong> ${driver.driverPoints} (Platz ${driver.driverPlace})</p>
          </div>
        `;
      }
    });
    html += '</div>';
  }
  html += '</section>';
  
  // Fahrzeug
  html += '<section class="garage-section"><h2>Fahrzeug</h2>';
  if (garageData.savedVehicles.length === 0) {
    html += '<p class="empty-message">Noch kein Fahrzeug gespeichert. Gehe zum Dashboard!</p>';
  } else {
    const vehicle = vehicles.find(v => v._id === garageData.savedVehicles[0]);
    if (vehicle) {
      const team = teams.find(t => t._id === vehicle.teamId);
      const driverNames = vehicle.driverId.map(id => {
        const driver = drivers.find(d => d._id === id);
        return driver?.name || 'Unknown';
      }).join(', ');
      
      html += `
        <div class="garage-card">
          <h3>${vehicle.model}</h3>
          <p><strong>Motor:</strong> ${vehicle.engine}</p>
          <p><strong>Team:</strong> ${team?.name || 'Unknown'}</p>
          <p><strong>Fahrer:</strong> ${driverNames}</p>
          <p><strong>PS:</strong> ${vehicle.horsepower}</p>
          <p><strong>Jahr:</strong> ${vehicle.year}</p>
        </div>
      `;
    }
  }
  html += '</section>';
  
  html += '</div>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  loadGarage();
});