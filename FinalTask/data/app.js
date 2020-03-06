window.APPOBJ = {
    // Функция Хидрации
    hydration: function (name,element){
        let JSodj = JSON.stringify(element);
        window.localStorage.setItem(name, JSodj);
    },
    // Функция рехидрации
    rehydration: function(name,element){
        let tmp = JSON.parse(localStorage.getItem(name));
        
        if(Array.isArray(element)) {
            for(let i = 0; i < tmp.length; i++){
            element.push(tmp[i]);
           
            }
            return element;
        }
        else return element = tmp;

        }   
}