it('sem testes ainda', ( ) => {})
    
//     const getSomething = (callback) => {
//         setTimeout(() => {
//             callback(12);
//             // return 11;
//         }, 2000)   
//     }
    
//     const system = () => {
//         console.log('init');
//         // const something = getSomething();
//         getSomething(some => {
//             console.log(`Somwthing is ${some}`);
//         // console.log(`Something is ${something}`);
//             console.log('end');
//         })
//     }
// system ();

const getSomething = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve(14);
       },2000)
    
    })
}

// const system = () => {
//     console.log('init');
//     // const something = getSomething();
//     getSomething().then(some => {
//         console.log(`Something is ${some}`)
//     })
//         console.log('end');
// }

const assincrona = async () => {
    console.log('init');
    const some = await getSomething();
    console.log(`Something is ${some}`)
    console.log('end');
}



// system ();
assincrona();