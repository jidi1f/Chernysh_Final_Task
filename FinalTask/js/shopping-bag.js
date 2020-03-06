window.onload = function() {

  if(this.localStorage.length == 0){
    APPOBJ.hydration('total_value',"")
    APPOBJ.hydration('items_Array',[])
  } 
   
    GeneralFunc();
    
    let bag_items_cont = this.document.querySelector(".shopping-bag-items-container");
    let disc_block = this.document.querySelector(".total-price__discount-block");
    let total_price = this.document.querySelector(".total-price__total-block");
    let plus_arr = this.document.querySelectorAll(".plus-icon");
    let bag_container = document.querySelector('.bag-count');
    let minus_arr = this.document.querySelectorAll(".minus-icon");
    let remove_arr = this.document.querySelectorAll(".remove-item");
    let clear_bag = this.document.querySelector(".checkout-container p");
    let btnBuy = this.document.querySelector(".checkout-container .button-add");

    total_price.children[1].innerHTML = bag_container.children[1].innerHTML;

    let arrAllobj = [];
    let arrMatch = [];
    let arrForRend = [];

    APPOBJ.rehydration('items_Array',arrAllobj);
    APPOBJ.rehydration('items_Array',arrMatch);

    // Проверка на наличие продуктов в корзине

    if(arrAllobj.length == 0){
      let HideTxt = document.createElement('p');
      HideTxt.classList.add('bag-empty-text');
      HideTxt.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
      bag_items_cont.innerHTML = "";
      bag_items_cont.appendChild(HideTxt);
      total_price.innerHTML = 'empty';
      bag_container.children[1].innerHTML = "";
      localStorage.clear();
    }
    else {
    CreateItems();
    displayItem();
    }

    // Проверка на скидку
    
    let tmp = JSON.parse(localStorage.getItem('best_offer'));
    if(tmp == 1){
        disc_block.style.display = "block";
    }
    else {disc_block.style.display = "none";}



   // Вешаю события для манипулирования продуктами в корзине

    for(let i = 0; i < plus_arr.length; i++ ){
        minus_arr[i].addEventListener("click", minusElement);
        plus_arr[i].addEventListener("click", plusElement);
        remove_arr[i].addEventListener("click", removeElement);
    }

    // Событие на очищение корзины

    clear_bag.onclick = function(){
        let HideTxt = document.createElement('p');
        HideTxt.classList.add('bag-empty-text');
        HideTxt.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
        bag_items_cont.innerHTML = "";
        bag_items_cont.appendChild(HideTxt);

        bag_container.children[1].innerHTML =''; 
        bag_container.children[2].children[0].innerHTML = 0;
        total_price.innerHTML = 'empty';
        localStorage.clear();
        disc_block.style.display = "none";
    }

    btnBuy.onclick = function(){
        if(bag_items_cont.querySelector('.bag-empty-text')){

        }
        else {
        let HideTxt = document.createElement('p');
        HideTxt.classList.add('thank-text');
        HideTxt.innerHTML = "Thank you for your purchase";
        bag_items_cont.innerHTML = "";
        bag_items_cont.appendChild(HideTxt);

        bag_container.children[1].innerHTML =''; 
        bag_container.children[2].children[0].innerHTML = 0;
        total_price.innerHTML = 'empty';
        localStorage.clear();
        disc_block.style.display = "none";
        }
    }

    // Функция аппенда в контейнер

    function displayItem(){
      for(let i = 0; i < arrForRend.length; i++){
        bag_items_cont.appendChild(arrForRend[i]);
      }
    }    

    //Вспомогательная функция 

    function ParseToNum(prVal, flagBag, count){
        let flag = flagBag;
        let value = prVal;
        let currBagVal = bag_container.children[1].innerHTML; 
        let regCurrBagVal = Number(currBagVal.replace(/[^0-9.-]+/g,""));                                
        let regVal = Number(value.replace(/[^0-9.-]+/g,""));
        let count_ = Number(count);
        if(flag == 1){
            bag_container.children[1].innerHTML ='£' + (regCurrBagVal + regVal).toFixed(2); 
        }
        else if(flag == 0){
            bag_container.children[1].innerHTML ='£' + (regCurrBagVal - regVal).toFixed(2); 
           
        }
        else{
            let total = regVal * count_;
            bag_container.children[1].innerHTML ='£' + (regCurrBagVal - total).toFixed(2); 
            bag_container.children[2].children[0].innerHTML = Number(bag_container.children[2].children[0].innerHTML) - count_;  
        }
    }

     // Функция уникальности єллементов массива
  
     function ArrUnic(arr){
  
      for(let i = 0; i < arr.length; i++){
        for(let j = i + 1 ; j < arr.length; j++){
          if(arr[i].color == arr[j].color && arr[i].size == arr[j].size && arr[i].title == arr[j].title){
            arr.splice(j, 1);
            j--;
           }
        }
      }

    }

    // Основная Функция рендеринга

    function CreateItems(){
        let count = 0;
       
        ArrUnic(arrMatch);
        
        for(let i = 0; i < arrMatch.length; i++){
           for(let j = 0; j < arrAllobj.length; j++){
             if(arrMatch[i].color == arrAllobj[j].color && arrMatch[i].size == arrAllobj[j].size && arrMatch[i].title == arrAllobj[j].title){
               count++;
             }
           }
            let item = document.createElement('div');
            item.classList.add('shopping-bag-items-container__item');
            
            if(arrMatch[i].hasNew){
              new_block = document.createElement('div');
              new_block.innerHTML = 'NEW';
              new_block.classList.add('has-new');
              item.appendChild(new_block);
            }

            let wrap_for_overlay = document.createElement('div');
            wrap_for_overlay.classList.add('wrap-for-overlay');
            let item_overlay = document.createElement('div');
            item_overlay.classList.add('item-overlay'); 
            let hov_text = document.createElement('p'); 
            hov_text.classList.add('hov-text');
            hov_text.innerHTML = 'View item';
            let myImage = new Image();
            myImage.src = arrMatch[i].preview;
            myImage.setAttribute('alt', 'product picture');
            
            wrap_for_overlay.appendChild(item_overlay);
            wrap_for_overlay.appendChild(hov_text);
            wrap_for_overlay.appendChild(myImage);

            let item_descr = document.createElement('div');
            item_descr.classList.add('shopping-bag-items-container__description');
            let tmp = document.createElement('h4');
            tmp.innerHTML = arrMatch[i].title;
            item_descr.appendChild(tmp);
            tmp = document.createElement('p');
            tmp.innerHTML = arrMatch[i].price;
            item_descr.appendChild(tmp);

            let item_color = document.createElement('div');
            item_color.classList.add('shopping-bag-items-container__item-color');
            let span = document.createElement('span');
            span.innerHTML = 'Color:';
            item_color.appendChild(span);
            span = document.createElement('span');
            span.innerHTML = arrMatch[i].color;
            item_color.appendChild(span);
            
            item_descr.appendChild(item_color);

            let item_size = document.createElement('div');
            item_size.classList.add('shopping-bag-items-container__item-size');
            span = document.createElement('span');
            span.innerHTML = 'Size:';
            item_size.appendChild(span);
            span = document.createElement('span');
            span.innerHTML = arrMatch[i].size;
            item_size.appendChild(span);
            
            item_descr.appendChild(item_size);

            let quant_container = document.createElement('div');
            quant_container.classList.add('shopping-bag-items-container__item-quantity');   
            span = document.createElement('span');
            span.innerHTML = 'Quantity:';
            quant_container.appendChild(span);
            myImage = new Image();
            myImage.src = 'img/minus.png';
            myImage.classList.add('minus-icon');
            myImage.setAttribute('alt', 'minus-icon');
            myImage.onclick = function(){
              countMinus(item_descr);                   // Вешаем событие удаления
            }
            quant_container.appendChild(myImage);
            span = document.createElement('span');
            span.innerHTML = count;
            quant_container.appendChild(span);
            myImage = new Image();
            myImage.src = 'img/plus.png';
            myImage.classList.add('plus-icon');
            myImage.setAttribute('alt', 'plus-icon');
            myImage.onclick = function(){
              countPlus(item_descr);                   // Вешаем событие Прибавления
            }
            quant_container.appendChild(myImage);

            item_descr.appendChild(quant_container);
            
            let rem_div = document.createElement('div');
            rem_div.classList.add('remove-item');
            rem_div.innerHTML = "Remove item";
            rem_div.onclick = function(){
              removeElement(item_descr);     // Вешаем событие Полного удаления эллемента
            }

            item_descr.appendChild(rem_div);

            item.appendChild(wrap_for_overlay);
            item.appendChild(item_descr);
            
            arrForRend.push(item);
            
            count = 0;
          
           }
           
           // Вложенные вспомогательные функции

           function countMinus(div){

            let quantity  = parseInt(div.children[4].children[2].innerHTML);
            div.children[4].children[2].innerHTML = --quantity ;
            let price = div.children[1].innerHTML;

            ParseToNum(price, 0, quantity);

            price = bag_container.children[1].innerHTML;
            APPOBJ.hydration('total_value',price);
            total_price.children[1].innerHTML = price;

            if(div.children[4].children[2].innerHTML == 0){
              bag_items_cont.removeChild(div.parentNode);
            }
            let color = div.children[2].children[1].innerHTML;
            let size = div.children[3].children[1].innerHTML;
            let title = div.children[0].innerHTML;

            for(let j = 0; j < arrAllobj.length; j++){
              
              if(color == arrAllobj[j].color && size == arrAllobj[j].size && title == arrAllobj[j].title){
                arrAllobj.splice(j, 1);
                break;
              }
            }
            localStorage.clear();
            APPOBJ.hydration('items_Array',arrAllobj);
            APPOBJ.hydration('total_value',price);
            bag_container.children[2].children[0].innerHTML = arrAllobj.length;

              if(arrAllobj.length == 0){
                let HideTxt = document.createElement('p');
                HideTxt.classList.add('bag-empty-text');
                HideTxt.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
                bag_items_cont.innerHTML = "";
                bag_items_cont.appendChild(HideTxt);
                total_price.innerHTML = 'empty';
                bag_container.children[1].innerHTML = "";
                localStorage.clear();
                disc_block.style.display = "none";
              }

            }

            function countPlus(div){
              let indx = 0;
              let quantity  = parseInt(div.children[4].children[2].innerHTML);
              div.children[4].children[2].innerHTML = ++quantity ;
              let price = div.children[1].innerHTML;

              ParseToNum(price, 1, quantity);

              price = bag_container.children[1].innerHTML;
              APPOBJ.hydration('total_value',price);
              total_price.children[1].innerHTML = price;

              let color = div.children[2].children[1].innerHTML;
              let size = div.children[3].children[1].innerHTML;
              let title = div.children[0].innerHTML;
  
                for(let j = 0; j < arrAllobj.length; j++){
                if(color == arrMatch[j].color && size == arrMatch[j].size && title == arrMatch[j].title){
                  indx = j;
                  break;
                }
              }

             createObj(indx);
            
            }
            function createObj(i){
              let tmpObj = new function(){
                this.title = arrMatch[i].title ;
                this.price = arrMatch[i].price;
                this.hasNew = arrMatch[i].hasNew;
                this.color = arrMatch[i].color;
                this.size = arrMatch[i].size;
                this.preview = arrMatch[i].preview;
              }
              
              arrAllobj.push(tmpObj);
              arrMatch.push(tmpObj);
              let JSodj = JSON.stringify(arrAllobj);
              window.localStorage.setItem("items_Array", JSodj);

              bag_container.children[2].children[0].innerHTML = arrAllobj.length;
          }

          function removeElement(div){
            let quantity = parseInt(div.children[4].children[2].innerHTML);
            div.children[4].children[2].innerHTML = quantity ;
            let price = div.children[1].innerHTML;
           
            ParseToNum(price, 2, quantity);

            price = bag_container.children[1].innerHTML;
            APPOBJ.hydration('total_value',price);
            total_price.children[1].innerHTML = price;

            let color = div.children[2].children[1].innerHTML;
            let size = div.children[3].children[1].innerHTML;
            let title = div.children[0].innerHTML;


            for(let j = 0; j < arrAllobj.length; j++){
              
              if(color == arrAllobj[j].color && size == arrAllobj[j].size && title == arrAllobj[j].title){
                arrAllobj.splice(j, 1);
                j--;
              }
            }

            localStorage.clear();
            APPOBJ.hydration('items_Array',arrAllobj);
            APPOBJ.hydration('total_value',price);
            bag_container.children[2].children[0].innerHTML = arrAllobj.length;

            bag_items_cont.removeChild(div.parentNode); 
            if(arrAllobj.length == 0){
              let HideTxt = document.createElement('p');
              HideTxt.classList.add('bag-empty-text');
              HideTxt.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
              bag_items_cont.innerHTML = "";
              bag_items_cont.appendChild(HideTxt);
              total_price.innerHTML = 'empty';
              bag_container.children[1].innerHTML = "";
              localStorage.clear();
              disc_block.style.display = "none";
            }
         }
           
        }

      
  
     

      
    
}