const { Station, Journey } = require('./models')
const fs = require('fs');
const readline = require('readline');
const { validJourney, validStation } = require ('./util/validation');

const getStationIds = async () => {
  stations = await Station.findAll();
  ids = stations.map(station => station.id)
  return ids;
}

const createAndSaveJourneys = async (chunks) => {
  const stationIds = await getStationIds()
  let rejected = 0;
  let valid = 0;

  await chunks.forEach(async chunk => {
    // validate and create journey objects from a chunk of data
    let journeys = [];
    chunk.forEach(line => {
      if (validJourney(line)) {
        const row = line.split(',');

        const newJourney = {
          departure: row[0],
          return: row[1],
          departureStationId: row[2],
          departureStationName: row[3],
          returnStationId: row[4],
          returnStationName: row[5],
          distance: parseInt(row[6]),
          duration: parseInt(row[7]),
        };

        // Check that station ids are valid
        if (stationIds.includes(Number(newJourney.departureStationId)) && stationIds.includes(Number(newJourney.returnStationId))){
          journeys.push(newJourney);
        }  
      } else {
        rejected = rejected + 1;
      }
    })

    // insert created objects into database
    try {
      await Journey.bulkCreate(journeys,{logging: false, individualHooks: false});
      valid += journeys.length;
      process.stdout.write(valid + " entries inserted to db\r");
    } catch (error) {
      console.log(error);
    }
    
    // Journey.bulkCreate(journeys,{logging: false, individualHooks: false})
    // .then(() => {
    //   valid += journeys.length;
    //   process.stdout.write(valid + " entries inserted to db\r");
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    
  });
  console.log(rejected, 'Entrie rejected for invalid data')
}

const createAndSaveStations = (chunks) => {
  let valid = 0
  let invalid = 0
  chunks.forEach(chunk => {
    chunk.forEach(line => {
      if (validStation(line)) {
        const row = line.split(',');
        const newStation = {
          id: row[1],
          nameFin: row[2],
          nameSwe: row[3], 
          nameEng: row[4],
          addressFin: row[5], 
          addressSwe: row[6], 
          cityFin: row[7], 
          citySwe: row[8], 
          operator: row[9],
          capacity: row[10], 
          locationX: row[11],
          locationY: row[12],
        }
        Station.create(newStation)
        .then(valid += 1)
        .catch(error => {
          console.log(error);
        });
      } else {
        invalid += 1
      }
    })
  });
  console.log(valid, 'entries created.', invalid, 'rejected');
};

const readCsvData = async () => {
  const chunkSize = 5000;
  let chunks = []
  const file = process.argv[2];
  try {
    const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
    let lines = []

    // read the file line by line and push into array
    console.log('reading file...')
    rl.on('line', (line) => {
      lines.push(line);
      if (lines.length > chunkSize) {
        const copy = [...lines];
        lines = [];
        chunks.push(copy);
      }
    });

    rl.on('close', () => {
      // push the last lines of data
      chunks.push(lines);
      
      // check what kind of data we have
      const firstline = String(chunks[0][0]);
      
      if (firstline.lastIndexOf('FID,ID,Nimi') > 0) {
        console.log('Creating stations...')
        createAndSaveStations(chunks);
      } else if (firstline.lastIndexOf('Departure,Return') > 0) {
        console.log('Creating journeys...')
        createAndSaveJourneys(chunks)
      } else {
        console.log('File not recognized')
      }
    })
  } catch (error) {
    console.error(error);
  }
}

readCsvData();
