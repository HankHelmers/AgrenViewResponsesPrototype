console.log("Entry from javascript files");


import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    onSnapshot,
} from "firebase/firestore";

// Connect to user input database
const firebaseConfig = {
    apiKey: "AIzaSyAfLcvj52n2D-m0g09tzNBuAeROJwXtRu0",
    authDomain: "williamson-surveying-tool.firebaseapp.com",
    databaseURL: "https://williamson-surveying-tool-default-rtdb.firebaseio.com",
    projectId: "williamson-surveying-tool",
    storageBucket: "williamson-surveying-tool.appspot.com",
    messagingSenderId: "860294126553",
    appId: "1:860294126553:web:470b32b4f0162c98fc57c8",
    measurementId: "G-CXJ9TJRR0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// get all responses
const colRef = collection(db, "responses");

// Define chart options
const font = {
        size: 20,
    }

const chartOptions = {
    scales: {
        x: {
            title: {
                display: true,
                text: 'Trait distortion',
                font: font
            },
            min: 0,
            max: 10,
        },
        y: {
            title: {
                display: true,
                text: 'Transmission distortion',
                font: font,
            },
            min: 0,
            max: 10,
        }
    },
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
            }
        }
    }
};

var data = {
    datasets: []
  };

  /*
  data: {
        datasets: [
            {
                label: 'test',
                type: 'scatter',
                data: [{x: 5, y: 10}],
                pointRadius: 20,
            }
        ]
    }*/
  
// Initialize chart
var myChart = new Chart(document.getElementById('myChart'), {
    type: 'scatter',
    data,
    options: chartOptions
});

const mapOfEvolution = new Map();
mapOfEvolution.set(0, 'transposable_elments')
mapOfEvolution.set(1, 'female_meiotic_drive')
mapOfEvolution.set(2, 'cancer')
mapOfEvolution.set(3, 'cytoplasmic_elements2')
mapOfEvolution.set(4, 'genomic_imprinting')
mapOfEvolution.set(5, 'greenbeard_genes')
mapOfEvolution.set(6, 'non_selfish_elements')

// Function to update chart with new data
// populate datasets for the first time
const setupChart = async () => {
    const result = await initializeDatasets()
}
setupChart();

function initializeDatasets() {
    console.log("initialize datasets")
    mapOfEvolution.forEach((values, keys) => {
        data.datasets.push({
            type: 'scatter',
            label: values,
            data: [],
            pointRadius: [],
        });
    })

    return true;
}

function updateChartWithResponses(surveyResponse) {
    //Populate with new datasets
    surveyResponse.forEach((response) => {
        console.log(response.key)
        console.log(data.datasets)

        data.datasets[response.key].data.push(
            {x: response.data.x, y: response.data.y}
        );

        data.datasets[response.key].pointRadius.push(
            response.circle_size
        )
    });

    // Update chart
    myChart.update();
}

// Retrieve data from Firestore
onSnapshot(colRef, (snapshot) => {
    var surveyResponse = [];

    snapshot.docs.forEach((doc) => {
        surveyResponse.push({
            ...doc.data(),
            id: doc.id,
            evolProcess: doc.evolProcess,
        });
    });

    updateChartWithResponses(surveyResponse);
});



// // retrieve documents collection data
// onSnapshot(colRef, (snapshot) => {
//     var surveyResponse = [];

//     snapshot.docs.forEach((doc) => {
//         surveyResponse.push({
//             ...doc.data(),
//             id: doc.id,
//             evolProcess: doc.evolProcess,
//         });
//     });

//     populateData(surveyResponse);
//     myChart.update();
//     console.log(myChart.config.data.datasets)
// });

// // define chart
// const font = {
//     size: 20,
// }

// var myChart = new Chart(
//     document.getElementById('myChart'), {
//     options: {
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Trait distortion',
//                     font: font
//                 },
//                 min: 0,
//                 max: 10,
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Transmission distortion',
//                     font: font,
//                 },
//                 min: 0,
//                 max: 10,
//             }
//         },

//         plugins: {
//             legend: {
//                 labels: {
//                     usePointStyle: true,
//                 }
//             }
//         },

//     }
// }
// );

// // retrieve data
// var dataPointsCnt = 0;

// const mapOfEvolution = new Map();
// mapOfEvolution.set(0, 'transposable_elments')
// mapOfEvolution.set(1, 'female_meiotic_drive')
// mapOfEvolution.set(2, 'cancer')
// mapOfEvolution.set(3, 'cytoplasmic_elements2')
// mapOfEvolution.set(4, 'genomic_imprinting')
// mapOfEvolution.set(5, 'greenbeard_genes')
// mapOfEvolution.set(6, 'non_selfish_elements')


// function populateData(surveyResponse) {
//     surveyResponse.forEach((response) => {
//         console.log('added response')

//         // populate database
//         // myChart.config.data.datasets
//         //   myChart.config.data.datasets[currSelectionKey].data[0] = { x: dataX, y: dataY };

//         myChart.config.data.datasets.push({
//             type: 'scatter',
//             label: mapOfEvolution.get(response.key),
//             data: response.data,
//             pointRadius: response.circle_size
//         })
        
//         // myChart.config.data.datasets[dataPointsCnt].type = 'scatter'
//         // myChart.config.data.datasets[dataPointsCnt].label = mapOfEvolution.get(response.key)
//         // myChart.config.data.datasets[dataPointsCnt].data[0] = response.data
//         // myChart.config.data.datasets[dataPointsCnt].pointRadius = response.circle_size

//         // dataPointsCnt++;
//     });
// }
