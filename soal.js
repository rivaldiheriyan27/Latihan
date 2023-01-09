function namaVar(){
    var a = 2;
    var b = 4;

    var c = b - a



    console.log("ini adalah nilai a" ,a) ;
    console.log("ini adlaah nilai b" ,b );


    a = b
    b = b - c



    console.log("ini adalah nilai terbaru a" ,a) ;
    console.log("ini adlaah nilai terbaru b" ,b );

    a -= b;
    b += a;
    a = -(a) + b;

    console.log("ini adalah nilai terbaru a" ,a) ;
    console.log("ini adlaah nilai terbaru b" ,b );

}

// namaVar();

function terbalik(){

    let a = ""
    let n = 5
   
    for ( let i = 1; i <= n; i++ ) {
        // a += "*"

        for (let j = 0; j < n - i; j++) {
            a += " "

        }

        for (let k = 0; k < i; k++) {
            a += "*"

        }

        a += "\n"
        

        // if ( )
    }

    console.log(a);


}

terbalik();

// function diamond() {
// let n = 5;
// let string = "";
// // External loop
// for (let i = 1; i <= n; i++) {
//   // printing spaces
//   for (let j = 1; j <= n - i; j++) {
//     string += " ";
//   }
//   // printing star
//   for (let k = 0; k < 2 * i - 1; k++) {
//     string += "*";
//   }
//   string += "\n";
// }

// let m = 5;
// let stringM = "";
// // External loop
// for (let i = 0; i < m; i++) {
//   // printing spaces
//   for (let j = 0; j < i; j++) {
//     string += " ";
//   }
//   // printing star
//   for (let k = 0; k < 2 * (m-i) - 1; k++) {
//     string += "*";
//   }
//   string += "\n";
// }

// console.log(string);
// console.log(stringM);
// }

// diamond()

function palindrom(){


}


