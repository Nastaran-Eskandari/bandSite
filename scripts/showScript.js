/////////fetching/////////////
const baseUrl="https://project-1-api.herokuapp.com";
const endpoint="/showdates";
const querystring="?api_key=";
const api_key="adbaacc6-c704-4357-90f8-d93e600d40c9";

const promise=fetch(baseUrl + endpoint + querystring + api_key);
promise.then((result)=>{
    console.log(result);
    return result.json();
    
})

.then((jsonData)=>{
    console.log(jsonData);
    displaytable(jsonData);

} );

/////////////creating table/////////////////
let tableWrapper=document.getElementById('new-table');
let tableElement=document.createElement('table');
tableElement.classList.add('show__table');
function displaytable(tableToBeDisplaed)  {

for(i=0;i<tableToBeDisplaed.length;i++) {
let rowElement=document.createElement('tr');
rowElement.classList.add('last-child');
let tdElementleft=document.createElement('td');
let tdElementMid=document.createElement('td');
let tdElementRight=document.createElement('td');
let tdLeftfirstP=document.createElement('p');
tdLeftfirstP.classList.add('table__date');
let tdLeftSecondP=document.createElement('p');
tdLeftSecondP.classList.add('table__place');
let tdMidleP=document.createElement('p');
tdMidleP.classList.add('table__location');
let tdRightBtn=document.createElement('button');
tdRightBtn.classList.add('show__button');
let btnText=document.createElement('span');
btnText.innerHTML="GET TICKET";

tdLeftfirstP.innerHTML=tableToBeDisplaed[i].date;
tdLeftSecondP.innerHTML=tableToBeDisplaed[i].place;
tdMidleP.innerHTML=tableToBeDisplaed[i].location;

tableWrapper.appendChild(tableElement);
tableElement.appendChild(rowElement);
rowElement.appendChild(tdElementleft);
rowElement.appendChild(tdElementMid);
rowElement.appendChild(tdElementRight);
tdElementleft.appendChild(tdLeftfirstP);
tdElementleft.appendChild(tdLeftSecondP);
tdElementMid.appendChild(tdMidleP);
tdElementRight.appendChild(tdRightBtn);
tdRightBtn.appendChild(btnText);

}

};
