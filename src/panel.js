import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Slider, Button } from "antd";




class Panel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            color: '#F646AB'
        }
    }

    disableButtons(){
        const buttons = document.getElementsByClassName('sort-click');
        
        for(let i=0;i<buttons.length;i++){
            buttons[i].disabled = true;
        }
    }

    enableButtons(){
        const buttons = document.getElementsByClassName('sort-click');
        for(let i=0;i<buttons.length;i++){
            buttons[i].disabled = false;
        }
    }

    resetColors(){
        const cols = document.getElementsByClassName('column');
        for(let i=0;i<cols.length;i++){
            cols[i].style.backgroundColor = this.state.color;
        }
    }


    swap(num1, num2){
        return [num2, num1];
    }

    animation(index1, index2, milisecs){

        const columns = document.getElementsByClassName('column');

        setTimeout(() => {
            var temp = columns[index1].style.height;
            columns[index1].style.height = columns[index2].style.height;
            columns[index2].style.height = temp;
        }, milisecs);
    }

    randNum(){
        return Math.floor(Math.random()*500);
    }

    generateArray(){
        const nums = [];
        var rand;
        for(let i=0;i<160;i++){
            rand = this.randNum();
            nums.push(rand);
        }
        this.setState({array: nums});
        this.setState({color: '#F646AB'});
        this.resetColors();
        let cols = document.getElementsByClassName('column');
        for(let i=0;i<cols.length;i++){
            cols[i].style.width = '3px';
        }
    }


    componentDidMount(){
        this.generateArray();
    }

    colorAnimation(index1, index2, milisecs){

        const columns = document.getElementsByClassName('column');

        setTimeout(() => {
            var temp3 = columns[index1].style.backgroundColor;
            columns[index1].style.backgroundColor = columns[index2].style.backgroundColor;
            columns[index2].style.backgroundColor = temp3;
        }, milisecs);

    }

    bubbleSort(numbers){

        this.disableButtons();

        let milisecs = 100;
        for(let j=0;j<numbers.length-1;j++){
            let counter = 0;
            setTimeout(() => {
                document.getElementsByClassName('column')[counter].style.backgroundColor = '#5FDA70';
                counter++;
            }, milisecs+2);

            for(let k=0;k<numbers.length-j-1;k++){
                milisecs+=2;
                if(numbers[k]>numbers[k+1]){  
                    [numbers[k], numbers[k+1]] = this.swap(numbers[k], numbers[k+1]);
                    this.animation(k, k+1, milisecs);
                    this.colorAnimation(k, k+1, milisecs);
                }else{
                    this.colorAnimation(k, k+1, milisecs);
                }
            }
        }

        setTimeout(() => {
            const cols = document.getElementsByClassName('column');
            for(let a=0;a<cols.length;a++){
                if(cols[a].style.backgroundColor !== '#5FDA70'){
                    cols[a].style.backgroundColor = '#5FDA70';
                }
            }
            this.enableButtons();
        }, milisecs);
    }


    selectionSort(numbers){

        this.disableButtons();

        var minIndex;
        let milisecs = 100;

        for(let i=0;i<numbers.length;i++){
            minIndex = i;
            
            for(let j=i+1;j<numbers.length;j++){
                
                if(numbers[minIndex]>numbers[j]){
                    minIndex = j;
                    
                }
            }
            let counter = minIndex;
            setTimeout(() => {
                document.getElementsByClassName('column')[counter].style.backgroundColor = '#5FDA70';
            }, milisecs);
        
            [numbers[minIndex], numbers[i]] = this.swap(numbers[minIndex], numbers[i]);
            milisecs += 100;
            this.animation(minIndex, i, milisecs);
            this.colorAnimation(minIndex, i, milisecs);
        }

        setTimeout(() => {
            this.enableButtons();
        }, milisecs);
    }

    async partition(numbers, low, high){
        let i = low;
        let pivot = numbers[high];
        let cols = document.getElementsByClassName('column');
        
        for(let j=low;j<high;j++){
            cols[j].style.backgroundColor = '#5FDA70';
            if(numbers[j]<pivot){
                await this.sleep(16);
                [numbers[j], numbers[i]] = this.swap(numbers[j], numbers[i]);
                let temp = cols[j].style.height;
                cols[j].style.height = cols[i].style.height;
                cols[i].style.height = temp;
                let tempColor = cols[high].style.backgroundColor;
                cols[high].style.backgroundColor = cols[i].style.backgroundColor;
                cols[i].style.backgroundColor = tempColor;
                i++; 
            }
        }
        await this.sleep(9);
        [numbers[i], numbers[high]] = this.swap(numbers[i], numbers[high]);
        let temp = cols[high].style.height;
        cols[high].style.height = cols[i].style.height;
        cols[i].style.height = temp;
        return i;

    }

    async quickSort(numbers, low, high){

        if(low<high){

            let pivotIndex = await this.partition(numbers, low, high);
    
            await this.quickSort(numbers, low, pivotIndex-1);
            await this.quickSort(numbers, pivotIndex+1, high);

        }

    }

    async triggerQuickSort(numbers, low, high){
        this.disableButtons();
        await this.quickSort(numbers, low, high);
        this.enableButtons();
    }

    mergeSort(numbers, start,  end, changes){

        if(start!==end){
            let middle = Math.floor((start+end)/2);
            this.mergeSort(numbers, start, middle, changes);
            this.mergeSort(numbers, middle+1, end, changes);
            this.merge(numbers, start, middle, end, changes);
        }
    }

    merge(numbers, start, middle, end, changes){

        const sorted = [];
            
        let i = start;    
        let j = middle+1;         

        while(i<=middle && j<=end){
            if(numbers[i]>numbers[j]){
                
                changes.push([start+sorted.length, numbers[j]]);
                sorted.push(numbers[j]); 
                j++;
            }else{
                changes.push([start+sorted.length, numbers[i]]);
                sorted.push(numbers[i]);
                i++;
            }
        }        

        while(i<=middle){
            changes.push([start+sorted.length, numbers[i]]);
            sorted.push(numbers[i]);
            
            i++;
        }

        while(j<=end){
            changes.push([start+sorted.length, numbers[j]]);
            sorted.push(numbers[j]);
            
            j++;
        }
        for (let k = start; k <= end; k++) {
            numbers[k] = sorted[k - start];
        }
    }

    async mergeSortAnimation(changes){
        this.disableButtons();
        await this.sleep();
        let columns = document.getElementsByClassName('column');
        for(let i=0;i<changes.length;i++){
            await this.sleep(8);
            let [index, value] = changes[i];
            columns[index].style.height = `${value}px`;
            columns[index].style.backgroundColor = '#5FDA70';
        }
        this.enableButtons();
    }

            

    

    heapify(numbers, n, i){
        let largest = i;
        let l = 2*i+1;
        let r = 2*i+2;
        let cols = document.getElementsByClassName('column');

        if(l<n && numbers[i]<numbers[l]){
            largest = l;
        }
        if(r<n && numbers[largest]<numbers[r]){
            largest = r;
        }

        if(largest !== i){
            [numbers[i], numbers[largest]] = this.swap(numbers[i], numbers[largest]);
            let temp = cols[i].style.height;
            cols[i].style.height = cols[largest].style.height;
            cols[largest].style.height = temp;
            this.heapify(numbers, n, largest);
        }

    }

    async heapSort(numbers){

        this.disableButtons();
        let size = numbers.length;
        let cols = document.getElementsByClassName('column');

        for(let i=Math.floor(size/2-1);i>-1;i--){
            this.heapify(numbers, size, i);
        }

        for(let i=size-1; i>0;i--){
            cols[i].style.backgroundColor = '#5FDA70';
            await this.sleep(100);
            [numbers[i], numbers[0]] = this.swap(numbers[i], numbers[0]);
            let temp = cols[i].style.height;
            cols[i].style.height = cols[0].style.height;
            cols[0].style.height = temp;
            this.heapify(numbers, i, 0);
        }

        cols[0].style.backgroundColor = '#5FDA70';
        this.enableButtons();

    }

    sleep(milisecs){
        return new Promise(resolve => setTimeout(resolve, milisecs));
    }

    async insertionSort(numbers){

        this.disableButtons();

        for(let i=1;i<numbers.length;i++){
            let columns = document.getElementsByClassName('column');
            let minIndex = i;
            let unsorted = numbers[minIndex];
            let j = i-1;
            
            while(j >= 0 && unsorted<numbers[j]){
                await this.sleep(6);
                for(let k=0;k<=j;k++){
                    columns[k].style.backgroundColor = '#5FDA70';
                }
                [numbers[minIndex], numbers[j]] = this.swap(numbers[minIndex], numbers[j]);
                let temp = columns[minIndex].style.height;
                let tempColor = columns[minIndex].style.backgroundColor;
                columns[minIndex].style.height = columns[j].style.height;
                columns[j].style.height = temp;
                columns[minIndex].style.backgroundColor = columns[j].style.backgroundColor;
                columns[j].style.backgroundColor = tempColor;
                minIndex = j;
                j--;
            }

        }

        let cols = document.getElementsByClassName('column');;

        for(let i=0;i<cols.length;i++){
            if(cols[i].style.backgroundColor !== '#5FDA70'){
                cols[i].style.backgroundColor = '#5FDA70';
            }
        }
        
        this.enableButtons();

    }

    mergeSortCombine(numbers, start, end){
        const changes = [];
        this.mergeSort(numbers, start, end, changes);
        this.mergeSortAnimation(changes);
    }




    render(){

        const cols = [];
        

        for(let i=0;i<this.state.array.length;i++){
            cols.push(<div key={i} className='column' style={{height: this.state.array[i], backgroundColor: this.state.color}}/>)
        }

        const changeSize = (value) => {
            let cols = document.getElementsByClassName('column');
            let val = value - this.state.array.length;

            if(val>0){
                let arr = this.state.array;
                while(val>0){
                    arr.push(this.randNum());
                    val--;
                }
                this.setState({array: arr});
                if(this.state.array.length<50){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '12px';
                    }
                }else if(this.state.array.length>=50 && this.state.array.length<126){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '6px';
                    }
                }else if(this.state.array.length>=126){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '3px';
                    }
                }
            }else if(val<0){
                let arr = this.state.array;
                while(val<0){
                    arr.pop();
                    val++;
                }
                this.setState({array: arr});
                if(this.state.array.length<50){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '12px';
                    }
                }else if(this.state.array.length>=50 && this.state.array.length<126){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '6px';
                    }
                }else if(this.state.array.length>=126){
                    for(let i=0;i<cols.length;i++){
                        cols[i].style.width = '3px';
                    }
                }

            }


        }


        const refresh = () => {
            let cols = document.getElementsByClassName('column');
            for(let i=1;i<cols.length;i++){
                cols[i].style.width = cols[0].style.width;
            }
        }

        
        return(

            <div>
                <div style={{paddingLeft: '180px'}}>
                <Button type="primary" className="sort-click" onClick={()=> this.generateArray()} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Generate New Array</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.bubbleSort(this.state.array)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Bubble Sort</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.selectionSort(this.state.array)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Selection Sort</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.mergeSortCombine(this.state.array, 0, this.state.array.length-1)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Merge Sort</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.triggerQuickSort(this.state.array, 0, this.state.array.length-1)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Quick Sort</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.heapSort(this.state.array)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Heap Sort</Button>
                <Button type="primary" className="sort-click" onClick={()=> this.insertionSort(this.state.array)} style={{backgroundColor:'#242F43', color:'#FFCB35', border:'1px solid #FFCB35'}}>Insertion Sort</Button>
                <Slider className='sliders' style={{width: '88px', float: 'left', marginLeft:'20px', marginTop:'46px'}} onChange={changeSize} min={1} max={250} onAfterChange={refresh} value={cols.length}/>
                </div>
            <div className="cols_container" style={{float: 'left', marginTop: '54px', marginLeft:'226px', transform:'scaleY(-1)'}}>

                {cols}
                
            </div>
            </div>
        );
    }

}

export default Panel;