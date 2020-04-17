/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// console.log(axios.get(`https://api.github.com/users/markanator`));
const entryPoint = document.querySelector('.cards');

axios.get(`https://api.github.com/users/markanator`)
  .then((resolve)=>{
    entryPoint.appendChild(createGitCard(resolve.data));
  })
  .catch((reject)=>{
    console.log("Couldn't get profile", reject);
  });

  // big brain stuff, that we don't need
  // axios.get(`https://api.github.com/users/markanator/followers`)
  // .then((resolve)=>{
  //  
  //   resolve.data.forEach(element => {
  //     //console.log(element);
  //     entryPoint.appendChild(createGitCard(element));
  //   });
  // })
  // .catch((reject)=>{
  //   console.log("Couldn't get profile", reject);
  // });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['alexvision26',
                        'stahlgazer',
                        'AustinKelsay',
                        'justsml',
                        'luishrd',
                        'bigknell'];

followersArray.forEach((index)=>{
  axios.get(`https://api.github.com/users/${index}`)
  .then((resolve)=>{
    entryPoint.appendChild(createGitCard(resolve.data));
  })
  .catch((reject)=>{
    console.log("Couldn't get profile", reject);
  });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function createGitCard(object){
  // lets create the component
  const cardParent = document.createElement('div'); // main parent
  cardParent.classList.add('card');
  const userImage = document.createElement('img'); // first child
  userImage.src = object.avatar_url;
  const cardInfo = document.createElement('div'); // second child
  cardInfo.classList.add('card-info');

  cardParent.appendChild(userImage);
  cardParent.appendChild(cardInfo);


  //second set of kids LOL
  const nameHead = document.createElement('h3');
  nameHead.classList.add('name');
  
  // using API if the name is not present, substitute it for their username!
  let nameCheck = ()=> {
    if (object.name === undefined){
      return object.login;
    } else {
      return object.name;
    }
  }

  nameHead.textContent = nameCheck();

  const userPar = document.createElement('p');
  userPar.classList.add('username');
  userPar.textContent = `${object.login}`;

  const locationPar = document.createElement('p');
  locationPar.textContent = `Location: ${object.location}`;

  const profilePar        = document.createElement('p');
  const profileLink       = document.createElement('a');
  profilePar.textContent  = 'Profile: ';
  profileLink.href        = `${object.html_url}`;
  profileLink.textContent   = `${object.html_url}`;
  profilePar.appendChild(profileLink);
  
  //followers
  const followerCount = document.createElement('p');
  followerCount.textContent = `Followers: ${object.followers}`;
  //following
  const followingCount = document.createElement('p');
  followingCount.textContent = `Following: ${object.following}`;
  //bio
  const bioPar = document.createElement('p');
  bioPar.textContent = `Bio: ${object.bio}`;

  // appending all the data to cardInfo
  cardInfo.appendChild(nameHead);
  cardInfo.appendChild(userPar);
  cardInfo.appendChild(locationPar);
  cardInfo.appendChild(profilePar);
  cardInfo.appendChild(followerCount);
  cardInfo.appendChild(followingCount);
  cardInfo.appendChild(bioPar);

  return cardParent;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
