const ApiKey = '7a9a7c2883df420fb37e66aebb01af67';
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2002";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const scorersEndPoin = `${baseUrl}competitions/${leagueId}/scorers`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
  headers: {
    'X-Auth-Token': ApiKey
  }
};

function getListTeams() {
  title.innerHTML = "Daftar Tim Bundesliga Jerman"
  fetch(teamEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson.teams);
      let teams = "";
      resJson.teams.forEach(team => {
        teams += `<li class="collection-item avatar">
            <img src="${team.crestUrl}" alt="" class="circle">
            <span class="title">${team.name}</span>
            <p>Berdiri: ${team.founded} <br>
              Markas: ${team.venue}
            </p>
            <a href="#" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
        </li>`
      })
      contents.innerHTML = '<ul class="collection">' + teams + '</ul>'
      const detil = document.querySelectorAll('.secondary-content');
      detil.forEach(btn => {
        btn.onclick = (event) => {
          showTeamInfo(event.target.dataset.id);
        }
      })
    }).catch(err => {
      console.error(err);
    })
}

function showTeamInfo(id) {
  title.innerHTML = "Informasi Tim"
  let url = baseUrl + `teams/${id}`;
  fetch(url, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson.id);
      contents.innerHTML = `
      <div class="card">
              <table class="stripped responsive-table">
                  <tr>
                  <td style="padding-left:20px;"><h4>${resJson.name}</h4><img src="${resJson.crestUrl}"></td>
                  <td>
                  <p>
                      Nama Singkat  : ${resJson.shortName}<br>
                      Id            : ${resJson.id} <br>   
                      Tahun Berdiri : ${resJson.founded} <br>
                      Markas        : ${resJson.venue} <br>
                      Alamat        : ${resJson.address} <br>
                      Warna Klub    : ${resJson.clubColors}<br>
                      Website       : ${resJson.website}<br>
                      E-mail        : ${resJson.email}
                  </p>
                  </td>
              </tr>
              </table>
          </div>
      `;
    }).catch(err => {
      console.error(err);
    })
}

function getListStandings() {
  title.innerHTML = "Klasemen Bundesliga Jerman"
  fetch(standingEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson.standings);
      let teams = "";
      let i = 1;
      resJson.standings[0].table.forEach(team => {
        teams += `
          <tr>
              <td style="padding-left:20px;">${i}.</td>
              <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
              <td>${team.team.name}</td>
              <td>${team.playedGames}</td>
              <td>${team.won}</td>
              <td>${team.draw}</td>
              <td>${team.lost}</td>
              <td>${team.points}</td>
          </tr>
          `;
        i++;

      });
      contents.innerHTML = `
          <div class="card">
              <table class="stripped responsive-table">
                  <thead>
                      <th></th>
                      <th></th>
                      <th>Nama Tim</th>
                      <th>PG</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>P</th>
                  </thead>
                  <tbody>
                      ${teams}
                  </tbody>
              </table>
          </div>
      `;
    }).catch(err => {
      console.error(err);
    })
}

function getListMatches() {
  title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
  fetch(matchEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson.matches);
      let matchs = "";
      let i = 1;
      resJson.matches.forEach(match => {
        let d = new Date(match.utcDate).toLocaleDateString("id");
        let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
        let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
        matchs += `
              <tr>
                  <td style="padding-left:20px;">${i}.</td>
                  <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                  <td>${d}</td>
                  <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
              </tr>
              `;
        i++;

      });
      contents.innerHTML = `
              <div class="card">
                  <table class="stripped responsive-table">
                      <thead>
                          <th></th>
                          <th>Pertandingan</th>
                          <th>Tanggal</th>
                          <th>Skor Akhir</th>
                      </thead>
                      <tbody>
                          ${matchs}
                      </tbody>
                  </table>
              </div>
          `;
    }).catch(err => {
      console.error(err);
    })
}

function getListScorers() {
  title.innerHTML = "Pemain Pencetak Gol Terbanyak";
  fetch(scorersEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson.scorers);
      let players = "";
      let i = 1;
      resJson.scorers.forEach(player => {
        players += `
              <tr>
                  <td style="padding-left:20px;">${i}.</td>
                  <td>${player.player.name}</td>
                  <td>${player.team.name}</td>
                  <td>${player.numberOfGoals}</td>
              </tr>
              `;
        i++;

      });
      contents.innerHTML = `
              <div class="card">
                  <table class="stripped responsive-table">
                      <thead>
                          <th></th>
                          <th>Pemain</th>
                          <th>Tim</th>
                          <th>Total Gol</th>
                      </thead>
                      <tbody>
                          ${players}
                      </tbody>
                  </table>
              </div>
          `;
    }).catch(err => {
      console.error(err);
    })
}

function loadPage(page) {
  switch (page) {
    case "teams":
      getListTeams();
      break;
    case "matches":
      getListMatches();
      break;
    case "standings":
      getListStandings();
      break;
    case "scorers":
      getListScorers();
      break;
  }

}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

  document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
    elm.addEventListener("click", evt => {
      let sidenav = document.querySelector(".sidenav");
      M.Sidenav.getInstance(sidenav).close();
      page = evt.target.getAttribute("href").substr(1);
      loadPage(page);
    })
  })
  var page = window.location.hash.substr(1);
  if (page === "" || page === "!" || page === "ind") page === "teams";
  loadPage(page);
});