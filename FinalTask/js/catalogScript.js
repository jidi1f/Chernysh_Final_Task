window.onload = function(){

  if(this.localStorage.length == 0){
    APPOBJ.hydration('total_value',"")
    APPOBJ.hydration('items_Array',[])
  }

  GeneralFunc();
   
   let filter_container = document.querySelectorAll('.for-filter');
   let items_container = document.querySelectorAll('.items-container');
   let items_arr = document.querySelectorAll('.items-container_catalog');
   let filt_cont_tab_mob = document.querySelector('.filter-container_tablet-mobile');
   let close_icon = document.querySelector('.close-icon');
   let overlay = document.querySelector('.main-overlay');
   let filter_arrow_icon = document.querySelector('.right-arrow-icon'); 
   let filter_titles = document.querySelectorAll('.filter-container__current');
   let container_variations =  document.querySelectorAll('.filter-container__variation');
   

   let flagFilter = 0;

   let w = document.documentElement.clientWidth;
  
   //Динамическая отрисовка страницы.
   renderItems();
    
   function renderItems(){

    catalog.sort(function(a,b){
      return new Date(b.dateAdded) - new Date(a.dateAdded);
     });
  
    let result = catalog.filter(function(obj){
          if(obj.category == 'women' && obj.fashion == 'Casual style') return obj; 
    });
    
    let tmpArr = [];

    for(let i = 0; i < result.length; i++){

    let new_block; 
    let item_details = document.createElement('div');
    item_details.classList.add('item-details');
    let wrap_for_overlay = document.createElement('div');
    wrap_for_overlay.classList.add('wrap-for-overlay');
    let item_overlay = document.createElement('div');
    item_overlay.classList.add('item-overlay'); 
    let hov_text = document.createElement('p'); 
    hov_text.classList.add('hov-text');
    hov_text.innerHTML = 'View item';
    let myImage = new Image();
    myImage.src = result[i].thumbnail;
    
    wrap_for_overlay.appendChild(item_overlay);
    wrap_for_overlay.appendChild(hov_text);
    wrap_for_overlay.appendChild(myImage);

    if(result[i].hasNew){
      new_block = document.createElement('div');
      new_block.innerHTML = 'NEW';
      new_block.classList.add('has-new');
      item_details.appendChild(new_block);
    }
   

    let item_details__title = document.createElement('div');
    item_details__title.classList.add('item-details__title'); 
    let h4 = document.createElement('h4');
    h4.innerHTML = result[i].title;  
    item_details__title.appendChild(h4);
    
    let item_details__subtitle = document.createElement('div');
    item_details__subtitle.classList.add('item-details__subtitle'); 
    let old_price = document.createElement('div');
    old_price.classList.add('old-price');
    let n_price = document.createElement('div');
    n_price.classList.add('n-price');
    n_price.innerHTML = '£' + result[i].price;
    item_details__subtitle.appendChild(old_price);
    item_details__subtitle.appendChild(n_price);
    
    item_details.appendChild(wrap_for_overlay);
    item_details.appendChild(item_details__title);
    item_details.appendChild(item_details__subtitle);

    tmpArr.push(item_details);
    }
    
    for(let i = 0; i < 4; i++){ 
      items_container[0].appendChild(tmpArr[i]);
    }

    for(let i = 4; i < tmpArr.length; i++){ 
      items_container[1].appendChild(tmpArr[i]);
    }
    
   }

  // Вешаем обработчики на фильтры
  for(let i = 0; i < filter_container.length; i++){
    filter_container[i].addEventListener('mouseenter',function(){
        displayDropDown(this);
    });
  }
  for(let i = 0; i < filter_container.length; i++){
    filter_container[i].addEventListener('mouseleave',function(){
       hideDropDown(this);
    });
  }
  for(let i = 0; i < filter_container.length; i++){
    filter_container[i].addEventListener('click',function(){
      displayDropDownMobile();
    });
  }
  close_icon.addEventListener('click',function(){
      hideDropDownMobile();
   });
  overlay.addEventListener('click',function(){
       hideDropDownMobile();
   });
  
  //Обработчики для фильтров
  function displayDropDown(elem){
    w = document.documentElement.clientWidth;
    if(w > 753)
    elem.children[4].style.display = 'block';
  }
  function hideDropDown(elem){
    w = document.documentElement.clientWidth;
    if(w > 753)
    elem.children[4].style.display = 'none';
  }
  function displayDropDownMobile(){
    w = document.documentElement.clientWidth;
    if(w < 753){
      filt_cont_tab_mob.style.display = 'flex';
      close_icon.style.display = 'flex';
      overlay.style.display = 'block';
    }
    if(w <= 454) filter_arrow_icon.classList.add('display-none');
  }
  function hideDropDownMobile(){
    w = document.documentElement.clientWidth;
    filt_cont_tab_mob.style.display = 'none';
    close_icon.style.display = 'none';
    overlay.style.display = 'none';
    if(w <= 454) filter_arrow_icon.classList.remove('display-none');
  }

  //Вешаем обработчик для динамического перемещения товара в каталоге
  window.addEventListener("resize", displayItems);
  displayItems();

  function displayItems(){
    w = document.documentElement.clientWidth;
    transferItem(w);
    containFilterTopics(w);
   }

  //Функция для перемещения товара в котологе
  function transferItem(w){

    let tmp;

    if(w <= 753){
     if(items_arr[0].children.length == 4){
      tmp = items_arr[0].children[items_arr[0].children.length-1];
      items_arr[0].removeChild(items_arr[0].children[items_arr[0].children.length-1]);
      items_arr[1].insertBefore(tmp,items_arr[1].firstChild);
      
     }
    else if(items_arr[0].children.length == 2){
      tmp = items_arr[1].children[0];
      items_arr[1].removeChild(items_arr[1].children[0]);
      items_arr[0].appendChild(tmp);
     }
    }
    if(w < 454 && items_arr[0].children.length == 3){
    tmp = items_arr[0].children[items_arr[0].children.length-1];
    items_arr[0].removeChild(items_arr[0].children[items_arr[0].children.length-1]);
    items_arr[1].insertBefore(tmp,items_arr[1].firstChild);
    
    }
    else if(w >= 753){
      if(items_arr[0].children.length == 2){
      tmp = items_arr[1].children[0];
      items_arr[1].removeChild(items_arr[1].children[0]);
      items_arr[0].appendChild(tmp);
      }
      if(items_arr[0].children.length == 3){
        tmp = items_arr[1].children[0];
        items_arr[1].removeChild(items_arr[1].children[0]);
        items_arr[0].appendChild(tmp);
      }
    }

   }

   // Функция для правильной отрисовки фильтра для планшетов и телефонов (учитывая ресайз)

   function containFilterTopics(w){
    
      if(w <= 753 && flagFilter == 0){
        for(let i = 0 ; i < filter_container.length; i++){
          let current = filter_container[i].children[2].innerHTML;
          let titleName = filter_container[i].children[0].innerHTML;
          if(current == ""){
            filter_container[i].children[2].innerHTML = titleName;
          }
          else{
            filter_container[i].classList.remove('flex-column'); 
          }
          
        }
        flagFilter = 1;
      }
      else if(w >= 753 && flagFilter == 1){
        for(let i = 0 ; i < filter_container.length; i++){
          let current = filter_container[i].children[2].innerHTML;
          let titleName = filter_container[i].children[0].innerHTML;
          if(current == titleName){
            filter_container[i].children[2].innerHTML = "";
          }
          else{
            filter_container[i].classList.add('flex-column'); 
          }
          
        }
        
        filt_cont_tab_mob.style.display = 'none';
        close_icon.style.display = 'none';
        overlay.style.display = 'none';

        flagFilter = 0;
      }

    }
    
    // Создаю делегирование для выбора фильтра

   
      for(let i = 0; i < container_variations.length; i++){
        
        container_variations[i].onclick = function(event) {
            let indx = 0;
            if(event.target.tagName == 'LI')
            {
                let choosen = event.target;
                indx = Array.prototype.indexOf.call(this.parentNode.parentNode.children,this.parentNode);
                for(let j = 0; j < this.children.length; j++){
                if(this.children[j].classList.contains("active-filter")) {
                   this.children[j].classList.remove("active-filter");
                  }
                }
                choosen.classList.add("active-filter");
                if(w <= 753){
                  if(choosen.innerHTML == "Not selected"){
                    filter_titles[indx].innerHTML = this.parentNode.children[0].innerHTML;
                    filter_titles[indx].classList.remove("active-filter");
                  } 
                  else{
                    filter_titles[indx].innerHTML = choosen.innerHTML;
                    filter_titles[indx].classList.add("active-filter");
                  }
                }
                else{
                  if(choosen.innerHTML == "Not selected"){
                    choosen.parentNode.parentNode.classList.remove("flex-column");
                    choosen.parentNode.parentNode.children[2].innerHTML = "";
                    choosen.parentNode.parentNode.children[2].classList.remove("active-filter");
                  }
                  else{
                    choosen.parentNode.parentNode.classList.add("flex-column");
                    choosen.parentNode.parentNode.children[2].innerHTML = choosen.innerHTML;
                    choosen.parentNode.parentNode.children[2].classList.add("active-filter");
                  }
              }
            }
        }
    }
    

  }
  


 
   
