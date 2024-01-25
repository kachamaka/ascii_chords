const guitarMapping = ["e","a","d","g","b","f"];
const chordIdentifier = "seq_chord";
const chordNameIdentifier = "seq_chord_name";
const userIDIdentifier = "user_id";
const DEFAULT_INTERVAL = 1000;
const host = "http://localhost";
var path = host;

var isLogged = sessionStorage.userID === undefined ? false : true;

function getConfig() {
    console.log("GET");
    let loc = window.location.href.split("/");
    let relativePath = "";
    if (!(loc[loc.length - 1] == "" || loc[loc.length - 1].includes("index.html")) && loc[loc.length - 1].includes(".html")) {
        relativePath = "../";        
    }    
    console.log(loc, relativePath);
    return fetch(relativePath + 'config/config.json')
    .then(response => response.json())
    .then(data => {
        path += data.pathPrefix;
        console.log(path);
    })
    .catch(error => console.error('Error reading JSON file:', error));
}

function loadView() {
    let loc = window.location.href.split("/");
    let file = loc[loc.length-1];
    fetch(path + '/api/auth/isLogged.php', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        console.log(data, file, isLogged);
        if (data.success) {
            sessionStorage.setItem("userID", data.userID);
            isLogged = true;
        }
        
        if (isLogged) {
            if (file.includes("login.html") || file.includes("register")) {
                window.location.href = path;
            }
        } else {
            if (file.includes("profile.html") || file.includes("favourites.html")) {
                // showToast({"success":false, "message":"User not logged in"});
                // setTimeout(() => {
                window.location.href = path + "/src/login.html";
                // }, 1000);
            }
        }
    
        document.getElementById("login").style.display = isLogged ? "none" : "inline";
        document.getElementById("register").style.display = isLogged ? "none" : "inline";
        document.getElementById("profile").style.display = !isLogged ? "none" : "inline";
        document.getElementById("logout").style.display = !isLogged ? "none" : "inline";
        document.getElementById("chordsEditor").style.display = "inline";
        document.getElementById("favourites").style.display = !isLogged ? "none" : "inline";
    })
    .catch(error => {
        showError();
        console.log('Error:', error);
    });
}
document.addEventListener("DOMContentLoaded", async () => {
    getConfig().then(() => {
        loadView();
    });
});

function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "inline";
}

function logout() {
    fetch(path + '/api/auth/logout.php', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
        if (data.success) {
            sessionStorage.clear();
            isLogged = false;
            setTimeout(() => {
                loadView();
                // document.location.href = path;
            }, 1000);
        }
    })
    .catch(error => {
        showError();
        console.log('Error:', error);
    });
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let loginData = {
        "username": username,
        "password": password
    }

    fetch(path + '/api/auth/login.php', {
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
        if (data.success) {
            sessionStorage.setItem("userID", data.userID);
            setTimeout(() => {
                loadView();
                // document.location.href = path;
            }, 1000);
        }
    })
    .catch(error => {
        showError();
        console.log('Error:', error);
    });
}

function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let registerData = {
        "username": username,
        "email": email,
        "password": password
    }

    fetch(path + '/api/auth/register.php', {
        method: 'POST',
        body: JSON.stringify(registerData)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
        if (data.success) {
            sessionStorage.setItem("userID", data.userID);
            setTimeout(() => {
                loadView();
                // document.location.href = path;
            }, 1000);
        }
    })
    .catch(error => {
        showError();
        console.log('Error:', error);
    });
}

function playSound(name) {
    let audio = new Audio("../assets/media/guitar/" + name + ".mp3");
    audio.play();
}

function createChordCard(name, chord, del, isFavourite) {
    let card = document.createElement('div');
    card.className = 'card';

    let nameElement = document.createElement('h2');
    nameElement.textContent = name;

    let playElement = document.createElement('p');
    playElement.textContent = chord;

    let addBtn = document.createElement('button');
    addBtn.className = 'btn';
    addBtn.textContent = 'Add';
    addBtn.onclick = function() {
        addChordToSequence(name, chord);
    }

    let playBtn = document.createElement('button');
    playBtn.className = 'btn';
    playBtn.textContent = 'Play';
    playBtn.onclick = function() {
        playGuitarChord(chord);
    }
    
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        console.log(chord);
        let req = {
            "chord_name": name,
        }
        fetch(path + '/api/chords/deleteUserChord.php', {
            'method': 'POST',
            'body': JSON.stringify(req),
        })
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(data => {
            showToast(data);
            if (data.success) {
                deleteChord(card);
            }
        })
        .catch(error => {
            console.log('Error', error);
        })
    }
    
    let favBtn = document.createElement('button');
    favBtn.className = 'btn';
    favBtn.textContent = 'Fav';
    favBtn.onclick = function() {
        addFavouriteChord(name);
    }
    
    let removeBtn = document.createElement('button');
    removeBtn.className = 'btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
        removeFavourite(name);
        deleteChord(card);
    }
    
    let shareBtn = document.createElement('button');
    shareBtn.className = 'btn';
    shareBtn.textContent = 'Share';
    shareBtn.onclick = function() {
        shareChord(name, chord);
    }

    card.appendChild(nameElement);
    card.appendChild(playElement);

    
    if (isFavourite) {
        card.appendChild(removeBtn);
    } else {
        card.appendChild(addBtn);
        card.appendChild(playBtn);
        card.appendChild(favBtn);
        card.appendChild(shareBtn);
        if (del == true) {
            card.appendChild(deleteBtn);
        }
    }
    

    document.getElementById('cardContainer').appendChild(card);
}

