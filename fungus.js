class Fungus {
  constructor(pos, colour) {
    this.pos = pos;
    this.colour = colour;
    this.pixels = [];
  }

  Shroom() {
    let newPoint = this.pos;
    let x = 0;
    while (x < 1) {
      let points = this.Adjacent(newPoint);
      console.log(points);
      points = this.Shuffle(points);
      console.log(points);

      let tempDict = Dictionary.CreateDictionary(points, this.MakeValues(points, this.pixels));
      //console.log(tempDict);
      tempDict = Dictionary.ValueSort(tempDict);
      //console.log(tempDict);
      newPoint = tempDict[0].key;

      if (this.pixels.includes(newPoint)) {
        let index = this.pixels.findindex(newPoint);
        if (this.pixels[index].value < 239) {
          this.pixels[index].value += 16;
        } else {
          this.pixels.push(new Dictionary(newPoint, 30));
        }
      }

      if (this.colour == "blue") {
        console.log(this.pos);
        stroke("blue");
        point(this.pos);
      }
      x++;
    }
  }

  MakeValues(points) {
    let stuff = [];
    let index;
    for (let i = 0; i < points.length; i++) {
      
      index = this.pixels.indexOf(points[i]);
      if (index >= 0) {
        stuff.push(this.pixels[index]);
      } else {
        stuff.push(0);
      }
    }
    return stuff;
  }
  Adjacent(posA) {
    let temp = [];
    let tempPoint;
    
    console.log('POSA:' + posA.x);

    for (let i = -1; i < 2; i++) {
      for (let l = -1; l < 2; l++) {
        tempPoint = createVector(posA.x + i, posA.y + l);
        if (!posA.equals(tempPoint)) temp.push(tempPoint);
      }
    }
    console.log(temp);
    temp = temp.filter((p) => p.x > 0 && p.x < 999 && p.y > 0 && p.y < 999);
    console.log(temp);
    

    return temp;
  }

  Shuffle(sourceList) {
    let j = 0;
    let stuff = sourceList;

    for (let i = 0; i < stuff.length; i++) {
      j = random(i, stuff.length);
      let temp = stuff[i];
      stuff[i] = stuff[j];
      stuff[j] = temp;
    }

    return stuff;
  }
}

