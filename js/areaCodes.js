var xhr, code, search, data = {}, toTitleCase, letterSearch;

xhr = new XMLHttpRequest();
xhr.open('GET', 'js/areaCodes.json', true);
xhr.onreadystatechange = function(){
	if (this.readyState === 4 && this.status === 200){
		data = JSON.parse(xhr.responseText);
		return data;
		}
	};
xhr.send();

toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

search = function (nameOrNumber) {
	var code = document.getElementById('areaCode').value, 
	    name = document.getElementById('areaName').value, 
	    town = "",
            i,
            areaCode,
            areaName,
            thisCode = "";
	
	document.getElementById('result').innerHTML = "";
	    
	if (nameOrNumber === "number") {
		if(!parseInt(code, 10)) {
			document.getElementById('error').innerHTML = "<h5 style='color:red;'>Please enter the area code into the box above</h5>";
			}
				
		if (code !== "" && code[0] === "0"){
			for (i = 0; i < data.length; i += 1){
				if (data[i].AreaCode === code) {
					areaCode = data[i].AreaCode;
					town = data[i].Town;
					document.getElementById('error').innerHTML = "";
					document.getElementById('areaCode').value = "";
					document.getElementById('result').innerHTML = ""+areaCode+" is the Area Code for <strong>"+town+"</strong>";	
					}
				}
			if (town === ""){
				document.getElementById('error').innerHTML = "";
				document.getElementById('result').innerHTML = "Sorry, we don't have a record for that number! Please check the number and try again.";
				}
			
		}else{
			document.getElementById('error').innerHTML = "<h5 style='color:red;'>Please enter the area code in the box above</h5><p>Telephone area codes are between 3 and 5 digits long and begin with a 0 (zero).</p>";
		}
	} 
	else {
		if (parseInt(name, 10)) {
			document.getElementById('error').innerHTML = "<h5 style='color:red;'>Please enter the area name (not the number) into the box above</h5>";
			}
		else if (name !== "" && !parseInt(name, 10)){
			name = toTitleCase(name);
			for (i = 0; i < data.length; i += 1){
				if (data[i].Town === name) {
					areaName = data[i].Town;
					thisCode = data[i].AreaCode;
					document.getElementById('error').innerHTML = "";
					document.getElementById('areaName').value = "";
					document.getElementById('result').innerHTML = "<strong>"+thisCode+"</strong> is the Area Code for "+areaName+"";	
					}
				}
			if (thisCode === ""){
				document.getElementById('error').innerHTML = "";
				document.getElementById('result').innerHTML = "Sorry, we don't have a record for that area! Please check the Area Name and try again.";
				}
			
		}else{
			document.getElementById('error').innerHTML = "<h5 style='color:red;'>Please enter the area name in the box above</h5>";
		}	
	}
};
document.getElementById('submitNumber').addEventListener('click', function(e){
	e.preventDefault();
	search("number");
	}, false);
	
document.getElementById('submitName').addEventListener('click', function(e){
	e.preventDefault();
	search("name");
	}, false);

document.getElementById('numberTab').addEventListener('click', function(e){
		e.preventDefault();
		this.className = "active";
		document.getElementById('nameTab').className = "";
		document.getElementById('formContainerNumber').className = "";
		document.getElementById('formContainerName').className = "hidden";
		document.getElementById('result').innerHTML = "";
		document.getElementById('error').innerHTML = "";
	}, false);
document.getElementById('nameTab').addEventListener('click', function(e){
		e.preventDefault();
		this.className = "active";
		document.getElementById('numberTab').className = "";
		document.getElementById('formContainerName').className = "";
		document.getElementById('formContainerNumber').className = "hidden";
		document.getElementById('result').innerHTML = "";
		document.getElementById('error').innerHTML = "";
	}, false);

letterSearch = function (letter, page) {
	var pages, list = [];
	document.getElementById('listView').innerHTML = "";
	document.getElementById('pagination').innerHTML = "";
	for ( var i = 0; i < data.length; i += 1) {
		if (data[i].Town[0] === letter) {
			list.push("<li>"+data[i].Town+" : <span class='pull-right'>"+data[i].AreaCode+"</span></li><hr />");
			}
		else{
			continue;
			}
		}
	list = list.sort();
	pages = Math.floor((list.length / 10) + 1);
	for (var i = 1; i <= pages; i += 1){
		if (page === i) {
			document.getElementById('pagination').innerHTML += "<li class='active'><a href'#'>"+i+"</a></li>";
			}
		else {
			document.getElementById('pagination').innerHTML += "<li><a href'#'>"+i+"</a></li>";
			}
		}
	var paginationButtons = document.getElementById('pagination').getElementsByTagName('li');
	for (var i = 0; i < paginationButtons.length; i+=1){
		paginationButtons[i].addEventListener('click', function(){
				var page = this.textContent;
				console.log(this);
				letterSearch(letter, parseInt(page));
			}, false);
	}
	console.log(paginationButtons);
	console.log(pages);
	console.log(list.length);
	if (list.length > 0) {
		if (page === undefined || page === 1) {
			for (var i = 0; i < 10; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 2) {
			for (var i = 10; i < 20; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 3) {
			for (var i = 20; i < 30; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 4) {
			for (var i = 30; i < 40; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 5) {
			for (var i = 40; i < 50; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}	
				}
			}
		else if (page === 6) {
			for (var i = 50; i < 60; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 7) {
			for (var i = 60; i < 70; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else if (page === 8) {
			for (var i = 70; i < 80; i+=1){
				if (list[i] !== undefined){
					document.getElementById('listView').innerHTML += list[i];
					}
				}
			}
		else{
			document.getElementById('listView').innerHTML = "";
			}
		}
	else{
		document.getElementById('pagination').innerHTML = "";
		}
	};

var buttons = document.getElementById('listViewContainer').getElementsByTagName('button');
console.log(buttons);
for (var i = 0; i< buttons.length;i+=1){
	buttons[i].addEventListener('click', function (e) {
		e.preventDefault();
		resetButtonClass();
		this.className = "btn btn-default active";
		letterSearch(this.textContent, 1);
		}, false);
}



var resetButtonClass = function () {
	for (var i = 0; i< buttons.length;i+=1){
		buttons[i].className = "btn btn-default";
		}
	};
