window.onload = function(){

    

    if(this.localStorage.length == 0){
        APPOBJ.hydration('total_value',"")
        APPOBJ.hydration('items_Array',[])
    }

    GeneralFunc();

    let main_container = document.querySelector('.item-detail-container');
    let btnAdd = main_container.children[2].children[5]; 
    let decr_container = main_container.children[2];
    let current_thumbnail = main_container.children[1].children[0];  
    let ProductValue =  main_container.children[2].children[2]; 
    let preview = main_container.children[1].children[2].children[0].children[1];   

    let wrap_overlays = document.querySelectorAll('.thumbnail-container__thumbnails .wrap-for-overlay');
    let options_container = document.querySelectorAll('.item-description__options-container ul');
    let bag_container = document.querySelector('.bag-count');

    let tmpArr =  [];
    APPOBJ.rehydration('items_Array',tmpArr);

    // Для thumbnail
    
    let active = wrap_overlays[0];
    wrap_overlays[0].children[0].style.display = 'block';

    //Вешаю событие для thumbnail-а
    
    for(let i = 0; i < wrap_overlays.length; i++){
        wrap_overlays[i].addEventListener('click',function(){
            picCurrenThumbnail(this,current_thumbnail);
        });
    }

    // Вешаю событие на добовление продукта в корзину

    btnAdd.onclick = function(){
       
       let value = ProductValue.innerHTML;
       let currBagVal = bag_container.children[1].innerHTML; 
       let regCurrBagVal = Number(currBagVal.replace(/[^0-9.-]+/g,""));                                
       let regVal = Number(value.replace(/[^0-9.-]+/g,""));

       let result = '£' + (regCurrBagVal + regVal).toFixed(2);  

       bag_container.children[1].innerHTML = result ; 
       
       APPOBJ.hydration("total_value",result);
       ToBacket(decr_container);

       console.log(localStorage);
    }

    //Функция переключения thumbnail-а


    function picCurrenThumbnail(div,current){
        if(active){
            active.children[0].style.display = 'none';
        }
        active = div;
        
        div.children[0].style.display = 'block';
        
        let myImage = new Image(590, 394);
        myImage.src = div.children[1].src;
        current.removeChild(current.children[0]);
        current.appendChild(myImage);
    }

    // Создаю делегирование для выбора цвета и размера
    
    for(let i = 0; i < options_container.length; i++){

        options_container[i].onclick = function(event) {
            if(event.target.tagName == 'LI')
            {
                let choosen = event.target;
                for(let j = 0; j < this.children.length; j++){
                if(this.children[j].classList.contains('active-item')) 
                this.children[j].classList.remove('active-item');
                }
                choosen.classList.add('active-item');
            }
        }
    }

    //Функция добавления в local storage

    function ToBacket(row){
       
        let tmpObj = new function(){
              this.title = row.children[0].innerHTML;
              this.price = row.children[2].innerHTML;
              this.hasNew = Boolean(main_container.querySelector('.has-new'));
              this.color = row.children[4].querySelector('.active-item').innerHTML;
              this.size = row.children[3].querySelector('.active-item').innerHTML;
              this.preview = preview.src;
        }

          tmpArr.push(tmpObj);
          
          APPOBJ.hydration('items_Array',tmpArr);
      
          bag_container.children[2].children[0].innerHTML = tmpArr.length;
         }

           
}

    
 
    


