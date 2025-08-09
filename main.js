import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import HeatmapLayer from 'ol/layer/Heatmap.js';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector.js';
import Papa from 'papaparse';

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
}

function loadCsvPoints(rankFilter, callback) {
    Papa.parse('./data/test.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            const features = results.data
                .filter(row => row.bldg_deter_idx_rank === rankFilter)
                .map(row => new Feature({
                    geometry: new Point(fromLonLat([row.st_x, row.st_y])),
                    weight: 1
                }));
            callback(features);
        }
    });
}

let currentRank = 0;

const heatMap = new HeatmapLayer({
    source: new VectorSource(),
    blur: 20,
    radius: 5
});

loadCsvPoints(currentRank, (features) => {
    heatMap.getSource().clear();
    heatMap.getSource().addFeatures(features);
});

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({ source: new OSM() }),
        heatMap
    ],
    view: new View({
        center: fromLonLat([127.5, 36.5]),
        zoom: 7
    })
});

const slider = document.getElementById('rankSlider');
const rankValue = document.getElementById('rankValue');

const updateRank = debounce((rank) => {
    rankValue.textContent = rank;
    loadCsvPoints(rank, (features) => {
        heatMap.getSource().clear();
        heatMap.getSource().addFeatures(features);
    });
}, 300);

slider.addEventListener('input', (e) => {
    const rank = parseInt(e.target.value, 10);
    updateRank(rank);
});