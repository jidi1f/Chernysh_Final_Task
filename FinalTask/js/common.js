window.GeneralFunc = function() {
    

    
    let logo = document.querySelector('.hearder__top-container h1'); 
    let w = document.documentElement.clientWidth;

    let menu_icon = document.querySelector('.menu-click'); 
    let menu = document.querySelector('.menu');
    let hearder_bottom = document.querySelector('.hearder__bottom-container')
    
    let glass_icon = this.document.querySelector('.hearder__search img'); 
    let header_input = this.document.querySelector('.hearder__search input'); 
    let bag_count = document.querySelector('.bag-count');
    let menu_overlay = document.querySelector('.menu-overlay');

    let tmpVal = "";
    let tmpArr = [];
    
    tmpVal = APPOBJ.rehydration('total_value',tmpVal);
    tmpArr = APPOBJ.rehydration('items_Array',tmpArr);
             
    bag_count.children[2].children[0].innerHTML = tmpArr.length;
    bag_count.children[1].innerHTML = tmpVal;

    //Вешаем обработчик для смены внешнего вида при адаптации єкрана
    window.addEventListener("resize", displayWindowSize);

    

    function displayWindowSize(){
         w = document.documentElement.clientWidth;
        
         displayStartPageItems(w);
    }
    displayWindowSize();

    //Обработчик для смені внешнего вида при адаптации єкрана
    function displayStartPageItems(w){
        if (w < 559){
            logo.innerHTML = 'TL'
            header_input.style.width = '120px';
       }
       else {
           logo.innerHTML = 'Template';
           if(hearder_bottom.classList.contains('menu-flex')){
              hearder_bottom.classList.remove('menu-flex');
              menu_overlay.style.display = "none";
           }
       }

       if (w > 768){
           header_input.style.width = '120px';
           header_input.style.boxShadow = 'none';
       }
       else if(w < 768 && w > 559) {
           header_input.style.width = '0';
           header_input.style.boxShadow = 'none';
       }
    } 

    // функция для  динамического использования инпута в шапке сайта
    let check_input = (function(){
        
        let flag = 0;
        return function(){
            let width = document.documentElement.clientWidth;
            if(width <= 768 && width >= 559 && flag == 0){
                header_input.style.width = '120px';
                header_input.style.boxShadow = '-20px 10px 15px 15px white';
                flag = 1;
            }
            else if(width <= 768 && width >= 559 && flag == 1){
                header_input.style.width = '0';
                header_input.style.boxShadow = 'none';
                flag = 0;
            }
        }
    })();
    //вешаем єто событие на иконку увелечительного стекла
    glass_icon.addEventListener('click', check_input);
    
    //вешаем функцию для відвижного меню
    menu_icon.onclick = function(){
       
        if(hearder_bottom.classList.contains('menu-flex')){
            hearder_bottom.classList.remove('menu-flex');
            menu_overlay.style.display = "none";
        }
        else {
            hearder_bottom.classList.add('menu-flex');
            menu_overlay.style.display = "block";
        }
        
    }

    menu_overlay.onclick = function(){
        hearder_bottom.classList.remove('menu-flex');
        menu_overlay.style.display = "none";
    }

    

    }

        



