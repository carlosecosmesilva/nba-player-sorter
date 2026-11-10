import { leaguePlayers, teams } from "../data/2026-27.js";
import { createSorter } from "./sorter.js";

const $ = (selector) => document.querySelector(selector);
const teamGrid = $("#teamGrid");
let currentTeam;
let currentSorter;

function logoUrl(short) {
  return `https://a.espncdn.com/i/teamlogos/nba/500/${short.toLowerCase()}.png`;
}

function renderTeams(filter = "") {
  const normalizedFilter = filter.toLowerCase();
  const visibleTeams = teams.filter((team) => team.name.toLowerCase().includes(normalizedFilter) || team.short.toLowerCase().includes(normalizedFilter));

  $("#teamCount").textContent = `${visibleTeams.length} equipes`;
  $("#emptyState").hidden = visibleTeams.length > 0;
  teamGrid.innerHTML = visibleTeams.map((team) => `
    <button class="team-card" style="background: linear-gradient(110deg, ${team.color} 0%, ${team.color} 72%, ${team.accent} 72%)" data-team="${team.short}">
      <span class="team-badge"><img src="${logoUrl(team.short)}" alt="${team.name}" /></span>
      <span class="team-info"><span class="team-name">${team.name}</span><span class="team-meta">${team.players.length} jogadores · 2026/27</span></span>
    </button>
  `).join("");
  teamGrid.querySelectorAll("[data-team]").forEach((card) => card.addEventListener("click", () => startSorter(card.dataset.team)));
}

function selectTeam(short) {
  if (short === "LEAGUE" || short === "NBA") {
    return { name: "Liga NBA", short: "NBA", color: "#172235", accent: "#bd554b", logo: "https://a.espncdn.com/i/teamlogos/leagues/500/nba.png", players: leaguePlayers };
  }
  const team = teams.find((item) => item.short === short);
  return { ...team, logo: logoUrl(team.short) };
}

function startSorter(short) {
  currentTeam = selectTeam(short);
  currentSorter = createSorter(currentTeam.players);
  $("#pickerView").hidden = true;
  $("#sorterView").hidden = false;
  $("#selectedTeamBadge").innerHTML = `<img src="${currentTeam.logo}" alt="${currentTeam.name}" />`;
  $("#selectedTeamBadge").style.background = currentTeam.color;
  $("#selectedTeamName").textContent = currentTeam.name;
  $("#comparisonView").hidden = false;
  $("#resultsView").hidden = true;
  renderComparison();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderComparison() {
  if (currentSorter.isComplete) {
    return showResults();
  }

  const pair = currentSorter.currentPair;
  $("#progressText").textContent = currentSorter.remainingComparisons;
  $("#progressBar").style.width = `${currentSorter.progressPercent}%`;
  $("#playerPair").innerHTML = pair.map((player, index) => `
    <button class="player-card" data-player-index="${index}">
      <span class="player-number">${String(index + 1).padStart(2, "0")}</span>
      <strong class="player-name">${player[0]}</strong>
      <span class="player-position">${player[1]} · escolher jogador</span>
    </button>
  `).join("");
  $("#playerPair").querySelectorAll("[data-player-index]").forEach((button) => button.addEventListener("click", () => {
    currentSorter.choose(Number(button.dataset.playerIndex));
    renderComparison();
  }));
}

function showResults() {
  $("#comparisonView").hidden = true;
  $("#resultsView").hidden = false;
  $("#progressText").textContent = 0;
  $("#progressBar").style.width = "100%";
  $("#rankingList").innerHTML = currentSorter.ranking().map((player) => {
    const score = currentSorter.scoreFor(player);
    return `<li class="ranking-item"><strong>${player[0]}</strong><small>${score} ${score === 1 ? "escolha" : "escolhas"}</small></li>`;
  }).join("");
}

function bindEvents() {
  $("#search").addEventListener("input", (event) => renderTeams(event.target.value));
  $("#leagueButton").addEventListener("click", () => startSorter("LEAGUE"));
  $("#randomTeam").addEventListener("click", () => startSorter(teams[Math.floor(Math.random() * teams.length)].short));
  $("#skipButton").addEventListener("click", () => {
    currentSorter.skip();
    renderComparison();
  });
  $("#backButton").addEventListener("click", () => {
    $("#sorterView").hidden = true;
    $("#pickerView").hidden = false;
  });
  $("#restartButton").addEventListener("click", () => startSorter(currentTeam.short));
}

export function initializeApp() {
  bindEvents();
  renderTeams();
}