function shareChord(name, chord) {
    let url = new URL(window.location.href);
    console.log(name,chord);
  
    url.searchParams.set('name', name);
    url.searchParams.set('chord', chord);
  
    window.open(url.toString(), '_blank');
}

function removeFavourite(name) {
    let req = {
        "chord_name": name,
    }
    fetch(path + '/api/chords/deleteFavouriteChord.php', {
        'method': 'POST',
        'body': JSON.stringify(req),
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
    })
    .catch(error => {
        console.log('Error', error);
    })
}

function addFavouriteChord(name) {
    let req = {
        "chord_name": name,
    }

    fetch(path + '/api/chords/addFavouriteChord.php', {
        'method': 'POST',
        'body': JSON.stringify(req),
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        console.log(data);
        showToast(data);
    })
    .catch(error => {
        console.log('Error', error);
    })
}

function deleteChord(card) {
    document.getElementById('cardContainer').removeChild(card);
}

function addChordToSequence(name, chord, interval) {
    if (name == null || chord == null || name == "" || chord == "") return;
    // console.log(name, chord);
    let chordCard = document.createElement('div');
    chordCard.className = 'chordCard';
    // chordCard.onclick = function() {
    //     document.getElementById('sequenceContainer').removeChild(chordCard);
    // }
    
    let nameElement = document.createElement('h2');
    nameElement.innerText = name;

    let playElement = document.createElement('p');
    playElement.innerText = chord;

    let removeButton = document.createElement('span');
    removeButton.className = 'removeButton';
    removeButton.innerText = 'X';
    removeButton.onclick = function() {
        document.getElementById('sequenceContainer').removeChild(chordCard);
    };

    let chordInterval = document.createElement('input');
    chordInterval.setAttribute("class", "interval");
    chordInterval.setAttribute("placeholder", "interval");
    chordInterval.setAttribute("type", "number");
    if (interval && interval != DEFAULT_INTERVAL) {
        chordInterval.value = interval;
    }
    // chordInterval.setAttribute("name", "interval");
    // chordInterval.setAttribute("id", "interval");
    // chordInterval.innerText = chord;
    // <input class="interval" placeholder="interval" type="number" name="interval" id="interval">

    chordCard.appendChild(nameElement);
    chordCard.appendChild(playElement);
    chordCard.appendChild(removeButton);
    chordCard.appendChild(chordInterval);
    // chordCard.textContent = name;
    chordCard.setAttribute(chordIdentifier, chord);
    chordCard.setAttribute(chordNameIdentifier, name);

    document.getElementById('sequenceContainer').appendChild(chordCard);
}

