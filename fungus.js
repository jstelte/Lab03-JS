class Fungus{
  
    constructor(pos, colour){
      
      this.pos = pos;
      this.colour = colour;
      this.pixels = {};
      
    }
    
    Shroom(){
      
      newPoint = this.pos;
      while(true){
        
        let points = Adjacent(newPoint);
        points = Shuffle(points);
        
        let tempDict = CreateDictonary(points);
        
      }
      
      
    }
    
    Adjacent(pos){
      
      let temp = new List();
      let tempPoint;
      
      for(let i = -1; i < 2; i++){
        for(let l = -1; l < 2; l++){
          tempPoint = createVector(pos.x + i, pos.y + l);
          if(!(pos.equals(tempPoint)))
            temp.push(tempPoint);
        }
      }
      
      temp.deleteEach((p) => p.x < 0 || p.x > 999 || p.y < 0 || p.y > 999);
      
      return temp;
      
    }
    
    Shuffle(sourceList){
      
      let j = 0;
      let stuff = sourceList;
      
      for(let i = 0; i < stuff.length; i++){
          j = random(i, stuff.length);
        let temp = stuff[i];
        stuff[i] = stuff[j];
        stuff[j] = temp;
        
      }
      
      return stuff;
      
    }
    
    
  }