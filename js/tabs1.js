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
    if (!pageName.includes('1') && !pageName.includes('3') && !pageName.includes('5') && !pageName.includes('6')
    && !pageName.includes('7') && !pageName.includes('8') && !pageName.includes('9') && !pageName.includes('10'))
    {
      const defaultSubpageId = "defaultOpen_" + pageName;
      document.getElementById(defaultSubpageId).click();
    }
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

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
  }
  