function BullsAndCows (props = {}){
    this._props = props;
    this.createField()
    this.startGame = document.querySelectorAll('.js-start');
    this.startGame.forEach((el) => {
        el.addEventListener('click',this.start.bind(this));
    })
    this._currentTurn = 0;
    this._winGame = false;
    this._turn = document.querySelector('.game-bc__turn');

    this.imgArray = document.querySelectorAll('.js-open-modal');
    this.imgArray.forEach((item)=>{
        item.addEventListener('click', this.modalShow.bind(this, item))
    });

    this.error = document.querySelector('.error')
    this.rulesMain = document.querySelector('.rules-main')
    this.continueBtns = document.querySelectorAll('.cont-js');
    this.continueBtns.forEach((btn)=> {
        btn.addEventListener('click', this.continue.bind(this));
    })
}

//  working with modals

BullsAndCows.prototype.continue = function () {
    this.error.classList.remove('is-show');
    this.rulesMain.classList.remove('is-show');
    this.cellNumberTd.firstChild.focus();
}

BullsAndCows.prototype.modalShow = function (item) {
    event.preventDefault();
    this.showModal(item);
}

BullsAndCows.prototype.showModal = function (item) {
    this.hideAllModal();
    modalName = item.getAttribute('data-modal');
    modal = document.querySelector('.js-modal[data-modal="' + modalName + '"]');
    modal.classList.add('is-show');
}

BullsAndCows.prototype.hideAllModal = function () {
    allShowArr = document.querySelectorAll('.is-show');
    allShowArr.forEach((e)=>{
        e.classList.remove('is-show');
    });
}

// Generate field
BullsAndCows.prototype.randomNumber = function (){
    return Math.round(Math.random() * (10000 - 100)) + 100;
}

BullsAndCows.prototype.randomNumberToString = function() {
    do {
        this._string = `${this.randomNumber().toString().padStart(4, '0')}`;
    } while(!this.verification(this._string));
}

BullsAndCows.prototype.render = function () {
    let numberToGes = document.querySelectorAll('.js-number')
    numberToGes.forEach((elem) => {
        elem.innerText = this._string;
    })
}

BullsAndCows.prototype.verification = function (check){
    console.log(check);
    for (let i=0; i<4; i++){
        for(let j=i+1; j<4; j++){
            if (check[i]===check[j]){
                return false;
            }
        }
    }
    return true;
}

BullsAndCows.prototype.checkBullsAndCows = function (usernumber) {
    let bulls = 0;
    let cows = 0;
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (usernumber[i]===this._string[j]){
                if (i===j) {continue}
                cows++
            }
        }
        if (usernumber[i]===this._string[i]){
            bulls++
        }
    }
    this.drow(bulls, cows);
    
    if (bulls === 4){
        this._winGame = true
    }
}

BullsAndCows.prototype.drow = function (bullsQuantity, cowsQuantity){
    let drawBulls = document.querySelector('.bull_'+this._currentTurn);
    let drawCows = document.querySelector('.cow_'+this._currentTurn);
    drawBulls.innerHTML = bullsQuantity;
    drawCows.innerHTML = cowsQuantity;
}

BullsAndCows.prototype.start = function() {
    this._winGame = false;
    this.fieldClean();
    this.randomNumberToString();
    this._currentTurn = 0;
    this.createInputNumber();
}

BullsAndCows.prototype.createField = function () {
    for (let i=0; i<10; i++){
        let row = document.createElement('div');
        row.className = 'lines';
        let columnTurn = document.createElement('div');
        columnTurn.className = 'turn';
        columnTurn.innerHTML = i+1;
        let columnNumber = document.createElement('div');
        columnNumber.classList = 'number_all number_'+(i); // ???????????????? ?????????? ???????????? ?????? ?????? ??????????????
        let columnBull = document.createElement('div');
        columnBull.className = 'bulls_all bull_'+(i);
        let columnCow = document.createElement('div');
        columnCow.className = 'cows_all cow_'+(i);
        let columnAccept = document.createElement('div');
        columnAccept.className = 'accept accept_'+(i);
        row.append(columnTurn);
        row.append(columnNumber);
        row.append(columnBull);
        row.append(columnCow);
        row.append(columnAccept);
        let createTable = document.querySelector('.bac__table');
        createTable.append(row);
    }
}

BullsAndCows.prototype.createAccept = function () {
    let acceptWrap = document.querySelector('.accept_'+this._currentTurn);
    let accept = document.createElement('button')
}

BullsAndCows.prototype.createInputNumber = function (){
    this.cellNumberTd = document.querySelector('.number_'+this._currentTurn);
    let createInput = document.createElement('input')
    createInput.setAttribute('size',2);
    createInput.setAttribute('maxlength',4)
    createInput.addEventListener('keypress', (event) => {
        if (event.keyCode ===13) {
            event.preventDefault()
            createInput.value = createInput.value.padStart(4,'0')
            if (this.verification(createInput.value)) {
                createInput.setAttribute('disabled','disabled')
                this.checkBullsAndCows(createInput.value);
                if (this._winGame){
                    win = document.querySelector('.win').classList.add('is-show');
                    this.render();
                } else if (this._currentTurn===9){
                    lose = document.querySelector('.lose').classList.add('is-show');
                    this.render();
                }
                else {
                    this.acceptWrap.removeChild(this.acceptWrap.firstChild);
                    this.acceptWrap.append(fail);
                    this._currentTurn++;
                    this._turn.innerHTML = this._currentTurn+1;
                    this.createInputNumber();
                }
            } else {
                this.error.classList.add('is-show');
                createInput.value = '';
            }
        }
    });

    this.acceptWrap = document.querySelector('.accept_'+this._currentTurn);
    let accept = document.createElement('img');
    accept.setAttribute("src", "img/modals/apply.png")
    accept.className = 'accept_img';
    let fail = document.createElement('div');
    fail.className = 'failed';
    fail.innerHTML = 'FAILED';
    accept.addEventListener('click', () => {
        if (this.verification(createInput.value)) {
            createInput.setAttribute('disabled','disabled');
            this.checkBullsAndCows(createInput.value);
            if (this._winGame){
                win = document.querySelector('.win').classList.add('is-show');
                this.render();
            } else if (this._currentTurn===9){
                lose = document.querySelector('.lose').classList.add('is-show');
                this.render();
            }
            else {
                this.acceptWrap.removeChild(this.acceptWrap.firstChild);
                this.acceptWrap.append(fail);
                this._currentTurn++;
                this._turn.innerHTML = this._currentTurn+1;
                this.createInputNumber();
            }
        } else {
            this.error.classList.add('is-show');
            createInput.value = '';
        }
    });

    this.acceptWrap.append(accept);
    this.cellNumberTd.append(createInput);
    createInput.focus();
}

BullsAndCows.prototype.fieldClean = function() {
    for (let i=0; i<=this._currentTurn; i++){
        let cleanNumber = document.querySelector('.number_'+i);
        while (cleanNumber.firstChild){
            cleanNumber.removeChild(cleanNumber.firstChild);
        }
        let cleanAccept = document.querySelector('.accept_'+i);
        while (cleanAccept.firstChild){
            cleanAccept.removeChild(cleanAccept.firstChild);
        }
        let cleanBull = document.querySelector('.bull_'+i);
        cleanBull.innerHTML = '';
        let cleanCow = document.querySelector('.cow_'+i);
        cleanCow.innerHTML = '';
        this._turn.innerHTML = 1;
    }
    let cleanRandomNumber = document.querySelectorAll('.js-number')
    cleanRandomNumber.forEach((elem) => {
        elem.innerHTML = '';
    })
}