window.onload = function() {
    
    
    
    if(this.localStorage.length == 0){
        APPOBJ.hydration('total_value',"")
        APPOBJ.hydration('items_Array',[]);
        APPOBJ.hydration('best_offer',0);
    }
   
    GeneralFunc();
    
    
    let btnBestOffer = document.querySelector('.best-offer__right-container .button-add'); 
  
    let bag_container = document.querySelector('.bag-count');
    let items_container = document.querySelectorAll('.item-product');
    let arrow_up = document.querySelectorAll('.item-product .arrow-up');
    let arrow_down = document.querySelectorAll('.item-product .arrow-down');
    let total_val = document.querySelector('.best-offer__total');  

    // Обьекты для отправки в корзину
    
    let obj1 = null;
    let obj2 = null;
    
    checkTitles();

    let flagLeft = 0;
    let flagRight = 0;
   
  
    let tmpArr =  [];
    APPOBJ.rehydration('items_Array',tmpArr);
    
    
     // Вешаем событие для слайда
     (function(){
        let i = 0;
        while(arrow_up[i]){
            arrow_up[i].addEventListener('click',moveUP)
            i++;
        }
        i = 0;
        while(arrow_down[i]){
            arrow_down[i].addEventListener('click',moveDown)
            i++;
        }
    }());
        
    // События на движения слайдов  
      function moveUP(){
        
            let indx = Array.prototype.indexOf.call(this.parentNode.parentNode.children,this.parentNode);

            if(indx == 0){
                if(flagLeft == bestOffer.left.length - 1){
                   flagLeft = 0;
                }
                else  flagLeft++;
                items_container[0].children[1].innerHTML = "";
                let id = bestOffer.left[flagLeft];
                renderItem(id,indx, 0);
            }
            if(indx == 2){
                if(flagRight == bestOffer.right.length - 1){
                    flagRight = 0;
                }
                else  flagRight++;
                items_container[1].children[1].innerHTML = "";
                let id = bestOffer.right[flagRight];
                renderItem(id,--indx, 1);
            }
        }

       function moveDown(){
        
            let indx = Array.prototype.indexOf.call(this.parentNode.parentNode.children,this.parentNode);

            if(indx == 0){
                if(flagLeft == 0){
                   flagLeft = bestOffer.left.length - 1;
                }
                else flagLeft--;
                items_container[0].children[1].innerHTML = "";
                let id = bestOffer.left[flagLeft];
                renderItem(id,indx, 0);
                
            }
            if(indx == 2){
                if(flagRight == 0){
                    flagRight = bestOffer.right.length - 1;
                }
                else flagRight--;
                items_container[1].children[1].innerHTML = "";
                let id = bestOffer.right[flagRight];
                renderItem(id,--indx, 1);
               
            }
        }

     //Проверить текущие товары;

      function checkTitles(){
        let id1 = items_container[0].children[1].children[0].children[1].children[0].innerHTML;
        let id2 = items_container[1].children[1].children[0].children[1].children[0].innerHTML; 
       
        for(let i = 0; i < catalog.length; i++){
            if(id1 == catalog[i].title){
                obj1 = catalog[i];
            }
            if(id2 == catalog[i].title){
                obj2 = catalog[i];
            }
        }
      }

    // Событие отправки в корзину
    btnBestOffer.onclick = function(){

        ToBacket(obj1);
        ToBacket(obj2);

        APPOBJ.hydration('best_offer',1);
        
     }

     //Рендеринг товара

    function renderItem(id,indx, flag){
        var obj = null;
        for(let i = 0; i < catalog.length; i++){
            if(id == catalog[i].id){
                obj = catalog[i];
                i = catalog.length;
            }
        }
        if(flag == 0){
            obj1 = obj;
        }
        else{
            obj2 = obj;
        }
        
        let item_details = document.createElement('div');
        item_details.classList.add('item-details');
        let item_details_title = document.createElement('div');
        item_details_title.classList.add('item-details__title');
        let h4 = document.createElement('h4');
        h4.innerHTML = obj.title;
        item_details_title.appendChild(h4);
        let item_details_subtitle = document.createElement('div');
        item_details_subtitle.classList.add('item-details__subtitle');
        let p = document.createElement('p');
        p.innerHTML = '£' + (obj.price).toFixed(2);
        item_details_subtitle.appendChild(p);
        let myImage = new Image();
        myImage.src = obj.thumbnail;
        myImage.setAttribute('alt', 'product picture');

        item_details.appendChild(myImage);
        item_details.appendChild(item_details_title);
        item_details.appendChild(item_details_subtitle);

        items_container[indx].children[1].appendChild(item_details);

        calcPrice()

    }
   

     // Функция для подщета скидки

    function calcPrice(){
        
        let a = 0
        let b = 0;
        if(obj1.discountedPrice)
         a = obj1.discountedPrice; 
        else{
         a = obj1.price;   
        }
        
        if(obj2.discountedPrice)
         b = obj2.discountedPrice; 
        else{
         b = obj2.price;   
        }  
        

        total_val.children[0].innerHTML = '£' + (obj1.price + obj2.price).toFixed(2);
        total_val.children[1].innerHTML = '£' + (a + b).toFixed(2);
    }

    function ToBacket(row){
        let pr = 0;
        if(row.discountedPrice)
            pr = row.discountedPrice; 
        else{
            pr = row.price;   
        }

        let tmpObj = new function(){
              this.title = row.title;
              this.price = '£' + (pr).toFixed(2);
              this.hasNew = Boolean(row.hasNew);
              this.color = row.colors[0];
              this.size = row.sizes[0];
              this.preview = row.thumbnail;
        }

        tmpArr.push(tmpObj);
        
        APPOBJ.hydration('items_Array',tmpArr);
    
        let tmp = bag_container.children[1].innerHTML
        let current_val = Number(tmp.replace(/[^0-9.-]+/g,""));
        let price = '£' + (current_val + pr).toFixed(2);


        bag_container.children[2].children[0].innerHTML = tmpArr.length;
        bag_container.children[1].innerHTML = price;

        APPOBJ.hydration('total_value',price);
    }


    
}