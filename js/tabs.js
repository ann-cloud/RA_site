function openPage(pageName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "#32936F";
    tablinks[i].style.color = "white";
  }
  var selectedPage = document.getElementById(pageName);
  selectedPage.style.display = "flex"; 
  elmnt.style.backgroundColor = "white";
  elmnt.style.color = "#32936F";
  if (!pageName.includes('3'))
  {
    const defaultSubpageId = "defaultOpen_" + pageName;
    document.getElementById(defaultSubpageId).click();
  }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

tabcontent = document.getElementsByClassName("subtabcontent");
for (i = 1; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}

function openSubTab(evt, subTabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("subtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(subTabName).style.display = "block";
  evt.currentTarget.className += " active";

  let table;
  if (subTabName == 'etap11')
  {
    table = document.getElementById('inputTable11');
    redoInputs(table);
  }
  else if (subTabName == 'etap12')
  {
    table = document.getElementById('inputTable12');
    redoInputs(table);
  }
  else if (subTabName == 'etap21')
  {
    document.getElementById('resultTableContainerEtap2').style.display = 'none';
  }
  else if (subTabName == 'etap22')
  {
    document.getElementById('resultTableContainerEtap2').style.display = 'block';
  }
  else if (subTabName == 'etap41')
  {
    document.getElementById('resultTableContainerEtap4').style.display = 'none';
  }
  else if (subTabName == 'etap42')
  {
    document.getElementById('resultTableContainerEtap4').style.display = 'block';
  }
}

function redoInputs(table)
{
  for (let i = 1; i < table.rows.length; ++i)
  {
    table.rows[i].cells[2].firstChild.value = "1";
  }
  table.rows[1].cells[2].firstChild.dispatchEvent(new Event('change'));
}