function playGuitarChord(chord) {
    chord = chord.split("-");
    for (let i = 0; i < chord.length; i++) {
        if (chord[i] == "x") continue;
        // console.log(guitarMapping[i]+chord[i]);
        document.getElementById(guitarMapping[i]+chord[i]).click();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playSequence() {
    let sequence = document.getElementById('sequenceContainer').childNodes;
    if (!sequence.length) return;

    for (let i = 0; i < sequence.length; i++) {
        let interval = Array.from(sequence[i].childNodes).filter(child => child.nodeName.toLowerCase() === 'input')[0].value || DEFAULT_INTERVAL;
        let chord = sequence[i].getAttribute(chordIdentifier);
        playGuitarChord(chord);
        await new Promise(resolve => setTimeout(resolve, interval));
    }

    if (document.getElementById("loop").checked) {
        playSequence();
    }
}

function clearSequence() {
    document.getElementById('sequenceContainer').innerHTML = "";
}

function showToast(data) {
    let toast = document.createElement("div");

    toast.textContent = data.message;
    toast.classList.add("toast");
    toast.classList.add(data.success ? "success" : "fail");

    document.body.appendChild(toast);

    toast.style.display = "block";

    setTimeout(function() {
      document.body.removeChild(toast);
    }, 3000);
}

function showError(msg) {
    if (!msg) {
        msg = "Something went wrong";
    }
    showToast({"success":false, "message":msg});
}

function showMessage(msg) {
    showToast({"success":true, "message":msg});
}

function toggle() {
    let checkbox = document.getElementById('loop');
    let loopSwitch = document.getElementById('loopSwitch');
    let loopThumb = document.getElementById('loopThumb');

    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        loopSwitch.classList.add("active");
        loopThumb.classList.add("active");
    } else {
        loopSwitch.classList.remove("active");
        loopThumb.classList.remove("active");
    }
}

function clearChords() {
    document.getElementById('cardContainer').replaceChildren([]);
}

function loadChords() {
    clearChords();

    fetch(path + '/api/chords/getBaseChords.php', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(baseChords => {
        console.log(baseChords);
        if (baseChords.success) {
          baseChords.chords.forEach(chord => {
            createChordCard(chord.name, chord.acoustic_guitar, false);
          });
          fetch(path + '/api/chords/getUserChords.php', {
            method: 'GET',
          })
          .then(response => response.text())
          .then(response => JSON.parse(response))
          .then(userChords => {
            // console.log(userChords);
            if (userChords.success) {
                userChords.chords.forEach(chord => {
                  createChordCard(chord.name, chord.acoustic_guitar, true);
                });
            } else {
                // showToast(userChords);
            }
          })
          .catch(error => {
            console.log('Error', error);
          })
        } else {
        //   showToast(baseChords);
        //   isLogged = false;
        //   window.location.href = path;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });

    let url = new URL(window.location.href);
    let chord = url.searchParams.get('chord'); 
    let name = url.searchParams.get('name'); 
    let sequenceID = url.searchParams.get('sequenceID'); 
    if (chord != null && name != null && chord != undefined && name != undefined && chord != "" && name != "") {
        addChordToSequence(name, chord);
    } else {
        let req = {
            "sequence_id": sequenceID,
        }
        if (sequenceID != null && sequenceID != undefined && sequenceID != "") {
            fetch(path + '/api/chords/getSequenceContent.php', {
                method: 'POST',
                body: JSON.stringify(req),
            })
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(data => {
                let sequenceContent = JSON.parse(data.sequence.content);
                console.log(data);
                importChords(sequenceContent)
                // if (data.success) {
                //     data.chords.forEach(chord => {
                //         createChordCard(chord.name, chord.acoustic_guitar, false, true);
                //     });
                // } else {
                //     showToast(data);
                // }
            })
            .catch(error => {
                console.log('Error:', error);
            });
        }
    }
}

function loadFavourites() {
    clearChords();

    fetch(path + '/api/chords/getFavouriteChords.php', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        console.log(data);
        if (data.success) {
            data.chords.forEach(chord => {
                createChordCard(chord.name, chord.acoustic_guitar, false, true);
            });
        } else {
            showToast(data);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function addChord() {
    var modal = document.getElementById("myModal");
    var chordName = document.getElementById("chordName");
    var chordString = document.getElementById("chordString");

    if (chordName.value == "") {
        showError("Name must not be empty");
        return;
    }
    // if (chordString.value.length != 11) {
    //     showError("Chord must be 6 characters long");
    //     return;
    // }

    let chord = {
        "chord_name": chordName.value,
        "acoustic_guitar": chordString.value,
        "electric_guitar": "",
        "ukulele": "",
    }

    fetch(path + '/api/chords/addUserChord.php', {
        method: 'POST',
        body: JSON.stringify(chord),
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        console.log(data);
        showToast(data);
    })
    .catch(error => {
        console.log('Error', error);
    })

    modal.style.display = "none";
    chordName.value = "";
    chordString.value = "";

    loadChords();
}

function importChords(chords) {
    console.log(chords);

    for (let i = 0; i < chords.length; i++) {
        chords[i] = chords[i].split("-");
        chords[i] = chords[i].filter(l => l != "");
    }

    console.log(chords);
    chords = chords.filter(line => line.length > 0);

    for (let i = 0; i < chords[0].length; i++) {
        let chord = "";
        let chordName = "";
        for (let j = 2; j < chords.length; j++) {
            if (chords[j][0] == '') continue;
            let c = chords[j][i];
            if (typeof c === 'string' || c instanceof String) {
                chord += chords[j][i] + "-";
            }
        }
        chordName = chords[0][i];
        interval = chords[1][i];
        chord = chord.slice(0, -1);
        // console.log(chord, chordName, interval);
        if (chord != "") {
            addChordToSequence(chordName, chord, interval);
        }
    }
}

function importSequenceContent(content) {
    let lines = content.split('\n');
    if (lines.length == 0) {
        showError();
        return;
    }
    importChords(lines);
}

function importSequence() {
    // Create a hidden input element
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';

    // Set up an event listener for when a file is selected
    input.addEventListener('change', function(event) {
        let file = event.target.files[0];

        // Use fetch to load the content of the file
        fetch(URL.createObjectURL(file))
            .then(response => response.text())
            .then(fileContent => {
                importSequenceContent(fileContent);
            });
    });

    input.click();
}

function getSequence() {
    let sequence = document.getElementById("sequenceContainer");
    let exportSeq = ["", "", "", "", "", "", "", ""]; //name, intervals, 6 strings
    for (let i = 0; i < sequence.children.length; i++) {
        let chord = sequence.children[i].getAttribute(chordIdentifier);
        let name = sequence.children[i].getAttribute(chordNameIdentifier);
        let interval = Array.from(sequence.children[i].childNodes).filter(child => child.nodeName.toLowerCase() === 'input')[0].value || DEFAULT_INTERVAL;
        chord = chord.split("-");
        for (let j = 0; j < chord.length; j++) {
            exportSeq[j+2] += chord[j] + "-";
        }
        exportSeq[0] += name + "-";
        exportSeq[1] += interval + "-";
    }
    
    exportSeq = exportSeq.map(s => s.slice(0, -1));
    return exportSeq;
}

function exportSequence() {
    exportSeq = getSequence();
    if (exportSeq[0] != "") {
        console.log(exportSeq);
        downloadChord(exportSeq);
    } else {
        showError("Empty sequence");
    }
}

function getTextContent(content) {
    let text = ""

    for (let i = 0; i < content.length; i++) {
        text += content[i] + "\n";
    }

    return text;
}

function downloadChord(content) {
    console.log(getTextContent(content));
    encodedContent = encodeURIComponent(getTextContent(content));
    // Create a data URI
    let dataUri = 'data:text/plain;charset=utf-8,' + encodedContent;

    // Create a link element
    let link = document.createElement('a');
    link.href = dataUri;
    link.download = 'example.txt'; // Set the filename

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

function getUsers() {
    fetch(path + '/api/admin/getUsers.php', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        // console.log(data);
        let userContainer = document.getElementById("users");
        userContainer.classList.remove("hide");
        userContainer.classList.remove("show");
        userContainer.innerHTML = "";
        data.users.forEach(user => {
            createUserCard(user);
        });
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function createUserCard(user) {
    let userContainer = document.getElementById("users");
    
    const userCard = document.createElement('div');
    userCard.className = 'user-card';

    // Create an h3 element for user name
    const userName = document.createElement('h3');
    userName.textContent = user.ID + ' - ' + user.username;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        console.log(user.ID)
        deleteUser(user.ID)
    });

    // Create change password button
    const changePasswordButton = document.createElement('button');
    changePasswordButton.textContent = 'Change Password';
    changePasswordButton.addEventListener('click', () => {
        changePasswordModal(user.ID)
    });

    // Append elements to the user card
    userCard.appendChild(userName);
    userCard.appendChild(deleteButton);
    userCard.appendChild(changePasswordButton);

    // Append the user card to the user container
    userContainer.appendChild(userCard);
}

function deleteUser(userID) {
    let req = {
        "userID": userID
    }
    fetch(path + '/api/admin/deleteUser.php', {
        method: 'POST',
        body: JSON.stringify(req)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
        if (data.success) {
            getUsers();
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function changePasswordModal(userID) {
    const modal = document.getElementById('passwordChangeModal');
    modal.style.display = 'block';
    modal.setAttribute(userIDIdentifier, userID);
}

function hideChangePasswordModal() {
    // Hide the password change modal
    const modal = document.getElementById('passwordChangeModal');
    modal.style.display = 'none';

    // Clear input fields
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function submitPasswordChange() {
    const modal = document.getElementById('passwordChangeModal');
    const userID = modal.getAttribute(userIDIdentifier);

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showError("Passwords do not match");
        return;
    }

    let req = {
        "userID": userID,
        "password": newPassword
    }
    fetch(path + '/api/admin/changePassword.php', {
        method: 'POST',
        body: JSON.stringify(req)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        showToast(data);
        if (data.success) {
            getUsers();
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });


    hideChangePasswordModal();
}

function shareSequence() {
    let seq = getSequence();
    let req = {
        "sequence": JSON.stringify(seq)
    }
    console.log(req);
    fetch(path + '/api/chords/saveSequence.php', {
        method: 'POST',
        body: JSON.stringify(req)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(data => {
        console.log(data);
        if (data.success) {
            let url = new URL(window.location.href);
            url.searchParams.set('sequenceID', data.sequenceID);
        
            window.open(url.toString(), '_blank');
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}