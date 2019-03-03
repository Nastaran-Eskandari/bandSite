var d = new Date();
var day = d.getDate();
var month = d.getMonth()+1;

if(day < 10){
    day = "0"+ d.getDate();
}

if(month < 10){
    month = "0" + eval(d.getMonth() + 1);
}

var dateTitle = month+"." + day + "." + d.getFullYear();
document.getElementById('header__date').innerHTML = dateTitle;

////////////////////comments///////////////////////////


function showTime(dateToBeDisplayed) { //this function gives the time that has passed since the comment was submitted

    var seconds = Math.floor( (Date.now() - dateToBeDisplayed)/1000); // it calculates the number of milliseconds between the submited comment time and curent time and convert it into seconds

    var timePeriod = Math.floor(seconds / 31536000); //it shows how many years/months/days/minutes/seconds have passed since the comment was submitted  
    if (timePeriod > 1) {
      return timePeriod + " years ago";
    }
    timePeriod = Math.floor(seconds / 2592000); 
    if (timePeriod > 1) {
      return timePeriod + " months ago";
    }
    timePeriod = Math.floor(seconds / 86400);
    if (timePeriod > 1) {
      return timePeriod + " days ago";
    }
    timePeriod = Math.floor(seconds / 3600);
    if (timePeriod > 1) {
      return timePeriod + " hours ago";
    }
    timePeriod = Math.floor(seconds / 60);
    if (timePeriod > 1) {
      return timePeriod + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  /////////fisrt fetching for GETTING the comments from the server/////////////

const baseUrl = "https://project-1-api.herokuapp.com";
const endpoint = "/comments";
const querystring = "?api_key=";
const api_key = "adbaacc6-c704-4357-90f8-d93e600d40c9";
let newArray = [];

const promise = fetch(baseUrl + endpoint + querystring + api_key);
promise.then((result)=>{
    console.log(result);
    return result.json();  
})

.then((jsonData)=>{
    console.log(jsonData);
    newArray = jsonData;
    displayComment(jsonData);
} 
);
       
  function displayComment(commentToBeDisplayed){
    for (var i =0; i<commentToBeDisplayed.length; i++)
    {
  var boxElement = document.getElementById('comments_box');
    var divElement = document.createElement('div');
    divElement.classList.add('div-comment');
    var nameElement = document.createElement('p');
    nameElement.classList.add('author');
    var dateElement = document.createElement('span');
    dateElement.classList.add('span-date');
    var commentElement = document.createElement('p');
    var iconElement = document.createElement('div');
    let likebtn = document.createElement('a');
    likebtn.setAttribute('href','#');
    var likeImg = document.createElement('img');
    likeImg.src = "./images/like.png";
    likeImg.setAttribute('id',commentToBeDisplayed[i].id);
    likeImg.classList.add('like-btn');
    var likeNumber = document.createElement('span');
    likeNumber.classList.add('like-number');
    var deletebtn = document.createElement('a');
    deletebtn.setAttribute('href','#');
    var deleteImg = document.createElement('img');
    deleteImg.classList.add( 'delete-btn');
    deleteImg.src = "./images/delete.png";
    deleteImg.setAttribute('id', commentToBeDisplayed[i].id)


    nameElement.innerHTML = commentToBeDisplayed[i].name;
    dateElement.innerHTML = showTime(commentToBeDisplayed[i].timestamp); //it calculates the elapsed time since we submitted a comment
    commentElement.innerHTML = commentToBeDisplayed[i].comment;
    likeNumber.innerHTML = commentToBeDisplayed[i].likes;
 
    boxElement.appendChild(divElement);
    divElement.appendChild(nameElement);
    nameElement.appendChild(dateElement);
    divElement.appendChild(commentElement);
    divElement.appendChild(iconElement);
    iconElement.appendChild(likebtn);
    likebtn.appendChild(likeImg);
    iconElement.appendChild(likeNumber);
   iconElement.appendChild(deletebtn);
    deletebtn.appendChild(deleteImg);


    ////eventListener for like
    likebtn.addEventListener('click' , (event)=> {
      event.preventDefault();
      // console.log(event.target);
      let LikeID = event.target.id;
      displayLike(LikeID);
      commentToBeDisplayed[i].likes += 1;
      displayComment(commentToBeDisplayed);
  });

      //eventlistener for delete
      deletebtn.addEventListener('click' , (event)=>{
        event.preventDefault();
        let deleteId = event.target.id;
        deleteComment(deleteId);
      })
}
  };
    
///////////////////////POSTING the comments//////////////////////////

  var ourForm = document.getElementById('comment__form');
  ourForm.addEventListener('submit', afterSubmit);
    function afterSubmit (e) {
    e.preventDefault();
    document.getElementById('comments_box').innerHTML="";
    let nameValue = document.getElementById('name').value;
    let commentValue = document.getElementById('comment').value;
    //creating an object for a new comment
    let newComment = {
      name: nameValue,  
      comment:commentValue
    }
    const promise2 = fetch(baseUrl + endpoint + querystring + api_key ,{
      method : 'POST' ,
      body:JSON.stringify(newComment) ,
      headers:
      {"content-Type":"application/json"}
    })

      newArray.push(newComment); 
      displayComment(newArray); 
      ourForm.reset(); 
}

///////////////////////PUT method for likeButton
function displayLike (commentID) {

        const init= {
            method: 'PUT',
            headers: {
                  'content-type': 'application/json'
            }
        };

        const endpointforlikes= "/comments/" + commentID + "/like";
        let promise= fetch(baseUrl + endpointforlikes + querystring  + api_key, init);
        promise.then(function(response) {
        return response.json();
        }).then((jSondata) => {
            console.log(jSondata)
            displayComment(jSondata);
        });
    };  

    /////////////////delete method for delet button
    function deleteComment(commentID) {
      const init = {
        method :'DELETE',
        headers: {
          'content-type' : 'application/json'
        }
      }
      const endpointforDrlete= "/comments/" + commentID ;
      let promise= fetch(baseUrl + endpointforDrlete + querystring  + api_key, init);

      promise.then(function(response) {
      return response.json();
      }).then((jSondata) => {
          console.log(jSondata)
          displayComment(jSondata);
      });


    }
